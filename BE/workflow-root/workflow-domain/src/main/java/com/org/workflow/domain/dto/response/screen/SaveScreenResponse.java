package com.org.workflow.domain.dto.response.screen;

import java.time.LocalDateTime;

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
public class SaveScreenResponse {

  private String id;

  private String screenId;

  private String screenName;

  private String screenUrl;

  private boolean isActive;

  private LocalDateTime createdDatetime;

  private LocalDateTime updatedDatetime;

}
