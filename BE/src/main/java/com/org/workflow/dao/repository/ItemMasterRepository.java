package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.MasterItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemMasterRepository extends MongoRepository<MasterItem, String> {

  Optional<MasterItem> getItemMasterByIdAndMasterCodeAndDeleted(String id, String masterCode,
    boolean isDeleted);

  Optional<MasterItem> getItemMasterByIdAndMasterCode(String id, String masterCode);

  Optional<List<MasterItem>> getItemMasterByMasterCodeAndDeletedIsFalse(String masterCode);

  @Query(value = "{ $and: [{master_code: ?0}, {master_value: ?1}, {is_deleted: false}, {delete_by: null}, {delete_date_time: null}] }")
  Optional<MasterItem> getItemMasterByMasterCodeAndMasterValueAndIsDeletedIsFalse(String masterCode,
    String masterValue);

}
