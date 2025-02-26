package com.org.workflow.dao.repository.ext;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

/**
 * @author minh-truyen
 */
public interface ScreenRepositoryExt {

  Optional<List<Screen>> searchByCondition(SearchScreenCondition condition,
      Pageable pageable);

}
