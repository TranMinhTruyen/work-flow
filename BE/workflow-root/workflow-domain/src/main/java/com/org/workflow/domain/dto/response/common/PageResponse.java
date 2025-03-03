package com.org.workflow.domain.dto.response.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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
@JsonPropertyOrder(value = {"page", "size", "total", "totalPages", "result"})
public class PageResponse<T> implements Serializable {

  private int page;

  private int size;

  private long total;

  private long totalPages;

  private T result;

}
