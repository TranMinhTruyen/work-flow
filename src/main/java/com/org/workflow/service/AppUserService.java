package com.org.workflow.service;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.controller.reponse.AppUserResponse;
import com.org.workflow.controller.reponse.CreateAppUserRequest;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.core.security.AppUserDetail;
import com.org.workflow.core.security.CustomUserDetail;
import com.org.workflow.core.security.JwtProvider;
import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.dao.repository.AppUserRepository;
import com.org.workflow.dao.repository.entity.appuser.SelectByUserName;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

  private static final String BEARER = "Bearer";

  public AppUser createAppUser(CreateAppUserRequest createAppUserRequest) throws AppException {
    Optional<List<SelectByUserName>> result = appUserRepository.selectByUserName(
        createAppUserRequest.getUsername());
    if (result.isPresent() && !result.get().isEmpty()) {
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
    Optional<List<SelectByUserName>> result = appUserRepository.selectByUserName(
        loginRequest.getUsername());
    List<SelectByUserName> appUser = result.orElseThrow(
        () -> new AppException("Not found user name", HttpStatus.NOT_FOUND));
    if (BCrypt.checkpw(loginRequest.getPassword(), appUser.get(0).getLoginPassword())) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtProvider.generateAccessToken(
          new CustomUserDetail(convertToAppUserDetail(appUser)), loginRequest.getIsRemember());
      loginResponse.setToken(token);
      loginResponse.setTokenType(BEARER);
      return loginResponse;
    } else {
      throw new AppException("Wrong password", HttpStatus.NOT_FOUND);
    }
  }

  public CustomUserDetail loadByUserName(String username) throws AppException {
    Optional<List<SelectByUserName>> result = appUserRepository.selectByUserName(username);
    List<SelectByUserName> appUser = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND));
    return new CustomUserDetail(convertToAppUserDetail(appUser));
  }

  public AppUserResponse getProfile() throws AppException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<List<SelectByUserName>> result = appUserRepository.selectByUserName(username);
    List<SelectByUserName> appUser = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND));
    AppUserResponse appUserResponse = new AppUserResponse();
    appUserResponse.setUsername(appUser.get(0).getUsername());
    appUserResponse.setFullName(appUser.get(0).getFullName());
    appUserResponse.setRole(appUser.get(0).getRole());
    appUserResponse.setLoginFailCount(appUser.get(0).getLoginFailCount());
    appUserResponse.setIsActive(appUser.get(0).getIsActive());
    List<String> authorities = new ArrayList<>();
    for (SelectByUserName authority : appUser) {
      authorities.add(authority.getAuthorities());
    }
    appUserResponse.setAuthorities(authorities);
    return appUserResponse;
  }

  private AppUserDetail convertToAppUserDetail(List<SelectByUserName> result) {
    AppUserDetail appUserDetail = new AppUserDetail();
    appUserDetail.setUsername(result.get(0).getUsername());
    appUserDetail.setLoginPassword(result.get(0).getLoginPassword());
    appUserDetail.setRole(result.get(0).getRole());
    appUserDetail.setIsActive(result.get(0).getIsActive());
    List<String> authorities = new ArrayList<>();
    for (SelectByUserName authority : result) {
      authorities.add(authority.getAuthorities());
    }
    appUserDetail.setAuthorities(authorities);
    return appUserDetail;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return null;
  }

}
