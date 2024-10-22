package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.Notification;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

  Optional<List<Notification>> findAllByIsReadIsFalseAndDeletedIsFalse();

}
