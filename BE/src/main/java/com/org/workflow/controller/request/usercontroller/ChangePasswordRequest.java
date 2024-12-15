package com.org.workflow.controller.request.usercontroller;

import java.io.Serializable;
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
public class ChangePasswordRequest implements Serializable {

  private String currentLoginPassword;

  private String newLoginPassword;

  private String confirmNewLoginPassword;

}
