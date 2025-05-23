package com.org.workflow.domain.dto.request.master;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MasterItemRequest implements Serializable {

  private String id;

  private String masterCode;

  private String masterValue;

  private String value1;

  private String value2;

  private String value3;

  private String value4;

  private String value5;

  private String value6;

  private String value7;

  private String value8;

  private String value9;

  private String value10;

  private Integer displayOrder;

  private Boolean isDeleted;

}
