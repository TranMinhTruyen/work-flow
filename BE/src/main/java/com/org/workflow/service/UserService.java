package com.org.workflow.service;

import com.google.common.hash.Hashing;
import com.org.workflow.common.enums.ChangeTypeEnum;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.FileUtil;
import com.org.workflow.common.utils.HistoryUtil;
import com.org.workflow.common.utils.RSAUtil;
import com.org.workflow.controller.reponse.CreateUserResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.reponse.UserAccountResponse;
import com.org.workflow.controller.request.ChangePasswordRequest;
import com.org.workflow.controller.request.CreateUserRequest;
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
import org.springframework.beans.factory.annotation.Value;
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

  public static final String ID_FULL_TIME = "ddMMyyyyHHmmss";

  @Value("${rsa.private-key}")
  private String privateKey;

  /**
   * Create new user.
   *
   * @param createUserRequest CreateUserRequest
   * @return CreateUserResponse
   * @throws WorkFlowException AppException
   */
  public CreateUserResponse createAppUser(CreateUserRequest createUserRequest)
      throws WorkFlowException {
    Optional<UserAccount> result = userAccountRepository.findUserAccountByUserNameOrEmail(
        createUserRequest.getUserName());
    if (result.isPresent()) {
      throw new WorkFlowException(MessageEnum.USER_NAME_EXISTS);
    }
    LocalDateTime now = LocalDateTime.now();
    UserAccount userAccount = new UserAccount();

    String userId = USER_ID_PREFIX.concat(
        LocalDateTime.now().format(DateTimeFormatter.ofPattern(ID_FULL_TIME)));
    userAccount.setUserId(userId);
    userAccount.setUserName(createUserRequest.getUserName());

    String passwordDecrypted = RSAUtil.decryptRSA(createUserRequest.getPassword(), privateKey);

    userAccount.setPassword(
        Hashing.sha512().hashString(passwordDecrypted, StandardCharsets.UTF_16).toString());
    userAccount.setFullName(createUserRequest.getFullName());
    userAccount.setBirthDay(createUserRequest.getBirthDay());
    userAccount.setEmail(createUserRequest.getEmail());
    userAccount.setRole(createUserRequest.getRole());
    userAccount.setAuthorities(createUserRequest.getAuthorities());
    userAccount.setImagePath(FileUtil.writeImage(createUserRequest.getImage().getData(),
        userId + "_" + createUserRequest.getImage().getName()));
    userAccount.setIsActive(true);
    userAccount.setLoginFailCount(0);
    userAccount.setCreatedBy(createUserRequest.getFullName());
    userAccount.setCreateDatetime(now);
    userAccount.setUpdateBy(createUserRequest.getFullName());
    userAccount.setUpdateDatetime(now);
    UserAccount saveUserAccount = userAccountRepository.save(userAccount);

    this.saveHistory(new UserAccount(), saveUserAccount, ChangeTypeEnum.CREATE);

    return getCreateUserAccountResponse(saveUserAccount);
  }

  /**
   * Create CreateUserResponse
   *
   * @param saveUserAccount UserAccount
   * @return CreateUserResponse
   */
  private static CreateUserResponse getCreateUserAccountResponse(UserAccount saveUserAccount) {
    CreateUserResponse createUserResponse = new CreateUserResponse();
    createUserResponse.setUserName(saveUserAccount.getUserName());
    createUserResponse.setFullName(saveUserAccount.getFullName());
    createUserResponse.setBirthDay(saveUserAccount.getBirthDay());
    createUserResponse.setRole(saveUserAccount.getRole());
    createUserResponse.setAuthorities(saveUserAccount.getAuthorities());
    createUserResponse.setCreateDatetime(saveUserAccount.getCreateDatetime());
    createUserResponse.setCreatedBy(saveUserAccount.getCreatedBy());
    createUserResponse.setUpdateDatetime(saveUserAccount.getUpdateDatetime());
    createUserResponse.setUpdateBy(saveUserAccount.getUpdateBy());
    return createUserResponse;
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
        loginRequest.getUserName());
    UserAccount userAccount = result.orElseThrow(() -> new WorkFlowException(MessageEnum.NOT_FOUND,
        "Username: " + loginRequest.getUserName()));

    if (!userAccount.getIsActive()) {
      throw new WorkFlowException(new ErrorDetail("Account is disable", HttpStatus.NOT_ACCEPTABLE));
    }

    String passwordDecrypted = RSAUtil.decryptRSA(loginRequest.getPassword(), privateKey);

    String loginPassword = Hashing.sha512().hashString(passwordDecrypted, StandardCharsets.UTF_16)
        .toString();

    if (userAccount.getPassword().equals(loginPassword)) {
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
    userAccountResponse.setBirthDay(userAccount.getBirthDay());
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
      throws WorkFlowException, InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {
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
    userAccount.setBirthDay(updateUserRequest.getBirthDay());
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
    update.setPassword(
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
    changeValue.setFieldValueBefore(before.getPassword());
    changeValue.setFieldValueAfter(after.getPassword());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setPassword(changeValue);

    // Set change value for full name
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getFullName());
    changeValue.setFieldValueAfter(after.getFullName());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userAccountHistory.setFullName(changeValue);

    // Set change value for birthday
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getBirthDay());
    changeValue.setFieldValueAfter(after.getBirthDay());
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
