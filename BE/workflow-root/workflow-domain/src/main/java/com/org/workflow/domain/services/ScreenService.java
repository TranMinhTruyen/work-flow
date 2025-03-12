package com.org.workflow.domain.services;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.screen.SearchScreenRequest;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.GetScreenDetailResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.ScreenComponentResponse;
import com.org.workflow.domain.utils.PageableUtil;

import lombok.RequiredArgsConstructor;

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
  public PageResponse<SearchScreenResponse> search(
      BaseRequest<PageableRequest<SearchScreenRequest>> searchRequest) {

    PageableRequest<SearchScreenRequest> request = searchRequest.getPayload();

    SearchScreenCondition searchScreenCondition = new SearchScreenCondition();

    if (request.getCondition() != null) {
      SearchScreenRequest condition = request.getCondition();
      searchScreenCondition.setScreenId(condition.getScreenId());
      searchScreenCondition.setScreenName(condition.getScreenName());
      searchScreenCondition.setScreenUrl(condition.getScreenUrl());
    }

    PageableResult<Screen> queryResult = screenRepository.searchByCondition(searchScreenCondition,
        PageableUtil.getPageable(request));

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

    return PageableUtil.toPageableResponse(queryResult, searchScreenResponses);
  }

  /**
   * @param screenId
   * @return
   */
  public GetScreenDetailResponse getScreenDetail(String screenId) {

    Optional<Screen> result = screenRepository.findById(screenId);

    Screen screen = result.orElse(new Screen());

    GetScreenDetailResponse response = new GetScreenDetailResponse();
    response.setScreenId(screen.getScreenId());
    response.setScreenName(screen.getScreenName());
    response.setScreenUrl(screen.getScreenUrl());
    response.setActive(screen.isActive());
    response.setScreenComponentList(screen.getScreenComponentList().stream().map(item -> {
      ScreenComponentResponse screenComponentResponse = new ScreenComponentResponse();
      screenComponentResponse.setComponentName(item.getComponentName());
      screenComponentResponse.setRole(item.getRole());
      screenComponentResponse.setAuthorities(item.getAuthorities());
      screenComponentResponse.setLevel(item.getLevel());
      screenComponentResponse.setAuthorities(item.getAuthorities());
      return screenComponentResponse;
    }).collect(Collectors.toList()));
    response.setUpdateDatetime(screen.getUpdateDatetime());

    return response;
  }

}
