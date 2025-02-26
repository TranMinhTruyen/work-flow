package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.SearchRequest;
import com.org.workflow.domain.dto.request.proxy.SearchScreenRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author minh-truyen
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "ScreenMasterController")
@RequestMapping(path = API_PREFIX + "/screen-master")
public class ScreenMasterController extends AbstractController {

  @PostMapping(value = "/search")
  public void searchScreen(
      @RequestBody BaseRequest<SearchRequest<SearchScreenRequest>> searchRequest) {

  }

}
