package com.org.workflow.common.utils;

import com.google.common.hash.Hashing;
import com.org.workflow.dao.document.Proxy;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ProxyRepository;
import com.org.workflow.dao.repository.UserRepository;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * @author minh-truyen
 */
@Component
@RequiredArgsConstructor
public class ApplicationStartup {

  private static final String ID_FULL_TIME = "ddMMyyyyHHmmss";

  private static final String USER_ID_PREFIX = "WF";

  private final UserRepository userRepository;

  private final ProxyRepository proxyRepository;

  @EventListener(ContextRefreshedEvent.class)
  public void importAdminUser() {
    LocalDateTime now = LocalDateTime.now();
    UserAccount userAccount = new UserAccount();
    String userId = USER_ID_PREFIX.concat(
      now.format(DateTimeFormatter.ofPattern(ID_FULL_TIME)));
    userAccount.setUserId(userId);
    userAccount.setUserName("admin");
    userAccount.setPassword(Hashing.sha512().hashString("123", StandardCharsets.UTF_16).toString());
    List<String> authorities = new ArrayList<>();
    authorities.add("CREATE");
    authorities.add("GET");
    authorities.add("UPDATE");
    authorities.add("DELETE");
    userAccount.setAuthorities(authorities);
    userAccount.setRole("ADMIN");
    userAccount.setLevel(3);
    userAccount.setActive(true);
    userAccount.setLoginFailCount(0);
    userAccount.setCreatedBy("System");
    userAccount.setCreateDatetime(now);
    userAccount.setUpdateBy("System");
    userAccount.setUpdateDatetime(now);
    userAccount.setDeleted(false);
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail(
      userAccount.getUserName());
    if (result.isEmpty()) {
      userRepository.save(userAccount);
    }
  }

  @EventListener(ContextRefreshedEvent.class)
  public void importDevEnvProxy() {
    LocalDateTime now = LocalDateTime.now();
    Proxy proxy = new Proxy();
    proxy.setIpAddress("127.0.0.1");
    proxy.setRole("ADMIN");
    proxy.setCreatedBy("System");
    proxy.setCreateDatetime(now);
    proxy.setUpdateBy("System");
    proxy.setUpdateDatetime(now);
    proxy.setDeleted(false);
    Optional<Proxy> result = proxyRepository.getRole(
      proxy.getIpAddress());
    if (result.isEmpty()) {
      proxyRepository.save(proxy);
    }
  }

}
