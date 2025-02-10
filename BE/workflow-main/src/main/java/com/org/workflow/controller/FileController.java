package com.org.workflow.controller;

import static com.org.workflow.core.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.core.common.enums.MessageTypeEnum.SUCCESS;

import com.org.workflow.domain.dto.reponse.common.BaseResponse;
import com.org.workflow.domain.dto.reponse.filecontroller.UploadFileResponse;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import com.org.workflow.domain.dto.request.filecontroller.UploadFileRequest;
import com.org.workflow.domain.utils.S3Util;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    String uploadUrl = s3Util.generateUrlUpload(uploadFileRequest.getPayload().getFileName());
    UploadFileResponse uploadFileResponse = new UploadFileResponse();
    uploadFileResponse.setUploadUrl(uploadUrl);
    return this.returnBaseResponse(uploadFileResponse, "Create success", SUCCESS, HttpStatus.OK);
  }

}
