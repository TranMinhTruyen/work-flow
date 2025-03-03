package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ext.ScreenRepositoryExt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenRepository extends MongoRepository<Screen, String>,
    ScreenRepositoryExt {


}
