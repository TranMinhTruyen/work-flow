package com.org.workflow.dao.repository.common;

import static com.org.workflow.core.common.enums.MessageEnum.UPDATE_FAILED;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDateTime;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.AbstractDocument;
import com.org.workflow.dao.repository.result.common.PageableResult;

import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@RequiredArgsConstructor
public class CommonRepositoryExt {

  protected final MongoTemplate mongoTemplate;

  protected <T extends AbstractDocument> T saveDocument(T document, Class<T> documentClass)
      throws WFException, InvocationTargetException, IllegalAccessException {
    LocalDateTime now = LocalDateTime.now();

    if (StringUtils.isBlank(document.getId())) {
      document.setCreateDatetime(now);
      document.setUpdateDatetime(now);
    } else {
      T findResult = mongoTemplate.findById(document.getId(), documentClass);

      if (findResult == null || !findResult.getUpdateDatetime()
          .equals(document.getUpdateDatetime())) {
        throw new WFException(UPDATE_FAILED);
      }

      BeanUtils.copyProperties(document, findResult);

      document.setUpdateDatetime(now);
    }

    return mongoTemplate.save(document);
  }

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
