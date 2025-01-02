package com.org.workflow.dao.document.sub;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * @author minh-truyen
 */
@Data
@Document(value = "user_access_screen")
public class UserAccessScreen {

  @Field(name = "screen_id", write = Field.Write.ALWAYS)
  private String screenId;

  @Field(name = "screen_name", write = Field.Write.ALWAYS)
  private String screenName;

  @Field(name = "screen_url", write = Field.Write.ALWAYS)
  private String screenUrl;

}
