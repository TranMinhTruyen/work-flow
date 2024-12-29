package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

  Optional<List<Notification>> findAllByIsReadIsFalseAndDeletedIsFalse();

}
