package com.org.workflow.domain.utils;

import static com.org.workflow.core.common.enums.MessageEnum.READ_FILE_ERROR;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.org.workflow.core.common.exception.ErrorDetail;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.common.FileData;


public class FileUtil {

  private static final Logger LOGGER = LoggerFactory.getLogger(FileUtil.class);

  private static final int BUFFER_SIZE = 1024 * 512;

  private FileUtil() {
  }

  public static String writeFile(byte[] fileContent, String fileName, String filePath) {
    try {
      File file = new File(filePath + fileName);
      FileUtils.writeByteArrayToFile(file, fileContent);
      LOGGER.info("Write file finish, file path: {}", file.getPath());
      return file.getPath();
    } catch (IOException e) {
      LOGGER.error("Write file error: {}", e.getMessage());
      return null;
    }
  }

  public static String writeFile(FileData fileData, String filePath) {
    try {
      File file = new File(filePath + fileData.getName());
      FileUtils.writeByteArrayToFile(file, fileData.getData());
      LOGGER.info("Write file finish, file path: {}", file.getPath());
      return file.getPath();
    } catch (IOException e) {
      LOGGER.error("Write file error: {}", e.getMessage());
      return null;
    }
  }

  public static FileData readFile(String filePath) throws WFException {
    if (!StringUtils.isBlank(filePath)) {
      try {
        File file = new File(filePath);
        byte[] content = FileUtils.readFileToByteArray(file);

        FileData outputFile = new FileData();
        outputFile.setName(file.getName());
        outputFile.setData(content);

        LOGGER.info("Read file finish, file name: {}", file.getName());
        return outputFile;
      } catch (IOException e) {
        throw new WFException(new ErrorDetail(READ_FILE_ERROR));
      }
    } else {
      return null;
    }
  }

  // TODO demo
  public static byte[] readFileToBytes(InputStream inputStream) throws IOException {
    try (BufferedInputStream bis = new BufferedInputStream(inputStream);
        ByteArrayOutputStream out = new ByteArrayOutputStream()) {
      byte[] buffer = new byte[BUFFER_SIZE];
      int bytesRead;
      while ((bytesRead = bis.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
      }
      return out.toByteArray();
    }
  }

}
