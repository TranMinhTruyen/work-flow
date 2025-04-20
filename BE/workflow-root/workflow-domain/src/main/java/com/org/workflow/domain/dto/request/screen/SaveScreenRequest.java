package com.org.workflow.domain.dto.request.screen;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.org.workflow.core.common.enums.ValidateEnum;
import com.org.workflow.domain.annotation.Validate;

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
public class SaveScreenRequest implements Serializable {

  @Validate(required = true)
  private String id;

  @Validate(required = true)
  private String screenId;

  @Validate(errorCode = ValidateEnum.MIN_MAX_VALIDATE, maxLength = 100)
  private String screenNameEn;

  @Validate(errorCode = ValidateEnum.MIN_MAX_VALIDATE, maxLength = 100)
  private String screenNameVi;

  @Validate(errorCode = ValidateEnum.MIN_MAX_VALIDATE, maxLength = 100)
  private String screenNameJa;

  @Validate(required = true)
  private String screenUrl;

  @Validate(required = true)
  private boolean isActive;

  private LocalDateTime updatedDatetime;

}
