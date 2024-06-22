package com.org.workflow.service;

import static com.org.workflow.common.cnst.DocumentConst.USER_ACCOUNT_HISTORY;

import com.google.common.hash.Hashing;
import com.org.workflow.common.cnst.DocumentConst;
import com.org.workflow.common.enums.ChangeTypeEnum;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.HistoryUtil;
import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.reponse.CreateUserAccountResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.reponse.UserAccountResponse;
import com.org.workflow.controller.request.ChangePasswordRequest;
import com.org.workflow.controller.request.CreateUserAccountRequest;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.controller.request.UpdateUserRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.security.CustomUserDetail;
import com.org.workflow.core.security.JwtProvider;
import com.org.workflow.dao.document.ChangeValue;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.document.UserAccountHistory;
import com.org.workflow.dao.repository.UserAccountHistoryRepository;
import com.org.workflow.dao.repository.UserAccountRepository;
import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class UserService {

  private final SeqUtil seqUtil;

  private final UserAccountRepository userAccountRepository;

  private final UserAccountHistoryRepository userAccountHistoryRepository;

  private final JwtProvider jwtProvider;

  private static final String BEARER = "Bearer";

  /**
   * Create new user.
   *
   * @param createUserAccountRequest CreateAppUserRequest
   * @return CreateUserAccountResponse
   * @throws AppException AppException
   */
  public CreateUserAccountResponse createAppUser(CreateUserAccountRequest createUserAccountRequest)
      throws AppException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(
        createUserAccountRequest.getUsername());
    if (result.isPresent()) {
      throw new AppException(MessageEnum.USER_NAME_EXISTS);
    }
    LocalDateTime now = LocalDateTime.now();
    UserAccount userAccount = new UserAccount();
    userAccount.setId(seqUtil.getSeq(DocumentConst.USER_ACCOUNT));
    userAccount.setUserId(StringUtils.leftPad(String.valueOf(userAccount.getId()), 5, "0"));
    userAccount.setUserName(createUserAccountRequest.getUsername());
    userAccount.setLoginPassword(
        Hashing.sha512()
            .hashString(createUserAccountRequest.getLoginPassword(), StandardCharsets.UTF_16)
            .toString());
    userAccount.setFullName(createUserAccountRequest.getFullName());
    userAccount.setRole(createUserAccountRequest.getRole());
    userAccount.setAuthorities(createUserAccountRequest.getAuthorities());
    userAccount.setIsActive(true);
    userAccount.setLoginFailCount(0);
    userAccount.setCreatedBy(createUserAccountRequest.getFullName());
    userAccount.setCreateDatetime(now);
    userAccount.setUpdateBy(createUserAccountRequest.getFullName());
    userAccount.setUpdateDatetime(now);
    UserAccount saveUserAccount = userAccountRepository.save(userAccount);

    this.saveHistory(new UserAccount(), saveUserAccount, ChangeTypeEnum.CREATE);

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
  @Transactional
  public LoginResponse login(LoginRequest loginRequest) throws AppException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(
        loginRequest.getUsername());
    UserAccount userAccount = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND, "Username: " + loginRequest.getUsername()));

    if (!userAccount.getIsActive()) {
      throw new AppException(new ErrorDetail("Account is disable", HttpStatus.NOT_ACCEPTABLE));
    }

    String loginPassword = Hashing.sha512()
        .hashString(loginRequest.getPassword(), StandardCharsets.UTF_16).toString();

    if (userAccount.getLoginPassword().equals(loginPassword)) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtProvider.generateAccessToken(new CustomUserDetail(userAccount),
          loginRequest.getIsRemember());
      loginResponse.setToken(token);
      loginResponse.setTokenType(BEARER);
      return loginResponse;
    } else {
      if (userAccount.getLoginFailCount() == null) {
        userAccount.setLoginFailCount(0);
      } else {
        userAccount.setLoginFailCount(userAccount.getLoginFailCount() + 1);
        if (userAccount.getLoginFailCount() >= 5) {
          userAccount.setIsActive(false);
        }
      }
      userAccountRepository.save(userAccount);
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
    userAccountResponse.setUserId(userAccount.getUserId());
    userAccountResponse.setEmail(userAccount.getEmail());
    userAccountResponse.setUsername(userAccount.getUserName());
    userAccountResponse.setFullName(userAccount.getFullName());
    userAccountResponse.setRole(userAccount.getRole());
    userAccountResponse.setAuthorities(userAccount.getAuthorities());
    userAccountResponse.setLoginFailCount(userAccount.getLoginFailCount());
    userAccountResponse.setIsActive(userAccount.getIsActive());
    userAccountResponse.setCreateDatetime(userAccount.getCreateDatetime());
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
      throws AppException, InvocationTargetException, IllegalAccessException, InstantiationException,
      NoSuchMethodException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserName(username);
    UserAccount oldUserAccount = result.orElseThrow(
        () -> new AppException(MessageEnum.NOT_FOUND, username));

    if (updateUserRequest.getUpdateDatetime() != null && !updateUserRequest.getUpdateDatetime()
        .equals(oldUserAccount.getUpdateDatetime())) {
      throw new AppException(MessageEnum.UPDATE_FAILED);
    }

    LocalDateTime now = LocalDateTime.now();

    UserAccount userAccount = (UserAccount) BeanUtils.cloneBean(oldUserAccount);
    userAccount.setEmail(updateUserRequest.getEmail());
    userAccount.setFullName(updateUserRequest.getFullName());
    userAccount.setRole(updateUserRequest.getRole());
    userAccount.setAuthorities(updateUserRequest.getAuthorities());
    userAccount.setIsActive(updateUserRequest.getIsActive());
    userAccount.setUpdateDatetime(now);
    userAccount.setUpdateBy(username);
    UserAccount userAccountUpdateResult = userAccountRepository.save(userAccount);

    this.saveHistory(oldUserAccount, userAccountUpdateResult, ChangeTypeEnum.UPDATE);

    UpdateUserResponse response = new UpdateUserResponse();
    response.setFullName(userAccountUpdateResult.getFullName());
    response.setRole(userAccountUpdateResult.getRole());
    response.setUpdateDatetime(userAccountUpdateResult.getUpdateDatetime());

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
    UserAccount userAccountUpdateResult = userAccountRepository.save(update);

    this.saveHistory(result.get(), userAccountUpdateResult, ChangeTypeEnum.UPDATE);
  }

  private void saveHistory(UserAccount before, UserAccount after, ChangeTypeEnum changeType) {
    UserAccountHistory userAccountHistory = new UserAccountHistory();
    userAccountHistory.setId(seqUtil.getSeq(USER_ACCOUNT_HISTORY));
    userAccountHistory.setUserName(after.getUserName());

    ChangeValue changeValue = new ChangeValue();

    // Set change value for full name
    changeValue.setFieldValueBefore(before.getFullName());
    changeValue.setFieldValueAfter(after.getFullName());
    changeValue.setChangeType(changeType.getTypeName());
    userAccountHistory.setFullName(changeValue);

    // Set change value for image path
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getImagePath());
    changeValue.setFieldValueAfter(after.getImagePath());
    changeValue.setChangeType(changeType.getTypeName());
    userAccountHistory.setImagePath(changeValue);

    // Set change value for role
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getRole());
    changeValue.setFieldValueAfter(after.getRole());
    changeValue.setChangeType(changeType.getTypeName());
    userAccountHistory.setRole(changeValue);

    // Set change value for authorities
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getAuthorities());
    changeValue.setFieldValueAfter(after.getAuthorities());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setAuthorities(changeValue);

    // Set change value for login fail count
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getLoginFailCount());
    changeValue.setFieldValueAfter(after.getLoginFailCount());
    changeValue.setChangeType(changeType.getTypeName());
    userAccountHistory.setLoginFailCount(changeValue);

    // Set change value for isActive
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getIsActive());
    changeValue.setFieldValueAfter(after.getIsActive());
    changeValue.setChangeType(changeType.getTypeName());
    userAccountHistory.setIsActive(changeValue);

    LocalDateTime now = LocalDateTime.now();
    userAccountHistory.setCreatedBy(after.getCreatedBy());
    userAccountHistory.setCreateDatetime(now);
    userAccountHistory.setUpdateBy(after.getUpdateBy());
    userAccountHistory.setUpdateDatetime(now);

    userAccountHistoryRepository.save(userAccountHistory);
  }

}
