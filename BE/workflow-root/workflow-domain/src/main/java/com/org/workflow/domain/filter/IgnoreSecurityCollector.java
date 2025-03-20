package com.org.workflow.domain.filter;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import com.org.workflow.domain.annotation.IgnoreSecurity;

import lombok.RequiredArgsConstructor;

import jakarta.annotation.PostConstruct;

/**
 * @author minh-truyen
 */
@Component
@RequiredArgsConstructor
public class IgnoreSecurityCollector {

  private static final String[] WHITE_LIST =
      {"/swagger-ui/**", "/api-docs/**", "/v3/api-docs/**", "/work-flow/swagger-ui/**",
          "/work-flow/v3/api-docs/**", "/swagger-ui.html", "/api-docs", "/ws/**",
          "/api/master-item/get", "/api/file/**"};

  private final Set<String> excludedUrls = new HashSet<>();

  private final RequestMappingHandlerMapping requestMappingHandlerMapping;

  @PostConstruct
  public void init() {
    Map<RequestMappingInfo, HandlerMethod> handlerMethods =
        requestMappingHandlerMapping.getHandlerMethods();

    if (handlerMethods != null) {
      handlerMethods.forEach((mappingInfo, handlerMethod) -> {
        boolean isBypass = handlerMethod.getMethod().isAnnotationPresent(IgnoreSecurity.class)
            || handlerMethod.getBeanType().isAnnotationPresent(IgnoreSecurity.class);

        if (isBypass) {
          PatternsRequestCondition patternsCondition = mappingInfo.getPatternsCondition();

          if (patternsCondition != null) {
            Set<String> patterns = patternsCondition.getPatterns();
            excludedUrls.addAll(patterns);
          }

          mappingInfo.getPathPatternsCondition().getPatterns()
              .forEach(pathPattern -> excludedUrls.add(pathPattern.getPatternString()));
        }
      });
    }
    excludedUrls.addAll(List.of(WHITE_LIST));
  }

  public String[] getExcludedUrls() {
    return excludedUrls.toArray(new String[0]);
  }

}
