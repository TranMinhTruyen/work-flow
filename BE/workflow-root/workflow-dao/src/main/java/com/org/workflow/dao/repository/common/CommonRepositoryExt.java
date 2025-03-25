package com.org.workflow.dao.repository.common;

import static com.org.workflow.core.common.enums.MessageEnum.UPDATE_FAILED;

import java.time.LocalDateTime;
import java.util.List;

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
      throws WFException {
    LocalDateTime now = LocalDateTime.now();

    if (StringUtils.isBlank(document.getId())) {
      document.setCreateDatetime(now);
      document.setUpdatedDatetime(now);
      return mongoTemplate.save(document);
    } else {
      T findResult = mongoTemplate.findById(document.getId(), documentClass);

      if (findResult == null || !findResult.getUpdatedDatetime()
          .equals(document.getUpdatedDatetime())) {
        throw new WFException(UPDATE_FAILED);
      }

      findResult.setUpdatedDatetime(now);
      return mongoTemplate.save(findResult);
    }
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
