package com.org.workflow.dao.repository.ext.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ext.UserRepositoryExt;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 * @author minh-truyen
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryExtImpl implements UserRepositoryExt {

  private final MongoTemplate mongoTemplate;

  @Override
  public Optional<UserAccount> findUserAccountByUserNameOrEmail(String param) {
    Criteria criteria = new Criteria().andOperator(
        new Criteria().orOperator(
            where("user_name").is(param),
            where("email").is(param)
        ),
        new Criteria().orOperator(
            where("is_active").isNull(),
            where("is_active").is(true)
        ),
        where("delete_by").isNull(),
        where("delete_date_time").isNull()
    );

    return Optional.ofNullable(mongoTemplate.findOne(new Query(criteria), UserAccount.class));
  }

}
