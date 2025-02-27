package com.org.workflow.domain.dto.request.proxy;

import java.io.Serializable;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class SearchScreenRequest implements Serializable {

  private String screenId;

  private String screenName;

  private String screenUrl;

  private boolean isActive;

}
