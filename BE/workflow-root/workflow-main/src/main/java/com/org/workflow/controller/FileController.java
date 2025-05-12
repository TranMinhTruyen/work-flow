package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.core.common.enums.MessageTypeEnum.SUCCESS;
import static com.org.workflow.core.common.enums.MessageTypeEnum.WARN;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.workflow.domain.annotation.IgnoreSecurity;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.file.S3FileRequest;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import com.org.workflow.domain.dto.response.file.DownloadFileResponse;
import com.org.workflow.domain.dto.response.file.UploadFileResponse;
import com.org.workflow.domain.utils.S3Util;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "FileController")
@RequestMapping(path = API_PREFIX + "/file")
public class FileController extends AbstractController {

  private final S3Util s3Util;

  @PostMapping("/get-upload-url")
  @IgnoreSecurity
  public ResponseEntity<BaseResponse> getUploadUrl(
      @RequestBody BaseRequest<S3FileRequest> uploadFileRequest) throws Exception {
    String uploadUrl = s3Util.generateUrlUpload(uploadFileRequest.getPayload());
    UploadFileResponse uploadFileResponse = new UploadFileResponse();
    uploadFileResponse.setUploadUrl(uploadUrl);
    return this.returnBaseResponse(uploadFileResponse, "Create success", SUCCESS, HttpStatus.OK);
  }

  @PostMapping("/get-download-url")
  @IgnoreSecurity
  public ResponseEntity<BaseResponse> getDownloadUrl(
      @RequestBody BaseRequest<S3FileRequest> uploadFileRequest) throws Exception {
    String uploadUrl = s3Util.generateUrlDownload(uploadFileRequest.getPayload());
    DownloadFileResponse downloadFileResponse = new DownloadFileResponse();
    downloadFileResponse.setDownloadUrl(uploadUrl);
    return this.returnBaseResponse(downloadFileResponse, "Create success", SUCCESS, HttpStatus.OK);
  }

  @PostMapping("/delete-file")
  @IgnoreSecurity
  public ResponseEntity<BaseResponse> deleteFile(
      @RequestBody BaseRequest<S3FileRequest> deletedFileRequest) throws Exception {
    String fileName = s3Util.deleteFile(deletedFileRequest.getPayload());
    if (StringUtils.isBlank(fileName)) {
      return this.returnBaseResponse(null, "Delete fail", WARN, HttpStatus.OK);
    }
    return this.returnBaseResponse(null, "Delete success", SUCCESS, HttpStatus.OK);
  }

}
