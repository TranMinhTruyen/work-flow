package com.org.workflow.controller;


import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.core.common.enums.MessageTypeEnum.SUCCESS;

import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.notification.NotificationCreateRequest;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.services.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "NotificationController")
@RequestMapping(path = API_PREFIX + "/notification")
public class NotificationController extends AbstractController {

  private final NotificationService notificationService;

  private final SimpMessagingTemplate messagingTemplate;

  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/create")
  public ResponseEntity<BaseResponse> createNotification(
      BaseRequest<NotificationCreateRequest> notificationCreateRequest) {
    notificationService.createNotification(notificationCreateRequest.getPayload());
    messagingTemplate.convertAndSendToUser(notificationCreateRequest.getPayload().getUserId(),
        "/check-notification", notificationCreateRequest);
    return this.returnBaseResponse(notificationCreateRequest, "Create success", SUCCESS,
        HttpStatus.OK);
  }

}
