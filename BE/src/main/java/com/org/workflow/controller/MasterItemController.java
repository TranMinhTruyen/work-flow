package com.org.workflow.controller;

import static com.org.workflow.common.cnst.CommonConst.API_PREFIX;
import static com.org.workflow.common.enums.AuthorityEnums.CREATE;
import static com.org.workflow.common.enums.LevelEnums.HIGH_LEVEL;
import static com.org.workflow.common.enums.MessageTypeEnum.SUCCESS;
import static com.org.workflow.common.enums.RoleEnums.ROLE_ADMIN;

import com.org.workflow.common.annotation.Authentication;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.BaseResponse;
import com.org.workflow.controller.reponse.mastercontroller.MasterItemResponse;
import com.org.workflow.controller.request.BaseRequest;
import com.org.workflow.controller.request.mastercontroller.MasterItemRequest;
import com.org.workflow.core.exception.WorkFlowException;
import com.org.workflow.dao.document.MasterItem;
import com.org.workflow.service.ItemMasterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "ItemMasterController")
@RequestMapping(path = API_PREFIX + "/master-item")
public class MasterItemController extends AbstractController {

  private final ItemMasterService itemMasterService;

  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @Authentication(authority = CREATE, role = ROLE_ADMIN, level = HIGH_LEVEL)
  @PostMapping("/create")
  public ResponseEntity<BaseResponse> createItemMaster(
    @RequestBody BaseRequest<MasterItemRequest> masterItemRequest) throws WorkFlowException {
    MasterItem result = itemMasterService.createItemMaster(masterItemRequest.getPayload());
    return this.returnBaseResponse(result, "Create success", SUCCESS, HttpStatus.OK);
  }

  @PostMapping("/get")
  public ResponseEntity<BaseResponse> getItemMaster(
    @RequestParam(required = false) BaseRequest<String> keyword) {
    List<MasterItemResponse> masterItemResponseList = itemMasterService.getItemMaster(
      keyword.getPayload());
    return this.returnBaseResponse(masterItemResponseList, MessageEnum.GET_SUCCESS, "item master");
  }

  @Operation(security = {@SecurityRequirement(name = "Authorization")})
  @Authentication(authority = CREATE, role = ROLE_ADMIN, level = HIGH_LEVEL)
  @PostMapping("/update")
  public ResponseEntity<BaseResponse> updateItemMaster(
    @RequestBody BaseRequest<MasterItemRequest> masterItemRequest) throws WorkFlowException {
    MasterItem result = itemMasterService.updateItemMaster(masterItemRequest.getPayload());
    return this.returnBaseResponse(result, "Update success", SUCCESS, HttpStatus.OK);
  }

}
