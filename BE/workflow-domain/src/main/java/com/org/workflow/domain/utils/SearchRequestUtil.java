package com.org.workflow.domain.utils;

import com.org.workflow.domain.dto.request.common.SearchRequest;
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

  public static Pageable getPageable(SearchRequest<?> searchRequest) {
    int page = searchRequest.getPage();
    int size = searchRequest.getSize();

    if (!searchRequest.getSearchOrderList().isEmpty()) {
      Sort sort = Sort.by(searchRequest.getSearchOrderList().stream()
          .map(item -> new Sort.Order(Direction.fromString(item.getDirection()), item.getOrderBy()))
          .toList());
      return PageRequest.of(page, size, sort);
    }

    return PageRequest.of(page, size);
  }

}
