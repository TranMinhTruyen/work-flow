package com.org.workflow.domain.utils;

import com.google.common.hash.Hashing;
import com.org.workflow.core.common.enums.AuthorityEnum;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.document.sub.Authentication;
import com.org.workflow.dao.repository.ScreenRepository;
import com.org.workflow.dao.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static com.org.workflow.core.common.enums.AuthorityEnum.CREATE;
import static com.org.workflow.core.common.enums.AuthorityEnum.DELETE;
import static com.org.workflow.core.common.enums.AuthorityEnum.GET;
import static com.org.workflow.core.common.enums.AuthorityEnum.UPDATE;
import static com.org.workflow.core.common.enums.RoleEnum.ROLE_ADMIN;
import static com.org.workflow.core.common.enums.RoleEnum.ROLE_USER;

@Component
@RequiredArgsConstructor
public class ApplicationStartup {

  private static final String SYSTEM = "System";

  private final UserRepository userRepository;

  private final ScreenRepository screenRepository;

  @EventListener(ContextRefreshedEvent.class)
  private void importAdminUser() {
    for (int i = 0; i < 200; i++) {
      int randomValue = (int) (Math.random() * 2);

      String username = randomValue == 0 ? "admin" + i : "user" + i;

      Optional<UserAccount> result = userRepository.findUserAccountByUserName(username);

      if (result.isEmpty()) {
        LocalDateTime now = LocalDateTime.now();
        UserAccount userAccount = new UserAccount();

        String userId = "WF".concat(
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")));
        userAccount.setUserId(userId);
        userAccount.setUserName(username);

        userAccount.setPassword(
            Hashing.sha512().hashString("123", StandardCharsets.UTF_16).toString());
        userAccount.setFullName(username);
        userAccount.setBirthDay("14-10-1999");
        userAccount.setEmail(username + "@" + username + ".com");
        userAccount.setRole(randomValue == 0 ? ROLE_ADMIN : ROLE_USER);
        userAccount.setAuthorities(randomAuthorityEnums(List.of(CREATE, GET, UPDATE, DELETE)));
        userAccount.setLevel((int) (Math.random() * 3) + 1);
        userAccount.setActive(true);
        userAccount.setLoginFailCount(0);

        List<String> accessScreenList = new ArrayList<>(randomValue == 0
            ? randomList(List.of("SCR00000", "SCR00001", "SCR00003"))
            : List.of("SCR00003"));

        accessScreenList.add("SCR00002");
        userAccount.setAccessScreenList(accessScreenList);
        userAccount.setCreatedBy(SYSTEM);
        userAccount.setCreateDatetime(now);
        userAccount.setUpdatedBy(SYSTEM);
        userAccount.setUpdatedDatetime(now);
        userAccount.setDeleted(false);

        userRepository.save(userAccount);
      }
    }
  }

  private List<AuthorityEnum> randomAuthorityEnums(List<AuthorityEnum> originalList) {
    int newSize = new Random().nextInt(originalList.size()) + 1;
    return new ArrayList<>(originalList.subList(0, newSize));
  }

  private List<String> randomList(List<String> originalList) {
    int newSize = new Random().nextInt(originalList.size()) + 1;
    return new ArrayList<>(originalList.subList(0, newSize));
  }


  @EventListener(ContextRefreshedEvent.class)
  private void importDevScreenMaster() {
    Optional<List<Screen>> result = screenRepository.findScreenMasterByListScreenId(
        List.of("SCR00000", "SCR00001", "SCR00002", "SCR00003"));
    if (result.isEmpty()) {
      LocalDateTime now = LocalDateTime.now();
      List<Screen> screenList = new ArrayList<>();
      Screen screen;

      screen = new Screen();
      screen.setScreenId("SCR00000");
      screen.setScreenNameEn("SCREEN SETTING");
      screen.setScreenUrl("/screen-setting");
      screen.setAuthentication(new Authentication(List.of(ROLE_ADMIN), 3));
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdatedBy(SYSTEM);
      screen.setUpdatedDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screen = new Screen();
      screen.setScreenId("SCR00001");
      screen.setScreenNameEn("USER SETTING");
      screen.setScreenUrl("/user-setting");
      screen.setAuthentication(new Authentication(List.of(ROLE_ADMIN), 3));
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdatedBy(SYSTEM);
      screen.setUpdatedDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screen = new Screen();
      screen.setScreenId("SCR00002");
      screen.setScreenNameEn("HOME");
      screen.setScreenUrl("/home");
      screen.setAuthentication(new Authentication(List.of(ROLE_ADMIN, ROLE_USER), 1));
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdatedBy(SYSTEM);
      screen.setUpdatedDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screen = new Screen();
      screen.setScreenId("SCR00003");
      screen.setScreenNameEn("KANBAN");
      screen.setScreenUrl("/kanban");
      screen.setAuthentication(new Authentication(List.of(ROLE_ADMIN, ROLE_USER), 1));
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdatedBy(SYSTEM);
      screen.setUpdatedDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screenRepository.saveAll(screenList);
    }
  }

}
