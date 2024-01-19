package com.org.workflow.dao.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.Data;

@Data
@Entity(name = "seq_master")
public class SeqMaster implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "entity_name", unique = true, nullable = false)
  private String entityName;

  @Column(name = "sequence", nullable = false)
  private Long sequence;

}
