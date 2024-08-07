package com.org.workflow.service;

import com.google.common.hash.Hashing;
import com.org.workflow.common.enums.ChangeTypeEnum;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.HistoryUtil;
import com.org.workflow.controller.reponse.CreateUserAccountResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.reponse.UserAccountResponse;
import com.org.workflow.controller.request.ChangePasswordRequest;
import com.org.workflow.controller.request.CreateUserAccountRequest;
import com.org.workflow.controller.request.LoginRequest;
import com.org.workflow.controller.request.UpdateUserRequest;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
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
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class UserService extends AbstractService {

  private final UserAccountRepository userAccountRepository;

  private final UserAccountHistoryRepository userAccountHistoryRepository;

  private final JwtProvider jwtProvider;

  private static final String BEARER = "Bearer";

  private static final String USER_ID_PREFIX = "WF";

  public static final String ID_FULL_TIME = "HHmmssddMMyyyy";

  /**
   * Create new user.
   *
   * @param createUserAccountRequest CreateUserAccountRequest
   * @return CreateUserAccountResponse
   * @throws WorkFlowException AppException
   */
  public CreateUserAccountResponse createAppUser(CreateUserAccountRequest createUserAccountRequest)
      throws WorkFlowException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(
        createUserAccountRequest.getUsername());
    if (result.isPresent()) {
      throw new WorkFlowException(MessageEnum.USER_NAME_EXISTS);
    }
    LocalDateTime now = LocalDateTime.now();
    UserAccount userAccount = new UserAccount();

    String useId = USER_ID_PREFIX.concat(
        LocalDateTime.now().format(DateTimeFormatter.ofPattern(ID_FULL_TIME)));
    userAccount.setUserId(useId);
    userAccount.setUserName(createUserAccountRequest.getUsername());
    userAccount.setLoginPassword(
        Hashing.sha512()
            .hashString(createUserAccountRequest.getLoginPassword(), StandardCharsets.UTF_16)
            .toString());
    userAccount.setFullName(createUserAccountRequest.getFullName());
    userAccount.setEmail(createUserAccountRequest.getEmail());
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

    return getCreateUserAccountResponse(saveUserAccount);
  }

  /**
   * Create CreateUserAccountResponse
   *
   * @param saveUserAccount UserAccount
   * @return CreateUserAccountResponse
   */
  private static CreateUserAccountResponse getCreateUserAccountResponse(
      UserAccount saveUserAccount) {
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
   * @throws WorkFlowException AppException
   */
  public LoginResponse login(LoginRequest loginRequest) throws WorkFlowException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(
        loginRequest.getUsername());
    UserAccount userAccount = result.orElseThrow(
        () -> new WorkFlowException(MessageEnum.NOT_FOUND,
            "Username: " + loginRequest.getUsername()));

    if (!userAccount.getIsActive()) {
      throw new WorkFlowException(new ErrorDetail("Account is disable", HttpStatus.NOT_ACCEPTABLE));
    }

    String loginPassword = Hashing.sha512()
        .hashString(loginRequest.getPassword(), StandardCharsets.UTF_16).toString();

    if (userAccount.getLoginPassword().equals(loginPassword)) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtProvider.generateAccessToken(new CustomUserDetail(userAccount),
          loginRequest.getIsRemember());
      loginResponse.setToken(token);
      loginResponse.setTokenType(BEARER);
      loginResponse.setUserId(userAccount.getUserId());
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
      throw new WorkFlowException(new ErrorDetail("Wrong password", HttpStatus.NOT_FOUND));
    }
  }

  /**
   * Load by username.
   *
   * @param username String
   * @return CustomUserDetail
   * @throws WorkFlowException AppException
   */
  public CustomUserDetail loadByUserName(String username) throws WorkFlowException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount userAccount = result.orElseThrow(
        () -> new WorkFlowException(MessageEnum.NOT_FOUND));
    return new CustomUserDetail(userAccount);
  }

  /**
   * Get profile user.
   *
   * @return UserAccountResponse
   * @throws WorkFlowException AppException
   */
  public UserAccountResponse getProfile() throws WorkFlowException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount userAccount = result.orElseThrow(
        () -> new WorkFlowException(MessageEnum.NOT_FOUND, "user"));
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
   * Update user.
   *
   * @param updateUserRequest UpdateUserRequest
   * @return UpdateUserResponse
   * @throws WorkFlowException         AppException
   * @throws InvocationTargetException InvocationTargetException
   * @throws IllegalAccessException    IllegalAccessException
   * @throws InstantiationException    InstantiationException
   * @throws NoSuchMethodException     NoSuchMethodException
   */
  public UpdateUserResponse updateUserAccount(UpdateUserRequest updateUserRequest)
      throws WorkFlowException, InvocationTargetException, IllegalAccessException, InstantiationException,
      NoSuchMethodException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount oldUserAccount = result.orElseThrow(
        () -> new WorkFlowException(MessageEnum.NOT_FOUND, username));

    if (updateUserRequest.getUpdateDatetime() != null && !updateUserRequest.getUpdateDatetime()
        .equals(oldUserAccount.getUpdateDatetime())) {
      throw new WorkFlowException(MessageEnum.UPDATE_FAILED);
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
   * Change password.
   *
   * @param changePasswordRequest ChangePasswordRequest
   * @throws WorkFlowException AppException
   */
  public void changeLoginPassword(ChangePasswordRequest changePasswordRequest)
      throws WorkFlowException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount update = result.orElseThrow(
        () -> new WorkFlowException(MessageEnum.NOT_FOUND, "user"));
    if (!changePasswordRequest.getNewLoginPassword()
        .equals(changePasswordRequest.getConfirmNewLoginPassword())) {
      throw new WorkFlowException(MessageEnum.NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL);
    }
    update.setLoginPassword(
        BCrypt.hashpw(changePasswordRequest.getConfirmNewLoginPassword(), BCrypt.gensalt(16)));
    UserAccount userAccountUpdateResult = userAccountRepository.save(update);

    this.saveHistory(result.get(), userAccountUpdateResult, ChangeTypeEnum.UPDATE);
  }

  /**
   * Save history.
   *
   * @param before     UserAccount
   * @param after      UserAccount
   * @param changeType ChangeTypeEnum
   */
  private void saveHistory(UserAccount before, UserAccount after, ChangeTypeEnum changeType) {
    UserAccountHistory userAccountHistory = new UserAccountHistory();
    userAccountHistory.setUserId(after.getUserId());
    userAccountHistory.setUserName(after.getUserName());

    ChangeValue changeValue = new ChangeValue();

    // Set change value for email
    changeValue.setFieldValueBefore(before.getEmail());
    changeValue.setFieldValueAfter(after.getEmail());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setEmail(changeValue);

    // Set change value for login password
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getLoginPassword());
    changeValue.setFieldValueAfter(after.getLoginPassword());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setLoginPassword(changeValue);

    // Set change value for full name
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getFullName());
    changeValue.setFieldValueAfter(after.getFullName());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setFullName(changeValue);

    // Set change value for image path
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getImagePath());
    changeValue.setFieldValueAfter(after.getImagePath());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setImagePath(changeValue);

    // Set change value for role
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getRole());
    changeValue.setFieldValueAfter(after.getRole());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
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
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setLoginFailCount(changeValue);

    // Set change value for isActive
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getIsActive());
    changeValue.setFieldValueAfter(after.getIsActive());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setIsActive(changeValue);

    LocalDateTime now = LocalDateTime.now();
    userAccountHistory.setCreatedBy(after.getCreatedBy());
    userAccountHistory.setCreateDatetime(now);
    userAccountHistory.setUpdateBy(after.getUpdateBy());
    userAccountHistory.setUpdateDatetime(now);

    userAccountHistoryRepository.save(userAccountHistory);
  }

}
