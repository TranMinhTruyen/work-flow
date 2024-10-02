FROM jenkins/jenkins:lts

USER root

# Cài đặt Docker CLI bên trong container Jenkins
RUN apt-get update && \
  apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  software-properties-common && \
  curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
  echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
  apt-get update && \
  apt-get install -y docker-ce docker-compose && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  usermod -aG docker jenkins

ENV DOCKER_HOST=tcp://host.docker.internal:2375

USER jenkins

# Build image: docker build -t jenkins .
# Run container: docker run --name jenkins -d --network jenkins -p 8086:8080 -p 50003:50000 -v D:\JenkinsHome:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=tcp://host.docker.internal:2375 jenkins