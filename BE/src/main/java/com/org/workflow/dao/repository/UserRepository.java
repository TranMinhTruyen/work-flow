package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.UserAccount;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author minh-truyen
 */
@Repository
public interface UserRepository extends MongoRepository<UserAccount, String> {

  @Query(value = """ 
      {
        $and: [
          { user_name: ?0 },
          { login_password: ?1 }
        ]
      }
      """)
  Optional<UserAccount> findUserAccountByUserNameAndLoginPassword(String username, String password);

  @Query(value = """
      {
        $and: [
          {
            $or: [
              { user_name: ?0 },
              { email: ?0 }
            ]
          },
          {
            $or: [
              { is_active: null },
              { is_active: true },
            ]
          },
          { delete_by: null },
          { delete_date_time: null }
        ]
      }
      """)
  Optional<UserAccount> findUserAccountByUserNameOrEmail(String param);

}
