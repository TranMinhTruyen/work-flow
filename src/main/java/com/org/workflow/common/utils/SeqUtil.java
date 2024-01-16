package com.org.workflow.common.utils;

import com.org.workflow.dao.entity.SeqMaster;
import com.org.workflow.dao.repository.SeqMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SeqUtil {
  
  private final SeqMasterRepository seqMasterRepository;
  
  public Long getSeq(String entityName) {
    Optional<SeqMaster> queryResult = seqMasterRepository.selectByEntityName(entityName);
    if (queryResult.isPresent()) {
      SeqMaster update = queryResult.get();
      update.setSequence(update.getSequence() + 1L);
      seqMasterRepository.save(update);
      return update.getSequence();
    } else {
      SeqMaster create = new SeqMaster();
      create.setEntityName(entityName);
      create.setSequence(1L);
      seqMasterRepository.save(create);
      return 1L;
    }
  }
}
