package com.org.workflow.controller;

import com.org.workflow.common.cnst.AuthConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.AppUserResponse;
import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.CreateAppUserResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.request.ChangePasswordRequest;
import com.org.workflow.controller.request.CreateAppUserRequest;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.controller.request.UpdateUserRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.service.AppUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "AppUserController")
@RestController
@RequiredArgsConstructor
public class AppUserController extends AbstractController {

  private final AppUserService appUserService;


  /**
   * Create AppUser.
   *
   * @param createAppUserRequest CreateAppUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws AppException AppException
   */
  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")})
  @PreAuthorize(AuthConst.PERMIT_ALL)
  @PostMapping("/app-user/create")
  public ResponseEntity<BaseResponse> createAppUser(
      @RequestBody CreateAppUserRequest createAppUserRequest) throws AppException {
    CreateAppUserResponse result = appUserService.createAppUser(createAppUserRequest);
    return this.returnBaseResponse(result, MessageEnum.CREATE_SUCCESS, result.getUsername());
  }


  /**
   * Login AppUser.
   *
   * @param loginRequest LoginRequest
   * @return ResponseEntity<BaseResponse>
   * @throws AppException AppException
   */
  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")})
  @PostMapping("/app-user/login")
  public ResponseEntity<BaseResponse> loginAppUser(@RequestBody LoginRequest loginRequest)
      throws AppException {
    LoginResponse result = appUserService.login(loginRequest);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }


  /**
   * Get AppUser profile.
   *
   * @return ResponseEntity<BaseResponse>
   * @throws AppException AppException
   */
  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PostMapping("/app-user/get-profile")
  public ResponseEntity<BaseResponse> getProfile() throws AppException {
    AppUserResponse result = appUserService.getProfile();
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }


  /**
   * Update AppUser.
   *
   * @param updateUserRequest UpdateUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws AppException AppException
   */
  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PostMapping("/app-user/update-app-user")
  public ResponseEntity<BaseResponse> updateAppUser(
      @RequestBody UpdateUserRequest updateUserRequest) throws AppException {
    UpdateUserResponse result = appUserService.updateAppUser(updateUserRequest);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }


  /**
   * Change login password.
   *
   * @param changePasswordRequest ChangePasswordRequest
   * @return ResponseEntity<BaseResponse>
   * @throws AppException AppException
   */
  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PostMapping("/app-user/change-login-password")
  public ResponseEntity<BaseResponse> changeLoginPassword(
      @RequestBody ChangePasswordRequest changePasswordRequest) throws AppException {
    appUserService.changeLoginPassword(changePasswordRequest);
    return this.returnBaseResponse(null, MessageEnum.REQUEST_SUCCESS);
  }

}
