package com.org.workflow.dao.repository.ext.impl;

import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ext.UserRepositoryExt;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

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
            Criteria.where("user_name").is(param),
            Criteria.where("email").is(param)
        ),
        new Criteria().orOperator(
            Criteria.where("is_active").is(param),
            Criteria.where("is_active").is(true)
        ),
        Criteria.where("delete_by").isNull(),
        Criteria.where("delete_date_time").isNull()
    );

    UserAccount userAccount = mongoTemplate.findOne(new Query(criteria), UserAccount.class);

    return Optional.of(userAccount);
  }

}
