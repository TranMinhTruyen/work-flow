package com.org.workflow.domain.dto.request.common;

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
public class BaseRequest<T extends Serializable> implements Serializable {

  private String timestamp;

  private String language;

  @Valid
  private T payload;

}
