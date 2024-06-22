package com.org.workflow.controller;

import com.org.workflow.common.cnst.AuthConst;
import com.org.workflow.common.cnst.CoreConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.CreateUserAccountResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.reponse.UserAccountResponse;
import com.org.workflow.controller.request.ChangePasswordRequest;
import com.org.workflow.controller.request.CreateUserAccountRequest;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.controller.request.UpdateUserRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.lang.reflect.InvocationTargetException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "UserAccountController")
@RequestMapping(path = CoreConst.API_PREFIX + "/user-account")
public class UserAccountController extends AbstractController {

  private final UserService userService;

  /**
   * Create AppUser.
   *
   * @param createUserAccountRequest CreateAppUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws AppException AppException
   */
  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")
  })
  @PreAuthorize(AuthConst.PERMIT_ALL)
  @PostMapping(value = "/create")
  public ResponseEntity<BaseResponse> createUserAccount(
      @RequestBody CreateUserAccountRequest createUserAccountRequest)
      throws AppException {
    CreateUserAccountResponse result = userService.createAppUser(createUserAccountRequest);
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
      @ApiResponse(responseCode = "403", description = "Forbidden")
  })
  @PostMapping("/login")
  public ResponseEntity<BaseResponse> loginUserAccount(@RequestBody LoginRequest loginRequest)
      throws AppException {
    LoginResponse result = userService.login(loginRequest);
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
      @ApiResponse(responseCode = "403", description = "Forbidden") }, security = {
          @SecurityRequirement(name = "Authorization")
      })
  @PostMapping("/get-profile")
  public ResponseEntity<BaseResponse> getProfile() throws AppException {
    UserAccountResponse result = userService.getProfile();
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
      @ApiResponse(responseCode = "403", description = "Forbidden") }, security = {
          @SecurityRequirement(name = "Authorization")
      })
  @PostMapping("/update-user-account")
  public ResponseEntity<BaseResponse> updateUserAccount(
      @RequestBody UpdateUserRequest updateUserRequest)
      throws AppException, InvocationTargetException, IllegalAccessException, InstantiationException,
      NoSuchMethodException {
    UpdateUserResponse result = userService.updateUserAccount(updateUserRequest);
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
      @ApiResponse(responseCode = "403", description = "Forbidden") }, security = {
          @SecurityRequirement(name = "Authorization")
      })
  @PostMapping("/change-login-password")
  public ResponseEntity<BaseResponse> changeLoginPassword(
      @RequestBody ChangePasswordRequest changePasswordRequest) throws AppException {
    userService.changeLoginPassword(changePasswordRequest);
    return this.returnBaseResponse(null, MessageEnum.REQUEST_SUCCESS);
  }

}
