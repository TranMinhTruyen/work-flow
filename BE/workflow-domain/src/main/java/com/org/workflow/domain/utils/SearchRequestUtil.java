package com.org.workflow.domain.utils;

import com.org.workflow.domain.dto.request.common.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

/**
 * @author minh-truyen
 */
public class SearchRequestUtil {

  private SearchRequestUtil() {
  }


  public static org.springframework.data.domain.Pageable getPageable(
      PageRequest<?> pageRequest) {
    int page = pageRequest.getPage() - 1;
    int size = pageRequest.getSize();

    if (!pageRequest.getOrderList().isEmpty()) {
      Sort sort = Sort.by(pageRequest.getOrderList().stream()
          .map(item -> new Sort.Order(Direction.fromString(item.getDirection()), item.getOrderBy()))
          .toList());
      return org.springframework.data.domain.PageRequest.of(page, size, sort);
    }

    return org.springframework.data.domain.PageRequest.of(page, size);
  }

}
