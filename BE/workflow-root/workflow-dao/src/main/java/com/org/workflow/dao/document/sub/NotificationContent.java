package com.org.workflow.dao.document.sub;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "notification_content")
public class NotificationContent {

  @Field(name = "language", write = Write.ALWAYS, targetType = FieldType.STRING)
  private String language;

  @Field(name = "title", write = Write.ALWAYS, targetType = FieldType.STRING)
  private String title;

  @Field(name = "message", write = Write.ALWAYS, targetType = FieldType.STRING)
  private String message;

}
