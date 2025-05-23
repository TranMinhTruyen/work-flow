package com.org.workflow.domain.services;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMATTER;
import static com.org.workflow.core.common.cnst.WebsocketURL.SCREEN_MASTER_AUTHORITY;
import static com.org.workflow.core.common.cnst.WebsocketURL.SCREEN_MASTER_CHANGE;
import static com.org.workflow.core.common.enums.MessageEnum.UPDATE_FAILED;
import static com.org.workflow.core.common.enums.NotificationEnum.NN0000001;
import static com.org.workflow.core.common.enums.NotificationEnum.NN0000002;
import static com.org.workflow.core.common.enums.NotificationEnum.NN0000003;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.logging.log4j.Level;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.org.workflow.core.common.enums.RoleEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.UserRepository;
import com.org.workflow.dao.repository.condition.screen.AssignUserCondition;
import com.org.workflow.dao.repository.condition.screen.RemoveUserCondition;
import com.org.workflow.dao.repository.condition.screen.SearchCondition;
import com.org.workflow.dao.repository.condition.user.SearchByScreenIdCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableOrder;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.notification.NotificationCreateRequest;
import com.org.workflow.domain.dto.request.screen.RemoveUserRequest;
import com.org.workflow.domain.dto.request.screen.SaveScreenRequest;
import com.org.workflow.domain.dto.request.screen.ScreenUserRequest;
import com.org.workflow.domain.dto.request.screen.SearchScreenRequest;
import com.org.workflow.domain.dto.request.screen.UserAssignRequest;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.dto.response.screen.RemoveUserResponse;
import com.org.workflow.domain.dto.response.screen.SaveScreenResponse;
import com.org.workflow.domain.dto.response.screen.ScreenUserResponse;
import com.org.workflow.domain.dto.response.screen.UserAssignResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.GetScreenDetailResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.ScreenComponentResponse;
import com.org.workflow.domain.utils.AuthUtil;
import com.org.workflow.domain.utils.LogUtil;
import com.org.workflow.domain.utils.NotificationUtil;
import com.org.workflow.domain.utils.PageableUtil;

