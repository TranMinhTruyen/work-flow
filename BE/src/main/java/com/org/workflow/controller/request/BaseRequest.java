package com.org.workflow.controller.request;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;
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
public class BaseRequest<T extends Serializable> implements Serializable {

  private String timestamp;

  private String language;

  private String ipAddress;

  private String macAddress;

  @Valid
  private T payload;

}
