package com.org.workflow.core.security;

import java.io.Serializable;
import java.util.List;
import lombok.Data;

@Data
public class AppUserDetail implements Serializable {

  private String username;

  private String loginPassword;

  private String role;

  private Boolean isActive;

  private List<String> authorities;

}
