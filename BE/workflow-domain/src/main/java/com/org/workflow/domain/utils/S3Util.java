package com.org.workflow.domain.utils;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URLConnection;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class S3Util {

  private static final String BUCKET_NAME = "work_flow";

  private final MinioClient minioClient;

  /**
   * Upload file to S3.
   *
   * @param fileContent byte[]
   * @param fileName    String
   * @return String
   */
  public String uploadFile(byte[] fileContent, String fileName) {
    try (ByteArrayInputStream byteInputStream = new ByteArrayInputStream(fileContent)) {
      String contentType = URLConnection.guessContentTypeFromName(fileName);
      if (contentType == null) {
        contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
      }

      minioClient.putObject(
          PutObjectArgs.builder()
              .bucket(BUCKET_NAME)
              .object(fileName)
              .stream(byteInputStream, fileContent.length, -1)
              .contentType(contentType)
              .build()
      );

      return fileName;
    } catch (Exception exception) {
      return null;
    }
  }

  /**
   * Download file from Minio.
   *
   * @param fileName String
   * @return InputStream
   */
  public InputStream downloadFile(String fileName) {
    try (InputStream stream = minioClient.getObject(GetObjectArgs.builder()
        .bucket(BUCKET_NAME)
        .object(fileName)
        .build())) {
      return stream;
    } catch (Exception exception) {
      return null;
    }
  }

}
