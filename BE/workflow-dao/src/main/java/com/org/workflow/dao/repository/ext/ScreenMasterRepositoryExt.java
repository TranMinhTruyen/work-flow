package com.org.workflow.dao.repository.ext;

import com.org.workflow.dao.document.ScreenMaster;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

/**
 * @author minh-truyen
 */
public interface ScreenMasterRepositoryExt {

  Optional<List<ScreenMaster>> searchScreenMaster(SearchScreenCondition condition,
      Pageable pageable);

}
