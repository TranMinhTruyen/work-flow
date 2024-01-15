package com.org.workflow.dao.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Master {
  
  @Id
  private Long id;
  
  @Column
  private String key;

  @Column(name = "value_1")
  private String value1;
  
  @Column
  private String value2;

  @Column
  private String value3;

  @Column
  private String value4;

  @Column
  private String value5;

  @Column
  private String value6;

  @Column
  private String value7;

  @Column
  private String value8;

  @Column
  private String value9;

  @Column
  private String value10;
  
}
