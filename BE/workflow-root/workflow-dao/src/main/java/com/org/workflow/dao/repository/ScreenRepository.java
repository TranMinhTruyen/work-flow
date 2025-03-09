package com.org.workflow.dao.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ext.ScreenRepositoryExt;

@Repository
public interface ScreenRepository extends MongoRepository<Screen, String>, ScreenRepositoryExt {

  @Query(value = """ 
      {
        $and: [
          { screen_id: ?0 },
          { is_deleted: false },
          { delete_by: null },
          { delete_date_time: null }
        ]
      }
      """)
  Optional<Screen> findByScreenId(String screenId);

}
