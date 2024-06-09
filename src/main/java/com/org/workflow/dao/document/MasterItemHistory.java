package com.org.workflow.dao.document;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "master_item_history")
public class MasterItemHistory extends AbstractDocument implements Serializable {

  @Field(name = "master_code", write = Write.NON_NULL)
  private String masterCode;

  @Field(name = "value_1")
  private ChangeValue value1;

  @Field(name = "value_2")
  private ChangeValue value2;

  @Field(name = "value_3")
  private ChangeValue value3;

  @Field(name = "value_4")
  private ChangeValue value4;

  @Field(name = "value_5")
  private ChangeValue value5;

  @Field(name = "value_6")
  private ChangeValue value6;

  @Field(name = "value_7")
  private ChangeValue value7;

  @Field(name = "value_8")
  private ChangeValue value8;

  @Field(name = "value_9")
  private ChangeValue value9;

  @Field(name = "value_10")
  private ChangeValue value10;

  @Field(name = "display_order")
  private ChangeValue displayOrder;

}
