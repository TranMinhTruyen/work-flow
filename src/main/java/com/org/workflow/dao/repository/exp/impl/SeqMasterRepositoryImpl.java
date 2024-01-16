package com.org.workflow.dao.repository.exp.impl;

import com.org.workflow.dao.entity.QSeqMaster;
import com.org.workflow.dao.entity.SeqMaster;
import com.org.workflow.dao.repository.exp.SeqMasterRepositoryExp;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class SeqMasterRepositoryImpl extends QuerydslRepositorySupport implements SeqMasterRepositoryExp {
  
  public SeqMasterRepositoryImpl() {
    super(SeqMaster.class);
  }
  
  private static final QSeqMaster seqMaster = QSeqMaster.seqMaster;

  @Override
  public Optional<SeqMaster> selectByEntityName(String entityName) {
    JPQLQuery<SeqMaster> query = from(seqMaster).where(seqMaster.entityName.eq(entityName));
    return Optional.ofNullable(query.fetchFirst());
  }
}
