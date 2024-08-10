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

  @Field(name = "value_1", write = Write.ALWAYS)
  private ChangeValue value1;

  @Field(name = "value_2", write = Write.ALWAYS)
  private ChangeValue value2;

  @Field(name = "value_3", write = Write.ALWAYS)
  private ChangeValue value3;

  @Field(name = "value_4", write = Write.ALWAYS)
  private ChangeValue value4;

  @Field(name = "value_5", write = Write.ALWAYS)
  private ChangeValue value5;

  @Field(name = "value_6", write = Write.ALWAYS)
  private ChangeValue value6;

  @Field(name = "value_7", write = Write.ALWAYS)
  private ChangeValue value7;

  @Field(name = "value_8", write = Write.ALWAYS)
  private ChangeValue value8;

  @Field(name = "value_9", write = Write.ALWAYS)
  private ChangeValue value9;

  @Field(name = "value_10", write = Write.ALWAYS)
  private ChangeValue value10;

  @Field(name = "display_order", write = Write.ALWAYS)
  private ChangeValue displayOrder;

}
