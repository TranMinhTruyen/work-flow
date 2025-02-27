package com.org.workflow.domain.dto.request.common;

import java.io.Serializable;
import java.util.List;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class PageRequest<T> implements Serializable {

  private T condition;

  private int page;

  private int size;

  private List<PageableOrder> orderList;

}
