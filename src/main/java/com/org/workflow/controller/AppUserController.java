package com.org.workflow.controller;

import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.CreateAppUserRequest;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.service.AppUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "AppUserController")
@RestController
@RequiredArgsConstructor
public class AppUserController extends AbstractController {

  private final AppUserService appUserService;

  @PostMapping("/app-user/create")
  public ResponseEntity<BaseResponse> createAppUser(
      @RequestBody CreateAppUserRequest createAppUserRequest) throws AppException {
    AppUser result = appUserService.createAppUser(createAppUserRequest);
    return this.returnBaseResponse(result, "Create user success", HttpStatus.OK);
  }

  @PostMapping("/app-user/login")
  public ResponseEntity<BaseResponse> loginAppUser(@RequestBody LoginRequest loginRequest)
      throws AppException {
    LoginResponse result = appUserService.login(loginRequest);
    return this.returnBaseResponse(result, "Login success", HttpStatus.OK);
  }

}
