package com.org.workflow.domain.utils;

import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

public class RSAUtil {

  private static final String RSA = "RSA";

  private static final String TRANSFORMATION = "RSA/ECB/PKCS1Padding";

  /**
   * Decrypt data.
   *
   * @param data       String
   * @param privateHex String
   * @return String
   */
  public static String decryptRSA(String data, String privateHex) {
    try {
      privateHex = privateHex.replaceAll("^0+", "");
      if (privateHex.length() % 2 != 0) {
        privateHex = "0" + privateHex;
      }

      byte[] privateHexBytes = Base64.getDecoder().decode(privateHex.getBytes());

      PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateHexBytes);
      KeyFactory keyFactory = KeyFactory.getInstance(RSA);
      PrivateKey privateKey = keyFactory.generatePrivate(privateKeySpec);

      byte[] encryptedData = Base64.getDecoder().decode(data);
      Cipher cipher = Cipher.getInstance(TRANSFORMATION);
      cipher.init(Cipher.DECRYPT_MODE, privateKey);
      byte[] decryptedData = cipher.doFinal(encryptedData);

      return new String(decryptedData, StandardCharsets.UTF_8);
    } catch (Exception e) {
      return "";
    }
  }

}
