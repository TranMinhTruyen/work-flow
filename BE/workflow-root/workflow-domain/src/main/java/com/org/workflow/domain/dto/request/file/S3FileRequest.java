package com.org.workflow.domain.dto.request.file;

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
public class S3FileRequest implements Serializable {

  public String objectId;

  public String bucketName;

}
