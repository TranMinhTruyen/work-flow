package com.org.workflow.domain.utils;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

/**
 * @author minh-truyen
 */
@Component
public class LogUtil {
  
  public void log(Level level, final Class<?> clazz, @Nullable Object[] args) {
    Logger LOGGER = LogManager.getLogger(clazz);
    if (args == null || args.length == 0) {
      LOGGER.log(level, "");
    } else if (args.length == 1) {
      LOGGER.log(level, "{}", args[0]);
    } else {
      String joined = Arrays.stream(args).map(String::valueOf).collect(Collectors.joining(" "));
      LOGGER.log(level, "{}", joined);
    }
  }

}
