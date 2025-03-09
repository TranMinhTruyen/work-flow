package com.org.workflow.domain.dto.response.screen.screendetail;

import java.io.Serializable;
import java.util.List;

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
public class ScreenComponentResponse implements Serializable {

  private String componentId;

  private String componentName;

  private String role;

  private List<String> authorities;

  private Integer level;

}
