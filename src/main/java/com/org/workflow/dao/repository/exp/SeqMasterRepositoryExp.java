package com.org.workflow.dao.repository.exp;

import com.org.workflow.dao.entity.SeqMaster;

import java.util.Optional;

public interface SeqMasterRepositoryExp {
  Optional<SeqMaster> selectByEntityName(String entityName);
}
