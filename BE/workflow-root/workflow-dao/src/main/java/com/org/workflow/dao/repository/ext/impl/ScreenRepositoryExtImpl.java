package com.org.workflow.dao.repository.ext.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.common.CommonTemplate;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.ext.ScreenRepositoryExt;
import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public class ScreenRepositoryExtImpl extends CommonTemplate implements ScreenRepositoryExt {

  public ScreenRepositoryExtImpl(MongoTemplate mongoTemplate) {
    super(mongoTemplate);
  }

  @Override
  public PageableResult<Screen> searchByCondition(SearchScreenCondition condition,
      Pageable pageable) {
    Criteria criteria = new Criteria();

    if (!StringUtils.isBlank(condition.getScreenId())) {
      criteria.and("screen_id").is(condition.getScreenId());
    }
    if (!StringUtils.isBlank(condition.getScreenName())) {
      criteria.and("screen_name").is(condition.getScreenName());
    }
    if (!StringUtils.isBlank(condition.getIsActive())) {
      criteria.and("is_active").is(Boolean.parseBoolean(condition.getIsActive()));
    }

    return pageableFind(new Query(criteria), pageable, Screen.class);
  }

}
