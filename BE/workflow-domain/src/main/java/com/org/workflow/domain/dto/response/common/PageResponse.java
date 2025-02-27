package com.org.workflow.domain.dto.response.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.io.Serializable;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
@JsonPropertyOrder(value = {"page", "size", "total", "result"})
public class PageResponse<T> implements Serializable {

  private int page;

  private int size;

  private long total;

  private T result;

}
