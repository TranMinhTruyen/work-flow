package com.org.workflow.dao.repository.ext;

import com.org.workflow.dao.document.ScreenMaster;
import java.util.List;
import java.util.Optional;

public interface ProxyRepositoryExt {

  Optional<List<ScreenMaster>> findScreenMasterByListScreenId(List<String> listScreenId);

}
