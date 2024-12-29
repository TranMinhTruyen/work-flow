package com.org.workflow.domain.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

import java.util.Properties;

@Getter
public class PropertiesUtil {

  @Value(value = "${file-utils.image-path}")
  private static String imagePath;

  public Properties properties;

  private PropertiesUtil() {
  }

}
