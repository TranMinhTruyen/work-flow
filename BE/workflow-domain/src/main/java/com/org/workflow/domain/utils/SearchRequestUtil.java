package com.org.workflow.domain.utils;

import com.org.workflow.domain.dto.request.common.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

/**
 * @author minh-truyen
 */
public class SearchRequestUtil {

  private SearchRequestUtil() {
  }


  public static org.springframework.data.domain.Pageable getPageable(Pageable pageable) {
    int page = pageable.getPage();
    int size = pageable.getSize();

    if (!pageable.getOrderList().isEmpty()) {
      Sort sort = Sort.by(pageable.getOrderList().stream()
          .map(item -> new Sort.Order(Direction.fromString(item.getDirection()), item.getOrderBy()))
          .toList());
      return PageRequest.of(page, size, sort);
    }

    return PageRequest.of(page, size);
  }

}
