package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.core.common.enums.MessageTypeEnum.SUCCESS;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.file.DownloadFileRequest;
import com.org.workflow.domain.dto.request.file.UploadFileRequest;
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
  public ResponseEntity<BaseResponse> getUploadUrl(
      @RequestBody BaseRequest<UploadFileRequest> uploadFileRequest)
      throws Exception {
    String uploadUrl = s3Util.generateUrlUpload(uploadFileRequest.getPayload());
    UploadFileResponse uploadFileResponse = new UploadFileResponse();
    uploadFileResponse.setUploadUrl(uploadUrl);
    return this.returnBaseResponse(uploadFileResponse, "Create success", SUCCESS, HttpStatus.OK);
  }

  @PostMapping("/get-download-url")
  public ResponseEntity<BaseResponse> getDownloadUrl(
      @RequestBody BaseRequest<DownloadFileRequest> uploadFileRequest)
      throws Exception {
    String uploadUrl = s3Util.generateUrlDownload(uploadFileRequest.getPayload());
    DownloadFileResponse downloadFileResponse = new DownloadFileResponse();
    downloadFileResponse.setDownloadUrl(uploadUrl);
    return this.returnBaseResponse(downloadFileResponse, "Create success", SUCCESS, HttpStatus.OK);
  }

}
