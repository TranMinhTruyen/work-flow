package com.org.workflow.dao.document.sub;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
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
