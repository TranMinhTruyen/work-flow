package com.org.workflow.service;

import com.org.workflow.controller.reponse.proxycontroller.CheckProxyResponse;
import com.org.workflow.controller.request.proxycontroller.CheckProxyRequest;
import com.org.workflow.dao.document.Proxy;
import com.org.workflow.dao.repository.ProxyRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class ProxyService {

  private final ProxyRepository proxyRepository;

  /**
   * Check proxy role.
   *
   * @param proxyRequest CheckProxyRequest
   * @return CheckProxyResponse
   */
  public CheckProxyResponse checkProxy(CheckProxyRequest proxyRequest) {
    String param;
    if (!StringUtils.isBlank(proxyRequest.getIpAddress())) {
      param = proxyRequest.getIpAddress();
    } else {
      param = proxyRequest.getMacAddress();
    }

    Optional<Proxy> result = proxyRepository.getRole(param);

    CheckProxyResponse checkProxyResponse = new CheckProxyResponse();

    if (result.isPresent()) {
      Proxy proxy = result.get();
      checkProxyResponse.setRole(proxy.getRole());
    }

    return checkProxyResponse;
  }

}
