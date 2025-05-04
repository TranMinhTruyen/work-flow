package com.org.workflow.domain.dto.request.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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
@JsonPropertyOrder(value = {"page", "size", "condition", "orderList"})
public class PageableRequest<T> implements Serializable {

  private int page;

  private int size;

  private T condition;

  private List<PageableOrder> orderList;

}
