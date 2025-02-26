package com.org.workflow.domain.dto.request.common;

import java.util.List;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class Pageable {

  private int page;

  private int size;

  private List<PageableOrder> orderList;

}
