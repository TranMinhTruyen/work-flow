package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.UserAccountHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountHistoryRepository extends MongoRepository<UserAccountHistory, Long> {

}
