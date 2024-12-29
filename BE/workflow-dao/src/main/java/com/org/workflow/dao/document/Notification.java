package com.org.workflow.dao.document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "notification")
public class Notification extends AbstractDocument implements Serializable {

  @Field(name = "user_id", write = Write.ALWAYS)
  private String userId;

  @Field(name = "title", write = Write.ALWAYS)
  private String title;

  @Field(name = "message", write = Write.ALWAYS)
  private String message;

  @Field(name = "is_read", write = Write.ALWAYS, targetType = FieldType.BOOLEAN)
  private Boolean isRead;

}
