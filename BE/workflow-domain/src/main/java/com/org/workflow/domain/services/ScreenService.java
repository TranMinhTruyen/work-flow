package com.org.workflow.domain.services;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.proxy.SearchScreenRequest;
import com.org.workflow.domain.dto.response.common.SearchResponse;
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


  public SearchResponse search(BaseRequest<SearchScreenRequest> searchRequest) {

    SearchScreenRequest request = searchRequest.getPayload();

    Optional<List<Screen>> queryResult = screenRepository.searchByCondition(new SearchScreenCondition(),
        SearchRequestUtil.getPageable(request.getPageable()));
    SearchResponse searchResponse = new SearchResponse();
    List<SearchScreenResponse> searchScreenResponses = new ArrayList<>();
    if (queryResult.isPresent()) {
      for (Screen screen : queryResult.get()) {
        SearchScreenResponse searchScreenResponse = new SearchScreenResponse();
        searchScreenResponse.setScreenId(screen.getId());
        searchScreenResponse.setScreenName(screen.getScreenName());
        searchScreenResponse.setScreenUrl(screen.getScreenUrl());
        searchScreenResponse.setActive(screen.isActive());
        searchScreenResponse.setCreatedBy(screen.getCreatedBy());
        searchScreenResponse.setCreatedDatetime(
            DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN).format(screen.getCreateDatetime()));
        searchScreenResponse.setUpdatedBy(screen.getUpdateBy());
        searchScreenResponse.setUpdatedDatetime(
            DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN).format(screen.getCreateDatetime()));

        searchScreenResponses.add(searchScreenResponse);
      }
    }

    searchResponse.setResult(searchScreenResponses);
    searchResponse.setPage(request.getPageable().getPage());
    searchResponse.setPage(request.getPageable().getSize());
    return searchResponse;
  }

}
