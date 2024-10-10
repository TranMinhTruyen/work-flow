package com.org.workflow.common.utils;

import static com.org.workflow.common.enums.MessageEnum.READ_FILE_ERROR;
import static com.org.workflow.common.enums.MessageEnum.WRITE_FILE_ERROR;

import com.org.workflow.controller.request.FileData;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;


public class FileUtil {

  private FileUtil() {
  }

  public static String writeFile(byte[] fileContent, String fileName, String filePath)
      throws WorkFlowException {
    try {
      File file = new File(filePath + fileName);
      FileUtils.writeByteArrayToFile(file, fileContent);
      return file.getPath();
    } catch (IOException e) {
      throw new WorkFlowException(new ErrorDetail(WRITE_FILE_ERROR, "", filePath + fileName));
    }
  }

  public static String writeFile(FileData fileData, String filePath) throws WorkFlowException {
    try {
      File file = new File(filePath + fileData.getName());
      FileUtils.writeByteArrayToFile(file, fileData.getData());
      return file.getPath();
    } catch (IOException e) {
      throw new WorkFlowException(new ErrorDetail(WRITE_FILE_ERROR, fileData.getName()));
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

        return outputFile;
      } catch (IOException e) {
        throw new WorkFlowException(new ErrorDetail(READ_FILE_ERROR, filePath));
      }
    } else {
      return null;
    }
  }

}
