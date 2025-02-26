package com.org.workflow.domain.dto.request.proxy;

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
public class SearchScreenRequest implements Serializable {

  private String screenId;

  private String screenName;

  private String screenUrl;

  private boolean isActive;

}
