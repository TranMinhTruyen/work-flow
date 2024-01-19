package com.org.workflow.dao.id;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class CommentPk implements Serializable {
  private String projectId;
  private String ticketId;
  private String commentId;
  private String appUserId;
}
