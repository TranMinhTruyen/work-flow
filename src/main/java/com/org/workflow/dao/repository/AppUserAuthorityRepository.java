package com.org.workflow.dao.repository;

import com.org.workflow.dao.entity.AppUserAuthority;
import com.org.workflow.dao.repository.exp.AppUserAuthorityRepositoryExp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserAuthorityRepository extends JpaRepository<AppUserAuthority, Long>,
    AppUserAuthorityRepositoryExp {

}
