package com.org.workflow.controller.request.usercontroller;

import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class ChangePasswordRequest {

  private String currentLoginPassword;

  private String newLoginPassword;

  private String confirmNewLoginPassword;

}
