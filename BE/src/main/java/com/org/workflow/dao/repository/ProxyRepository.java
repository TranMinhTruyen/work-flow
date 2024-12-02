package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.Proxy;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author minh-truyen
 */
@Repository
public interface ProxyRepository extends MongoRepository<Proxy, String> {

  @Query(value = """
        {
          $and: [
            {
              $or: [
                { ip_address: ?0 },
                { mac_address: ?0 }
              ]
            },
            { is_deleted: false },
            { delete_by: null },
            { delete_date_time: null }
          ]
        }
      """)
  Optional<Proxy> getRole(String param);

}
