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

  @Field(name = "master_code", write = Write.ALWAYS)
  private String masterCode;

  @Field(name = "master_value", write = Write.ALWAYS)
  private String masterValue;

  @Field(name = "value_1", write = Write.ALWAYS)
  private String value1;

  @Field(name = "value_2", write = Write.ALWAYS)
  private String value2;

  @Field(name = "value_3", write = Write.ALWAYS)
  private String value3;

  @Field(name = "value_4", write = Write.ALWAYS)
  private String value4;

  @Field(name = "value_5", write = Write.ALWAYS)
  private String value5;

  @Field(name = "value_6", write = Write.ALWAYS)
  private String value6;

  @Field(name = "value_7", write = Write.ALWAYS)
  private String value7;

  @Field(name = "value_8", write = Write.ALWAYS)
  private String value8;

  @Field(name = "value_9", write = Write.ALWAYS)
  private String value9;

  @Field(name = "value_10", write = Write.ALWAYS)
  private String value10;

  @Field(name = "display_order", write = Write.ALWAYS)
  private Integer displayOrder;

}
