package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.MasterItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemMasterRepository extends MongoRepository<MasterItem, Long> {

  Optional<MasterItem> getItemMasterByIdAndMasterCodeAndIsDeleted(Long id, String masterCode,
      Boolean isDeleted);

  Optional<MasterItem> getItemMasterByIdAndMasterCode(Long id, String masterCode);

  Optional<List<MasterItem>> getItemMasterByMasterCodeAndIsDeletedIsFalse(String masterCode);

}
