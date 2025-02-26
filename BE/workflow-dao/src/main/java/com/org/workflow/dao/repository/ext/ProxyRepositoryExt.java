package com.org.workflow.dao.repository.ext;

import com.org.workflow.dao.document.Screen;
import java.util.List;
import java.util.Optional;

public interface ProxyRepositoryExt {

  Optional<List<Screen>> findScreenMasterByListScreenId(List<String> listScreenId);

}
