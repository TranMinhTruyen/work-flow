package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.UserHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserHistoryRepository extends MongoRepository<UserHistory, Long> {

}
