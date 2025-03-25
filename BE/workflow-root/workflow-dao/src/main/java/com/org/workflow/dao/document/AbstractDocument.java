package com.org.workflow.dao.document;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.Data;

import jakarta.persistence.Id;

@Data
public abstract class AbstractDocument {

  @Id
  private String id;

  @Field(name = "is_deleted", write = Write.ALWAYS, targetType = FieldType.BOOLEAN)
  private boolean isDeleted;

  @Field(name = "created_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime createDatetime;

  @Field(name = "created_by", write = Write.ALWAYS)
  private String createdBy;

  @Field(name = "updated_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime updatedDatetime;

  @Field(name = "updated_by", write = Write.ALWAYS)
  private String updatedBy;

  @Field(name = "deleted_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime deletedDatetime;

  @Field(name = "deleted_by", write = Write.ALWAYS)
  private String deletedBy;

}
