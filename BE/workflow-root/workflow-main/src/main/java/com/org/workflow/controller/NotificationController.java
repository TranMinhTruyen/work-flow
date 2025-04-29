package com.org.workflow.controller;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.notification.AllNotificationResponse;
import com.org.workflow.domain.dto.response.notification.NotificationResponse;
import com.org.workflow.domain.services.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

@RestController
@RequiredArgsConstructor
@Tag(name = "NotificationController")
@RequestMapping(path = API_PREFIX + "/notification")
public class NotificationController extends AbstractController {

  private final NotificationService notificationService;

  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/get-notification")
  public ResponseEntity<BaseResponse> getNotification(
      @RequestBody BaseRequest<PageableRequest<?>> request) {
    AllNotificationResponse response = notificationService.getNotification(request);
    return this.returnBaseResponse(response, MessageEnum.REQUEST_SUCCESS);
  }

  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PutMapping("/set-is-read")
  public ResponseEntity<BaseResponse> setIsRead(@RequestParam String id,
                                                @RequestParam String language) throws WFException {
    NotificationResponse response = notificationService.setIsRead(id, language);
    return this.returnBaseResponse(response, MessageEnum.REQUEST_SUCCESS);
  }

}
