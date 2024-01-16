package com.org.workflow.dao.repository;

import com.org.workflow.dao.entity.SeqMaster;
import com.org.workflow.dao.repository.exp.SeqMasterRepositoryExp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeqMasterRepository extends JpaRepository<SeqMaster, Long>, SeqMasterRepositoryExp {
}
