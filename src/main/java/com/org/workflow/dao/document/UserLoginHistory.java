package com.org.workflow.dao.document;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "user_login_history")
public class UserLoginHistory extends AbstractDocument implements Serializable {

  @Field(name = "user_name", write = Write.NON_NULL)
  private String userName;

  @Field(name = "ip_address", write = Write.NON_NULL)
  private String ipAddress;

  @Field(name = "is_active", write = Write.NON_NULL)
  private Boolean isActive;

}
