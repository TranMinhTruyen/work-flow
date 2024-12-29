package com.org.workflow.domain.dto.common;

import lombok.Data;

import java.io.Serializable;

/**
 * @author minh-truyen
 */
@Data
public class FileData implements Serializable {

  private String name;

  private byte[] data;

}
