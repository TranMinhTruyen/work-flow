package com.org.workflow.service;

import com.org.workflow.common.cnst.EntityConst;
import com.org.workflow.common.utils.SeqUtil;
import com.org.workflow.controller.request.ItemMasterRequest;
import com.org.workflow.core.exception.AppException;
import com.org.workflow.dao.entity.ItemMaster;
import com.org.workflow.dao.repository.ItemMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemMasterService {
  
  private final ItemMasterRepository itemMasterRepository;
  
  private final SeqUtil seqUtil;
  
  public ItemMaster createMaster(ItemMasterRequest itemMasterRequest) throws AppException {
    Optional<List<ItemMaster>> test = itemMasterRepository.searchByKeyWord(itemMasterRequest.getKey());
    if (test.get().isEmpty()) {
      throw new AppException("test", null, HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
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
}
