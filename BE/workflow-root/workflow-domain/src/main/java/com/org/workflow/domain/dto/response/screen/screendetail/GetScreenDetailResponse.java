package com.org.workflow.domain.dto.response.screen.screendetail;

import java.io.Serializable;
import java.time.LocalDateTime;
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
public class GetScreenDetailResponse implements Serializable {

  private String id;

  private String screenId;

  private String screenName;

  private String screenUrl;

  private List<ScreenComponentResponse> screenComponentList;

  private boolean isActive;

  private LocalDateTime createdDatetime;

  private LocalDateTime updatedDatetime;

}
