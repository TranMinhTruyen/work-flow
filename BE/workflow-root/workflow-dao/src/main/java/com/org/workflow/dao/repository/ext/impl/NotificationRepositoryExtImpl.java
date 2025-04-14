package com.org.workflow.dao.repository.ext.impl;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.common.CommonRepositoryExt;
import com.org.workflow.dao.repository.ext.NotificationRepositoryExt;
import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public class NotificationRepositoryExtImpl extends CommonRepositoryExt
    implements NotificationRepositoryExt {

  public NotificationRepositoryExtImpl(MongoTemplate mongoTemplate) {
    super(mongoTemplate);
  }

  @Override
  public PageableResult<Notification> findNotificationByUserIdAndLanguage(String userId,
      Pageable pageable) {
    Criteria criteria = new Criteria();
    criteria.andOperator(Criteria.where("user_id").is(userId),
        Criteria.where("deleted_date_time").isNull(), Criteria.where("deleted_by").isNull(),
        Criteria.where("is_deleted").is(false));

    return pageableFind(new Query(criteria), pageable, Notification.class);
  }

}
