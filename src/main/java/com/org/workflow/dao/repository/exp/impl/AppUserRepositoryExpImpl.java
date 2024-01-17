package com.org.workflow.dao.repository.exp.impl;

import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.dao.entity.QAppUser;
import com.org.workflow.dao.repository.exp.AppUserRepositoryExp;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class AppUserRepositoryExpImpl extends QuerydslRepositorySupport implements AppUserRepositoryExp {
  public AppUserRepositoryExpImpl() {
    super(AppUser.class);
  }
  
  private static final QAppUser appUser = QAppUser.appUser;

  @Override
  public Optional<AppUser> selectByUserNameAndPassword(String userName, String password) {
    JPQLQuery<AppUser> query = from(appUser).where(
        appUser.username.eq(userName),
        appUser.loginPassword.eq(password),
        appUser.isActive.eq(true),
        appUser.deleteDatetime.isNull(),
        appUser.deleteBy.isNull()
    );
    return Optional.ofNullable(query.fetchFirst());
  }
}
