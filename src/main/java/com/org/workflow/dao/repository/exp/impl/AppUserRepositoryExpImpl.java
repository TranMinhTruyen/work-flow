package com.org.workflow.dao.repository.exp.impl;

import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.dao.entity.QAppUser;
import com.org.workflow.dao.entity.QAppUserAuthority;
import com.org.workflow.dao.repository.entity.appuser.QSelectByUserName;
import com.org.workflow.dao.repository.entity.appuser.SelectByUserName;
import com.org.workflow.dao.repository.exp.AppUserRepositoryExp;
import com.querydsl.jpa.JPQLQuery;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class AppUserRepositoryExpImpl extends QuerydslRepositorySupport implements
    AppUserRepositoryExp {

  public AppUserRepositoryExpImpl() {
    super(AppUser.class);
  }

  private static final QAppUser appUser = QAppUser.appUser;

  private static final QAppUserAuthority appUserAuthority = QAppUserAuthority.appUserAuthority;

  @Override
  public Optional<AppUser> selectByUserNameAndPassword(String userName, String password) {
    JPQLQuery<AppUser> query = from(appUser).where(appUser.username.eq(userName),
        appUser.loginPassword.eq(password), appUser.isActive.eq(true),
        appUser.deleteDatetime.isNull(), appUser.deleteBy.isNull());
    return Optional.ofNullable(query.fetchFirst());
  }

  @Override
  public Optional<List<SelectByUserName>> selectByUserName(String userName) {
    JPQLQuery<SelectByUserName> query = from(appUser).select(
            new QSelectByUserName(appUser.username, appUser.loginPassword, appUser.fullName,
                appUser.role, appUser.loginFailCount, appUser.isActive, appUserAuthority.authority))
        .leftJoin(appUserAuthority).on(appUser.username.eq(appUserAuthority.username))
        .where(appUser.username.eq(userName), appUser.isActive.eq(true),
            appUser.deleteDatetime.isNull(), appUser.deleteBy.isNull());
    return Optional.ofNullable(query.fetch());
  }

}
