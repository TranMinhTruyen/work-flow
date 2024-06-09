package com.org.workflow.dao.document;

import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "user_account")
public class UserAccount extends AbstractDocument implements Serializable {

  @Field(name = "user_name", write = Write.NON_NULL)
  private String userName;

  @Field(name = "login_password", write = Write.NON_NULL)
  private String loginPassword;

  @Field(name = "full_name")
  private String fullName;

  @Field(name = "role")
  private String role;

  @Field(name = "authorities")
  private List<String> authorities;

  @Field(name = "login_fail_count")
  private Integer loginFailCount;

  @Field(name = "is_active", write = Write.NON_NULL)
  private Boolean isActive;

}
