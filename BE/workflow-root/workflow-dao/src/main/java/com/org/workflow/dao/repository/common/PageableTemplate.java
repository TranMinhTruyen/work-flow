package com.org.workflow.dao.repository.common;

import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public interface PageableTemplate {

  <T> PageableResult<T> pageableFind(Query query, Class<T> entityClass);


  <T> PageableResult<T> pageableFind(Query query, Class<T> entityClass, String collectionName);

}
