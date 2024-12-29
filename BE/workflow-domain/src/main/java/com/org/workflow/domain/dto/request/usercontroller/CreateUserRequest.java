package com.org.workflow.domain.dto.request.usercontroller;

import com.org.workflow.domain.dto.common.FileData;
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
public class CreateUserRequest implements Serializable {

  private String email;

  private String userName;

  private String password;

  private String fullName;

  private String birthDay;

  private String role;

  private List<String> authorities;

  private Integer level;

  private FileData image;

}
