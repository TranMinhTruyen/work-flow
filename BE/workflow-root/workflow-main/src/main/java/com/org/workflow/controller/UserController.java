package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

import java.lang.reflect.InvocationTargetException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.user.ChangePasswordRequest;
import com.org.workflow.domain.dto.request.user.CreateUserRequest;
import com.org.workflow.domain.dto.request.user.LoginRequest;
import com.org.workflow.domain.dto.request.user.UpdateUserRequest;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.user.CreateUserResponse;
import com.org.workflow.domain.dto.response.user.LoginResponse;
import com.org.workflow.domain.dto.response.user.UpdateUserResponse;
import com.org.workflow.domain.dto.response.user.UserResponse;
import com.org.workflow.domain.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@Tag(name = "UserController")
@RequestMapping(path = API_PREFIX + "/user-account")
public class UserController extends AbstractController {

  private final UserService userService;

  /**
   * Create new user admin role.
   *
   * @param createUserRequest CreateUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException WFException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping(value = "/create-user-for-admin")
  public ResponseEntity<BaseResponse> createUserForAdmin(
      @RequestBody BaseRequest<CreateUserRequest> createUserRequest) throws WFException {
    CreateUserResponse result = userService.createUserForAdmin(createUserRequest);
    return this.returnBaseResponse(result, MessageEnum.CREATE_USER_ACCOUNT_SUCCESS,
        result.getUserName());
  }

  /**
   * Create new user.
   *
   * @param createUserRequest CreateAppUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException WFException
   */
  @PostMapping(value = "/create-user")
  public ResponseEntity<BaseResponse> createUser(
      @RequestBody BaseRequest<CreateUserRequest> createUserRequest) throws WFException {
    CreateUserResponse result = userService.createUser(createUserRequest);
    return this.returnBaseResponse(result, MessageEnum.CREATE_USER_ACCOUNT_SUCCESS,
        result.getUserName());
  }

  /**
   * Login AppUser.
   *
   * @param loginRequest LoginRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException WFException
   */
  @PostMapping("/login")
  public ResponseEntity<BaseResponse> loginUserAccount(
      @Valid @RequestBody BaseRequest<LoginRequest> loginRequest) throws WFException {
    LoginResponse result = userService.login(loginRequest);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * Get AppUser profile.
   *
   * @return ResponseEntity<BaseResponse>
   * @throws WFException WFException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/get-profile")
  public ResponseEntity<BaseResponse> getProfile(@RequestBody BaseRequest<?> request)
      throws WFException {
    UserResponse result = userService.getProfile(request);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * Update AppUser.
   *
   * @param updateUserRequest UpdateUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException WFException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/update-user-account")
  public ResponseEntity<BaseResponse> updateUserAccount(
      @RequestBody BaseRequest<UpdateUserRequest> updateUserRequest)
      throws WFException, InvocationTargetException, IllegalAccessException, InstantiationException,
      NoSuchMethodException {
    UpdateUserResponse result = userService.updateUserAccount(updateUserRequest);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  /**
   * Change login password.
   *
   * @param changePasswordRequest ChangePasswordRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException WFException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/change-login-password")
  public ResponseEntity<BaseResponse> changeLoginPassword(
      @RequestBody BaseRequest<ChangePasswordRequest> changePasswordRequest)
      throws WFException, InvocationTargetException, IllegalAccessException, InstantiationException,
      NoSuchMethodException {
    userService.changeLoginPassword(changePasswordRequest);
    return this.returnBaseResponse(null, MessageEnum.REQUEST_SUCCESS);
  }

}
