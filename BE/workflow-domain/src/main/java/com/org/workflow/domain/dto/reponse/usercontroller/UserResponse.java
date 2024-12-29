package com.org.workflow.domain.dto.reponse.usercontroller;

import com.org.workflow.domain.dto.common.FileData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

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

  private FileData image;

  private LocalDateTime createDatetime;

  private LocalDateTime updateDatetime;

}
