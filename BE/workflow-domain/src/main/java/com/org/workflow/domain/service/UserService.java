package com.org.workflow.domain.service;

import com.google.common.hash.Hashing;
import com.org.workflow.core.common.enums.ChangeTypeEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.ChangeValue;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.document.UserHistory;
import com.org.workflow.dao.repository.UserHistoryRepository;
import com.org.workflow.dao.repository.UserRepository;
import com.org.workflow.domain.dto.common.CustomUserDetail;
import com.org.workflow.domain.dto.reponse.usercontroller.CreateUserResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.LoginResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.UpdateUserResponse;
import com.org.workflow.domain.dto.reponse.usercontroller.UserResponse;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.usercontroller.ChangePasswordRequest;
import com.org.workflow.domain.dto.request.usercontroller.CreateUserRequest;
import com.org.workflow.domain.dto.request.usercontroller.LoginRequest;
import com.org.workflow.domain.dto.request.usercontroller.UpdateUserRequest;
import com.org.workflow.domain.utils.AuthUtil;
import com.org.workflow.domain.utils.FileUtil;
import com.org.workflow.domain.utils.HistoryUtil;
import com.org.workflow.domain.utils.JwtUtil;
import com.org.workflow.domain.utils.RSAUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import static com.org.workflow.core.common.enums.MessageEnum.ACCOUNT_INACTIVE;
import static com.org.workflow.core.common.enums.MessageEnum.ACCOUNT_NOT_FOUND;
import static com.org.workflow.core.common.enums.MessageEnum.ACCOUNT_PASSWORD_INVALID;
import static com.org.workflow.core.common.enums.MessageEnum.NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL;
import static com.org.workflow.core.common.enums.MessageEnum.NOT_FOUND;
import static com.org.workflow.core.common.enums.MessageEnum.UPDATE_FAILED;
import static com.org.workflow.core.common.enums.MessageEnum.USER_NAME_EXISTS;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class UserService extends AbstractService {

  private static final String ID_FULL_TIME = "ddMMyyyyHHmmss";

  private static final String BEARER = "Bearer";

  private static final String USER_ID_PREFIX = "WF";

  private final UserRepository userRepository;

  private final UserHistoryRepository userHistoryRepository;

  private final JwtUtil jwtUtil;

  private final RedisTemplate<Object, Object> redisTemplate;

  private final ExceptionService exceptionService;

  @Value("${file-utils.image-path}")
  public String imagePath;

  @Value("${rsa.private-key}")
  private String privateKey;

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

  private static UserResponse setUserResponse(UserAccount userAccount) throws WFException {
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
   * Create new user.
   *
   * @param baseRequest BaseRequest<CreateUserRequest>
   * @return CreateUserResponse
   * @throws WFException AppException
   */
  public CreateUserResponse createUserAccount(BaseRequest<CreateUserRequest> baseRequest)
      throws WFException {
    CreateUserRequest createUserRequest = baseRequest.getPayload();

    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
        createUserRequest.getUserName());
    if (result.isPresent()) {
      throw exceptionService.getWFException(USER_NAME_EXISTS, baseRequest.getLanguage(),
          createUserRequest.getUserName());
    }
    LocalDateTime now = LocalDateTime.now();
    UserAccount userAccount = new UserAccount();

    String userId = USER_ID_PREFIX.concat(now.format(DateTimeFormatter.ofPattern(ID_FULL_TIME)));
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
    userAccount.setDeleted(false);
    UserAccount saveUserAccount = userRepository.save(userAccount);

    this.saveHistory(new UserAccount(), saveUserAccount, ChangeTypeEnum.CREATE);

    return setCreateUserResponse(saveUserAccount);
  }

  /**
   * Login.
   *
   * @param baseRequest LoginRequest
   * @return LoginResponse
   * @throws WFException AppException
   */
  public LoginResponse login(BaseRequest<LoginRequest> baseRequest) throws WFException {
    UserAccount userAccount;
    LoginRequest loginRequest = baseRequest.getPayload();
    try {
      Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
          loginRequest.getUserName());

      userAccount = result.orElseThrow(
          () -> exceptionService.getWFException(ACCOUNT_NOT_FOUND, baseRequest.getLanguage(),
              loginRequest.getUserName()));
    } catch (Exception exception) {
      redisTemplate.opsForValue().set(loginRequest.getUserName(), "Not found");
      throw exception;
    }

    redisTemplate.opsForValue().set(loginRequest.getUserName(), loginRequest.getUserName());

    if (!userAccount.isActive()) {
      throw exceptionService.getWFException(ACCOUNT_INACTIVE, baseRequest.getLanguage(),
          userAccount.getUserName());
    }

    String passwordDecrypted = RSAUtil.decryptRSA(loginRequest.getPassword(), privateKey);

    String loginPassword = Hashing.sha512().hashString(passwordDecrypted, StandardCharsets.UTF_16)
        .toString();

    if (userAccount.getPassword().equals(loginPassword)) {
      LoginResponse loginResponse = new LoginResponse();
      String token = jwtUtil.generateAccessToken(new CustomUserDetail(userAccount),
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
      throw exceptionService.getWFException(ACCOUNT_PASSWORD_INVALID,
          baseRequest.getLanguage(), loginRequest.getUserName());
    }
  }

  /**
   * Load by username.
   *
   * @param username String
   * @return CustomUserDetail
   * @throws WFException AppException
   */
  public CustomUserDetail loadByUserName(String username, String language)
      throws WFException {
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount userAccount = result.orElseThrow(
        () -> exceptionService.getWFException(NOT_FOUND, language, username));
    return new CustomUserDetail(userAccount);
  }

  /**
   * Get profile user.
   *
   * @return UserAccountResponse
   * @throws WFException AppException
   */
  public UserResponse getProfile(BaseRequest<?> baseRequest) throws WFException {
    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount userAccount = result.orElseThrow(
        () -> exceptionService.getWFException(NOT_FOUND, baseRequest.getLanguage(),
            username));
    return setUserResponse(userAccount);
  }

  /**
   * Update user.
   *
   * @param baseRequest BaseRequest<UpdateUserRequest>
   * @return UpdateUserResponse
   * @throws WFException         AppException
   * @throws InvocationTargetException InvocationTargetException
   * @throws IllegalAccessException    IllegalAccessException
   * @throws InstantiationException    InstantiationException
   * @throws NoSuchMethodException     NoSuchMethodException
   */
  public UpdateUserResponse updateUserAccount(BaseRequest<UpdateUserRequest> baseRequest)
      throws WFException, InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {
    UpdateUserRequest updateUserRequest = baseRequest.getPayload();

    String username = AuthUtil.getAuthentication().getUsername();
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(username);
    UserAccount oldUserAccount = result.orElseThrow(
        () -> exceptionService.getWFException(NOT_FOUND, baseRequest.getLanguage(),
            username));

    if (updateUserRequest.getUpdateDatetime() != null && !updateUserRequest.getUpdateDatetime()
        .equals(oldUserAccount.getUpdateDatetime())) {
      throw exceptionService.getWFException(UPDATE_FAILED, baseRequest.getLanguage());
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
   * @param baseRequest BaseRequest<ChangePasswordRequest>
   * @throws WFException AppException
   */
  public void changeLoginPassword(BaseRequest<ChangePasswordRequest> baseRequest)
      throws WFException, InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {
    ChangePasswordRequest changePasswordRequest = baseRequest.getPayload();

    UserAccount userAccount = AuthUtil.getAuthentication().getUserAccount();
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
        userAccount.getUserName());
    UserAccount update = result.orElseThrow(
        () -> exceptionService.getWFException(NOT_FOUND, userAccount.getUserName()));

    UserAccount before = (UserAccount) BeanUtils.cloneBean(update);

    if (!changePasswordRequest.getNewLoginPassword()
        .equals(changePasswordRequest.getConfirmNewLoginPassword())) {
      throw exceptionService.getWFException(NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL,
          baseRequest.getLanguage());
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