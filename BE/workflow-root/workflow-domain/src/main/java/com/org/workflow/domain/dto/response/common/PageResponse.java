package com.org.workflow.domain.dto.response.common;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

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
@JsonPropertyOrder(value = {"page", "size", "from", "to", "total", "totalPages", "result"})
public class PageResponse<T> implements Serializable {

  private int page;

  private int size;

  private long from;

  private long to;

  private long total;

  private long totalPages;

  private List<T> result;

}
