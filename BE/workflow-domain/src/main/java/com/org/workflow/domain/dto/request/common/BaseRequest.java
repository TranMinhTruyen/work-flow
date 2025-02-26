package com.org.workflow.domain.dto.request.common;

import jakarta.validation.Valid;
import java.io.Serializable;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class BaseRequest<T extends Serializable> implements Serializable {

  private String timestamp;

  private String language;

  @Valid
  private T payload;

}
