package com.org.workflow.domain.services;

import com.org.workflow.dao.repository.ScreenMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class ScreenMasterService extends AbstractService {

  private final ScreenMasterRepository screenMasterRepository;

}
