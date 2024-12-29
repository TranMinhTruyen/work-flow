package com.org.workflow.domain.dto.request.usercontroller;

import com.org.workflow.domain.annotation.validation.CheckLength;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest implements Serializable {

  @CheckLength(order = 1, maxLength = 10)
  private String userName;

  private String password;

  private Boolean isRemember;

}
