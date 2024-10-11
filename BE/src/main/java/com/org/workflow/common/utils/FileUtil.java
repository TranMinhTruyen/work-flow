package com.org.workflow.common.utils;

import static com.org.workflow.common.enums.MessageEnum.READ_FILE_ERROR;

import com.org.workflow.controller.request.FileData;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class FileUtil {

  private static final Logger LOGGER = LoggerFactory.getLogger(FileUtil.class);

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

  public static FileData readFile(String filePath) throws WorkFlowException {
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
        throw new WorkFlowException(new ErrorDetail(READ_FILE_ERROR, "", filePath));
      }
    } else {
      return null;
    }
  }

}
