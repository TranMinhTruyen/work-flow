FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
  curl \
  unzip \
  build-essential \
  bash \
  xz-utils \
  tar \
  && rm -rf /var/lib/apt/lists/*

# Install Node
RUN curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh" | bash
ENV NVM_DIR="/root/.nvm"
ENV PATH="$NVM_DIR/versions/node/v22.9.0/bin:$PATH"
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install 22 && nvm alias default 22 && nvm use default"
RUN npm install -g yarn

# Install JDK
RUN curl -L "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jdk_x64_linux_hotspot_21.0.4_7.tar.gz" -o /tmp/jdk21.tar.gz \
  && mkdir -p /opt/jdk \
  && tar -xzf /tmp/jdk21.tar.gz -C /opt/jdk --strip-components=1 \
  && rm /tmp/jdk21.tar.gz

# Install Maven
RUN curl -L "https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip" -o /tmp/maven.zip \
  && unzip /tmp/maven.zip -d /opt/ \
  && rm /tmp/maven.zip \
  && mv /opt/apache-maven-3.9.9 /opt/maven

# Install Gradle
RUN curl -L "https://services.gradle.org/distributions/gradle-8.10.2-bin.zip" -o /tmp/gradle.zip \
  && unzip /tmp/gradle.zip -d /opt/ \
  && rm /tmp/gradle.zip \
  && mv /opt/gradle-8.10.2 /opt/gradle


# Cài đặt Docker CLI bên trong container Jenkins
RUN apt-get update && \
  apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  software-properties-common && \
  curl -fsSL "https://download.docker.com/linux/debian/gpg" | apt-key add - && \
  echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
  apt-get update && \
  apt-get install -y docker-ce docker-compose && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  usermod -aG docker jenkins

ENV DOCKER_HOST=tcp://host.docker.internal:2375
ENV JAVA_HOME=/opt/jdk
ENV MAVEN_HOME=/opt/maven
ENV GRADLE_HOME=/opt/gradle
ENV PATH="$JAVA_HOME/bin:$MAVEN_HOME/bin:$GRADLE_HOME/bin:$PATH"

# Build image: docker build -t jenkins .
# Run container: docker run --name jenkins -d --network jenkins -p 8086:8080 -p 50003:50000 -v D:\JenkinsHome:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=tcp://host.docker.internal:2375 jenkins