package com.org.workflow.dao.repository.ext;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.condition.screen.AssignUserCondition;
import com.org.workflow.dao.repository.condition.screen.RemoveUserCondition;
import com.org.workflow.dao.repository.condition.screen.SearchCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

/**
 * @author minh-truyen
 */
public interface ScreenRepositoryExt {

  PageableResult<Screen> searchByCondition(SearchCondition condition, Pageable pageable);


  Optional<List<Screen>> findScreenMasterByListScreenId(List<String> listScreenId);


  long removeUserFromScreen(RemoveUserCondition condition);


  long assignUserToScreen(AssignUserCondition condition);

  
  Screen saveDocument(Screen screen)
      throws WFException, InvocationTargetException, IllegalAccessException;

}
