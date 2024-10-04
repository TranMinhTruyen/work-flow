pipeline {
    agent any

    environment {
        mongoContainerName = 'work-flow-mongodb' // Container MongoDB
        redisContainerName = 'work-flow-redis' // Container Redis
        tomcatContainerName = 'work-flow-tomcat' // Container Redis
        reactContainerName = 'work-flow-react' // Container Redis
        backupDir = '/data'
        dbName = 'work-flow'
        dropDb = false
    }

    stages {
        stage('Preparation') {
            steps {
                cleanWs()
                script {
                    def dateTime = sh(script: "date +%Y%m%d_%H%M%S", returnStdout: true).trim()
                    def tomcatExists = sh(script: "docker ps -q -f name=${tomcatContainerName}", returnStdout: true).trim()
                    def reactExists = sh(script: "docker ps -q -f name=${reactContainerName}", returnStdout: true).trim()
                    def mongoExists = sh(script: "docker ps -q -f name=${mongoContainerName}", returnStdout: true).trim()
                    def redisExists = sh(script: "docker ps -q -f name=${redisContainerName}", returnStdout: true).trim()

                    env.backupFileMongo = "${backupDir}/mongo_backup_${dateTime}.gz"
                    env.backupFileRedis = "${backupDir}/redis_backup_${dateTime}.rdb"

                    env.tomcatExists = "${tomcatExists}"
                    env.reactExists = "${reactExists}"
                    env.mongoExists = "${mongoExists}"
                    env.redisExists = "${redisExists}"
                }
            }
        }

        stage('Backup') {
            steps {
                script {
                    if (env.mongoExists) {
                        echo "Creating backup for MongoDB..."

                        sh "docker exec ${mongoContainerName} mkdir -p ${backupDir}"

                        sh "docker exec ${mongoContainerName} mongodump --archive=${env.backupFileMongo} --gzip"

                        sh "docker cp ${mongoContainerName}:${env.backupFileMongo} /var/jenkins_home/backup/work-flow-db"

                        echo "Backup created at ${env.backupFileMongo}"
                    } else {
                        echo "Container ${mongoContainerName} does not exist. Skipping backup."
                    }

                    if (env.redisExists) {
                        echo "Creating backup for Redis..."

                        sh "docker exec ${redisContainerName} redis-cli SAVE"

                        sh "docker exec ${redisContainerName} cp /data/dump.rdb ${env.backupFileRedis}"

                        sh "docker cp ${redisContainerName}:${env.backupFileRedis} /var/jenkins_home/backup/work-flow-db"

                        echo "Backup created at ${env.backupFileRedis}"
                    } else {
                        echo "Container ${redisContainerName} does not exist. Skipping backup."
                    }
                }
            }
        }

        stage('Pull code') {
            steps {
                git url: 'https://github.com/TranMinhTruyen/work-flow', branch: 'main'
            }
        }

        stage('Stop container') {
            steps {
                script {
                    if (env.tomcatExists) {
                        echo "Stop container ${tomcatContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml stop ${tomcatContainerName}"
                    }

                    if (env.reactExists) {
                        echo "Stop container ${reactContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml stop ${reactContainerName}"
                    }

                    if (env.mongoExists) {
                        echo "Stop container ${mongoContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml stop ${mongoContainerName}"
                    }

                    if (env.redisExists) {
                        echo "Stop container ${redisContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml stop ${redisContainerName}"
                    }
                }
            }
        }

        stage('Delete container') {
            steps {
                script {
                    if (env.tomcatExists) {
                        echo "Delete container ${tomcatContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml down --rmi all --volumes ${tomcatContainerName}"
                    }

                    if (env.reactExists) {
                        echo "Detete container ${reactContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml down --rmi all --volumes ${reactContainerName}"
                    }

                    if (dropDb) {
                        echo "Detete container ${mongoContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml down --rmi all --volumes ${mongoContainerName}"

                        echo "Detete container ${redisContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml down --rmi all --volumes ${redisContainerName}"
                    }
                }
            }
        }

        stage('Build & run') {
            steps {
                script {
                    if (dropDb) {
                        echo "Build & run all services."
                        sh "docker compose -f docker-compose-prod.yml -p work-flow-prod up -d"
                    } else {
                        echo "Build & run ${tomcatContainerName} and ${reactContainerName}."
                        sh "docker compose -f docker-compose-prod.yml -p work-flow-prod up -d ${tomcatContainerName} ${reactContainerName}"
                    }
                }
            }
        }

        stage('Import backup') {
            steps {
                script {
                    def fileExists = sh(script: "docker exec ${mongoContainerName} test -f ${env.backupFileMongo} && echo 'true' || echo 'false'", returnStdout: true).trim()

                    if (fileExists == 'true') {
                        sh "docker exec -i ${mongoContainerName} mongorestore --gzip --archive=${env.backupFileMongo} --db ${dbName}"
                    } else {
                        echo "File backup does not exist. Skipping import."
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
            cleanWs()
        }
        failure {
            echo 'Deployment Failed!'
            cleanWs()
        }
    }
}
