package com.org.workflow.controller;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.annotation.Authentication;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.common.PageableRequest;
import com.org.workflow.domain.dto.request.screen.RemoveUserRequest;
import com.org.workflow.domain.dto.request.screen.SaveScreenRequest;
import com.org.workflow.domain.dto.request.screen.ScreenUserRequest;
import com.org.workflow.domain.dto.request.screen.SearchScreenRequest;
import com.org.workflow.domain.dto.request.screen.UserAssignRequest;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.common.PageResponse;
import com.org.workflow.domain.dto.response.master.SearchScreenResponse;
import com.org.workflow.domain.dto.response.screen.RemoveUserResponse;
import com.org.workflow.domain.dto.response.screen.SaveScreenResponse;
import com.org.workflow.domain.dto.response.screen.ScreenUserResponse;
import com.org.workflow.domain.dto.response.screen.UserAssignResponse;
import com.org.workflow.domain.dto.response.screen.screendetail.GetScreenDetailResponse;
import com.org.workflow.domain.services.ScreenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.core.common.enums.AuthorityEnum.CREATE;
import static com.org.workflow.core.common.enums.AuthorityEnum.DELETE;
import static com.org.workflow.core.common.enums.AuthorityEnum.GET;
import static com.org.workflow.core.common.enums.AuthorityEnum.UPDATE;
import static com.org.workflow.core.common.enums.LevelEnum.HIGH_LEVEL;
import static com.org.workflow.core.common.enums.LevelEnum.LOW_LEVEL;
import static com.org.workflow.core.common.enums.RoleEnum.ROLE_ADMIN;

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
   * @param request
   * @return
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping(value = "/search")
  @Authentication(authority = {GET}, role = {ROLE_ADMIN}, level = LOW_LEVEL)
  public ResponseEntity<BaseResponse> searchScreen(
      @RequestBody BaseRequest<PageableRequest<SearchScreenRequest>> request) {
    PageResponse<SearchScreenResponse> result = screenService.search(request);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * @param screenId
   * @return
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @GetMapping(value = "/get-screen-detail")
  @Authentication(authority = {GET}, role = {ROLE_ADMIN}, level = LOW_LEVEL)
  public ResponseEntity<BaseResponse> getScreenDetail(@RequestParam String screenId) {
    GetScreenDetailResponse result = screenService.getScreenDetail(screenId);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * @param request
   * @return
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping(value = "/get-screen-users")
  @Authentication(authority = {GET}, role = {ROLE_ADMIN}, level = LOW_LEVEL)
  public ResponseEntity<BaseResponse> getScreenUsers(
      @RequestBody BaseRequest<PageableRequest<ScreenUserRequest>> request) {
    PageResponse<ScreenUserResponse> result = screenService.getScreenUsers(request);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * @param request
   * @return
   * @throws WFException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @Authentication(authority = {CREATE, UPDATE}, role = {ROLE_ADMIN}, level = HIGH_LEVEL)
  @PostMapping(value = "/save-screen")
  public ResponseEntity<BaseResponse> saveScreen(
      @RequestBody BaseRequest<SaveScreenRequest> request) throws WFException {
    SaveScreenResponse response = screenService.saveScreen(request);
    return this.returnBaseResponse(response, MessageEnum.SAVE_SUCCESS);
  }

  /**
   * @param request
   * @return
   * @throws WFException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @Authentication(authority = {DELETE}, role = {ROLE_ADMIN}, level = HIGH_LEVEL)
  @PostMapping(value = "/remove-user-from-screen")
  public ResponseEntity<BaseResponse> removeUserFromScreen(
      @RequestBody BaseRequest<RemoveUserRequest> request) {
    RemoveUserResponse response = screenService.removeUserFromScreen(request);
    return this.returnBaseResponse(response, MessageEnum.SAVE_SUCCESS);
  }

  /**
   * @param request
   * @return
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @Authentication(authority = {GET}, role = {ROLE_ADMIN}, level = HIGH_LEVEL)
  @PostMapping(value = "/get-users-not-using")
  public ResponseEntity<BaseResponse> getUsersNotUsing(
      @RequestBody BaseRequest<PageableRequest<ScreenUserRequest>> request) {
    PageResponse<ScreenUserResponse> result = screenService.getUsersNotUsing(request);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * @param request
   * @return
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @Authentication(authority = {UPDATE}, role = {ROLE_ADMIN}, level = HIGH_LEVEL)
  @PutMapping(value = "/assign-user")
  public ResponseEntity<BaseResponse> assignUser(@RequestBody BaseRequest<UserAssignRequest> request) {
    UserAssignResponse response = screenService.assignUser(request);
    return this.returnBaseResponse(response, MessageEnum.REQUEST_SUCCESS);
  }

}