import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class ScreenService extends AbstractService {

  private final ScreenRepository screenRepository;

  private final UserRepository userRepository;

  private final NotificationUtil notificationUtil;

  private final NotificationService notificationService;

  private final SimpMessagingTemplate messagingTemplate;

  /**
   * @param request
   * @return
   */
  public PageResponse<SearchScreenResponse> search(
      BaseRequest<PageableRequest<SearchScreenRequest>> request) {

    PageableRequest<SearchScreenRequest> pageableRequest = request.getPayload();

    SearchCondition searchCondition = new SearchCondition();

    if (pageableRequest.getCondition() != null) {
      SearchScreenRequest condition = pageableRequest.getCondition();
      searchCondition.setScreenId(condition.getScreenId());
      searchCondition.setScreenName(condition.getScreenName());
      searchCondition.setScreenUrl(condition.getScreenUrl());
    }

    PageableResult<Screen> queryResult = screenRepository.searchByCondition(searchCondition,
        PageableUtil.getPageable(pageableRequest));

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"screenRepository.searchByCondition:", queryResult});

    List<SearchScreenResponse> searchScreenResponses = new ArrayList<>();
    if (CollectionUtils.isNotEmpty(queryResult.getResult())) {
      for (Screen screen : queryResult.getResult()) {
        SearchScreenResponse searchScreenResponse = new SearchScreenResponse();
        searchScreenResponse.setScreenId(screen.getScreenId());
        searchScreenResponse.setScreenName(screen.getScreenNameEn());
        searchScreenResponse.setScreenUrl(screen.getScreenUrl());
        searchScreenResponse.setActive(screen.isActive());
        searchScreenResponse.setCreatedBy(screen.getCreatedBy());
        searchScreenResponse.setCreatedDatetime(
            DATE_TIME_FORMATTER.format(screen.getCreateDatetime()));
        searchScreenResponse.setUpdatedBy(screen.getUpdatedBy());
        searchScreenResponse.setUpdatedDatetime(
            DATE_TIME_FORMATTER.format(screen.getUpdatedDatetime()));

        searchScreenResponses.add(searchScreenResponse);
      }
    }

    PageResponse<SearchScreenResponse> response =
        PageableUtil.toPageableResponse(queryResult, searchScreenResponses);

    LogUtil.log(Level.INFO, ScreenService.class, new Object[] {"Response:", response});

    return response;
  }

  /**
   * @param screenId
   * @return
   */
  public GetScreenDetailResponse getScreenDetail(String screenId) {

    Optional<Screen> result = screenRepository.findByScreenId(screenId);

    Screen screen = result.orElse(new Screen());

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"screenRepository.findByScreenId:", screen});

    GetScreenDetailResponse response = new GetScreenDetailResponse();
    response.setId(screen.getId());
    response.setScreenId(screen.getScreenId());
    response.setScreenNameEn(screen.getScreenNameEn());
    response.setScreenNameVi(screen.getScreenNameVi());
    response.setScreenNameJa(screen.getScreenNameJa());
    response.setScreenUrl(screen.getScreenUrl());
    response.setActive(screen.isActive());
    response.setRoles(
        screen.getAuthentication().getRoles().stream().map(RoleEnum::getRole).toList());
    response.setLevel(screen.getAuthentication().getLevel());
    if (screen.getScreenComponentList() != null && !screen.getScreenComponentList().isEmpty()) {
      response.setScreenComponentList(screen.getScreenComponentList().stream().map(item -> {
        ScreenComponentResponse screenComponentResponse = new ScreenComponentResponse();
        screenComponentResponse.setComponentName(item.getComponentName());
        screenComponentResponse.setRole(item.getRole());
        screenComponentResponse.setAuthorities(item.getAuthorities());
        screenComponentResponse.setLevel(item.getLevel());
        screenComponentResponse.setAuthorities(item.getAuthorities());
        return screenComponentResponse;
      }).toList());
    }
    response.setCreatedDatetime(screen.getCreateDatetime());
    response.setUpdatedDatetime(screen.getUpdatedDatetime());

    LogUtil.log(Level.INFO, ScreenService.class, new Object[] {"Response:", response});

    return response;
  }

  /**
   * @param request
   * @return
   */
  public PageResponse<ScreenUserResponse> getScreenUsers(
      BaseRequest<PageableRequest<ScreenUserRequest>> request) {
    PageableRequest<ScreenUserRequest> pageableRequest = request.getPayload();

    SearchByScreenIdCondition condition = new SearchByScreenIdCondition();

    if (pageableRequest.getCondition() != null) {
      condition.setScreenId(pageableRequest.getCondition().getScreenId());
      condition.setKeyword(pageableRequest.getCondition().getKeyword());
    }

    if (CollectionUtils.isEmpty(pageableRequest.getOrderList())) {
      pageableRequest.setOrderList(List.of(new PageableOrder("created_date_time", "asc")));
    }

    PageableResult<UserAccount> queryResult = userRepository.findUserAccountByScreenId(condition,
        PageableUtil.getPageable(pageableRequest));

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"userRepository.findUserAccountByScreenId:", queryResult});

    List<ScreenUserResponse> screenUserResponses = new ArrayList<>();
    if (!CollectionUtils.isEmpty(queryResult.getResult())) {
      for (UserAccount userAccount : queryResult.getResult()) {
        ScreenUserResponse item = new ScreenUserResponse();
        item.setUserId(userAccount.getUserId());
        item.setUserName(userAccount.getUserName());
        item.setEmail(userAccount.getEmail());
        item.setFullName(userAccount.getFullName());
        screenUserResponses.add(item);
      }
    }

    PageResponse<ScreenUserResponse> response =
        PageableUtil.toPageableResponse(queryResult, screenUserResponses);

    LogUtil.log(Level.INFO, ScreenService.class, new Object[] {"Response:", response});

    return response;
  }

  /**
   * @param request
   * @return
   * @throws WFException
   */
  public SaveScreenResponse saveScreen(BaseRequest<SaveScreenRequest> request) throws WFException {
    SaveScreenRequest payload = request.getPayload();
    String userName = AuthUtil.getAuthentication().getUserAccount().getUserName();
    LocalDateTime now = LocalDateTime.now();

    Optional<Screen> result = screenRepository.findScreenById(payload.getId());

    Screen screen;
    if (result.isPresent()) {
      screen = result.get();
      if (!screen.getUpdatedDatetime().isEqual(payload.getUpdatedDatetime())) {
        throw new WFException(UPDATE_FAILED);
      }
      screen.setScreenNameEn(payload.getScreenNameEn());
      screen.setScreenNameVi(payload.getScreenNameVi());
      screen.setScreenNameJa(payload.getScreenNameJa());
      screen.setScreenUrl(payload.getScreenUrl());
      screen.setActive(payload.isActive());
      screen.setUpdatedDatetime(now);
      screen.setUpdatedBy(userName);
    } else {
      screen = new Screen();
      screen.setScreenId(payload.getScreenId());
      screen.setScreenNameEn(payload.getScreenNameEn());
      screen.setScreenNameVi(payload.getScreenNameVi());
      screen.setScreenNameJa(payload.getScreenNameJa());
      screen.setScreenUrl(payload.getScreenUrl());
      screen.setActive(payload.isActive());
      screen.setCreateDatetime(now);
      screen.setCreatedBy(userName);
      screen.setUpdatedDatetime(now);
      screen.setUpdatedBy(userName);
      screen.setDeleted(false);
    }

    Screen saveResult = screenRepository.save(screen);

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"screenRepository.save:", saveResult});

    SaveScreenResponse response = new SaveScreenResponse();
    response.setId(saveResult.getId());
    response.setScreenId(saveResult.getScreenId());
    response.setScreenNameEn(saveResult.getScreenNameEn());
    response.setScreenNameVi(saveResult.getScreenNameVi());
    response.setScreenNameJa(saveResult.getScreenNameJa());
    response.setScreenUrl(saveResult.getScreenUrl());
    response.setActive(saveResult.isActive());
    response.setCreatedDatetime(saveResult.getCreateDatetime());
    response.setUpdatedDatetime(saveResult.getUpdatedDatetime());
    response.setUpdatedBy(saveResult.getUpdatedBy());

    List<String> userIds = userRepository.findUserIdByScreenId(payload.getScreenId());
    if (CollectionUtils.isNotEmpty(userIds)) {
      String screenName = saveResult.getScreenNameEn();

      userIds.parallelStream().forEach(userId -> {
        NotificationCreateRequest notificationCreateRequest =
            notificationUtil.getNotificationResponse(NN0000001,
                new Object[] {screenName, screenName, userName});
        notificationCreateRequest.setSendBy(userName);
        notificationService.createNotification(userId, request.getLanguage(),
            notificationCreateRequest);
      });
    }
    messagingTemplate.convertAndSend(SCREEN_MASTER_CHANGE, response);

    LogUtil.log(Level.INFO, ScreenService.class, new Object[] {"Response:", response});

    return response;
  }

  /**
   * @param request
   */
  public RemoveUserResponse removeUserFromScreen(BaseRequest<RemoveUserRequest> request) {
    RemoveUserRequest payload = request.getPayload();

    RemoveUserCondition condition = new RemoveUserCondition();
    condition.setScreenId(payload.getScreenId());
    condition.setListUserId(payload.getListUserId());

    long count = screenRepository.removeUserFromScreen(condition);

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"screenRepository.removeUserFromScreen:", count});

    if (count > 0) {
      payload.getListUserId().parallelStream().forEach(userId -> {
        NotificationCreateRequest notificationCreateRequest =
            notificationUtil.getNotificationResponse(NN0000002,
                new Object[] {payload.getScreenId(), payload.getScreenId(),
                    payload.getUserAction()});
        notificationCreateRequest.setSendBy(payload.getUserAction());
        notificationService.createNotification(userId, request.getLanguage(),
            notificationCreateRequest);
        messagingTemplate.convertAndSendToUser(userId, SCREEN_MASTER_AUTHORITY, count);
      });
    }

    return new RemoveUserResponse(count);
  }

  public PageResponse<ScreenUserResponse> getUsersNotUsing(
      BaseRequest<PageableRequest<ScreenUserRequest>> request) {
    PageableRequest<ScreenUserRequest> pageableRequest = request.getPayload();

    SearchByScreenIdCondition condition = new SearchByScreenIdCondition();

    if (pageableRequest.getCondition() != null) {
      condition.setScreenId(pageableRequest.getCondition().getScreenId());
      condition.setRoleList(pageableRequest.getCondition().getRoleList());
      condition.setLevel(pageableRequest.getCondition().getLevel());
      condition.setKeyword(pageableRequest.getCondition().getKeyword());
    }

    pageableRequest.setOrderList(List.of(new PageableOrder("created_date_time", "asc")));

    PageableResult<UserAccount> queryResult =
        userRepository.findUserAccountNotUsingByScreenId(condition,
            PageableUtil.getPageable(pageableRequest));

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"userRepository.findUserAccountNotUsingByScreenId:", queryResult});

    List<ScreenUserResponse> screenUserResponses = new ArrayList<>();
    if (!CollectionUtils.isEmpty(queryResult.getResult())) {
      for (UserAccount userAccount : queryResult.getResult()) {
        ScreenUserResponse item = new ScreenUserResponse();
        item.setUserId(userAccount.getUserId());
        item.setUserName(userAccount.getUserName());
        item.setEmail(userAccount.getEmail());
        item.setFullName(userAccount.getFullName());
        screenUserResponses.add(item);
      }
    }

    PageResponse<ScreenUserResponse> response =
        PageableUtil.toPageableResponse(queryResult, screenUserResponses);

    LogUtil.log(Level.INFO, ScreenService.class, new Object[] {"Response:", response});

    return response;
  }

  /**
   * @param request
   * @return
   */
  public UserAssignResponse assignUser(BaseRequest<UserAssignRequest> request) {
    UserAssignRequest payload = request.getPayload();

    AssignUserCondition condition = new AssignUserCondition();
    condition.setScreenId(payload.getScreenId());
    condition.setListUserId(payload.getListUserId());

    long count = screenRepository.assignUserToScreen(condition);

    LogUtil.log(Level.INFO, ScreenService.class,
        new Object[] {"screenRepository.assignUserToScreen:", count});

    if (count > 0) {
      payload.getListUserId().parallelStream().forEach(userId -> {
        NotificationCreateRequest notificationCreateRequest =
            notificationUtil.getNotificationResponse(NN0000003,
                new Object[] {payload.getScreenId(), payload.getScreenId(),
                    payload.getUserAction()});
        notificationCreateRequest.setSendBy(payload.getUserAction());
        notificationService.createNotification(userId, request.getLanguage(),
            notificationCreateRequest);
        messagingTemplate.convertAndSendToUser(userId, SCREEN_MASTER_AUTHORITY, count);
      });
    }

    return new UserAssignResponse(count);
  }

}
