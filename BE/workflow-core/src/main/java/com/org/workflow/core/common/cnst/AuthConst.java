package com.org.workflow.core.common.cnst;

public class AuthConst {

  private AuthConst() {
  }

  public static final String PERMIT_ALL = "permitAll()";

  public static final String ITEM_MASTER_CREATE = "hasAnyAuthority('LEADER', 'ADMIN') and hasAuthority('CREATE')";

}
