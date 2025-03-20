package com.org.workflow.dao.repository.ext;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.UserAccount;

/**
 * @author minh-truyen
 */
public interface UserRepositoryExt {

  Optional<UserAccount> findUserAccountByUserNameOrEmail(String param);


  UserAccount saveDocument(UserAccount userAccount)
      throws WFException, InvocationTargetException, IllegalAccessException;

}
