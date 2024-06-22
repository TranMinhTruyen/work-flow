package com.org.workflow.dao.document;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Data
public abstract class AbstractDocument {

  @Id
  private Long id;

  @Field(name = "is_deleted", write = Write.ALWAYS, targetType = FieldType.BOOLEAN)
  private Boolean isDeleted;

  @Field(name = "created_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime createDatetime;

  @Field(name = "created_by", write = Write.ALWAYS)
  private String createdBy;

  @Field(name = "update_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime updateDatetime;

  @Field(name = "update_by", write = Write.ALWAYS)
  private String updateBy;

  @Field(name = "delete_date_time", write = Write.ALWAYS, targetType = FieldType.DATE_TIME)
  private LocalDateTime deleteDatetime;

  @Field(name = "delete_by", write = Write.ALWAYS)
  private String deleteBy;

}
