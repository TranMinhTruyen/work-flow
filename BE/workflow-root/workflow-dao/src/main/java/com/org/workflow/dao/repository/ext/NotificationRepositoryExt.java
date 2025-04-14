package com.org.workflow.dao.repository.ext;

import org.springframework.data.domain.Pageable;

import com.org.workflow.dao.document.Notification;
import com.org.workflow.dao.repository.result.common.PageableResult;

/**
 * @author minh-truyen
 */
public interface NotificationRepositoryExt {

  PageableResult<Notification> findNotificationByUserIdAndLanguage(String userId,
      Pageable pageable);

}
