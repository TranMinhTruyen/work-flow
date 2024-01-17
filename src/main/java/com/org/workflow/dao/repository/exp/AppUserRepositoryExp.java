package com.org.workflow.dao.repository.exp;

import com.org.workflow.dao.entity.AppUser;

import java.util.Optional;

public interface AppUserRepositoryExp {
  Optional<AppUser> selectByUserNameAndPassword(String userName, String password);
}
