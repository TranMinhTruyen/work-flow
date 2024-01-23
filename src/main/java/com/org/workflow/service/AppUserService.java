package com.org.workflow.service;

import com.org.workflow.common.cnst.EntityConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.reponse.AppUserResponse;
import com.org.workflow.controller.reponse.CreateAppUserResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.request.CreateAppUserRequest;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.security.AppUserDetail;
import com.org.workflow.core.security.CustomUserDetail;
import com.org.workflow.core.security.JwtProvider;
import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.dao.entity.AppUserAuthority;
import com.org.workflow.dao.repository.AppUserAuthorityRepository;
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

  private final SeqUtil seqUtil;
  
  private final AppUserRepository appUserRepository;

  private final AppUserAuthorityRepository appUserAuthorityRepository;

  private final JwtProvider jwtProvider;

  private static final String BEARER = "Bearer";
  private static final String SYSTEM = "System";


  /**
   * Create new user.
   *
   * @param createAppUserRequest CreateAppUserRequest
   * @return CreateAppUserResponse
   * @throws AppException AppException
   */
  public CreateAppUserResponse createAppUser(CreateAppUserRequest createAppUserRequest)
      throws AppException {
    Optional<List<SelectByUserName>> result = appUserRepository.selectByUserName(
        createAppUserRequest.getUsername());
    if (result.isPresent() && !result.get().isEmpty()) {
      throw new AppException(MessageEnum.USER_NAME_EXISTS);
    }
    LocalDateTime now = LocalDateTime.now();
    AppUser appUser = new AppUser();
    appUser.setUsername(createAppUserRequest.getUsername());
    appUser.setLoginPassword(
        BCrypt.hashpw(createAppUserRequest.getLoginPassword(), BCrypt.gensalt(16)));
    appUser.setFullName(createAppUserRequest.getFullName());
    appUser.setRole(createAppUserRequest.getRole());
    appUser.setIsActive(true);
    appUser.setCreatedBy(SYSTEM);
    appUser.setCreateDatetime(now);
    appUser.setUpdateBy(SYSTEM);
    appUser.setUpdateDatetime(now);
    AppUser saveAppUser = appUserRepository.save(appUser);

    CreateAppUserResponse createAppUserResponse = new CreateAppUserResponse();
    createAppUserResponse.setUsername(saveAppUser.getUsername());
    createAppUserResponse.setFullName(saveAppUser.getFullName());
    createAppUserResponse.setRole(saveAppUser.getRole());
    createAppUserResponse.setCreateDatetime(saveAppUser.getCreateDatetime());
    createAppUserResponse.setCreatedBy(saveAppUser.getCreatedBy());
    createAppUserResponse.setUpdateDatetime(saveAppUser.getUpdateDatetime());
    createAppUserResponse.setUpdateBy(saveAppUser.getUpdateBy());

    if (!createAppUserRequest.getAuthorities().isEmpty()) {
      List<AppUserAuthority> appUserAuthorityList = new ArrayList<>();
      AppUserAuthority appUserAuthority;
      for (String item : createAppUserRequest.getAuthorities()) {
        appUserAuthority = new AppUserAuthority();
        appUserAuthority.setId(seqUtil.getSeq(EntityConst.APP_USER_AUTHORITY));
        appUserAuthority.setUsername(saveAppUser.getUsername());
        appUserAuthority.setAuthority(item);
        appUserAuthority.setCreateDatetime(now);
        appUserAuthority.setCreatedBy(SYSTEM);
        appUserAuthority.setUpdateDatetime(now);
        appUserAuthority.setUpdateBy(SYSTEM);
        appUserAuthorityList.add(appUserAuthority);
      }
      List<AppUserAuthority> saveAppUserAuthorityList = appUserAuthorityRepository.saveAll(
          appUserAuthorityList);
      if (!saveAppUserAuthorityList.isEmpty()) {
        List<String> authorities = new ArrayList<>();
        for (AppUserAuthority item : saveAppUserAuthorityList) {
          authorities.add(item.getAuthority());
        }
        createAppUserResponse.setAuthorities(authorities);
      }
    }

    return createAppUserResponse;
  }

  public LoginResponse login(LoginRequest loginRequest) throws AppException {
    Optional<List<SelectByUserName>> result = appUserRepository.selectByUserName(
        loginRequest.getUsername());
    List<SelectByUserName> appUser = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND, "username"));
    if (BCrypt.checkpw(loginRequest.getPassword(), appUser.get(0).getLoginPassword())) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtProvider.generateAccessToken(
          new CustomUserDetail(convertToAppUserDetail(appUser)), loginRequest.getIsRemember());
      loginResponse.setToken(token);
      loginResponse.setTokenType(BEARER);
      return loginResponse;
    } else {
      throw new AppException(new ErrorDetail("Wrong password", HttpStatus.NOT_FOUND));
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
    if (result.stream().noneMatch(i -> i.getAuthorities() == null)) {
      List<String> authorities = new ArrayList<>();
      for (SelectByUserName authority : result) {
        authorities.add(authority.getAuthorities());
      }
      appUserDetail.setAuthorities(authorities);
    }
    return appUserDetail;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return null;
  }

}
