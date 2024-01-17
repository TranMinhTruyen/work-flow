package com.org.workflow.dao.repository.exp.impl;

import com.org.workflow.dao.entity.ItemMaster;
import com.org.workflow.dao.entity.QItemMaster;
import com.org.workflow.dao.repository.exp.ItemMasterRepositoryExp;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ItemMasterRepositoryExpImpl extends QuerydslRepositorySupport implements ItemMasterRepositoryExp {
  public ItemMasterRepositoryExpImpl() {
    super(ItemMaster.class);
  }

  private static final QItemMaster itemMaster = QItemMaster.itemMaster;

  @Override
  public Optional<List<ItemMaster>> selectListMasterByKey(String key) {
    JPQLQuery<ItemMaster> query = from(itemMaster)
        .where(itemMaster.key.eq(key))
        .orderBy(itemMaster.id.asc());
    return Optional.ofNullable(query.fetch());
  }

  @Override
  public Optional<ItemMaster> selectByIdAndKey(Long id, String key) {
    JPQLQuery<ItemMaster> query = from(itemMaster)
        .where(itemMaster.id.eq(id)
            .and(itemMaster.key.eq(key)));
    return Optional.ofNullable(query.fetchFirst());
  }

  @Override
  public Optional<List<ItemMaster>> searchByKeyWord(String keyword) {
    BooleanBuilder booleanBuilder = new BooleanBuilder();
    booleanBuilder.or(itemMaster.id.like(keyword))
        .or(itemMaster.key.likeIgnoreCase(keyword))
        .or(itemMaster.value1.likeIgnoreCase(keyword))
        .or(itemMaster.value2.likeIgnoreCase(keyword))
        .or(itemMaster.value3.likeIgnoreCase(keyword))
        .or(itemMaster.value4.likeIgnoreCase(keyword))
        .or(itemMaster.value5.likeIgnoreCase(keyword))
        .or(itemMaster.value6.likeIgnoreCase(keyword))
        .or(itemMaster.value7.likeIgnoreCase(keyword))
        .or(itemMaster.value8.likeIgnoreCase(keyword))
        .or(itemMaster.value9.likeIgnoreCase(keyword))
        .or(itemMaster.value10.likeIgnoreCase(keyword));
    JPQLQuery<ItemMaster> query = from(itemMaster).where(booleanBuilder);
    return Optional.ofNullable(query.fetch());
  }
}
