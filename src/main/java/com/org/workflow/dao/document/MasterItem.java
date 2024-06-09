package com.org.workflow.dao.document;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "master_item")
public class MasterItem extends AbstractDocument implements Serializable {

  @Field(name = "master_code", write = Write.NON_NULL)
  private String masterCode;

  @Field(name = "value_1", write = Write.NON_NULL)
  private String value1;

  @Field(name = "value_2")
  private String value2;

  @Field(name = "value_3")
  private String value3;

  @Field(name = "value_4")
  private String value4;

  @Field(name = "value_5")
  private String value5;

  @Field(name = "value_6")
  private String value6;

  @Field(name = "value_7")
  private String value7;

  @Field(name = "value_8")
  private String value8;

  @Field(name = "value_9")
  private String value9;

  @Field(name = "value_10")
  private String value10;

  @Field(name = "display_order")
  private int displayOrder;

}
