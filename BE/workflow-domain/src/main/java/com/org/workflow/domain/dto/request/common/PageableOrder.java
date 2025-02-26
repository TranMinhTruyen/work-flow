package com.org.workflow.domain.dto.request.common;

import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class PageableOrder {

  private String orderBy;

  private String direction;

}
