package com.org.workflow.controller.request.usercontroller;

import com.org.workflow.common.annotation.validation.MaxLength;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest implements Serializable {

  @MaxLength(maxLength = 10)
  private String userName;

  @MaxLength(maxLength = 5)
  private String password;

  private Boolean isRemember;

}
