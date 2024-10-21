package com.org.workflow.controller.reponse.usercontroller;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse implements Serializable {

  private String tokenType;

  private UserResponse userResponse;

  private String token;

}
