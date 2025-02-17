package com.org.workflow.domain.dto.response.proxy;

import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccessScreenResponse implements Serializable {

  private List<ScreenMasterResponse> screenMasterList;

}
