package com.org.workflow.domain.dto.request.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageRequest<T> implements Serializable {

  private T condition;

  private int page;

  private int size;

  private List<PageableOrder> orderList;

}
