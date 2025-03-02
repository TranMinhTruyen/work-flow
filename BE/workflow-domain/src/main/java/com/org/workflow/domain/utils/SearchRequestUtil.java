package com.org.workflow.domain.utils;

import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

/**
 * @author minh-truyen
 */
public class SearchRequestUtil {

  private SearchRequestUtil() {
  }


  public static Pageable getPageable(
      PageableRequest<?> pageableRequest) {
    int page = pageableRequest.getPage() - 1;
    int size = pageableRequest.getSize();

    if (!pageableRequest.getOrderList().isEmpty()) {
      Sort sort = Sort.by(pageableRequest.getOrderList().stream()
          .map(item -> new Sort.Order(Direction.fromString(item.getDirection()), item.getOrderBy()))
          .toList());
      return PageRequest.of(page, size, sort);
    }

    return PageRequest.of(page, size);
  }


  public static long getTotalPages(PageableResult<?> pageable) {
    return (long) Math.ceil((double) pageable.getTotal() / pageable.getSize());
  }

}
