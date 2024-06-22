package com.org.workflow.service;

import com.org.workflow.controller.reponse.NotificationResponse;
import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.NotificationRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

  private final NotificationRepository notificationRepository;

  /**
   * @return
   */
  public List<NotificationResponse> findResponseIsNotRead() {

    Optional<List<Notification>> result = notificationRepository.findAllByIsReadIsFalseAndIsDeletedIsFalse();

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

}
