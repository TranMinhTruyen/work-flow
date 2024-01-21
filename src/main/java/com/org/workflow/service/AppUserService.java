package com.org.workflow.service;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.CreateAppUserRequest;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.core.security.AppUserDetail;
import com.org.workflow.core.security.JwtProvider;
import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.dao.repository.AppUserRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService implements UserDetailsService {

  private final AppUserRepository appUserRepository;

  private final JwtProvider jwtProvider;

  public AppUser createAppUser(CreateAppUserRequest createAppUserRequest) throws AppException {
    Optional<AppUser> result = appUserRepository.selectByUserName(
        createAppUserRequest.getUsername());
    if (result.isPresent()) {
      throw new AppException("Username already exists", HttpStatus.CONFLICT);
    }
    LocalDateTime now = LocalDateTime.now();
    AppUser appUser = new AppUser();
    appUser.setUsername(createAppUserRequest.getUsername());
    appUser.setLoginPassword(
        BCrypt.hashpw(createAppUserRequest.getLoginPassword(), BCrypt.gensalt(16)));
    appUser.setFullName(createAppUserRequest.getFullName());
    appUser.setRole(createAppUserRequest.getRole());
    appUser.setIsActive(true);
    appUser.setCreatedBy("System");
    appUser.setCreateDatetime(now);
    appUser.setUpdateBy("System");
    appUser.setUpdateDatetime(now);
    return appUserRepository.save(appUser);
  }

  public LoginResponse login(LoginRequest loginRequest) throws AppException {
    Optional<AppUser> result = appUserRepository.selectByUserName(loginRequest.getUsername());
    AppUser appUser = result.orElseThrow(
        () -> new AppException("Not found user name", HttpStatus.NOT_FOUND));
    if (BCrypt.checkpw(loginRequest.getPassword(), appUser.getLoginPassword())) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtProvider.generateAccessToken(new AppUserDetail(appUser),
          loginRequest.getIsRemember());
      loginResponse.setToken(token);
      return loginResponse;
    } else {
      throw new AppException("Wrong password", HttpStatus.NOT_FOUND);
    }
  }

  public AppUserDetail loadByUserName(String username) throws AppException {
    Optional<AppUser> result = appUserRepository.selectByUserName(username);
    AppUser appUser = result.orElseThrow(() -> new AppException(MessageEnum.NOT_FOUND));
    return new AppUserDetail(appUser);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return null;
  }

}
