package com.org.workflow.domain.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserResponse {

  private String userId;

  private String fullName;

  private String role;

  private LocalDateTime updateDatetime;

  private List<String> authorities;

}
