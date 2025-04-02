package com.org.workflow.domain.dto.request.screen;

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
public class ScreenUserRequest {

  private String screenId;

  private String keyword;

}
