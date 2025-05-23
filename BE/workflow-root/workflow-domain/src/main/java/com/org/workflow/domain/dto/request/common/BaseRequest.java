package com.org.workflow.domain.dto.request.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;
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
@JsonPropertyOrder(value = {"timestamp", "language", "payload"})
public class BaseRequest<T extends Serializable> implements Serializable {

  private String timestamp;

  private String language;

  @Valid
  private T payload;

}
