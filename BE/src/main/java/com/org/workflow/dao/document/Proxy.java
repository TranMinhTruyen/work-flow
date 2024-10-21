package com.org.workflow.dao.document;

import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(value = "proxy")
public class Proxy extends AbstractDocument implements Serializable {

  @Field(name = "ip_address", write = Write.ALWAYS)
  private String ipAddress;

  @Field(name = "mac_address", write = Write.ALWAYS)
  private String macAddress;

  @Field(name = "role", write = Write.ALWAYS)
  private String role;

}
