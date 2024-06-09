package com.org.workflow.dao.document;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
public abstract class AbstractDocument {

  @Id
  private Long id;

  @Field(name = "created_date_time", write = Write.NON_NULL)
  private LocalDateTime createDatetime;

  @Field(name = "created_by", write = Write.NON_NULL)
  private String createdBy;

  @Field(name = "update_date_time", write = Write.NON_NULL)
  private LocalDateTime updateDatetime;

  @Field(name = "update_by", write = Write.NON_NULL)
  private String updateBy;

  @Field(name = "delete_date_time")
  private LocalDateTime deleteDatetime;

  @Field(name = "delete_by")
  private String deleteBy;

}
