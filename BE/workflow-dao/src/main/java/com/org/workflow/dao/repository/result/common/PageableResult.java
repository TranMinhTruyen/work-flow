package com.org.workflow.dao.repository.result.common;

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
public class PageableResult<T> implements Serializable {

  private int page;

  private int size;

  private long total;

  private T result;

}
