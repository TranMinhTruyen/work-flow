package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.MasterItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemMasterRepository extends MongoRepository<MasterItem, String> {

  Optional<MasterItem> getItemMasterByIdAndMasterCodeAndDeleted(String id, String masterCode,
      boolean isDeleted);

  Optional<MasterItem> getItemMasterByIdAndMasterCode(String id, String masterCode);

  @Query(value = """
      {
        $and: [
          { master_code: ?0 },
          { is_deleted: false },
          { delete_by: null },
          { delete_date_time: null }
        ]
      }
      """)
  Page<MasterItem> getByCode(String masterCode, Pageable pageable);

  @Query(value = """
      {
        $and: [
          { master_code: ?0 },
          { master_value: ?1 },
          { is_deleted: false },
          { delete_by: null },
          { delete_date_time: null }
        ]
      }
      """)
  Optional<MasterItem> getByCodeAndValue(String masterCode, String masterValue);

}
