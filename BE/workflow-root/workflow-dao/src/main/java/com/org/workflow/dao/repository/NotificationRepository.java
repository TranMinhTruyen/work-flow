package com.org.workflow.dao.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.ext.NotificationRepositoryExt;

@Repository
public interface NotificationRepository
    extends MongoRepository<Notification, String>, NotificationRepositoryExt {

  @Query(value = """ 
      {
        $and: [
          { user_id: ?0 },
          { is_read: false },
          { is_deleted: false },
          { delete_by: null },
          { delete_date_time: null }
        ]
      }
      """, count = true)
  long countAllByReadIsFalse(String userId);

}
