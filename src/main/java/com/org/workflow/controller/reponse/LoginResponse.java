package com.org.workflow.controller.reponse;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginResponse implements Serializable {
  private static String tokenType = "Bearer";
  private String token;
}
