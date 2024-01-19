package com.org.workflow.controller.reponse;

import java.io.Serializable;
import lombok.Data;

@Data
public class LoginResponse implements Serializable {

  private static String tokenType = "Bearer";

  private String token;

}
