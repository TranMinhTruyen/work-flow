package com.org.workflow.controller;

import static com.org.workflow.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.common.enums.MessageTypeEnum.SUCCESS;

import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.request.NotificationCreateRequest;
import com.org.workflow.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Tag(name = "NotificationController")
@RequestMapping(path = API_PREFIX + "/notification")
public class NotificationController extends AbstractController {

  private final NotificationService notificationService;

  private final SimpMessagingTemplate messagingTemplate;

  @Operation(responses = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "400", description = "Bad request"),
    @ApiResponse(responseCode = "500", description = "Server error"),
    @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
    @SecurityRequirement(name = "Authorization")})
  @PostMapping("/create")
  public ResponseEntity<BaseResponse> createNotification(
    NotificationCreateRequest notificationCreateRequest) {
    notificationService.createNotification(notificationCreateRequest);
    messagingTemplate.convertAndSendToUser(
      notificationCreateRequest.getUserId(), "/check-notification",
      notificationCreateRequest);
    return this.returnBaseResponse(notificationCreateRequest, "Create success", SUCCESS,
      HttpStatus.OK);
  }

}
