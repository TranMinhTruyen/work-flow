package com.org.workflow.dao.document;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.Data;
import lombok.EqualsAndHashCode;

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

  @Field(name = "send_by", write = Write.ALWAYS)
  private String sendBy;

  @Field(name = "send_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime sendDatetime;

  @Field(name = "is_read", write = Write.ALWAYS, targetType = FieldType.BOOLEAN)
  private boolean isRead;

}
