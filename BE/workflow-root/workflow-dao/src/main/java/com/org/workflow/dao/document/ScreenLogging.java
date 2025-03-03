package com.org.workflow.dao.document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

/**
 * @author minh-truyen
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "screen_logging")
public class ScreenLogging extends AbstractDocument implements Serializable {

  @Field(name = "screen_id", write = Field.Write.ALWAYS)
  private String screenId;

  @Field(name = "screen_name", write = Field.Write.ALWAYS)
  private String screenName;

  @Field(name = "url", write = Field.Write.ALWAYS)
  private String url;

  @Field(name = "user_id", write = Field.Write.ALWAYS)
  private String userId;

  @Field(name = "user_name", write = Field.Write.ALWAYS)
  private String userName;

}
