package com.org.workflow.dao.repository.exp;

import com.org.workflow.dao.entity.ItemMaster;

import java.util.List;
import java.util.Optional;

public interface ItemMasterRepositoryExp {
  Optional<List<ItemMaster>> selectListMasterByKey(String key);
  Optional<ItemMaster> selectByIdAndKey(Long id, String key);
  Optional<List<ItemMaster>> searchByKeyWord(String keyword);
}
