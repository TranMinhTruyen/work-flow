package com.org.workflow.service;

import com.org.workflow.common.enums.MessageEnum;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class MessageService {

  private final MessageSource messageSource;

  public String getMessage(MessageEnum messageEnum, String language) {
    Locale locale = Locale.forLanguageTag(language);
    return messageSource.getMessage(messageEnum.getMessageCode(), null, locale);
  }

}
