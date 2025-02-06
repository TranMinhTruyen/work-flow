package com.org.workflow.dao.repository.ext;

import com.org.workflow.dao.document.UserAccount;

import java.util.Optional;

/**
 * @author minh-truyen
 */
public interface UserRepositoryExt {

  Optional<UserAccount> findUserAccountByUserNameOrEmail(String param);

}
