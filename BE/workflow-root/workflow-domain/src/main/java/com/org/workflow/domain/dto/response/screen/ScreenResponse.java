package com.org.workflow.domain.dto.response.screen;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScreenResponse implements Serializable {

  private String screenId;

  private String screenName;

  private String screenUrl;

}
