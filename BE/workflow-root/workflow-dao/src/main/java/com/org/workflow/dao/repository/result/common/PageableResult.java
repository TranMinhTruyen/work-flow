package com.org.workflow.dao.repository.result.common;

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
public class PageableResult<T> implements Serializable {

  private int page;

  private int size;

  private long total;

  private List<T> result;

}
