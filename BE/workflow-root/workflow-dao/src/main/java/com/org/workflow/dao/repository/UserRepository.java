package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.dao.repository.ext.UserRepositoryExt;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author minh-truyen
 */
@Repository
public interface UserRepository extends MongoRepository<UserAccount, String>, UserRepositoryExt {

  @Query(value = """ 
      {
        $and: [
          { user_name: ?0 },
          { login_password: ?1 }
        ]
      }
      """)
  Optional<UserAccount> findUserAccountByUserNameAndLoginPassword(String username, String password);

  Optional<UserAccount> findUserAccountByUserName(String userName);
}
