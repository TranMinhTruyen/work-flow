package com.org.workflow.dao.document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "user_login_history")
public class UserLoginHistory extends AbstractDocument implements Serializable {

  @Field(name = "user_id", write = Write.ALWAYS)
  private String userId;

  @Field(name = "user_name", write = Write.ALWAYS)
  private String userName;

  @Field(name = "ip_address", write = Write.ALWAYS)
  private String ipAddress;

  @Field(name = "is_active", write = Write.ALWAYS)
  private Boolean isActive;

}
