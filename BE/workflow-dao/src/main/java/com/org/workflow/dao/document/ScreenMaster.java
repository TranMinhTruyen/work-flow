package com.org.workflow.dao.document;

import com.org.workflow.dao.document.sub.ScreenComponent;
import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

/**
 * @author minh-truyen
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "screen_master")
public class ScreenMaster extends AbstractDocument implements Serializable {

  @Field(name = "screen_id", write = Field.Write.ALWAYS)
  private String screenId;

  @Field(name = "screen_name", write = Field.Write.ALWAYS)
  private String screenName;

  @Field(name = "screen_url", write = Field.Write.ALWAYS)
  private String screenUrl;

  @Field(name = "screen_components", write = Field.Write.ALWAYS)
  private List<ScreenComponent> screenComponentList;

  @Field(name = "is_active", write = Write.ALWAYS)
  private boolean isActive;

}
