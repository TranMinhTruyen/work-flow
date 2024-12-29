package com.org.workflow.domain.dto.request.usercontroller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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
