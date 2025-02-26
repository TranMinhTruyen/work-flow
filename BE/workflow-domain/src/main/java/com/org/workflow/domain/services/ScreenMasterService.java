package com.org.workflow.domain.services;

import com.org.workflow.dao.repository.ScreenMasterRepository;
import com.org.workflow.dao.repository.condition.ItemMaster.SearchScreenCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class ScreenMasterService extends AbstractService {

  private final ScreenMasterRepository screenMasterRepository;

  public void search() {
    screenMasterRepository.searchScreenMaster(new SearchScreenCondition(), Pageable.ofSize(1));
  }
}
