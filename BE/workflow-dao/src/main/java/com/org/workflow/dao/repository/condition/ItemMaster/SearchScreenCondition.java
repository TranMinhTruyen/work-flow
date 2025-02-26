package com.org.workflow.dao.repository.condition.ItemMaster;

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
public class SearchScreenCondition {

  private String screenId;

  private String screenName;

  private String screenUrl;

  private String isActive;

}
