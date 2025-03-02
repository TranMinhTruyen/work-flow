package com.org.workflow.domain.services;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.proxy.SearchScreenRequest;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.utils.SearchRequestUtil;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class ScreenService extends AbstractService {

  private final ScreenRepository screenRepository;


  /**
   * @param searchRequest
   * @return
   */
  public PageResponse<List<SearchScreenResponse>> search(
      BaseRequest<PageableRequest<SearchScreenRequest>> searchRequest) {

    PageableRequest<SearchScreenRequest> request = searchRequest.getPayload();

    SearchScreenCondition searchScreenCondition = new SearchScreenCondition();

    if (request.getCondition() != null) {
      SearchScreenRequest condition = request.getCondition();
      searchScreenCondition.setScreenId(condition.getScreenId());
      searchScreenCondition.setScreenName(condition.getScreenName());
      searchScreenCondition.setScreenUrl(condition.getScreenUrl());
    }

    PageableResult<List<Screen>> queryResult = screenRepository.searchByCondition(
        searchScreenCondition,
        SearchRequestUtil.getPageable(request));

    List<SearchScreenResponse> searchScreenResponses = new ArrayList<>();
    if (!queryResult.getResult().isEmpty()) {
      for (Screen screen : queryResult.getResult()) {
        SearchScreenResponse searchScreenResponse = new SearchScreenResponse();
        searchScreenResponse.setScreenId(screen.getScreenId());
        searchScreenResponse.setScreenName(screen.getScreenName());
        searchScreenResponse.setScreenUrl(screen.getScreenUrl());
        searchScreenResponse.setActive(screen.isActive());
        searchScreenResponse.setCreatedBy(screen.getCreatedBy());
        searchScreenResponse.setCreatedDatetime(
            DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN)
                .format(screen.getCreateDatetime()));
        searchScreenResponse.setUpdatedBy(screen.getUpdateBy());
        searchScreenResponse.setUpdatedDatetime(
            DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN)
                .format(screen.getCreateDatetime()));

        searchScreenResponses.add(searchScreenResponse);
      }
    }

    PageResponse<List<SearchScreenResponse>> pageResponse = new PageResponse<>();
    pageResponse.setPage(request.getPage());
    pageResponse.setSize(request.getSize());
    pageResponse.setTotal(queryResult.getTotal());
    pageResponse.setTotalPages(SearchRequestUtil.getTotalPages(queryResult));
    pageResponse.setResult(searchScreenResponses);
    return pageResponse;
  }

}
