package com.org.workflow.dao.entity;

import com.org.workflow.dao.id.ItemMasterPk;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import java.io.Serializable;
import lombok.Data;

@Data
@Entity(name = "item_master")
@IdClass(ItemMasterPk.class)
public class ItemMaster implements Serializable {

  @Id
  private Long id;

  @Id
  private String key;

  @Column(name = "value_1", nullable = false)
  private String value1;

  @Column(name = "value_2")
  private String value2;

  @Column(name = "value_3")
  private String value3;

  @Column(name = "value_4")
  private String value4;

  @Column(name = "value_5")
  private String value5;

  @Column(name = "value_6")
  private String value6;

  @Column(name = "value_7")
  private String value7;

  @Column(name = "value_8")
  private String value8;

  @Column(name = "value_9")
  private String value9;

  @Column(name = "value_10")
  private String value10;

}
