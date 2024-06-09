package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.UserAccount;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends MongoRepository<UserAccount, Long> {

  Optional<UserAccount> findUserAccountByUserNameAndLoginPassword(String username, String password);

  Optional<UserAccount> findUserAccountByUserName(String username);

}
