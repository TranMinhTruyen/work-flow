package com.org.workflow.domain.dto.request.screen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAssignRequest implements Serializable {

  private String userAction;
  
  private String screenId;

  private List<String> listUserId;

}
