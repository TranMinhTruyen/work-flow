package com.org.workflow.dao.entity;

import com.org.workflow.dao.id.CommentPk;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import java.io.Serializable;
import lombok.Data;

@Data
@Entity(name = "comment")
@IdClass(CommentPk.class)
public class Comment implements Serializable {

  @Id
  @Column(name = "project_id", nullable = false)
  private String projectId;

  @Id
  @Column(name = "ticket_id", nullable = false)
  private String ticketId;

  @Id
  @Column(name = "comment_id", nullable = false)
  private String commentId;

  @Id
  @Column(name = "app_user_id", nullable = false)
  private String appUserId;

  @Column(name = "content")
  private String content;

}
