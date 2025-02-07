package com.org.workflow.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author minh-truyen
 */
@Configuration
public class S3Config {

  @Value("${s3.accessKey}")
  private String accessKey;

  @Value("${s3.secretKey}")
  private String secretKey;

  @Value("${s3.minio-endpoint}")
  private String minioEndpoint;

  @Bean
  public MinioClient minioClient() {
    return MinioClient.builder()
        .endpoint(minioEndpoint)
        .credentials(accessKey, secretKey)
        .build();
  }

}
