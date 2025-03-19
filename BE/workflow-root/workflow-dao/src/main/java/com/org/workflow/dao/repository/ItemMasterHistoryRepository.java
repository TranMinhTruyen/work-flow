package com.org.workflow.dao.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.org.workflow.dao.document.MasterItemHistory;

@Repository
public interface ItemMasterHistoryRepository extends MongoRepository<MasterItemHistory, String> {

}
