package com.org.workflow.domain.utils;

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

@Component
@RequiredArgsConstructor
public class ApplicationStartup {

  private static final String ID_FULL_TIME = "ddMMyyyyHHmmss";
  private static final String USER_ID_PREFIX = "WF";
  private static final String SYSTEM = "System";

  private final ProxyRepository proxyRepository;

  private final UserRepository userRepository;

  @EventListener(ContextRefreshedEvent.class)
  private void importAdminUser() {
    Optional<UserAccount> result = userRepository.findUserAccountByUserNameOrEmail("admin");
    if (result.isEmpty()) {
      LocalDateTime now = LocalDateTime.now();
      UserAccount userAccount = new UserAccount();
      String userId = USER_ID_PREFIX.concat(
          now.format(DateTimeFormatter.ofPattern(ID_FULL_TIME)));
      userAccount.setUserId(userId);
      userAccount.setUserName("admin");
      userAccount.setPassword(
          Hashing.sha512().hashString("123", StandardCharsets.UTF_16).toString());
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
      userAccount.setCreatedBy(SYSTEM);
      userAccount.setCreateDatetime(now);
      userAccount.setUpdateBy(SYSTEM);
      userAccount.setUpdateDatetime(now);
      userAccount.setDeleted(false);

      userRepository.save(userAccount);
    }
  }

  @EventListener(ContextRefreshedEvent.class)
  private void importDevEnvProxy() {
    Optional<Proxy> result = proxyRepository.getProxy("127.0.0.1");
    if (result.isEmpty()) {
      LocalDateTime now = LocalDateTime.now();
      Proxy proxy = new Proxy();
      proxy.setIpAddress("127.0.0.1");
      proxy.setRole("ADMIN");
      proxy.setType("SYSTEM");
      proxy.setStatus("ACTIVE");
      proxy.setCreatedBy(SYSTEM);
      proxy.setCreateDatetime(now);
      proxy.setUpdateBy(SYSTEM);
      proxy.setUpdateDatetime(now);
      proxy.setDeleted(false);

      proxyRepository.save(proxy);
    }
  }

}
