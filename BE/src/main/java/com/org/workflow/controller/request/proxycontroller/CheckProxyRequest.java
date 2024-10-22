package com.org.workflow.controller.request.proxycontroller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckProxyRequest {

  private String ipAddress;

  private String macAddress;

}
