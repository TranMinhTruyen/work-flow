package com.org.workflow.dao.repository.ext.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections.CollectionUtils;
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

  /**
   * @param param
   * @return
   */
  @Override
  public Optional<UserAccount> findUserAccountByUserNameOrEmail(String param) {
    Criteria criteria = new Criteria().andOperator(
        new Criteria().orOperator(where("user_name").is(param), where("email").is(param)),
        new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)),
        where("delete_by").isNull(), where("delete_date_time").isNull());

    return Optional.ofNullable(mongoTemplate.findOne(new Query(criteria), UserAccount.class));
  }

  /**
   * @param condition
   * @param pageable
   * @return
   */
  @Override
  public PageableResult<UserAccount> findUserAccountByScreenId(SearchByScreenIdCondition condition,
      Pageable pageable) {
    List<Criteria> andConditions = new ArrayList<>();

    andConditions.add(where("access_screen_list").is(condition.getScreenId()));
    andConditions.add(
        new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)));
    andConditions.add(where("delete_by").isNull());
    andConditions.add(where("delete_date_time").isNull());

    if (!StringUtils.isBlank(condition.getKeyword())) {
      andConditions.add(new Criteria().orOperator(
          where("user_id").regex(".*" + condition.getKeyword() + ".*", "i"),
          where("user_name").regex(".*" + condition.getKeyword() + ".*", "i"),
          where("email").regex(".*" + condition.getKeyword() + ".*", "i")));
    }

    return pageableFind(
        new Query(new Criteria().andOperator(andConditions.toArray(new Criteria[0]))), pageable,
        UserAccount.class);
  }

  @Override
  public PageableResult<UserAccount> findUserAccountNotUsingByScreenId(
      SearchByScreenIdCondition condition, Pageable pageable) {
    List<Criteria> andConditions = new ArrayList<>();

    andConditions.add(where("access_screen_list").nin(condition.getScreenId()));
    andConditions.add(
        new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)));
    andConditions.add(where("delete_by").isNull());
    andConditions.add(where("delete_date_time").isNull());

    if (!StringUtils.isBlank(condition.getKeyword())) {
      andConditions.add(new Criteria().orOperator(
          where("user_id").regex(".*" + condition.getKeyword() + ".*", "i"),
          where("user_name").regex(".*" + condition.getKeyword() + ".*", "i"),
          where("email").regex(".*" + condition.getKeyword() + ".*", "i")));
    }

    return pageableFind(
        new Query(new Criteria().andOperator(andConditions.toArray(new Criteria[0]))), pageable,
        UserAccount.class);
  }

  @Override
  public List<String> findUserIdByScreenId(String screenId) {
    Criteria criteria = new Criteria().andOperator(where("access_screen_list").is(screenId),
        new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)),
        where("delete_by").isNull(), where("delete_date_time").isNull());

    Query query = new Query(criteria);
    query.fields().include("user_id");

    List<UserAccount> userAccount = mongoTemplate.find(query, UserAccount.class);

    if (CollectionUtils.isNotEmpty(userAccount)) {
      return userAccount.stream().map(UserAccount::getUserId).toList();
    } else {
      return null;
    }

  }

  /**
   * @param userAccount
   * @return
   * @throws WFException
   * @throws InvocationTargetException
   * @throws IllegalAccessException
   */
  @Override
  public UserAccount saveDocument(UserAccount userAccount)
      throws WFException, InvocationTargetException, IllegalAccessException {
    return saveDocument(userAccount, UserAccount.class);
  }

}
