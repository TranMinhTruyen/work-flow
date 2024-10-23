package com.org.workflow.controller;

import static com.org.workflow.common.cnst.CommonConst.API_PREFIX;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.proxycontroller.CheckProxyResponse;
import com.org.workflow.controller.request.BaseRequest;
import com.org.workflow.controller.request.proxycontroller.CheckProxyRequest;
import com.org.workflow.service.ProxyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

  @Operation(responses = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "400", description = "Bad request"),
    @ApiResponse(responseCode = "500", description = "Server error"),
    @ApiResponse(responseCode = "403", description = "Forbidden")})
  @PostMapping(value = "/check-proxy")
  public ResponseEntity<BaseResponse> checkProxy(
    @RequestBody BaseRequest<CheckProxyRequest> checkProxyRequest) {
    CheckProxyResponse result = proxyService.checkProxy(checkProxyRequest.getPayload());
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

}
