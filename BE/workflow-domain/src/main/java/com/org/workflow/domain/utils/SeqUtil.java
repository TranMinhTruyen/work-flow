package com.org.workflow.domain.utils;

import com.org.workflow.dao.document.SeqMaster;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
@RequiredArgsConstructor
public class SeqUtil {

  private final MongoOperations mongo;

  public Long getSeq(String entityName) {
    SeqMaster counter = mongo.findAndModify(
        query(where("entity_name").is(entityName)),
        new Update().inc("seq", 1),
        options().returnNew(true).upsert(true),
        SeqMaster.class);
    return Objects.isNull(counter) ? 1 : counter.getSeq();
  }

}
