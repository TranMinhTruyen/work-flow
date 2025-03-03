package com.org.workflow.domain.dto.common;

import java.io.Serializable;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class FileData implements Serializable {

  private String name;

  private byte[] data;

}
