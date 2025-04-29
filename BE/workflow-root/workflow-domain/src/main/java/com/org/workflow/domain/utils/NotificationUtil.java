package com.org.workflow.domain.utils;

import com.org.workflow.core.common.enums.NotificationEnum;
import com.org.workflow.domain.dto.request.notification.NotificationContentRequest;
import com.org.workflow.domain.dto.request.notification.NotificationCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static com.org.workflow.core.common.cnst.CommonConst.LIST_LANGUAGE;

/**
 * @author minh-truyen
 */
@Component
@RequiredArgsConstructor
public class NotificationUtil {

  private final MessageSource messageSource;

  public NotificationCreateRequest getNotificationResponse(NotificationEnum notificationEnum,
                                                           @Nullable Object[] args) {
    NotificationCreateRequest notificationCreateRequest = new NotificationCreateRequest();
    notificationCreateRequest.setCategory(notificationEnum.getNotificationCategory());

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
    notificationCreateRequest.setContentList(contentList);
    notificationCreateRequest.setSendDatetime(LocalDateTime.now());
    notificationCreateRequest.setRead(false);

    return notificationCreateRequest;
  }

}
