package com.org.workflow.domain.dto.response.screen;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

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

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime createdDatetime;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime updatedDatetime;

}
