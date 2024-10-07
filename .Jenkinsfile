pipeline {
    agent any

    environment {
        mongoContainerName = 'work-flow-mongodb' // Container MongoDB
        redisContainerName = 'work-flow-redis' // Container Redis
        tomcatContainerName = 'work-flow-tomcat' // Container Redis
        reactContainerName = 'work-flow-react' // Container Redis
        location = 'Asia/Ho_Chi_Minh'
        backupDir = '/data'
        dbName = 'work-flow'
        dropDb = false
    }

    stages {
        stage('Preparation') {
            steps {
                cleanWs()
                script {
                    def dateTime = sh(script: "TZ=${location} date +%Y%m%d_%H%M%S", returnStdout: true).trim()
                    def tomcatExists = sh(script: "docker ps -a -q -f name=${tomcatContainerName}", returnStdout: true).trim()
                    def reactExists = sh(script: "docker ps -a -q -f name=${reactContainerName}", returnStdout: true).trim()
                    def mongoExists = sh(script: "docker ps -a -q -f name=${mongoContainerName}", returnStdout: true).trim()
                    def redisExists = sh(script: "docker ps -a -q -f name=${redisContainerName}", returnStdout: true).trim()

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

                        sh "docker exec ${mongoContainerName} mongodump --archive=${env.backupFileMongo} --gzip"

                        echo "Backup created at ${env.backupFileMongo}"
                    } else {
                        echo "Container ${mongoContainerName} does not exist. Skipping backup."
                    }

                    if (env.redisExists) {
                        echo "Creating backup for Redis..."

                        sh "docker exec ${redisContainerName} redis-cli SAVE"

                        sh "docker exec ${redisContainerName} cp /data/dump.rdb ${env.backupFileRedis}"

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

        stage('Delete container') {
            steps {
                script {
                    if (env.tomcatExists) {
                        echo "Delete container ${tomcatContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml down --rmi all --volumes ${tomcatContainerName}"
                    } else {
                        echo "Container ${tomcatContainerName} not exist"
                    }

                    if (env.reactExists) {
                        echo "Detete container ${reactContainerName}..."
                        sh "docker compose -f docker-compose-prod.yml down --rmi all --volumes ${reactContainerName}"
                    } else {
                        echo "Container ${reactContainerName} not exist"
                    }

                    if (dropDb == true) {
                        if (env.mongoExists) {
                            echo "Stop container ${mongoContainerName}..."
                            sh "docker compose -f docker-compose-prod.yml stop ${mongoContainerName}"

                            echo "Detete container ${mongoContainerName}..."
                            sh "docker compose -f docker-compose-prod.yml rm -f ${mongoContainerName}"
                        } else {
                            echo "Container ${mongoContainerName} not exist"
                        }

                        if (env.redisExists) {
                            echo "Stop container ${redisContainerName}..."
                            sh "docker compose -f docker-compose-prod.yml stop ${redisContainerName}"

                            echo "Detete container ${redisContainerName}..."
                            sh "docker compose -f docker-compose-prod.yml rm -f ${redisContainerName}"
                        } else {
                            echo "Container ${redisContainerName} not exist"
                        }
                    }
                }
            }
        }

        stage('Build & run') {
            steps {
                script {
                    if (dropDb == true) {
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
                    def mongodb = sh(script: "docker exec ${mongoContainerName} test -f ${env.backupFileMongo} && echo 'true' || echo 'false'", returnStdout: true).trim()
                    def redis = sh(script: "docker exec ${redisContainerName} test -f ${env.backupFileRedis} && echo 'true' || echo 'false'", returnStdout: true).trim()

                    if (mongodb == 'true') {
                        echo "Start restore mongodb..."
                        sh "docker exec -i ${mongoContainerName} mongorestore --gzip --archive=${env.backupFileMongo} --db ${dbName}"
                    } else {
                        echo "File backup does not exist. Skipping restore."
                    }

                    if (redis == 'true') {
                        echo "Start restore redis..."
                        sh "docker exec ${redisContainerName} cp ${env.backupFileRedis} /data/dump.rdb"
                    } else {
                        echo "File backup does not exist. Skipping restore."
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
