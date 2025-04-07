package com.org.workflow.dao.repository.condition.screen;

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
public class RemoveUserCondition {

  private String screenId;

  private List<String> listUserId;

}
