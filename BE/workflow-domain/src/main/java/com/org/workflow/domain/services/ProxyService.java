package com.org.workflow.domain.service;

import com.org.workflow.dao.document.Proxy;
import com.org.workflow.dao.document.ScreenMaster;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ProxyRepository;
import com.org.workflow.dao.repository.UserRepository;
import com.org.workflow.domain.dto.response.proxy.AccessScreenResponse;
import com.org.workflow.domain.dto.response.proxy.CheckProxyResponse;
import com.org.workflow.domain.dto.response.proxy.ScreenMasterResponse;
import com.org.workflow.domain.dto.request.proxy.CheckProxyRequest;
import com.org.workflow.domain.utils.AuthUtil;
import java.util.ArrayList;
import java.util.List;
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

  private final UserRepository userRepository;


  private static List<ScreenMasterResponse> setScreenMasterResponses(
      List<ScreenMaster> screenMasterList) {
    List<ScreenMasterResponse> screenMasterResponseList = new ArrayList<>();
    ScreenMasterResponse screenMasterResponse;
    for (ScreenMaster screenMaster : screenMasterList) {
      screenMasterResponse = new ScreenMasterResponse();
      screenMasterResponse.setScreenId(screenMaster.getScreenId());
      screenMasterResponse.setScreenName(screenMaster.getScreenName());
      screenMasterResponse.setScreenUrl(screenMaster.getScreenUrl());
      screenMasterResponseList.add(screenMasterResponse);
    }
    return screenMasterResponseList;
  }


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

    Optional<Proxy> result = proxyRepository.getProxy(param);

    CheckProxyResponse checkProxyResponse = new CheckProxyResponse();

    if (result.isPresent()) {
      Proxy proxy = result.get();
      checkProxyResponse.setRole(proxy.getRole());
    }

    return checkProxyResponse;
  }


  /**
   * get access screen.
   *
   * @return AccessScreenResponse
   */
  public AccessScreenResponse getAccessScreen() {
    AccessScreenResponse accessScreenResponse = new AccessScreenResponse();
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    if (result.isPresent()) {
      Optional<List<ScreenMaster>> screenMasterList = proxyRepository.findScreenMasterByListScreenId(
          result.get().getAccessScreenList());

      if (screenMasterList.isPresent()) {
        List<ScreenMasterResponse> screenMasterResponseList = setScreenMasterResponses(
            screenMasterList.get());
        accessScreenResponse.setScreenMasterList(screenMasterResponseList);
      }
    }

    return accessScreenResponse;
  }

}
