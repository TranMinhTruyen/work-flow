package com.org.workflow.domain.utils;

import com.org.workflow.dao.document.Proxy;
import com.org.workflow.dao.document.ScreenMaster;
import com.org.workflow.dao.repository.ProxyRepository;
import com.org.workflow.dao.repository.ScreenMasterRepository;
import java.time.LocalDateTime;
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

  private final ScreenMasterRepository screenMasterRepository;


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
    Optional<List<ScreenMaster>> result = proxyRepository.findScreenMasterByListScreenId(
        List.of("SCR00001", "SCR00002"));
    if (result.isEmpty()) {
      LocalDateTime now = LocalDateTime.now();
      ScreenMaster screenMaster = new ScreenMaster();
      screenMaster.setScreenId("SCR00001");
      screenMaster.setScreenName("HOME");
      screenMaster.setScreenUrl("/home");
      screenMaster.setActive(true);
      screenMaster.setCreatedBy(SYSTEM);
      screenMaster.setCreateDatetime(now);
      screenMaster.setUpdateBy(SYSTEM);
      screenMaster.setUpdateDatetime(now);
      screenMaster.setDeleted(false);

      screenMasterRepository.save(screenMaster);

      screenMaster = new ScreenMaster();
      screenMaster.setScreenId("SCR00002");
      screenMaster.setScreenName("KANBAN");
      screenMaster.setScreenUrl("/kanban-v2");
      screenMaster.setActive(true);
      screenMaster.setCreatedBy(SYSTEM);
      screenMaster.setCreateDatetime(now);
      screenMaster.setUpdateBy(SYSTEM);
      screenMaster.setUpdateDatetime(now);
      screenMaster.setDeleted(false);

      screenMasterRepository.save(screenMaster);
    }
  }

}
