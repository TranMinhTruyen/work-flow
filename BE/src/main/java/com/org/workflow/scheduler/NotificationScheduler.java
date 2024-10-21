package com.org.workflow.scheduler;

import com.org.workflow.controller.reponse.notificationcontroller.NotificationResponse;
import com.org.workflow.service.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class NotificationScheduler {

  private static final Logger LOGGER = LoggerFactory.getLogger(NotificationScheduler.class);

  private final NotificationService notificationService;

  private final SimpMessagingTemplate messagingTemplate;

  //  @Scheduled(cron = "0 * * * * *")
  public void checkUnreadNotifications() {
    LOGGER.info("Checking unread notifications");
    List<NotificationResponse> unreadNotifications = notificationService.findResponseIsNotRead();
    for (NotificationResponse notification : unreadNotifications) {
      messagingTemplate.convertAndSendToUser(
        notification.getUserId(), "/check-notification",
        notification);
    }
  }

}
