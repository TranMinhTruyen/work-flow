package com.org.workflow.domain.services;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.enums.MessageEnum.UPDATE_FAILED;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import com.org.workflow.dao.repository.result.common.PageableResult;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.screen.SaveScreenRequest;
import com.org.workflow.domain.dto.request.screen.SearchScreenRequest;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.dto.response.screen.SaveScreenResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.GetScreenDetailResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.ScreenComponentResponse;
import com.org.workflow.domain.utils.AuthUtil;
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
    if (!CollectionUtils.isEmpty(queryResult.getResult())) {
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
        searchScreenResponse.setUpdatedBy(screen.getUpdatedBy());
        searchScreenResponse.setUpdatedDatetime(
            DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN)
                .format(screen.getUpdatedDatetime()));

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

    Optional<Screen> result = screenRepository.findByScreenId(screenId);

    Screen screen = result.orElse(new Screen());

    GetScreenDetailResponse response = new GetScreenDetailResponse();
    response.setId(screen.getId());
    response.setScreenId(screen.getScreenId());
    response.setScreenName(screen.getScreenName());
    response.setScreenUrl(screen.getScreenUrl());
    response.setActive(screen.isActive());
    if (screen.getScreenComponentList() != null && !screen.getScreenComponentList().isEmpty()) {
      response.setScreenComponentList(screen.getScreenComponentList().stream().map(item -> {
        ScreenComponentResponse screenComponentResponse = new ScreenComponentResponse();
        screenComponentResponse.setComponentName(item.getComponentName());
        screenComponentResponse.setRole(item.getRole());
        screenComponentResponse.setAuthorities(item.getAuthorities());
        screenComponentResponse.setLevel(item.getLevel());
        screenComponentResponse.setAuthorities(item.getAuthorities());
        return screenComponentResponse;
      }).collect(Collectors.toList()));
    }
    response.setCreatedDatetime(screen.getCreateDatetime());
    response.setUpdatedDatetime(screen.getUpdatedDatetime());

    return response;
  }

  public SaveScreenResponse saveScreen(BaseRequest<SaveScreenRequest> request) throws WFException {
    SaveScreenRequest payload = request.getPayload();
    String username = AuthUtil.getAuthentication().getUsername();
    LocalDateTime now = LocalDateTime.now();

    Optional<Screen> result = screenRepository.findScreenById(payload.getId());

    Screen screen;
    if (result.isPresent()) {
      screen = result.get();
      if (!screen.getUpdatedDatetime().isEqual(payload.getUpdatedDatetime())) {
        throw new WFException(UPDATE_FAILED);
      }
      screen.setScreenName(payload.getScreenName());
      screen.setScreenUrl(payload.getScreenUrl());
      screen.setActive(payload.isActive());
      screen.setUpdatedDatetime(now);
      screen.setUpdatedBy(username);
    } else {
      screen = new Screen();
      screen.setScreenId(payload.getScreenId());
      screen.setScreenName(payload.getScreenName());
      screen.setScreenUrl(payload.getScreenUrl());
      screen.setActive(payload.isActive());
      screen.setCreateDatetime(now);
      screen.setCreatedBy(username);
      screen.setUpdatedDatetime(now);
      screen.setUpdatedBy(username);
      screen.setDeleted(false);
    }
    Screen saveResult = screenRepository.save(screen);

    SaveScreenResponse response = new SaveScreenResponse();
    response.setId(saveResult.getId());
    response.setScreenId(saveResult.getScreenId());
    response.setScreenName(saveResult.getScreenName());
    response.setScreenUrl(saveResult.getScreenUrl());
    response.setActive(saveResult.isActive());
    response.setCreatedDatetime(saveResult.getCreateDatetime());
    response.setUpdatedDatetime(saveResult.getUpdatedDatetime());
    return response;
  }

}
