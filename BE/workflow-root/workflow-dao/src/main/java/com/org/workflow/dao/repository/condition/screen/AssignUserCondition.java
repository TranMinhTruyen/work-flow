package com.org.workflow.dao.repository.condition.screen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignUserCondition {

  private String screenId;

  private List<String> listUserId;

}
