package com.org.workflow.controller.request.usercontroller;

import com.org.workflow.common.annotation.validation.CheckLength;
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

  @CheckLength(order = 1, maxLength = 10)
  private String userName;

  @CheckLength(order = 2, maxLength = 5)
  private String password;

  private Boolean isRemember;

}
