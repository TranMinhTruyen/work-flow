package com.org.workflow.dao.document.sub;

import com.org.workflow.core.common.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * @author minh-truyen
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "authentication")
public class Authentication {

  @Field(name = "roles", write = Field.Write.ALWAYS)
  private List<RoleEnum> roles;

  @Field(name = "level", write = Field.Write.ALWAYS)
  private int level;

}
