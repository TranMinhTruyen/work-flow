package com.org.workflow.domain.dto.response.screen;

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
public class RemoveUserResponse implements Serializable {

  private long totalRemoveUser;

}
