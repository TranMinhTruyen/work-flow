# Sử dụng JDK 21 với Tomcat 11
FROM eclipse-temurin:21-jdk-noble AS builder

# Cài đặt Gradle
RUN apt-get update && apt-get install -y gradle

# Tạo thư mục để chứa ứng dụng
WORKDIR /app

# Copy mã nguồn và Gradle
COPY . .

# Thêm quyền thực thi cho gradlew
RUN chmod +x ./gradlew

#Tạo file gradlew
RUN ./gradlew wrapper

# Build ứng dụng để tạo file WAR
RUN ./gradlew clean build

# Dùng Tomcat 11 làm server
FROM tomcat:11.0-jdk21

# Cài đặt Tomcat Manager và Host Manager
RUN apt-get update && apt-get install -y curl && \
  curl -O https://downloads.apache.org/tomcat/tomcat-11/v11.0.0-M26/bin/apache-tomcat-11.0.0-M26.tar.gz && \
  tar -xzvf apache-tomcat-11.0.0-M26.tar.gz && \
  mv apache-tomcat-11.0.0-M26/webapps/manager /usr/local/tomcat/webapps/manager && \
  mv apache-tomcat-11.0.0-M26/webapps/host-manager /usr/local/tomcat/webapps/host-manager 

# Thêm người dùng quản lý vào Tomcat
RUN echo '<tomcat-users>\n' \
  '<role rolename="manager-gui"/>\n' \
  '<role rolename="admin-gui"/>\n' \
  '<user username="admin" password="password" roles="manager-gui,admin-gui"/>\n' \
  '</tomcat-users>' > /usr/local/tomcat/conf/tomcat-users.xml 

# Cấu hình cho context.xml để cho phép truy cập
RUN echo '<Context antiResourceLocking="false" privileged="true">\n' \
  '<Valve className="org.apache.catalina.valves.RemoteIpValve" remoteIpHeader="X-Forwarded-For" proxiesHeader="X-Forwarded-By"/>\n' \
  '</Context>' > /usr/local/tomcat/webapps/manager/META-INF/context.xml

# Copy file WAR đã build vào thư mục webapps của Tomcat
COPY --from=builder /app/build/libs/*.war /usr/local/tomcat/webapps/

# Mở cổng 8080
EXPOSE 8080

# Khởi động Tomcat
CMD ["catalina.sh", "run"]
