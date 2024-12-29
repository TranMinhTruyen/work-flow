package com.org.workflow.domain.dto.request.proxycontroller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckProxyRequest implements Serializable {

  private String ipAddress;

  private String macAddress;

}
