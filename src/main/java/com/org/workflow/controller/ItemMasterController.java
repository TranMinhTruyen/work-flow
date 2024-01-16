package com.org.workflow.controller;

import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.request.ItemMasterRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.dao.entity.ItemMaster;
import com.org.workflow.service.ItemMasterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "ItemMasterController")
@RestController
@RequiredArgsConstructor
public class ItemMasterController extends AbstractController {

  private final ItemMasterService itemMasterService;

  @PostMapping("/item-master/create")
  public ResponseEntity<BaseResponse> createItemMaster(ItemMasterRequest itemMasterRequest) throws AppException {
    ItemMaster result = itemMasterService.createMaster(itemMasterRequest);
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessage("Create item master success");
    baseResponse.setBody(result);
    baseResponse.setStatus(HttpStatus.OK);
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, httpHeaders, HttpStatus.OK);
  }
}
