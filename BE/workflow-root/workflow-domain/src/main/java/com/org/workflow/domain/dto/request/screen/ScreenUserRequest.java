package com.org.workflow.domain.dto.request.screen;

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
public class ScreenUserRequest {

  private List<String> roleList;

  private Integer level;

  private String screenId;

  private String keyword;

}
