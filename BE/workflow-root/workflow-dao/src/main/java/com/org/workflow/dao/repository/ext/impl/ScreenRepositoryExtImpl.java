package com.org.workflow.dao.repository.ext.impl;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.ext.ScreenRepositoryExt;
import com.org.workflow.dao.repository.result.common.PageableResult;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * @author minh-truyen
 */
@RequiredArgsConstructor
public class ScreenRepositoryExtImpl implements ScreenRepositoryExt {

  private final MongoTemplate mongoTemplate;


  @Override
  public PageableResult<List<Screen>> searchByCondition(SearchScreenCondition condition,
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

    long total = mongoTemplate.count(new Query(criteria), Screen.class);

    List<Screen> result = mongoTemplate.find(new Query(criteria).with(pageable), Screen.class);

    return new PageableResult<>(pageable.getPageNumber(), pageable.getPageSize(), total, result);
  }

}
