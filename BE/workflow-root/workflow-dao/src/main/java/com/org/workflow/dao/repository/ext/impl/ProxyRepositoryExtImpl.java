package com.org.workflow.dao.repository.ext.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import com.org.workflow.dao.document.Screen;
import com.org.workflow.dao.repository.ext.ProxyRepositoryExt;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * @author minh-truyen
 */
@RequiredArgsConstructor
public class ProxyRepositoryExtImpl implements ProxyRepositoryExt {

  private final MongoTemplate mongoTemplate;


  @Override
  public Optional<List<Screen>> findScreenMasterByListScreenId(List<String> listScreenId) {
    Criteria criteria = new Criteria().andOperator(
        where("screen_id").in(listScreenId),
        new Criteria().orOperator(
            where("is_active").isNull(),
            where("is_active").is(true)
        ),
        where("delete_by").isNull(),
        where("delete_date_time").isNull()
    );

    List<Screen> result = mongoTemplate.find(new Query(criteria), Screen.class);

    if (result.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(result);
  }

}
