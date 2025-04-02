package com.org.workflow.dao.document.sub;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "change_value")
public class ChangeValue {

  @Field(name = "value_before", write = Write.ALWAYS)
  private Object fieldValueBefore;

  @Field(name = "value_after", write = Write.ALWAYS)
  private Object fieldValueAfter;

  @Field(name = "change_type", write = Write.ALWAYS)
  private String changeType;

}
