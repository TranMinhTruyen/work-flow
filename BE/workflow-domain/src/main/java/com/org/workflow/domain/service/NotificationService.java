package com.org.workflow.domain.service;

import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.NotificationRepository;
import com.org.workflow.domain.dto.reponse.notificationcontroller.NotificationResponse;
import com.org.workflow.domain.dto.request.notificationcontroller.NotificationCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService extends AbstractService {

  private final NotificationRepository notificationRepository;

  /**
   * @return
   */
  public List<NotificationResponse> findResponseIsNotRead() {

    Optional<List<Notification>> result = notificationRepository
        .findAllByIsReadIsFalseAndDeletedIsFalse();

    List<NotificationResponse> notificationResponseList = new ArrayList<>();

    if (result.isPresent()) {
      List<Notification> notifications = result.get();

      for (Notification notification : notifications) {
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setUserId(notification.getUserId());
        notificationResponse.setTitle(notification.getTitle());
        notificationResponse.setMessage(notification.getMessage());
        notificationResponse.setIsRead(notification.getIsRead());
        notificationResponse.setCreatedBy(notification.getCreatedBy());
        notificationResponse.setCreateDatetime(notification.getCreateDatetime());
        notificationResponse.setUpdateBy(notification.getCreatedBy());
        notificationResponse.setUpdateDatetime(notification.getUpdateDatetime());
        notificationResponseList.add(notificationResponse);
      }
    }

    return notificationResponseList;
  }

  /**
   * @param notificationCreateRequest
   */
  public void createNotification(NotificationCreateRequest notificationCreateRequest) {

    Notification notification = new Notification();
    notification.setTitle(notificationCreateRequest.getTitle());
    notification.setMessage(notificationCreateRequest.getMessage());
    notification.setUserId(notificationCreateRequest.getUserId());
    notification.setDeleted(false);
    notification.setIsRead(false);

    notificationRepository.save(notification);
  }

}
