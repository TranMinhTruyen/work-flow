package com.org.workflow.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * @author minh-truyen
 */
@Configuration
public class I18nConfig {

  @Bean
  public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setDefaultLocale(Locale.ENGLISH);
    messageSource.setBasename("i18n/messages");
    messageSource.setDefaultEncoding(String.valueOf(StandardCharsets.UTF_8));
    messageSource.setFallbackToSystemLocale(true);
    return messageSource;
  }

}
