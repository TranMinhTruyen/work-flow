package com.org.workflow.dao.repository.ext.impl;

import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ext.UserRepositoryExt;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FluentMongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * @author minh-truyen
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryExtImpl implements UserRepositoryExt {

  private final MongoTemplate mongoTemplate;

  private final FluentMongoOperations fluentMongoOperations;

  @Override
  public Optional<UserAccount> findUserAccountByUserNameOrEmail(String param) {
    Criteria criteria = new Criteria().andOperator(
        new Criteria().orOperator(
            where("user_name").is(param),
            where("email").is(param)
        ),
        new Criteria().orOperator(
            where("is_active").is(param),
            where("is_active").is(true)
        ),
        where("delete_by").isNull(),
        where("delete_date_time").isNull()
    );

    Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(criteria));
    AggregationResults<UserAccount> result = mongoTemplate.aggregate(aggregation, UserAccount.class, UserAccount.class);

    return Optional.ofNullable(result.getUniqueMappedResult());
  }

}
