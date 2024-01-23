package com.org.workflow.controller;

import com.org.workflow.common.cnst.AuthConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.ItemMasterResponse;
import com.org.workflow.controller.request.ItemMasterRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.dao.entity.ItemMaster;
import com.org.workflow.service.ItemMasterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "ItemMasterController")
@RestController
@RequiredArgsConstructor
public class ItemMasterController extends AbstractController {

  private final ItemMasterService itemMasterService;

  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PreAuthorize(AuthConst.ITEM_MASTER_CREATE)
  @PostMapping("/item-master/create")
  public ResponseEntity<BaseResponse> createItemMaster(
      @RequestBody ItemMasterRequest itemMasterRequest) {
    ItemMaster result = itemMasterService.createItemMaster(itemMasterRequest);
    return this.returnBaseResponse(result, "Create success", HttpStatus.OK);
  }


  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PostMapping("/item-master/get")
  public ResponseEntity<BaseResponse> getItemMaster(
      @RequestParam(required = false) String keyword) {
    List<ItemMasterResponse> itemMasterResponseList = itemMasterService.getItemMaster(keyword);
    return this.returnBaseResponse(itemMasterResponseList, MessageEnum.GET_SUCCESS, "item master");
  }


  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PostMapping("/item-master/update")
  public ResponseEntity<BaseResponse> updateItemMaster(
      @RequestBody ItemMasterRequest itemMasterRequest) throws AppException {
    ItemMaster result = itemMasterService.updateItemMaster(itemMasterRequest);
    return this.returnBaseResponse(result, "Update success", HttpStatus.OK);
  }

}
