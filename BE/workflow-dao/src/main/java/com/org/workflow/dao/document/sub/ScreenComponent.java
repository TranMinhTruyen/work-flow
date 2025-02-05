package com.org.workflow.dao.document.sub;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@Document(value = "screen_component")
public class ScreenComponent {

  @Field(name = "component_id", write = Field.Write.ALWAYS)
  private String componentId;

  @Field(name = "component_name", write = Field.Write.ALWAYS)
  private String componentName;

  @Field(name = "role", write = Field.Write.ALWAYS)
  private String role;

  @Field(name = "authorities", write = Field.Write.ALWAYS)
  private List<String> authorities;

  @Field(name = "level", write = Field.Write.ALWAYS)
  private Integer level;

}
