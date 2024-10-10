package com.org.workflow.service;

import static com.org.workflow.common.enums.MessageEnum.ACCOUNT_INACTIVE;
import static com.org.workflow.common.enums.MessageEnum.ACCOUNT_PASSWORD_INVALID;
import static com.org.workflow.common.enums.MessageEnum.NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL;
import static com.org.workflow.common.enums.MessageEnum.NOT_FOUND;
import static com.org.workflow.common.enums.MessageEnum.UPDATE_FAILED;
import static com.org.workflow.common.enums.MessageEnum.USER_NAME_EXISTS;

import com.google.common.hash.Hashing;
import com.org.workflow.common.enums.ChangeTypeEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.FileUtil;
import com.org.workflow.common.utils.HistoryUtil;
import com.org.workflow.common.utils.RSAUtil;
import com.org.workflow.controller.reponse.CreateUserResponse;
import com.org.workflow.controller.reponse.LoginResponse;
import com.org.workflow.controller.reponse.UpdateUserResponse;
import com.org.workflow.controller.reponse.UserResponse;
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
import com.org.workflow.dao.document.UserHistory;
import com.org.workflow.dao.repository.UserHistoryRepository;
import com.org.workflow.dao.repository.UserRepository;
import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class UserService extends AbstractService {

  private final UserRepository userRepository;

  private final UserHistoryRepository userHistoryRepository;

  private final JwtProvider jwtProvider;

  private final RedisTemplate<Object, Object> redisTemplate;

  private static final String BEARER = "Bearer";

  private static final String USER_ID_PREFIX = "WF";

  public static final String ID_FULL_TIME = "ddMMyyyyHHmmss";

  @Value("${rsa.private-key}")
  private String privateKey;

  @Value("${file-utils.image-path}")
  public String imagePath;

  /**
   * Create new user.
   *
   * @param createUserRequest CreateUserRequest
   * @return CreateUserResponse
   * @throws WorkFlowException AppException
   */
  public CreateUserResponse createUserAccount(CreateUserRequest createUserRequest)
      throws WorkFlowException {
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
        createUserRequest.getUserName());
    if (result.isPresent()) {
      throw new WorkFlowException(new ErrorDetail(USER_NAME_EXISTS));
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
    userAccount.setLevel(createUserRequest.getLevel());
    if (createUserRequest.getImage() != null && createUserRequest.getImage().getData().length > 0) {
      userAccount.setImagePath(FileUtil.writeFile(createUserRequest.getImage().getData(),
          userId + "_" + createUserRequest.getImage().getName(), imagePath));
    }
    userAccount.setActive(true);
    userAccount.setLoginFailCount(0);
    userAccount.setCreatedBy(createUserRequest.getFullName());
    userAccount.setCreateDatetime(now);
    userAccount.setUpdateBy(createUserRequest.getFullName());
    userAccount.setUpdateDatetime(now);
    UserAccount saveUserAccount = userRepository.save(userAccount);

    this.saveHistory(new UserAccount(), saveUserAccount, ChangeTypeEnum.CREATE);

    return setCreateUserResponse(saveUserAccount);
  }

  /**
   * Create CreateUserResponse
   *
   * @param saveUserAccount UserAccount
   * @return CreateUserResponse
   */
  private static CreateUserResponse setCreateUserResponse(UserAccount saveUserAccount) {
    CreateUserResponse createUserResponse = new CreateUserResponse();
    createUserResponse.setUserName(saveUserAccount.getUserName());
    createUserResponse.setFullName(saveUserAccount.getFullName());
    createUserResponse.setBirthDay(saveUserAccount.getBirthDay());
    createUserResponse.setRole(saveUserAccount.getRole());
    createUserResponse.setAuthorities(saveUserAccount.getAuthorities());
    createUserResponse.setLevel(saveUserAccount.getLevel());
    createUserResponse.setImagePath(saveUserAccount.getImagePath());
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
    UserAccount userAccount;
    try {
      Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
          loginRequest.getUserName());

      userAccount = result.orElseThrow(
          () -> new WorkFlowException(new ErrorDetail(NOT_FOUND, loginRequest.getUserName())));
    } catch (Exception e) {
      redisTemplate.opsForValue().set(loginRequest.getUserName(), loginRequest.getUserName());
      throw new WorkFlowException(new ErrorDetail(NOT_FOUND, loginRequest.getUserName()));
    }

    if (!userAccount.isActive()) {
      throw new WorkFlowException(new ErrorDetail(ACCOUNT_INACTIVE));
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
      loginResponse.setUserResponse(setUserResponse(userAccount));
      return loginResponse;
    } else {
      if (userAccount.getLoginFailCount() == null) {
        userAccount.setLoginFailCount(0);
      } else {
        userAccount.setLoginFailCount(userAccount.getLoginFailCount() + 1);
        if (userAccount.getLoginFailCount() >= 5) {
          userAccount.setActive(false);
        }
      }
      userRepository.save(userAccount);
      throw new WorkFlowException(new ErrorDetail(ACCOUNT_PASSWORD_INVALID));
    }
  }

  private static UserResponse setUserResponse(UserAccount userAccount) throws WorkFlowException {
    UserResponse userResponse = new UserResponse();
    userResponse.setUserId(userAccount.getUserId());
    userResponse.setEmail(userAccount.getEmail());
    userResponse.setUsername(userAccount.getUserName());
    userResponse.setFullName(userAccount.getFullName());
    userResponse.setBirthDay(userAccount.getBirthDay());
    userResponse.setRole(userAccount.getRole());
    userResponse.setAuthorities(userAccount.getAuthorities());
    userResponse.setImage(FileUtil.readFile(userAccount.getImagePath()));
    userResponse.setLoginFailCount(userAccount.getLoginFailCount());
    userResponse.setIsActive(userAccount.isActive());
    userResponse.setCreateDatetime(userAccount.getCreateDatetime());
    userResponse.setUpdateDatetime(userAccount.getUpdateDatetime());
    return userResponse;
  }

  /**
   * Load by username.
   *
   * @param username String
   * @return CustomUserDetail
   * @throws WorkFlowException AppException
   */
  public CustomUserDetail loadByUserName(String username) throws WorkFlowException {
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount userAccount = result.orElseThrow(
        () -> new WorkFlowException(new ErrorDetail(NOT_FOUND, username)));
    return new CustomUserDetail(userAccount);
  }

  /**
   * Get profile user.
   *
   * @return UserAccountResponse
   * @throws WorkFlowException AppException
   */
  public UserResponse getProfile() throws WorkFlowException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount userAccount = result.orElseThrow(
        () -> new WorkFlowException(new ErrorDetail(NOT_FOUND, username)));
    return setUserResponse(userAccount);
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
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount oldUserAccount = result.orElseThrow(
        () -> new WorkFlowException(new ErrorDetail(NOT_FOUND, username)));

    if (updateUserRequest.getUpdateDatetime() != null && !updateUserRequest.getUpdateDatetime()
        .equals(oldUserAccount.getUpdateDatetime())) {
      throw new WorkFlowException(new ErrorDetail(UPDATE_FAILED));
    }

    LocalDateTime now = LocalDateTime.now();

    UserAccount userAccount = (UserAccount) BeanUtils.cloneBean(oldUserAccount);
    userAccount.setEmail(updateUserRequest.getEmail());
    userAccount.setFullName(updateUserRequest.getFullName());
    userAccount.setBirthDay(updateUserRequest.getBirthDay());
    userAccount.setRole(updateUserRequest.getRole());
    userAccount.setAuthorities(updateUserRequest.getAuthorities());
    userAccount.setActive(updateUserRequest.getIsActive());
    userAccount.setUpdateDatetime(now);
    userAccount.setUpdateBy(username);
    UserAccount userAccountUpdateResult = userRepository.save(userAccount);

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
      throws WorkFlowException, InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {
    UserAccount userAccount = AuthUtil.getAuthentication().getUserAccount();
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
        userAccount.getUserName());
    UserAccount update = result.orElseThrow(
        () -> new WorkFlowException(new ErrorDetail(NOT_FOUND, userAccount.getUserName())));

    UserAccount before = (UserAccount) BeanUtils.cloneBean(update);

    if (!changePasswordRequest.getNewLoginPassword()
        .equals(changePasswordRequest.getConfirmNewLoginPassword())) {
      throw new WorkFlowException(new ErrorDetail(NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL));
    }

    update.setPassword(
        BCrypt.hashpw(changePasswordRequest.getConfirmNewLoginPassword(), BCrypt.gensalt(16)));
    UserAccount userAccountUpdateResult = userRepository.save(update);

    this.saveHistory(before, userAccountUpdateResult, ChangeTypeEnum.UPDATE);
  }

  /**
   * Save history.
   *
   * @param before     UserAccount
   * @param after      UserAccount
   * @param changeType ChangeTypeEnum
   */
  private void saveHistory(UserAccount before, UserAccount after, ChangeTypeEnum changeType) {
    UserHistory userHistory = new UserHistory();
    userHistory.setUserId(after.getUserId());
    userHistory.setUserName(after.getUserName());

    ChangeValue changeValue = new ChangeValue();

    // Set change value for email
    changeValue.setFieldValueBefore(before.getEmail());
    changeValue.setFieldValueAfter(after.getEmail());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setEmail(changeValue);

    // Set change value for login password
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getPassword());
    changeValue.setFieldValueAfter(after.getPassword());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setPassword(changeValue);

    // Set change value for full name
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getFullName());
    changeValue.setFieldValueAfter(after.getFullName());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setFullName(changeValue);

    // Set change value for birthday
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getBirthDay());
    changeValue.setFieldValueAfter(after.getBirthDay());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setFullName(changeValue);

    // Set change value for image path
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getImagePath());
    changeValue.setFieldValueAfter(after.getImagePath());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setImagePath(changeValue);

    // Set change value for role
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getRole());
    changeValue.setFieldValueAfter(after.getRole());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setRole(changeValue);

    // Set change value for authorities
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getAuthorities());
    changeValue.setFieldValueAfter(after.getAuthorities());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setAuthorities(changeValue);

    // Set change value for level
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getLevel());
    changeValue.setFieldValueAfter(after.getLevel());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setLevel(changeValue);

    // Set change value for login fail count
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getLoginFailCount());
    changeValue.setFieldValueAfter(after.getLoginFailCount());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setLoginFailCount(changeValue);

    // Set change value for isActive
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.isActive());
    changeValue.setFieldValueAfter(after.isActive());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    userHistory.setIsActive(changeValue);

    LocalDateTime now = LocalDateTime.now();
    userHistory.setCreatedBy(after.getCreatedBy());
    userHistory.setCreateDatetime(now);
    userHistory.setUpdateBy(after.getUpdateBy());
    userHistory.setUpdateDatetime(now);

    userHistoryRepository.save(userHistory);
  }

}
