package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.MasterItemHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemMasterHistoryRepository extends MongoRepository<MasterItemHistory, Long> {

}
