package com.org.workflow.domain.dto.reponse.usercontroller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse implements Serializable {

  private String tokenType;

  private UserResponse userResponse;

  private String token;

}
