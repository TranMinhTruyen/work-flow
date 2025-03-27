package com.org.workflow.domain.services;

import org.springframework.stereotype.Service;

import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.NotificationRepository;
import com.org.workflow.domain.dto.request.notification.NotificationCreateRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService extends AbstractService {

  private final NotificationRepository notificationRepository;

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
