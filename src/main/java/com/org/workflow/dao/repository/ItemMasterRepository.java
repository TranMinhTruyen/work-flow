package com.org.workflow.dao.repository;

import com.org.workflow.dao.entity.ItemMaster;
import com.org.workflow.dao.repository.exp.ItemMasterRepositoryExp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemMasterRepository extends JpaRepository<ItemMaster, Long>, ItemMasterRepositoryExp {
}
