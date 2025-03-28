package com.org.workflow.domain.utils;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.response.common.PageResponse;

/**
 * @author minh-truyen
 */
public class PageableUtil {

  private PageableUtil() {
  }

  public static Pageable getPageable(PageableRequest<?> pageableRequest) {
    int page = pageableRequest.getPage() - 1;
    int size = pageableRequest.getSize();

    if (CollectionUtils.isNotEmpty(pageableRequest.getOrderList())) {
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

  /**
   * Convert pageable result to PageResponse, include page, size, total...
   *
   * @param pageableResult PageableResult
   * @param result         List
   * @param <T>
   * @return PageResponse
   */
  public static <T> PageResponse<T> toPageableResponse(PageableResult<?> pageableResult,
      List<T> result) {
    PageResponse<T> pageResponse = new PageResponse<>();
    pageResponse.setPage(pageableResult.getPage() + 1);
    pageResponse.setSize(pageableResult.getSize());
    pageResponse.setFrom(((long) pageableResult.getPage() * pageableResult.getSize()) + 1);
    pageResponse.setTo(((long) (pageableResult.getPage() + 1) * pageableResult.getSize() - 1) + 1);
    if (pageableResult.getTotal() < pageableResult.getSize()) {
      pageResponse.setTo(pageableResult.getTotal());
    }
    pageResponse.setTotal(pageableResult.getTotal());
    pageResponse.setTotalPages(getTotalPages(pageableResult));
    pageResponse.setResult(result);
    return pageResponse;
  }

}
