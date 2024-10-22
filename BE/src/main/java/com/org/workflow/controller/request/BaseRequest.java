package com.org.workflow.controller.request;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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
@JsonPropertyOrder(value = {"timestamp", "language", "ipAddress", "macAddress", "payload"})
public class BaseRequest<T> implements Serializable {

  private String timestamp;

  private String language;

  private String ipAddress;

  private String macAddress;

  private transient T payload;

}
