package com.org.workflow.domain.utils;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URLConnection;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.org.workflow.domain.dto.request.file.S3FileRequest;

import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.StatObjectArgs;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class S3Util {

  private static final String BUCKET_NAME = "workflow";

  private static final String TRASH_BUCKET = "trash";

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

      minioClient.putObject(PutObjectArgs.builder().bucket(BUCKET_NAME).object(fileName)
          .stream(byteInputStream, fileContent.length, -1).contentType(contentType).build());

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
    try (InputStream stream = minioClient.getObject(
        GetObjectArgs.builder().bucket(BUCKET_NAME).object(fileName).build())) {
      return stream;
    } catch (Exception exception) {
      return null;
    }
  }

  /**
   * Check bucket is exist.
   *
   * @param bucketName String
   * @return boolean
   */
  public boolean isBucketExist(String bucketName) {
    try {
      return minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
    } catch (Exception exception) {
      return false;
    }
  }

  /**
   * Check file is exist in bucket.
   *
   * @param bucketName String
   * @param objectName String
   * @return boolean
   */
  public boolean isFileExist(String bucketName, String objectName) {
    if (!isBucketExist(bucketName)) {
      return false;
    }
    try {
      minioClient.statObject(
          StatObjectArgs.builder().bucket(bucketName).object(objectName).build());
      return true;
    } catch (Exception exception) {
      return false;
    }
  }

  /**
   * Get uploadURL.
   *
   * @param fileRequest S3FileRequest
   * @return String
   * @throws Exception Exception
   */
  public String generateUrlUpload(S3FileRequest fileRequest) throws Exception {
    if (!isBucketExist(fileRequest.getBucketName())) {
      minioClient.makeBucket(MakeBucketArgs.builder().bucket(fileRequest.getBucketName()).build());
    }
    return minioClient.getPresignedObjectUrl(
        GetPresignedObjectUrlArgs.builder().method(Method.PUT).bucket(fileRequest.getBucketName())
            .object(fileRequest.getObjectId()).expiry(EXPIRY).build());
  }

  /**
   * Get downloadURL.
   *
   * @param fileRequest S3FileRequest
   * @return String
   * @throws Exception Exception
   */
  public String generateUrlDownload(S3FileRequest fileRequest) throws Exception {
    if (isFileExist(fileRequest.getBucketName(), fileRequest.getObjectId())) {
      return minioClient.getPresignedObjectUrl(
          GetPresignedObjectUrlArgs.builder().method(Method.GET).bucket(fileRequest.getBucketName())
              .object(fileRequest.getObjectId()).expiry(EXPIRY).build());
    }
    return null;
  }

  /**
   * @param fileRequest S3FileRequest
   * @return String
   * @throws Exception Exception
   */
  public String deleteFile(S3FileRequest fileRequest) throws Exception {
    if (isFileExist(fileRequest.getBucketName(), fileRequest.getObjectId())) {
      minioClient.removeObject(RemoveObjectArgs.builder().bucket(fileRequest.getBucketName())
          .object(fileRequest.getObjectId()).build());
      return fileRequest.getObjectId();
    }
    return null;
  }

}
