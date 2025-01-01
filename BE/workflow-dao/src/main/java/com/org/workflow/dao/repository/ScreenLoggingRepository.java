package com.org.workflow.dao.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author minh-truyen
 */
@Repository
public interface ScreenLoggingRepository extends MongoRepository<ScreenLoggingRepository, String> {

}
