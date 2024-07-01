package com.org.workflow.service;

import com.org.workflow.common.utils.SeqUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public abstract class AbstractService {

  @Autowired
  protected SeqUtil seqUtil;

}
