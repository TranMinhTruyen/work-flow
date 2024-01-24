package com.org.workflow.common.cnst;

import static com.org.workflow.common.enums.MessageEnum.UTILITY_CLASS;

import com.org.workflow.core.exception.AppException;

public class CoreConst {

  private CoreConst() throws AppException {
    throw new AppException(UTILITY_CLASS);
  }

  public static final String API_PREFIX = "/api";

  public static final String CLASS_NAME = "com.org.workflow.service";

  public static final String SECRET_KEY = "WKI9zOfZ0XHFHCZLUDNlcIfEuqAOiKKOP4gfI9RdLRr6L5pBllHSh8C"
      + "jyrUgFsMfaklLPfiuJl8o0wj3KuXc15suEiuz7PD0oieuu927WlC9nR37tccvqQg4Jeo2bKvTyFcnvOM5H1IKyEevqUymzOGHeoe"
      + "Ed3nrX9HOFhuwVHaYe2R3pwZGM6qDwlUtAPS2ZRWrKk9l";

}
