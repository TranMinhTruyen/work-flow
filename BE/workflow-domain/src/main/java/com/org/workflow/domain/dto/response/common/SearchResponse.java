package com.org.workflow.domain.dto.response.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.io.Serializable;
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
@JsonPropertyOrder(value = {"page", "size", "total", "result"})
public class SearchResponse implements Serializable {

  private int page;

  private int size;

  private long total;

  private transient Object result;

}
