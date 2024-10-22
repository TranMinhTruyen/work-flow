package com.org.workflow.controller.request.usercontroller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {

  private String currentLoginPassword;

  private String newLoginPassword;

  private String confirmNewLoginPassword;

}
