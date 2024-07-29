package com.org.workflow.service;

import com.org.workflow.common.enums.ChangeTypeEnum;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.common.utils.HistoryUtil;
import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.reponse.MasterItemResponse;
import com.org.workflow.controller.request.MasterItemRequest;
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

  private final SeqUtil seqUtil;

  private final ItemMasterHistoryRepository itemMasterHistoryRepository;

  public MasterItem createItemMaster(MasterItemRequest masterItemRequest) {
    MasterItem create = new MasterItem();
    create.setMasterCode(masterItemRequest.getKey());
    create.setValue1(masterItemRequest.getValue1());
    create.setValue2(masterItemRequest.getValue2());
    create.setValue3(masterItemRequest.getValue3());
    create.setValue4(masterItemRequest.getValue4());
    create.setValue5(masterItemRequest.getValue5());
    create.setValue6(masterItemRequest.getValue6());
    create.setValue7(masterItemRequest.getValue7());
    create.setValue8(masterItemRequest.getValue8());
    create.setValue9(masterItemRequest.getValue9());
    create.setValue10(masterItemRequest.getValue10());
    create.setDisplayOrder(masterItemRequest.getDisplayOrder());
    create.setIsDeleted(false);

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

  public List<MasterItemResponse> getItemMaster(String keyword) {
    Optional<List<MasterItem>> result = itemMasterRepository.getItemMasterByMasterCodeAndIsDeletedIsFalse(
        keyword);
    List<MasterItemResponse> returnValue = new ArrayList<>();
    if (result.isPresent() && !result.get().isEmpty()) {
      MasterItemResponse masterItemResponse;
      for (MasterItem item : result.get()) {
        masterItemResponse = new MasterItemResponse();
        masterItemResponse.setId(String.valueOf(item.getId()));
        masterItemResponse.setKey(item.getMasterCode());
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
        masterItemResponse.setIsDeleted(item.getIsDeleted());
        returnValue.add(masterItemResponse);
      }
    }
    return returnValue;
  }

  public MasterItem updateItemMaster(MasterItemRequest masterItemRequest) throws WorkFlowException {
    Optional<MasterItem> result = itemMasterRepository
        .getItemMasterByIdAndMasterCode(
            Long.valueOf(masterItemRequest.getId()), masterItemRequest.getKey());
    MasterItem resultValue = result.orElseThrow(() -> new WorkFlowException(MessageEnum.NOT_FOUND));

    MasterItem update = new MasterItem();
    update.setId(resultValue.getId());
    update.setMasterCode(resultValue.getMasterCode());
    update.setValue1(masterItemRequest.getValue1());
    update.setValue2(masterItemRequest.getValue2());
    update.setValue3(masterItemRequest.getValue3());
    update.setValue4(masterItemRequest.getValue4());
    update.setValue5(masterItemRequest.getValue5());
    update.setValue6(masterItemRequest.getValue6());
    update.setValue7(masterItemRequest.getValue7());
    update.setValue8(masterItemRequest.getValue8());
    update.setValue9(masterItemRequest.getValue9());
    update.setValue10(masterItemRequest.getValue10());
    update.setDisplayOrder(masterItemRequest.getDisplayOrder());
    update.setIsDeleted(masterItemRequest.getIsDeleted());

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
