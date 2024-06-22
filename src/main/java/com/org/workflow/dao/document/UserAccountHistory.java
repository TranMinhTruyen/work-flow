package com.org.workflow.dao.document;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@Document(value = "user_account_history")
@EqualsAndHashCode(callSuper = false)
public class UserAccountHistory extends AbstractDocument implements Serializable {

  @Field(name = "user_name", write = Write.NON_NULL)
  private String userName;

  @Field(name = "full_name")
  private ChangeValue fullName;

  @Field(name = "image_path")
  private ChangeValue imagePath;

  @Field(name = "role")
  private ChangeValue role;

  @Field(name = "authorities")
  private ChangeValue authorities;

  @Field(name = "login_fail_count")
  private ChangeValue loginFailCount;

  @Field(name = "is_active")
  private ChangeValue isActive;

}
