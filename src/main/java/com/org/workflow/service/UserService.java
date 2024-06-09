package com.org.workflow.service;

import com.org.workflow.common.cnst.DocumentConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.reponse.CreateUserAccountResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.reponse.UserAccountResponse;
import com.org.workflow.controller.request.ChangePasswordRequest;
import com.org.workflow.controller.request.CreateAppUserRequest;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.controller.request.UpdateUserRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.security.CustomUserDetail;
import com.org.workflow.core.security.JwtProvider;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.UserAccountRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class UserService {

  private final SeqUtil seqUtil;

  private final UserAccountRepository userAccountRepository;

  private final JwtProvider jwtProvider;

  private static final String BEARER = "Bearer";


  /**
   * Create new user.
   *
   * @param createAppUserRequest CreateAppUserRequest
   * @return CreateUserAccountResponse
   * @throws AppException AppException
   */
  public CreateUserAccountResponse createAppUser(CreateAppUserRequest createAppUserRequest)
      throws AppException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(
        createAppUserRequest.getUsername());
    if (result.isPresent()) {
      throw new AppException(MessageEnum.USER_NAME_EXISTS);
    }
    LocalDateTime now = LocalDateTime.now();
    UserAccount userAccount = new UserAccount();
    userAccount.setId(seqUtil.getSeq(DocumentConst.USER_ACCOUNT));
    userAccount.setUserName(createAppUserRequest.getUsername());
    userAccount.setLoginPassword(
        BCrypt.hashpw(createAppUserRequest.getLoginPassword(), BCrypt.gensalt(16)));
    userAccount.setFullName(createAppUserRequest.getFullName());
    userAccount.setRole(createAppUserRequest.getRole());
    userAccount.setAuthorities(createAppUserRequest.getAuthorities());
    userAccount.setIsActive(true);
    userAccount.setCreatedBy(createAppUserRequest.getFullName());
    userAccount.setCreateDatetime(now);
    userAccount.setUpdateBy(createAppUserRequest.getFullName());
    userAccount.setUpdateDatetime(now);
    UserAccount saveUserAccount = userAccountRepository.save(userAccount);

    CreateUserAccountResponse createUserAccountResponse = new CreateUserAccountResponse();
    createUserAccountResponse.setUsername(saveUserAccount.getUserName());
    createUserAccountResponse.setFullName(saveUserAccount.getFullName());
    createUserAccountResponse.setRole(saveUserAccount.getRole());
    createUserAccountResponse.setAuthorities(saveUserAccount.getAuthorities());
    createUserAccountResponse.setCreateDatetime(saveUserAccount.getCreateDatetime());
    createUserAccountResponse.setCreatedBy(saveUserAccount.getCreatedBy());
    createUserAccountResponse.setUpdateDatetime(saveUserAccount.getUpdateDatetime());
    createUserAccountResponse.setUpdateBy(saveUserAccount.getUpdateBy());

    return createUserAccountResponse;
  }


  /**
   * Login.
   *
   * @param loginRequest LoginRequest
   * @return LoginResponse
   * @throws AppException AppException
   */
  public LoginResponse login(LoginRequest loginRequest) throws AppException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(
        loginRequest.getUsername());
    UserAccount userAccount = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND, "username"));
    if (BCrypt.checkpw(loginRequest.getPassword(), userAccount.getLoginPassword())) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtProvider.generateAccessToken(new CustomUserDetail(userAccount),
          loginRequest.getIsRemember());
      loginResponse.setToken(token);
      loginResponse.setTokenType(BEARER);
      return loginResponse;
    } else {
      throw new AppException(new ErrorDetail("Wrong password", HttpStatus.NOT_FOUND));
    }
  }


  /**
   * Load by username.
   *
   * @param username String
   * @return CustomUserDetail
   * @throws AppException AppException
   */
  public CustomUserDetail loadByUserName(String username) throws AppException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(username);
    UserAccount userAccount = result.orElseThrow(() -> new AppException(MessageEnum.NOT_FOUND));
    return new CustomUserDetail(userAccount);
  }


  /**
   * Get profile user.
   *
   * @return UserAccountResponse
   * @throws AppException AppException
   */
  public UserAccountResponse getProfile() throws AppException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(username);
    UserAccount userAccount = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND, "user"));
    UserAccountResponse userAccountResponse = new UserAccountResponse();
    userAccountResponse.setUsername(userAccount.getUserName());
    userAccountResponse.setFullName(userAccount.getFullName());
    userAccountResponse.setRole(userAccount.getRole());
    userAccountResponse.setAuthorities(userAccount.getAuthorities());
    userAccountResponse.setAuthorities(userAccount.getAuthorities());
    userAccountResponse.setLoginFailCount(userAccount.getLoginFailCount());
    userAccountResponse.setIsActive(userAccount.getIsActive());
    userAccountResponse.setUpdateDatetime(userAccount.getUpdateDatetime());
    return userAccountResponse;
  }


  /**
   * Update AppUser.
   *
   * @param updateUserRequest UpdateUserRequest
   * @return UpdateUserResponse
   * @throws AppException AppException
   */
  public UpdateUserResponse updateUserAccount(UpdateUserRequest updateUserRequest)
      throws AppException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(username);
    UserAccount userAccount = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND, "user"));

    if (updateUserRequest.getUpdateDatetime() != null && !updateUserRequest.getUpdateDatetime()
        .equals(userAccount.getUpdateDatetime())) {
      throw new AppException(MessageEnum.UPDATE_FAILED);
    }

    LocalDateTime now = LocalDateTime.now();

    userAccount.setFullName(updateUserRequest.getFullName());
    userAccount.setRole(updateUserRequest.getRole());
    userAccount.setAuthorities(updateUserRequest.getAuthorities());
    userAccount.setUpdateDatetime(now);
    userAccount.setUpdateBy(username);
    UserAccount UserAccountUpdateResult = userAccountRepository.save(userAccount);

    UpdateUserResponse response = new UpdateUserResponse();
    response.setFullName(UserAccountUpdateResult.getFullName());
    response.setRole(UserAccountUpdateResult.getRole());
    response.setUpdateDatetime(UserAccountUpdateResult.getUpdateDatetime());

    return response;
  }

  /**
   * Change login password.
   *
   * @param changePasswordRequest ChangePasswordRequest
   * @throws AppException AppException
   */
  public void changeLoginPassword(ChangePasswordRequest changePasswordRequest) throws AppException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(username);
    UserAccount update = result.orElseThrow(() -> new AppException(MessageEnum.NOT_FOUND, "user"));
    if (!changePasswordRequest.getNewLoginPassword()
        .equals(changePasswordRequest.getConfirmNewLoginPassword())) {
      throw new AppException(MessageEnum.NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL);
    }
    update.setLoginPassword(
        BCrypt.hashpw(changePasswordRequest.getConfirmNewLoginPassword(), BCrypt.gensalt(16)));
    userAccountRepository.save(update);
  }

}
