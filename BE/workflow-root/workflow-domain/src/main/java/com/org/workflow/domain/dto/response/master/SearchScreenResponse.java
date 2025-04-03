package com.org.workflow.domain.dto.response.master;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

import java.io.Serializable;

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
public class SearchScreenResponse implements Serializable {

  private String screenId;

  private String screenName;

  private String screenUrl;

  private boolean isActive;

  private String createdBy;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private String createdDatetime;

  private String updatedBy;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private String updatedDatetime;

}
