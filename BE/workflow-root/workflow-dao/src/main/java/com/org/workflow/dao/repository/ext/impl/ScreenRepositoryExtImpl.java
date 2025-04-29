package com.org.workflow.dao.repository.ext.impl;

import com.mongodb.client.result.UpdateResult;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.common.CommonRepositoryExt;
import com.org.workflow.dao.repository.condition.screen.AssignUserCondition;
import com.org.workflow.dao.repository.condition.screen.RemoveUserCondition;
import com.org.workflow.dao.repository.condition.screen.SearchCondition;
import com.org.workflow.dao.repository.ext.ScreenRepositoryExt;
import com.org.workflow.dao.repository.result.common.PageableResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * @author minh-truyen
 */
public class ScreenRepositoryExtImpl extends CommonRepositoryExt implements ScreenRepositoryExt {

  public ScreenRepositoryExtImpl(MongoTemplate mongoTemplate) {
    super(mongoTemplate);
  }

  @Override
  public PageableResult<Screen> searchByCondition(SearchCondition condition, Pageable pageable) {
    Criteria criteria = new Criteria();

    if (!StringUtils.isBlank(condition.getScreenId())) {
      criteria.and("screen_id").is(condition.getScreenId());
    }
    if (!StringUtils.isBlank(condition.getScreenName())) {
      criteria.and("screen_name").is(condition.getScreenName());
    }
    if (!StringUtils.isBlank(condition.getScreenUrl())) {
      criteria.and("screen_url").is(condition.getScreenUrl());
    }
    if (!StringUtils.isBlank(condition.getIsActive())) {
      criteria.and("is_active").is(Boolean.parseBoolean(condition.getIsActive()));
    }

    return pageableFind(new Query(criteria), pageable, Screen.class);
  }

  @Override
  public Optional<List<Screen>> findScreenMasterByListScreenId(List<String> listScreenId) {
    Criteria criteria = new Criteria().andOperator(where("screen_id").in(listScreenId),
        new Criteria().orOperator(where("is_active").isNull(), where("is_active").is(true)),
        where("delete_by").isNull(), where("delete_date_time").isNull());

    List<Screen> result = mongoTemplate.find(new Query(criteria), Screen.class);

    if (result.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(result);
  }

  /**
   * @param condition
   * @return
   */
  @Override
  public long removeUserFromScreen(RemoveUserCondition condition) {
    Query query = new Query(Criteria.where("user_id").in(condition.getListUserId()));

    Update update = new Update().pull("access_screen_list", condition.getScreenId());

    UpdateResult updateResult = mongoTemplate.updateMulti(query, update, UserAccount.class);

    return updateResult.getModifiedCount();
  }

  @Override
  public long assignUserToScreen(AssignUserCondition condition) {
    Query query = new Query(Criteria.where("user_id").in(condition.getListUserId()));

    Update update = new Update().push("access_screen_list", condition.getScreenId());

    UpdateResult updateResult = mongoTemplate.updateMulti(query, update, UserAccount.class);

    return updateResult.getModifiedCount();
  }

  @Override
  public Screen saveDocument(Screen screen)
      throws WFException, InvocationTargetException, IllegalAccessException {
    return saveDocument(screen, Screen.class);
  }

}
