package com.org.workflow.dao.repository.condition.user;

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
public class SearchByScreenIdCondition {

  private String screenId;

  private List<String> roleList;

  private Integer level;

  private String keyword;

}
