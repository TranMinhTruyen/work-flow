package com.org.workflow.controller;

import com.org.workflow.common.cnst.AuthConst;
import com.org.workflow.common.cnst.CoreConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.MasterItemResponse;
import com.org.workflow.controller.request.MasterItemRequest;
import com.org.workflow.core.exception.WorkFlowException;
import com.org.workflow.dao.document.MasterItem;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Tag(name = "ItemMasterController")
@RequestMapping(path = CoreConst.API_PREFIX + "/master-item")
public class MasterItemController extends AbstractController {

  private final ItemMasterService itemMasterService;

  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PreAuthorize(AuthConst.ITEM_MASTER_CREATE)
  @PostMapping("/create")
  public ResponseEntity<BaseResponse> createItemMaster(
      @RequestBody MasterItemRequest masterItemRequest) throws WorkFlowException {
    MasterItem result = itemMasterService.createItemMaster(masterItemRequest);
    return this.returnBaseResponse(result, "Create success", HttpStatus.OK);
  }

  @PostMapping("/get")
  public ResponseEntity<BaseResponse> getItemMaster(
      @RequestParam(required = false) String keyword) {
    List<MasterItemResponse> masterItemResponseList = itemMasterService.getItemMaster(keyword);
    return this.returnBaseResponse(masterItemResponseList, MessageEnum.GET_SUCCESS, "item master");
  }

  @Operation(responses = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "500", description = "Server error"),
      @ApiResponse(responseCode = "403", description = "Forbidden")}, security = {
      @SecurityRequirement(name = "Authorization")})
  @PostMapping("/update")
  public ResponseEntity<BaseResponse> updateItemMaster(
      @RequestBody MasterItemRequest masterItemRequest) throws WorkFlowException {
    MasterItem result = itemMasterService.updateItemMaster(masterItemRequest);
    return this.returnBaseResponse(result, "Update success", HttpStatus.OK);
  }

}
