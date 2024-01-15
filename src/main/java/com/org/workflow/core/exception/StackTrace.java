package com.org.workflow.core.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StackTrace implements Serializable {
  private String className;
  private String methodName;
  private long lineNumber;
}
