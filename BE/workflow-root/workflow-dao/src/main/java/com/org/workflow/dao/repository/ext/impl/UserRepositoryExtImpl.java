package com.org.workflow.dao.repository.ext.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.common.CommonRepositoryExt;
import com.org.workflow.dao.repository.condition.user.SearchByScreenIdCondition;
import com.org.workflow.dao.repository.ext.UserRepositoryExt;
import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public class UserRepositoryExtImpl extends CommonRepositoryExt implements UserRepositoryExt {

  public UserRepositoryExtImpl(MongoTemplate mongoTemplate) {
    super(mongoTemplate);
  }

  @Override
  public Optional<UserAccount> findUserAccountByUserNameOrEmail(String param) {
    Criteria criteria = new Criteria().andOperator(
        new Criteria().orOperator(where("user_name").is(param), where("email").is(param)),
        new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)),
        where("delete_by").isNull(), where("delete_date_time").isNull());

    return Optional.ofNullable(mongoTemplate.findOne(new Query(criteria), UserAccount.class));
  }

  @Override
  public PageableResult<UserAccount> findUserAccountByScreenId(SearchByScreenIdCondition condition,
      Pageable pageable) {
    Criteria criteria =
        new Criteria().andOperator(where("access_screen_list").is(condition.getScreenId()),
            new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)),
            where("delete_by").isNull(), where("delete_date_time").isNull());

    if (!StringUtils.isBlank(condition.getKeyword())) {
      criteria.andOperator(new Criteria().orOperator(where("user_id").is(condition.getKeyword()),
          where("user_name").is(condition.getKeyword()),
          where("email").is(condition.getKeyword())));
    }

    return pageableFind(new Query(criteria), pageable, UserAccount.class);
  }

  @Override
  public UserAccount saveDocument(UserAccount userAccount)
      throws WFException, InvocationTargetException, IllegalAccessException {
    return saveDocument(userAccount, UserAccount.class);
  }

}
