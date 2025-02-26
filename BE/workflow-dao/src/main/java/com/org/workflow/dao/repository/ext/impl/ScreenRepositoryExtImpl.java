package com.org.workflow.dao.repository.ext.impl;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.ext.ScreenRepositoryExt;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * @author minh-truyen
 */
@RequiredArgsConstructor
public class ScreenRepositoryExtImpl implements ScreenRepositoryExt {

  private final MongoTemplate mongoTemplate;


  @Override
  public Optional<List<Screen>> searchByCondition(SearchScreenCondition condition,
      Pageable pageable) {
    Criteria criteria = new Criteria();

    if (condition.getScreenId() != null) {
      criteria.and("screen_id").is(condition.getScreenId());
    }
    if (condition.getScreenName() != null) {
      criteria.and("screen_name").is(condition.getScreenName());
    }
    if (condition.getIsActive() != null) {
      criteria.and("is_active").is(Boolean.parseBoolean(condition.getIsActive()));
    }

    return Optional.ofNullable(
        mongoTemplate.find(new Query(criteria).with(pageable), Screen.class));
  }

}
