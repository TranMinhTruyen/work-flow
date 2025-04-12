package com.org.workflow.domain.utils;

import java.time.LocalDateTime;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import com.org.workflow.core.common.enums.NotificationEnum;
import com.org.workflow.domain.dto.response.notification.NotificationResponse;

import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@Component
@RequiredArgsConstructor
public class NotificationUtil {

  private final MessageSource messageSource;

  public NotificationResponse getNotificationResponse(NotificationEnum notificationEnum,
      @Nullable Object[] args, String language) {

    String message = messageSource.getMessage(notificationEnum.getNotificationCode(), args,
        Locale.forLanguageTag(language));

    String[] parts = message.split("\\n");

    NotificationResponse notificationResponse = new NotificationResponse();
    notificationResponse.setTitle(parts[0]);
    notificationResponse.setMessage(parts[1]);
    notificationResponse.setCategory(notificationEnum.getNotificationCategory());
    notificationResponse.setSendDatetime(LocalDateTime.now());

    return notificationResponse;
  }

}
