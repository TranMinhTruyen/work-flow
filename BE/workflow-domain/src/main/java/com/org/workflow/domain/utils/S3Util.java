package com.org.workflow.domain.utils;

import io.minio.GetObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.http.Method;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URLConnection;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class S3Util {
  
  private static final String BUCKET_NAME = "workflow";

  private static final int EXPIRY = 2 * 60;

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

  public String generateUrlUpload(String objectName) throws Exception {
    return minioClient.getPresignedObjectUrl(
        GetPresignedObjectUrlArgs.builder()
            .method(Method.PUT)
            .bucket(BUCKET_NAME)
            .object(objectName)
            .expiry(EXPIRY)
            .build()
    );
  }

  public String generateUrlDownload(String objectName) throws Exception {
    return minioClient.getPresignedObjectUrl(
        GetPresignedObjectUrlArgs.builder()
            .method(Method.GET)
            .bucket(BUCKET_NAME)
            .object(objectName)
            .expiry(EXPIRY)
            .build()
    );
  }
}
