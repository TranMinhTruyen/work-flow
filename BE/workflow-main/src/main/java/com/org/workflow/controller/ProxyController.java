package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.proxy.AccessScreenResponse;
import com.org.workflow.domain.dto.response.proxy.CheckProxyResponse;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.proxy.CheckProxyRequest;
import com.org.workflow.domain.service.ProxyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author minh-truyen
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "ProxyController")
@RequestMapping(path = API_PREFIX + "/proxy")
public class ProxyController extends AbstractController {

  private final ProxyService proxyService;


  /**
   * Check proxy api.
   *
   * @param checkProxyRequest CheckProxyRequest
   * @return BaseResponse
   */
  @PostMapping(value = "/check-proxy")
  public ResponseEntity<BaseResponse> checkProxy(
      @RequestBody BaseRequest<CheckProxyRequest> checkProxyRequest) {
    CheckProxyResponse result = proxyService.checkProxy(checkProxyRequest.getPayload());
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }


  /**
   * Get access screen api.
   *
   * @return BaseResponse
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping(value = "/get-access-screen")
  public ResponseEntity<BaseResponse> getAccessScreen() {
    AccessScreenResponse result = proxyService.getAccessScreen();
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

}
