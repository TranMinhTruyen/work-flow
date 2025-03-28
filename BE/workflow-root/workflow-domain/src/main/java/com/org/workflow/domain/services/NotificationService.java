package com.org.workflow.domain.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.NotificationRepository;
import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.notification.NotificationCreateRequest;
import com.org.workflow.domain.dto.response.notification.AllNotificationResponse;
import com.org.workflow.domain.dto.response.notification.NotificationResponse;
import com.org.workflow.domain.utils.AuthUtil;
import com.org.workflow.domain.utils.PageableUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService extends AbstractService {

  private final NotificationRepository notificationRepository;

  public NotificationResponse createNotification(BaseRequest<NotificationCreateRequest> request) {

    NotificationCreateRequest payload = request.getPayload();
    UserAccount userAccount = AuthUtil.getAuthentication().getUserAccount();
    LocalDateTime now = LocalDateTime.now();

    Notification notification = new Notification();
    notification.setUserId(userAccount.getUserId());
    notification.setTitle(payload.getTitle());
    notification.setMessage(payload.getMessage());
    notification.setSendBy(payload.getSendBy());
    notification.setSendDatetime(payload.getSendDatetime());
    notification.setRead(false);
    notification.setCreatedBy(userAccount.getUserName());
    notification.setCreateDatetime(now);
    notification.setUpdatedBy(userAccount.getUserName());
    notification.setUpdatedDatetime(now);
    notification.setDeleted(false);

    Notification result = notificationRepository.save(notification);

    NotificationResponse response = new NotificationResponse();
    response.setTitle(result.getTitle());
    response.setMessage(result.getMessage());
    response.setSendDatetime(now);
    response.setSendBy(result.getSendBy());
    response.setRead(false);

    return response;
  }

  public AllNotificationResponse getNotification(BaseRequest<PageableRequest<?>> request) {
    PageableRequest<?> pageable = request.getPayload();

    UserAccount userAccount = AuthUtil.getAuthentication().getUserAccount();

    PageableResult<Notification> queryResult =
        notificationRepository.findNotificationByUserId(userAccount.getUserId(),
            PageableUtil.getPageable(pageable));

    long totalNotRead = notificationRepository.countAllByReadIsFalse(userAccount.getUserId());

    AllNotificationResponse response = new AllNotificationResponse();

    List<NotificationResponse> responseList = new ArrayList<>();

    if (CollectionUtils.isNotEmpty(queryResult.getResult())) {
      for (Notification notification : queryResult.getResult()) {
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setTitle(notification.getTitle());
        notificationResponse.setMessage(notification.getMessage());
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

}
