package com.org.workflow.dao.repository.ext;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author minh-truyen
 */
public interface ScreenRepositoryExt {

  PageableResult<List<Screen>> searchByCondition(SearchScreenCondition condition,
                                                 Pageable pageable);

}
