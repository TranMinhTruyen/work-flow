package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.reponse.common.BaseResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.CreateUserResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.LoginResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.UpdateUserResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.UserResponse;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.usercontroller.ChangePasswordRequest;
import com.org.workflow.domain.dto.request.usercontroller.CreateUserRequest;
import com.org.workflow.domain.dto.request.usercontroller.LoginRequest;
import com.org.workflow.domain.dto.request.usercontroller.UpdateUserRequest;
import com.org.workflow.domain.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.lang.reflect.InvocationTargetException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "UserController")
@RequestMapping(path = API_PREFIX + "/user-account")
public class UserController extends AbstractController {

  private final UserService userService;


  /**
   * Create AppUser.
   *
   * @param createUserRequest CreateAppUserRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException AppException
   */
  @PostMapping(value = "/create")
  public ResponseEntity<BaseResponse> createUserAccount(
      @RequestBody BaseRequest<CreateUserRequest> createUserRequest) throws WFException {
    CreateUserResponse result = userService.createUserAccount(createUserRequest);
    return this.returnBaseResponse(result, MessageEnum.CREATE_USER_ACCOUNT_SUCCESS,
        result.getUserName());
  }


  /**
   * Login AppUser.
   *
   * @param loginRequest LoginRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException AppException
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
   * @throws WFException AppException
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
   * @throws WFException AppException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/update-user-account")
  public ResponseEntity<BaseResponse> updateUserAccount(
      @RequestBody BaseRequest<UpdateUserRequest> updateUserRequest)
      throws WFException, InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {
    UpdateUserResponse result = userService.updateUserAccount(updateUserRequest);
    return this.returnBaseResponse(result, MessageEnum.REQUEST_SUCCESS);
  }

  
  /**
   * Change login password.
   *
   * @param changePasswordRequest ChangePasswordRequest
   * @return ResponseEntity<BaseResponse>
   * @throws WFException AppException
   */
  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @PostMapping("/change-login-password")
  public ResponseEntity<BaseResponse> changeLoginPassword(
      @RequestBody BaseRequest<ChangePasswordRequest> changePasswordRequest)
      throws WFException, InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {
    userService.changeLoginPassword(changePasswordRequest);
    return this.returnBaseResponse(null, MessageEnum.REQUEST_SUCCESS);
  }

}
