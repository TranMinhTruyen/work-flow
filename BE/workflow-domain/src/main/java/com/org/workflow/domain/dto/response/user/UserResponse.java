package com.org.workflow.domain.dto.response.user;

import com.org.workflow.domain.dto.response.proxy.ScreenResponse;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse implements Serializable {

  private String userId;

  private String email;

  private String username;

  private String fullName;

  private String birthDay;

  private String role;

  private Integer loginFailCount;

  private Boolean isActive;

  private List<String> authorities;

  private Integer level;

  private List<ScreenResponse> screenMasterList;

  private String image;

  private LocalDateTime createDatetime;

  private LocalDateTime updateDatetime;

}
