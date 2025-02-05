package com.org.workflow.dao.document;

import com.org.workflow.dao.document.sub.ScreenComponent;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "screen_master")
public class ScreenMaster  extends AbstractDocument implements Serializable {

  @Field(name = "screen_id", write = Field.Write.ALWAYS)
  private String screenId;

  @Field(name = "screen_name", write = Field.Write.ALWAYS)
  private String screenName;

  @Field(name = "url", write = Field.Write.ALWAYS)
  private String url;

  @Field(name = "screen_component_list", write = Field.Write.ALWAYS)
  private List<ScreenComponent> screenComponentList;

}
