package com.org.workflow.domain.services;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.document.sub.NotificationContent;
import com.org.workflow.dao.repository.NotificationRepository;
import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.notification.NotificationContentRequest;
import com.org.workflow.domain.dto.request.notification.NotificationCreateRequest;
import com.org.workflow.domain.dto.response.notification.AllNotificationResponse;
import com.org.workflow.domain.dto.response.notification.NotificationResponse;
import com.org.workflow.domain.utils.AuthUtil;
import com.org.workflow.domain.utils.PageableUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.org.workflow.core.common.cnst.WebsocketURL.NOTIFICATION_RECEIVE;
import static com.org.workflow.core.common.enums.MessageEnum.NOT_FOUND_NOTIFICATION;

@Service
@RequiredArgsConstructor
public class NotificationService extends AbstractService {

  private final NotificationRepository notificationRepository;

  private final SimpMessagingTemplate messagingTemplate;

  /**
   * @param request
   */
  public void createNotification(String userId, String language, NotificationCreateRequest request) {

    LocalDateTime now = LocalDateTime.now();

    Notification notification = new Notification();
    notification.setUserId(userId);
    notification.setSendBy(request.getSendBy());

    List<NotificationContent> contentList = new ArrayList<>();
    for (NotificationContentRequest contentRequest : request.getContentList()) {
      NotificationContent notificationContent = new NotificationContent();
      notificationContent.setLanguage(contentRequest.getLanguage());
      notificationContent.setTitle(contentRequest.getTitle());
      notificationContent.setMessage(contentRequest.getMessage());
      contentList.add(notificationContent);
    }

    notification.setContentList(contentList);
    notification.setSendDatetime(request.getSendDatetime());
    notification.setRead(false);
    notification.setCreatedBy(userId);
    notification.setCreateDatetime(now);
    notification.setUpdatedBy(userId);
    notification.setUpdatedDatetime(now);
    notification.setDeleted(false);

    Notification result = notificationRepository.save(notification);

    Optional<NotificationContentRequest> message = request.getContentList().stream().filter(
        item -> item.getLanguage().equals(language)).findFirst();

    NotificationResponse response = new NotificationResponse();
    response.setId(result.getId());
    response.setTitle(message.map(NotificationContentRequest::getTitle).orElse(""));
    response.setCategory(request.getCategory());
    response.setMessage(message.map(NotificationContentRequest::getMessage).orElse(""));
    response.setSendDatetime(result.getSendDatetime());
    response.setSendBy(result.getSendBy());
    response.setRead(result.isRead());

    messagingTemplate.convertAndSendToUser(userId, NOTIFICATION_RECEIVE, response);
  }

  /**
   * @param request
   * @return
   */
  public AllNotificationResponse getNotification(BaseRequest<PageableRequest<?>> request) {
    PageableRequest<?> pageable = request.getPayload();

    UserAccount userAccount = AuthUtil.getAuthentication().getUserAccount();

    PageableResult<Notification> queryResult =
        notificationRepository.findNotificationByUserIdAndLanguage(userAccount.getUserId(),
            PageableUtil.getPageable(pageable));

    long totalNotRead = notificationRepository.countAllByReadIsFalse(userAccount.getUserId());

    AllNotificationResponse response = new AllNotificationResponse();

    List<NotificationResponse> responseList = new ArrayList<>();

    if (CollectionUtils.isNotEmpty(queryResult.getResult())) {
      for (Notification notification : queryResult.getResult()) {
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setId(notification.getId());
        NotificationContent notificationContent = notification.getContentList().stream()
            .filter(x -> StringUtils.equals(x.getLanguage(), request.getLanguage())).findFirst()
            .orElse(null);
        if (notificationContent != null) {
          notificationResponse.setTitle(notificationContent.getTitle());
          notificationResponse.setMessage(notificationContent.getMessage());
        }
        notificationResponse.setSendDatetime(notification.getCreateDatetime());
        notificationResponse.setSendBy(notification.getSendBy());
        notificationResponse.setRead(notification.isRead());
        responseList.add(notificationResponse);
      }
    }

    response.setNotification(PageableUtil.toPageableResponse(queryResult, responseList));
    response.setTotalNotRead(totalNotRead);

    return response;
  }

  /**
   * @param id
   * @return
   * @throws WFException
   */
  public NotificationResponse setIsRead(String id, String language) throws WFException {
    UserAccount userAccount = AuthUtil.getAuthentication().getUserAccount();

    Optional<Notification> result =
        notificationRepository.findByIdAndUserId(id, userAccount.getUserId());
    if (result.isPresent()) {
      Notification notification = result.get();
      notification.setRead(true);
      notification.setUpdatedDatetime(LocalDateTime.now());
      notification.setUpdatedBy(userAccount.getUserName());
      Notification saveResult = notificationRepository.save(notification);

      NotificationResponse response = new NotificationResponse();
      response.setId(saveResult.getId());
      response.setSendDatetime(saveResult.getSendDatetime());
      response.setSendBy(saveResult.getSendBy());
      NotificationContent notificationContent = notification.getContentList().stream()
          .filter(x -> StringUtils.equals(x.getLanguage(), language)).findFirst().orElse(null);
      if (notificationContent != null) {
        response.setTitle(notificationContent.getTitle());
        response.setMessage(notificationContent.getMessage());
      }
      response.setRead(saveResult.isRead());

      return response;
    } else {
      throw new WFException(NOT_FOUND_NOTIFICATION);
    }
  }

}
