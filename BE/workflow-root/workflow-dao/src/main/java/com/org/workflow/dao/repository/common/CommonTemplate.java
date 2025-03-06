package com.org.workflow.dao.repository.common;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.dao.repository.result.common.PageableResult;

import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@RequiredArgsConstructor
public class CommonTemplate {

  protected final MongoTemplate mongoTemplate;

  protected <T> PageableResult<T> pageableFind(Query query, Pageable pageable,
      Class<T> entityClass) {

    long total = mongoTemplate.count(query, entityClass);

    List<T> result = mongoTemplate.find(query.with(pageable), entityClass);

    return new PageableResult<>(pageable.getPageNumber(), pageable.getPageSize(), total, result);
  }

  protected <T> PageableResult<T> pageableFind(Query query, Pageable pageable, Class<T> entityClass,
      String collectionName) {
    return null;
  }

}
