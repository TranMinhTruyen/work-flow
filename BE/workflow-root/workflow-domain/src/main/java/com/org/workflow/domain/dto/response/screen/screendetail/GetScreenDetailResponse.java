package com.org.workflow.domain.dto.response.screen.screendetail;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

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
public class GetScreenDetailResponse implements Serializable {

  private String id;

  private String screenId;

  private String screenName;

  private String screenUrl;

  private List<ScreenComponentResponse> screenComponentList;

  private boolean isActive;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime createdDatetime;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime updatedDatetime;

}
