package com.org.workflow.service;

import com.org.workflow.common.cnst.EntityConst;
import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.reponse.ItemMasterResponse;
import com.org.workflow.controller.request.ItemMasterRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.dao.entity.ItemMaster;
import com.org.workflow.dao.repository.ItemMasterRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemMasterService {

  private final ItemMasterRepository itemMasterRepository;

  private final SeqUtil seqUtil;

  public ItemMaster createItemMaster(ItemMasterRequest itemMasterRequest) {
    ItemMaster create = new ItemMaster();
    create.setId(seqUtil.getSeq(EntityConst.MASTER));
    create.setKey(itemMasterRequest.getKey());
    create.setValue1(itemMasterRequest.getValue1());
    create.setValue2(itemMasterRequest.getValue2());
    create.setValue3(itemMasterRequest.getValue3());
    create.setValue4(itemMasterRequest.getValue4());
    create.setValue5(itemMasterRequest.getValue5());
    create.setValue6(itemMasterRequest.getValue6());
    create.setValue7(itemMasterRequest.getValue7());
    create.setValue8(itemMasterRequest.getValue8());
    create.setValue9(itemMasterRequest.getValue9());
    create.setValue10(itemMasterRequest.getValue10());
    return itemMasterRepository.save(create);
  }

  public List<ItemMasterResponse> getItemMaster(String keyword) {
    Optional<List<ItemMaster>> result = itemMasterRepository.searchByKeyWord(keyword);
    List<ItemMasterResponse> returnValue = new ArrayList<>();
    if (result.isPresent() && !result.get().isEmpty()) {
      ItemMasterResponse itemMasterResponse;
      for (ItemMaster item : result.get()) {
        itemMasterResponse = new ItemMasterResponse();
        itemMasterResponse.setKey(item.getKey());
        itemMasterResponse.setValue1(item.getValue1());
        itemMasterResponse.setValue2(item.getValue2());
        itemMasterResponse.setValue3(item.getValue3());
        itemMasterResponse.setValue4(item.getValue4());
        itemMasterResponse.setValue5(item.getValue5());
        itemMasterResponse.setValue6(item.getValue6());
        itemMasterResponse.setValue7(item.getValue7());
        itemMasterResponse.setValue8(item.getValue8());
        itemMasterResponse.setValue9(item.getValue9());
        itemMasterResponse.setValue10(item.getValue10());
        returnValue.add(itemMasterResponse);
      }
    }
    return returnValue;
  }

  public ItemMaster updateItemMaster(ItemMasterRequest itemMasterRequest) throws AppException {
    Optional<ItemMaster> result = itemMasterRepository.selectByIdAndKey(
        Long.valueOf(itemMasterRequest.getId()), itemMasterRequest.getKey());
    ItemMaster update = result.orElseThrow(() -> new AppException(MessageEnum.NOT_FOUND));
    update.setValue1(itemMasterRequest.getValue1());
    update.setValue2(itemMasterRequest.getValue2());
    update.setValue3(itemMasterRequest.getValue3());
    update.setValue4(itemMasterRequest.getValue4());
    update.setValue5(itemMasterRequest.getValue5());
    update.setValue6(itemMasterRequest.getValue6());
    update.setValue7(itemMasterRequest.getValue7());
    update.setValue8(itemMasterRequest.getValue8());
    update.setValue9(itemMasterRequest.getValue9());
    update.setValue10(itemMasterRequest.getValue10());
    return itemMasterRepository.save(update);
  }
}
