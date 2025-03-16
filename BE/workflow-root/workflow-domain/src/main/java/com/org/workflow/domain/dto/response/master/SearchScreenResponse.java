package com.org.workflow.domain.dto.response.master;

import java.io.Serializable;

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
public class SearchScreenResponse implements Serializable {

  private String screenId;

  private String screenName;

  private String screenUrl;

  private boolean isActive;

  private String createdBy;

  private String createDatetime;

  private String updatedBy;

  private String updateDatetime;

}
