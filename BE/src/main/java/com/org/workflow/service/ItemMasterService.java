package com.org.workflow.service;

import static com.org.workflow.common.enums.MessageEnum.ITEM_MASTER_EXISTS;
import static com.org.workflow.common.enums.MessageEnum.NOT_FOUND;

import com.org.workflow.common.enums.ChangeTypeEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.HistoryUtil;
import com.org.workflow.controller.reponse.mastercontroller.MasterItemResponse;
import com.org.workflow.controller.request.BaseRequest;
import com.org.workflow.controller.request.mastercontroller.MasterItemRequest;
import com.org.workflow.core.exception.WorkFlowException;
import com.org.workflow.dao.document.ChangeValue;
import com.org.workflow.dao.document.MasterItem;
import com.org.workflow.dao.document.MasterItemHistory;
import com.org.workflow.dao.repository.ItemMasterHistoryRepository;
import com.org.workflow.dao.repository.ItemMasterRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemMasterService extends AbstractService {

  private final ItemMasterRepository itemMasterRepository;

  private final ItemMasterHistoryRepository itemMasterHistoryRepository;

  private final ExceptionService exceptionService;

  public MasterItem createItemMaster(BaseRequest<MasterItemRequest> request)
      throws WorkFlowException {
    MasterItemRequest payload = request.getPayload();

    Optional<MasterItem> findResult = itemMasterRepository.getItemMasterByMasterCodeAndMasterValueAndIsDeletedIsFalse(
        payload.getMasterCode(), payload.getMasterValue());

    if (findResult.isPresent()) {
      throw exceptionService.getWorkFlowException(ITEM_MASTER_EXISTS, request.getLanguage());
    }

    MasterItem create = new MasterItem();
    create.setMasterCode(payload.getMasterCode());
    create.setKey(payload.getMasterValue());
    create.setValue1(payload.getValue1());
    create.setValue2(payload.getValue2());
    create.setValue3(payload.getValue3());
    create.setValue4(payload.getValue4());
    create.setValue5(payload.getValue5());
    create.setValue6(payload.getValue6());
    create.setValue7(payload.getValue7());
    create.setValue8(payload.getValue8());
    create.setValue9(payload.getValue9());
    create.setValue10(payload.getValue10());
    create.setDisplayOrder(payload.getDisplayOrder());
    create.setDeleted(false);

    String username = AuthUtil.getAuthentication().getUsername();
    LocalDateTime now = LocalDateTime.now();
    create.setCreatedBy(username);
    create.setCreateDatetime(now);
    create.setUpdateBy(username);
    create.setUpdateDatetime(now);

    MasterItem result = itemMasterRepository.save(create);

    this.saveHistory(new MasterItem(), result, ChangeTypeEnum.CREATE);

    return result;
  }

  public List<MasterItemResponse> getItemMaster(BaseRequest<String> request) {
    String payload = request.getPayload();
    Optional<List<MasterItem>> result = itemMasterRepository.getItemMasterByMasterCodeAndDeletedIsFalse(
        payload);
    List<MasterItemResponse> returnValue = new ArrayList<>();
    if (result.isPresent() && !result.get().isEmpty()) {
      MasterItemResponse masterItemResponse;
      for (MasterItem item : result.get()) {
        masterItemResponse = new MasterItemResponse();
        masterItemResponse.setId(String.valueOf(item.getId()));
        masterItemResponse.setMasterCode(item.getMasterCode());
        masterItemResponse.setMasterValue(item.getKey());
        masterItemResponse.setValue1(item.getValue1());
        masterItemResponse.setValue2(item.getValue2());
        masterItemResponse.setValue3(item.getValue3());
        masterItemResponse.setValue4(item.getValue4());
        masterItemResponse.setValue5(item.getValue5());
        masterItemResponse.setValue6(item.getValue6());
        masterItemResponse.setValue7(item.getValue7());
        masterItemResponse.setValue8(item.getValue8());
        masterItemResponse.setValue9(item.getValue9());
        masterItemResponse.setValue10(item.getValue10());
        masterItemResponse.setDisplayOrder(item.getDisplayOrder());
        returnValue.add(masterItemResponse);
      }
    }
    return returnValue;
  }

  public MasterItem updateItemMaster(BaseRequest<MasterItemRequest> request)
      throws WorkFlowException {
    MasterItemRequest payload = request.getPayload();

    Optional<MasterItem> result = itemMasterRepository.getItemMasterByIdAndMasterCode(
        payload.getId(), payload.getMasterCode());
    MasterItem resultValue = result.orElseThrow(
        () -> exceptionService.getWorkFlowException(NOT_FOUND, request.getLanguage()));

    MasterItem update = new MasterItem();
    update.setId(resultValue.getId());
    update.setMasterCode(resultValue.getMasterCode());
    update.setKey(resultValue.getKey());
    update.setValue1(payload.getValue1());
    update.setValue2(payload.getValue2());
    update.setValue3(payload.getValue3());
    update.setValue4(payload.getValue4());
    update.setValue5(payload.getValue5());
    update.setValue6(payload.getValue6());
    update.setValue7(payload.getValue7());
    update.setValue8(payload.getValue8());
    update.setValue9(payload.getValue9());
    update.setValue10(payload.getValue10());
    update.setDisplayOrder(payload.getDisplayOrder());

    String username = AuthUtil.getAuthentication().getUsername();
    LocalDateTime now = LocalDateTime.now();
    update.setCreatedBy(username);
    update.setCreateDatetime(now);
    update.setUpdateBy(username);
    update.setUpdateDatetime(now);

    MasterItem updateResult = itemMasterRepository.save(update);

    this.saveHistory(resultValue, updateResult, ChangeTypeEnum.UPDATE);

    return updateResult;
  }

  private void saveHistory(MasterItem before, MasterItem after, ChangeTypeEnum changeType) {
    MasterItemHistory masterItemHistory = new MasterItemHistory();
    masterItemHistory.setMasterCode(after.getMasterCode());

    ChangeValue changeValue = new ChangeValue();

    // Set change value for masterValue
    changeValue.setFieldValueBefore(before.getKey());
    changeValue.setFieldValueAfter(after.getKey());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue1(changeValue);

    // Set change value for value 1
    changeValue.setFieldValueBefore(before.getValue1());
    changeValue.setFieldValueAfter(after.getValue1());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue1(changeValue);

    // Set change value for value 2
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue2());
    changeValue.setFieldValueAfter(after.getValue2());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue2(changeValue);

    // Set change value for value 3
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue3());
    changeValue.setFieldValueAfter(after.getValue3());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue3(changeValue);

    // Set change value for value 4
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue4());
    changeValue.setFieldValueAfter(after.getValue4());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue4(changeValue);

    // Set change value for value 5
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue5());
    changeValue.setFieldValueAfter(after.getValue5());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue5(changeValue);

    // Set change value for value 6
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue6());
    changeValue.setFieldValueAfter(after.getValue6());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue6(changeValue);

    // Set change value for value 7
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue7());
    changeValue.setFieldValueAfter(after.getValue7());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue7(changeValue);

    // Set change value for value 8
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue8());
    changeValue.setFieldValueAfter(after.getValue8());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue8(changeValue);

    // Set change value for value 9
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue9());
    changeValue.setFieldValueAfter(after.getValue9());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue9(changeValue);

    // Set change value for value 10
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getValue10());
    changeValue.setFieldValueAfter(after.getValue10());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setValue10(changeValue);

    // Set change value for display order
    changeValue = new ChangeValue();
    changeValue.setFieldValueBefore(before.getDisplayOrder());
    changeValue.setFieldValueAfter(after.getDisplayOrder());
    changeValue.setChangeType(HistoryUtil.checkChangeType(changeValue.getFieldValueBefore(),
        changeValue.getFieldValueAfter(), changeType));
    masterItemHistory.setDisplayOrder(changeValue);

    String username = AuthUtil.getAuthentication().getUsername();
    LocalDateTime now = LocalDateTime.now();
    masterItemHistory.setCreatedBy(username);
    masterItemHistory.setCreateDatetime(now);
    masterItemHistory.setUpdateBy(username);
    masterItemHistory.setUpdateDatetime(now);

    itemMasterHistoryRepository.save(masterItemHistory);
  }

}
