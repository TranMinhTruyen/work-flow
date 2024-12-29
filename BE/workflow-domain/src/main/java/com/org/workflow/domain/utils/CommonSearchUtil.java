package com.org.workflow.domain.utils;

import com.org.workflow.domain.dto.request.common.CommonSearch;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * @author minh-truyen
 */
public class CommonSearchUtil {

  private CommonSearchUtil() {
  }

  public static Pageable getPageable(CommonSearch<?> commonSearch) {
    int page = commonSearch.getPage();
    int size = commonSearch.getSize();

    if (!StringUtils.isBlank(commonSearch.getOrderBy())) {

      Sort.Direction direction = Sort.Direction.ASC;

      if (!StringUtils.isBlank(commonSearch.getDirection()) && commonSearch.getDirection().equalsIgnoreCase("DESC")) {
        direction = Sort.Direction.DESC;
      }

      return PageRequest.of(page, size, Sort.by(direction, commonSearch.getOrderBy()));
    }

    return PageRequest.of(page, size);
  }

}
