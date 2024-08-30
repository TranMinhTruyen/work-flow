package com.org.workflow.common.utils;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.core.exception.WorkFlowException;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class FileUtil {

  public static String writeImage(byte[] fileContent, String fileName) throws WorkFlowException {
    File file = new File("D:/work-flow/image/" + fileName);
    try {
      FileUtils.writeByteArrayToFile(file, fileContent);
      return file.getPath();
    } catch (IOException e) {
      throw new WorkFlowException(MessageEnum.WRITE_FILE_ERROR, fileName);
    }
  }

}
