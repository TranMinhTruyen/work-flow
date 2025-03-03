package com.org.workflow.core.common.exception;

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
public class ErrorMessage implements Serializable {

  private String errorOrder;

  private String errorCode;

  private transient Object errorMessage;

}
