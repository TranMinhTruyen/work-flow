package com.org.workflow.dao.document;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(value = "seq_master")
public class SeqMaster {

  @Id
  private String id;

  @Field(value = "entity_name")
  private String entityName;

  @Field(value = "seq")
  private Long seq;

}
