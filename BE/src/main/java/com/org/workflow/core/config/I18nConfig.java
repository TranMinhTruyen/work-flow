package com.org.workflow.core.config;

import java.nio.charset.StandardCharsets;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * @author minh-truyen
 */
@Configuration
public class I18nConfig {

  @Bean
  public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasename("i18n/messages");
    messageSource.setDefaultEncoding(String.valueOf(StandardCharsets.UTF_8));
    messageSource.setFallbackToSystemLocale(false);
    return messageSource;
  }

}
