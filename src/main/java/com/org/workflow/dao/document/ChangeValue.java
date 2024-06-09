package com.org.workflow.dao.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@Document(value = "change_value")
public class ChangeValue {

  @Field(name = "value_before")
  private Object fieldValueBefore;

  @Field(name = "value_after")
  private Object fieldValueAfter;

  @Field(name = "change_type", write = Write.NON_NULL)
  private String changeType;

}
