package com.org.workflow.domain.dto.request.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommonSearch<T extends Serializable> implements Serializable {

  private T condition;

  private int page;

  private int size;

  private String orderBy;

  private String direction;

}
