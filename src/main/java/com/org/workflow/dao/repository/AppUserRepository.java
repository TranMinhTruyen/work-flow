package com.org.workflow.dao.repository;

import com.org.workflow.dao.entity.AppUser;
import com.org.workflow.dao.repository.exp.AppUserRepositoryExp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, String>, AppUserRepositoryExp {
}
