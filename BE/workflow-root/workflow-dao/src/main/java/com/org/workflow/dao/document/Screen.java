package com.org.workflow.dao.document;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

import com.org.workflow.dao.document.sub.Authentication;
import com.org.workflow.dao.document.sub.ScreenComponent;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author minh-truyen
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "screen")
public class Screen extends AbstractDocument implements Serializable {

  @Field(name = "screen_id", write = Field.Write.ALWAYS)
  private String screenId;

  @Field(name = "screen_name_en", write = Field.Write.ALWAYS)
  private String screenNameEn;

  @Field(name = "screen_name_vi", write = Field.Write.ALWAYS)
  private String screenNameVi;

  @Field(name = "screen_name_ja", write = Field.Write.ALWAYS)
  private String screenNameJa;

  @Field(name = "screen_url", write = Field.Write.ALWAYS)
  private String screenUrl;

  @Field(name = "authentication", write = Field.Write.ALWAYS)
  private Authentication authentication;

  @Field(name = "screen_components", write = Field.Write.ALWAYS)
  private List<ScreenComponent> screenComponentList;

  @Field(name = "note", write = Field.Write.ALWAYS)
  private String note;

  @Field(name = "is_active", write = Write.ALWAYS)
  private boolean isActive;

}
