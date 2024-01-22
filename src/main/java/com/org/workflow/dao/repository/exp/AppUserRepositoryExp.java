package com.org.workflow.dao.repository.exp;

import com.org.workflow.dao.entity.AppUser;

import com.org.workflow.dao.repository.entity.appuser.SelectByUserName;
import java.util.List;
import java.util.Optional;

public interface AppUserRepositoryExp {
  Optional<AppUser> selectByUserNameAndPassword(String userName, String password);
  Optional<List<SelectByUserName>> selectByUserName(String userName);
}
