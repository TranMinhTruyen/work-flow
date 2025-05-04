package com.org.workflow.domain.dto.response.notification;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse implements Serializable {

  private String id;

  private String title;

  private String category;

  private String message;

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private LocalDateTime sendDatetime;

  private String sendBy;

  private boolean isRead;

}
