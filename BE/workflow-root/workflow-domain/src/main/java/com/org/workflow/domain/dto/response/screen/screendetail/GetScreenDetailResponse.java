package com.org.workflow.domain.dto.response.screen.screendetail;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

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

  private String screenNameEn;

  private String screenNameVi;

  private String screenNameJa;

  private String screenUrl;

  private List<ScreenComponentResponse> screenComponentList;

  private boolean isActive;

  private List<String> roles;

  private Integer level;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime createdDatetime;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime updatedDatetime;

}
