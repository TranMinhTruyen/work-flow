package com.org.workflow.dao.repository.ext;

import java.lang.reflect.InvocationTargetException;

import org.springframework.data.domain.Pageable;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public interface ScreenRepositoryExt {

  PageableResult<Screen> searchByCondition(SearchScreenCondition condition, Pageable pageable);


  Screen saveDocument(Screen screen)
      throws WFException, InvocationTargetException, IllegalAccessException;

}
