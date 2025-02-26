package com.org.workflow.domain.dto.request.common;

import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest<T extends Serializable> implements Serializable {

  private T condition;

  private int page;

  private int size;

  private List<SearchOrder> searchOrderList;

}
