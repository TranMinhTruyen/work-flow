package com.org.workflow.dao.document;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

import com.org.workflow.dao.document.sub.ChangeValue;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Document(value = "user_account_history")
@EqualsAndHashCode(callSuper = false)
public class UserHistory extends AbstractDocument implements Serializable {

  @Field(name = "user_id", write = Write.ALWAYS)
  private String userId;

  @Field(name = "user_name", write = Write.ALWAYS)
  private String userName;

  @Field(name = "email", write = Write.ALWAYS)
  private ChangeValue email;

  @Field(name = "login_password", write = Write.ALWAYS)
  private ChangeValue password;

  @Field(name = "full_name", write = Write.ALWAYS)
  private ChangeValue fullName;

  @Field(name = "image_path", write = Write.ALWAYS)
  private ChangeValue imagePath;

  @Field(name = "role", write = Write.ALWAYS)
  private ChangeValue role;

  @Field(name = "authorities", write = Write.ALWAYS)
  private ChangeValue authorities;

  @Field(name = "level", write = Write.ALWAYS)
  private ChangeValue level;

  @Field(name = "login_fail_count", write = Write.ALWAYS)
  private ChangeValue loginFailCount;

  @Field(name = "is_active", write = Write.ALWAYS)
  private ChangeValue isActive;

}
