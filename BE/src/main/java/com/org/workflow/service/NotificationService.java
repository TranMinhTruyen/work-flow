package com.org.workflow.service;

import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.reponse.notificationcontroller.NotificationResponse;
import com.org.workflow.controller.request.notificationcontroller.NotificationCreateRequest;
import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.NotificationRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService extends AbstractService {

  private final NotificationRepository notificationRepository;

  private final SeqUtil seqUtil;

  /**
   * @return
   */
  public List<NotificationResponse> findResponseIsNotRead() {

    Optional<List<Notification>> result = notificationRepository
        .findAllByIsReadIsFalseAndIsDeletedIsFalse();

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
    notification.setIsDeleted(false);
    notification.setIsRead(false);

    notificationRepository.save(notification);
  }

}
