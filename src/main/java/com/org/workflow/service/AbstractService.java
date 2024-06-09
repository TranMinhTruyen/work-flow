package com.org.workflow.service;

public abstract class AbstractService {

  public abstract void saveHistory(Object before, Object after, String tableName);

}
