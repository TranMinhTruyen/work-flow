package com.org.workflow.dao.repository.condition.user;

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
public class SearchByScreenIdCondition {

  private String screenId;

  private String keyword;

}
