package com.org.workflow.dao.repository.exp.impl;

import com.org.workflow.dao.entity.AppUserAuthority;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class AppUserAuthorityRepositoryExpImpl extends QuerydslRepositorySupport {

  public AppUserAuthorityRepositoryExpImpl() {
    super(AppUserAuthority.class);
  }

}
