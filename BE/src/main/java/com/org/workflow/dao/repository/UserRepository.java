package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.UserAccount;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserAccount, Long> {

  @Query(value = "{ $and: [{user_name: ?0}, {login_password: ?1}] }")
  Optional<UserAccount> findUserAccountByUserNameAndLoginPassword(String username, String password);

  @Query(value = "{ $or: [{user_name: ?0}, {email: ?0}] }")
  Optional<UserAccount> findUserAccountByUserNameOrEmail(String param);

}
