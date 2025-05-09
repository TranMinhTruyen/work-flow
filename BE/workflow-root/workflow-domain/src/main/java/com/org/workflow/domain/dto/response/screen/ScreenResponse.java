package com.org.workflow.domain.dto.response.screen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScreenResponse implements Serializable {

  private String screenId;

  private String screenName;

  private String screenUrl;

  private List<String> roles;

  private Integer level;

  private boolean isActive;

}
