package com.org.workflow.dao.repository.exp.impl;

import com.org.workflow.dao.entity.AppUserAuthority;
import com.org.workflow.dao.entity.QAppUserAuthority;
import com.org.workflow.dao.repository.exp.AppUserAuthorityRepositoryExp;
import com.querydsl.core.dml.DeleteClause;
import com.querydsl.jpa.impl.JPADeleteClause;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class AppUserAuthorityRepositoryExpImpl extends QuerydslRepositorySupport implements
    AppUserAuthorityRepositoryExp {

  public AppUserAuthorityRepositoryExpImpl() {
    super(AppUserAuthority.class);
  }

  private static final QAppUserAuthority appUserAuthority = QAppUserAuthority.appUserAuthority;
  
  @Override
  public long deleteAppUserAuthority(String username) {
    DeleteClause<JPADeleteClause> deleteClause = delete(appUserAuthority).where(
        appUserAuthority.username.eq(username));
    return deleteClause.execute();
  }

}
