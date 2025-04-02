package com.org.workflow.domain.dto.response.screen;

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
public class ScreenUserResponse {

  private String userId;

  private String email;

  private String userName;

  private String fullName;

}
