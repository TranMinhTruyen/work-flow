package com.org.workflow.core.exception;

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
public class Error implements Serializable {

  private String errorOrder;

  private String errorCode;

  private transient Object errorMessage;

}
