package com.org.workflow.domain.dto.response.user;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.org.workflow.domain.dto.response.screen.ScreenResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse implements Serializable {

  private String userId;

  private String email;

  private String userName;

  private String fullName;

  private String birthDay;

  private String role;

  private Integer loginFailCount;

  private Boolean isActive;

  private List<String> authorities;

  private Integer level;

  private List<ScreenResponse> screenMasterList;

  private String image;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime createDatetime;

  private String createBy;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime updateDatetime;

  private String updateBy;

}
