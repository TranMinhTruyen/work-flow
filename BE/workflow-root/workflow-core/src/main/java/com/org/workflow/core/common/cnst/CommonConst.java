package com.org.workflow.core.common.cnst;

import java.time.format.DateTimeFormatter;
import java.util.List;

public class CommonConst {

  public static final String BASE_PACKAGE_NAME = "com.org.workflow";

  public static final String API_PREFIX = "/api";

  public static final String CLASS_NAME = "com.org.workflow.service";

  //region Datetime
  public static final String DATE_TIME_FORMAT_PATTERN = "dd-MM-yyyy HH:mm:ss";

  public static final String FULL_DATE_TIME_FORMAT_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS";

  public static final String DATE_FORMAT_PATTERN = "dd-MM-yyyy";

  public static final DateTimeFormatter DATE_TIME_FORMATTER =
      DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN);

  public static final DateTimeFormatter FULL_DATE_TIME_FORMAT_FORMATTER =
      DateTimeFormatter.ofPattern(FULL_DATE_TIME_FORMAT_PATTERN);

  public static final DateTimeFormatter DATE_FORMAT_FORMATTER =
      DateTimeFormatter.ofPattern(DATE_FORMAT_PATTERN);

  public static final String ZONE_ID = "UTC+7";
  //endregion

  //region JWT
  public static final long EXPIRATIONTIME = 18000L;

  public static final long EXPIRATIONTIME_FOR_REMEMBER = 2592000000L;

  public static final String ACCESS_TOKEN_SECRET_KEY = """
      WKI9zOfZ0XHFHCZLUDNl
      cIfEuqAOiKKOP4gfI9Rd
      LRr6L5pBllHSh8CjyrUg
      FsMfaklLPfiuJl8o0wj3
      KuXc15suEiuz7PD0oieu
      u927WlC9nR37tccvqQg4
      Jeo2bKvTyFcnvOM5H1IK
      yEevqUymzOGHeoeEd3nr
      X9HOFhuwVHaYe2R3pwZG
      M6qDwlUtAPS2ZRWrKk9l
      """;
  //endregion

  //region Language
  public static final String ENGLISH_LANGUAGE = "en";

  public static final String VIETNAM_LANGUAGE = "vi";

  public static final String JAPAN_LANGUAGE = "ja";

  public static final List<String> LIST_LANGUAGE =
      List.of(ENGLISH_LANGUAGE, VIETNAM_LANGUAGE, JAPAN_LANGUAGE);
  //endregion

  private CommonConst() {
  }


}
