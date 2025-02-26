package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.ScreenMaster;
import com.org.workflow.dao.repository.ext.ScreenMasterRepositoryExt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenMasterRepository extends MongoRepository<ScreenMaster, String>,
    ScreenMasterRepositoryExt {


}
