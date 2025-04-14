package com.org.workflow.domain.utils;

import static com.org.workflow.core.common.cnst.CommonConst.LIST_LANGUAGE;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import com.org.workflow.core.common.enums.NotificationEnum;
import com.org.workflow.domain.dto.request.notification.NotificationContentRequest;
import com.org.workflow.domain.dto.response.notification.SendNotificationResponse;

import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@Component
@RequiredArgsConstructor
public class NotificationUtil {

  private final MessageSource messageSource;

  public SendNotificationResponse getNotificationResponse(NotificationEnum notificationEnum,
      @Nullable Object[] args) {
    SendNotificationResponse sendNotificationResponse = new SendNotificationResponse();
    sendNotificationResponse.setCategory(notificationEnum.getNotificationCategory());

    List<NotificationContentRequest> contentList = new ArrayList<>();
    for (String language : LIST_LANGUAGE) {
      NotificationContentRequest content = new NotificationContentRequest();
      String message = messageSource.getMessage(notificationEnum.getNotificationCode(), args,
          Locale.forLanguageTag(language));
      String[] parts = message.split("\\n");

      content.setLanguage(language);
      content.setTitle(parts[0]);
      content.setMessage(parts[1]);
      contentList.add(content);
    }
    sendNotificationResponse.setContentList(contentList);
    sendNotificationResponse.setSendDatetime(LocalDateTime.now());

    return sendNotificationResponse;
  }

}
