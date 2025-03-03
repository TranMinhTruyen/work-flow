package com.org.workflow.domain.utils;

import com.org.workflow.dao.document.Proxy;
import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ProxyRepository;
import com.org.workflow.dao.repository.ScreenRepository;
import java.time.LocalDateTime;
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

  private static final String SYSTEM = "System";

  private final ProxyRepository proxyRepository;

  private final ScreenRepository screenRepository;


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


  @EventListener(ContextRefreshedEvent.class)
  private void importDevScreenMaster() {
    Optional<List<Screen>> result = proxyRepository.findScreenMasterByListScreenId(
        List.of("SCR00000", "SCR00001", "SCR00002", "SCR00003"));
    if (result.isEmpty()) {
      LocalDateTime now = LocalDateTime.now();
      List<Screen> screenList = new ArrayList<>();
      Screen screen;

      screen = new Screen();
      screen.setScreenId("SCR00000");
      screen.setScreenName("SCREEN MASTER");
      screen.setScreenUrl("/screen-master");
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdateBy(SYSTEM);
      screen.setUpdateDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screen = new Screen();
      screen.setScreenId("SCR00001");
      screen.setScreenName("USER MASTER");
      screen.setScreenUrl("/user-master");
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdateBy(SYSTEM);
      screen.setUpdateDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screen = new Screen();
      screen.setScreenId("SCR00002");
      screen.setScreenName("HOME");
      screen.setScreenUrl("/home");
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdateBy(SYSTEM);
      screen.setUpdateDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screen = new Screen();
      screen.setScreenId("SCR00003");
      screen.setScreenName("KANBAN");
      screen.setScreenUrl("/kanban");
      screen.setActive(true);
      screen.setCreatedBy(SYSTEM);
      screen.setCreateDatetime(now);
      screen.setUpdateBy(SYSTEM);
      screen.setUpdateDatetime(now);
      screen.setDeleted(false);

      screenList.add(screen);

      screenRepository.saveAll(screenList);
    }
  }

}
