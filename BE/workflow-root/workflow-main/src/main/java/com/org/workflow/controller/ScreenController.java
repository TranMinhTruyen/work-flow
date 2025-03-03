package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.proxy.SearchScreenRequest;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.services.ScreenService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "ScreenController")
@RequestMapping(path = API_PREFIX + "/screen")
public class ScreenController extends AbstractController {

  private final ScreenService screenService;

  /**
   * @param searchRequest
   * @return
   */
  @Operation(security = { @SecurityRequirement(name = "Authorization") })
  @PostMapping(value = "/search")
  public ResponseEntity<BaseResponse> searchScreen(
      @RequestBody BaseRequest<PageableRequest<SearchScreenRequest>> searchRequest) {
    PageResponse<List<SearchScreenResponse>> result = screenService.search(searchRequest);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

}
