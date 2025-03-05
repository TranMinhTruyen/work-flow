package com.org.workflow.dao.repository.common.impl;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.dao.repository.common.PageableTemplate;
import com.org.workflow.dao.repository.result.common.PageableResult;

import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@RequiredArgsConstructor
public class PageableTemplateImpl implements PageableTemplate {

  private final MongoTemplate mongoTemplate;
  
  @Override
  public <T> PageableResult<T> pageableFind(Query query, Class<T> entityClass) {
    return null;
  }

  @Override
  public <T> PageableResult<T> pageableFind(Query query, Class<T> entityClass,
      String collectionName) {
    return null;
  }

}
