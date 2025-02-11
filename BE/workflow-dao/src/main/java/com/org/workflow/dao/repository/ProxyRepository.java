package com.org.workflow.dao.repository;

import com.org.workflow.dao.document.Proxy;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

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
  Optional<Proxy> getProxy(String param);

}
