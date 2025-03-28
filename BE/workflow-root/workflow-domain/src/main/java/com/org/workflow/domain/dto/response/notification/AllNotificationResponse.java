package com.org.workflow.domain.dto.response.notification;

import com.org.workflow.domain.dto.response.common.PageResponse;

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
public class AllNotificationResponse {

  private PageResponse<NotificationResponse> notification;

  private long totalNotRead;

}
