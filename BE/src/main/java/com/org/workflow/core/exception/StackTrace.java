package com.org.workflow.core.exception;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StackTrace implements Serializable {

  private String className;

  private String methodName;

  private long lineNumber;

}
