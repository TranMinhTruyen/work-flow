package com.org.workflow.domain.dto.reponse.filecontroller;

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
public class DownloadFileResponse {

  public String downloadUrl;

}
