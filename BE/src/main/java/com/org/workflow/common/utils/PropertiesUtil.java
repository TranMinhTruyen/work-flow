package com.org.workflow.common.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

@Getter
public class PropertiesUtil {

  private PropertiesUtil() {
  }

  @Value(value = "${file-utils.image-path}")
  private static String imagePath;

}
