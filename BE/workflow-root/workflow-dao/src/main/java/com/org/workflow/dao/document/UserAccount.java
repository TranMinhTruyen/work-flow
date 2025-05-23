package com.org.workflow.dao.document;

import com.org.workflow.core.common.enums.AuthorityEnum;
import com.org.workflow.core.common.enums.RoleEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "user_account")
public class UserAccount extends AbstractDocument implements Serializable {

  @Field(name = "user_id", write = Write.ALWAYS)
  private String userId;

  @Field(name = "user_name", write = Write.ALWAYS)
  private String userName;

  @Field(name = "email", write = Write.ALWAYS)
  private String email;

  @Field(name = "password", write = Write.ALWAYS)
  private String password;

  @Field(name = "full_name", write = Write.ALWAYS)
  private String fullName;

  @Field(name = "birth_day", write = Write.ALWAYS)
  private String birthDay;

  @Field(name = "image_object", write = Write.ALWAYS)
  private String imageObject;

  @Field(name = "role", write = Write.ALWAYS)
  private RoleEnum role;

  @Field(name = "authorities", write = Write.ALWAYS)
  private List<AuthorityEnum> authorities;

  @Field(name = "level", write = Write.ALWAYS)
  private int level;

  @Field(name = "access_screen_list", write = Write.ALWAYS)
  private List<String> accessScreenList;

  @Field(name = "login_fail_count", write = Write.ALWAYS)
  private Integer loginFailCount;

  @Field(name = "is_active", write = Write.ALWAYS)
  private boolean isActive;

}
