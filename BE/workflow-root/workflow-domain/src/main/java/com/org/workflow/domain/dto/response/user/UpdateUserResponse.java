package com.org.workflow.domain.dto.response.user;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

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
public class UpdateUserResponse {

  private String userId;

  private String fullName;

  private String role;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime updateDatetime;

  private List<String> authorities;

}
