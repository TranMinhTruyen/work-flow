package com.org.workflow.dao.repository.ext;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.condition.user.SearchByScreenIdCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public interface UserRepositoryExt {

  Optional<UserAccount> findUserAccountByUserNameOrEmail(String param);


  PageableResult<UserAccount> findUserAccountByScreenId(SearchByScreenIdCondition condition,
      Pageable pageable);


  List<String> findUserIdByScreenId(String screenId);


  UserAccount saveDocument(UserAccount userAccount)
      throws WFException, InvocationTargetException, IllegalAccessException;

}
