package com.org.workflow.domain.services;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ProxyRepository;
import com.org.workflow.dao.repository.UserRepository;
import com.org.workflow.domain.dto.response.proxy.AccessScreenResponse;
import com.org.workflow.domain.dto.response.proxy.ScreenResponse;
import com.org.workflow.domain.utils.AuthUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class SecurityService {

  private final ProxyRepository proxyRepository;

  private final UserRepository userRepository;


  private static List<ScreenResponse> setScreenMasterResponses(
      List<Screen> screenList) {
    List<ScreenResponse> screenResponseList = new ArrayList<>();
    ScreenResponse screenResponse;
    for (Screen screen : screenList) {
      screenResponse = new ScreenResponse();
      screenResponse.setScreenId(screen.getScreenId());
      screenResponse.setScreenName(screen.getScreenName());
      screenResponse.setScreenUrl(screen.getScreenUrl());
      screenResponseList.add(screenResponse);
    }
    return screenResponseList;
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
      Optional<List<Screen>> screenMasterList = proxyRepository.findScreenMasterByListScreenId(
          result.get().getAccessScreenList());

      if (screenMasterList.isPresent()) {
        List<ScreenResponse> screenResponseList = setScreenMasterResponses(
            screenMasterList.get());
        accessScreenResponse.setScreenMasterList(screenResponseList);
      }
    }

    return accessScreenResponse;
  }

}
