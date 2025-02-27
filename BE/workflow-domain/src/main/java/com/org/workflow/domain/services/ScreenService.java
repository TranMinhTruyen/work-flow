package com.org.workflow.domain.services;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageRequest;
import com.org.workflow.domain.dto.request.proxy.SearchScreenRequest;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.utils.SearchRequestUtil;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
      BaseRequest<PageRequest<SearchScreenRequest>> searchRequest) {

    PageRequest<SearchScreenRequest> request = searchRequest.getPayload();

    SearchScreenCondition searchScreenCondition = new SearchScreenCondition();

    if (request.getCondition() != null) {
      SearchScreenRequest condition = request.getCondition();
      searchScreenCondition.setScreenId(condition.getScreenId());
      searchScreenCondition.setScreenName(condition.getScreenName());
      searchScreenCondition.setScreenUrl(condition.getScreenUrl());
    }

    Optional<List<Screen>> queryResult = screenRepository.searchByCondition(
        searchScreenCondition,
        SearchRequestUtil.getPageable(request));
    PageResponse<List<SearchScreenResponse>> pageResponse = new PageResponse();
    List<SearchScreenResponse> searchScreenResponses = new ArrayList<>();
    if (queryResult.isPresent()) {
      for (Screen screen : queryResult.get()) {
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

    pageResponse.setResult(searchScreenResponses);
    pageResponse.setPage(request.getPage());
    pageResponse.setPage(request.getSize());
    return pageResponse;
  }

}
