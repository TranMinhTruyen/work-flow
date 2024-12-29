package com.org.workflow.controller;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.domain.dto.reponse.common.BaseResponse;
import com.org.workflow.domain.dto.reponse.proxycontroller.CheckProxyResponse;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.proxycontroller.CheckProxyRequest;
import com.org.workflow.domain.service.ProxyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

/**
 * @author minh-truyen
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "ProxyController")
@RequestMapping(path = API_PREFIX + "/proxy")
public class ProxyController extends AbstractController {

  private final ProxyService proxyService;

  @PostMapping(value = "/check-proxy")
  public ResponseEntity<BaseResponse> checkProxy(
      @RequestBody BaseRequest<CheckProxyRequest> checkProxyRequest) {
    CheckProxyResponse result = proxyService.checkProxy(checkProxyRequest.getPayload());
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

}
