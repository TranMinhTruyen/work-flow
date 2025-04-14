package com.org.workflow.dao.document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import org.springframework.data.mongodb.core.mapping.FieldType;

import com.org.workflow.dao.document.sub.NotificationContent;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "notification")
public class Notification extends AbstractDocument implements Serializable {

  @Field(name = "content_list", write = Write.ALWAYS, targetType = FieldType.ARRAY)
  List<NotificationContent> contentList;

  @Field(name = "user_id", write = Write.ALWAYS, targetType = FieldType.STRING)
  private String userId;

  @Field(name = "send_by", write = Write.ALWAYS, targetType = FieldType.STRING)
  private String sendBy;

  @Field(name = "send_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime sendDatetime;

  @Field(name = "is_read", write = Write.ALWAYS, targetType = FieldType.BOOLEAN)
  private boolean isRead;

}
