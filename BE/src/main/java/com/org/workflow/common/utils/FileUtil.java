package com.org.workflow.common.utils;

import static com.org.workflow.common.cnst.CommonConst.IMAGE_PATH;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.request.FileData;
import com.org.workflow.core.exception.WorkFlowException;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class FileUtil {

  public static String writeFile(byte[] fileContent, String fileName) throws WorkFlowException {
    try {
      File file = new File(IMAGE_PATH + fileName);
      FileUtils.writeByteArrayToFile(file, fileContent);
      return file.getPath();
    } catch (IOException e) {
      throw new WorkFlowException(MessageEnum.WRITE_FILE_ERROR, fileName);
    }
  }

  public static String writeFile(FileData fileData) throws WorkFlowException {
    try {
      File file = new File(IMAGE_PATH + fileData.getName());
      FileUtils.writeByteArrayToFile(file, fileData.getData());
      return file.getPath();
    } catch (IOException e) {
      throw new WorkFlowException(MessageEnum.WRITE_FILE_ERROR, fileData.getName());
    }
  }

  public static FileData readFile(String filePath) throws WorkFlowException {
    try {
      File file = new File(filePath);
      byte[] content = FileUtils.readFileToByteArray(file);

      FileData outputFile = new FileData();
      outputFile.setName(file.getName());
      outputFile.setData(content);

      return outputFile;
    } catch (IOException e) {
      throw new WorkFlowException(MessageEnum.READ_FILE_ERROR, filePath);
    }
  }

}
