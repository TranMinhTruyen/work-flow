package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.core.common.enums.MessageTypeEnum.SUCCESS;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.proxy.AccessScreenResponse;
import com.org.workflow.domain.services.SecurityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "SecurityController")
@RequestMapping(path = API_PREFIX + "/security")
public class SecurityController extends AbstractController {

  private final SecurityService securityService;

  @Operation(security = { @SecurityRequirement(name = "Authorization") })
  @PostMapping("/token-check")
  public ResponseEntity<BaseResponse> tokenCheck() {
    return this.returnBaseResponse(null, "Token check success", SUCCESS,
        HttpStatus.OK);
  }

  /**
   * Get access screen api.
   *
   * @return BaseResponse
   */
  @Operation(security = { @SecurityRequirement(name = "Authorization") })
  @PostMapping(value = "/get-access-screen")
  public ResponseEntity<BaseResponse> getAccessScreen() {
    AccessScreenResponse result = securityService.getAccessScreen();
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

}
