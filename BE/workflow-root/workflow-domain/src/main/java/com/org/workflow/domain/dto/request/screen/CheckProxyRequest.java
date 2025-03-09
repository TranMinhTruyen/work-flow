package com.org.workflow.domain.dto.request.screen;

import java.io.Serializable;

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
public class CheckProxyRequest implements Serializable {

  private String ipAddress;

  private String macAddress;

}
