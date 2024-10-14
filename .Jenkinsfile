pipeline {
    agent any

    environment {
        sshHost = '172.24.25.251'
        mongoContainerName = 'work-flow-mongodb' // Container MongoDB
        redisContainerName = 'work-flow-redis' // Container Redis
        location = 'Asia/Ho_Chi_Minh'
        htmlDir = '/var/www/html'
        springAppDir = '/opt/tomcat/webapps'
        backupDir = '/data'
        dbName = 'work-flow'
        dropDb = false
    }

    stages {

        stage('Preparation') {
            steps {
                script {
                    def dateTime = sh(script: "TZ=${location} date +%Y%m%d_%H%M%S", returnStdout: true).trim()

                    env.backupFileMongo = "${backupDir}/mongo_backup_${dateTime}.gz"
                    env.backupFileRedis = "${backupDir}/redis_backup_${dateTime}.rdb"

                    sshagent(credentials: ['ssh-ubuntu22']) {
                        sh "ssh-keyscan -H ${sshHost} >> ~/.ssh/known_hosts"

                        def dockerStatus = sh(script: """
                            ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'

                            mongoExists=\$(docker ps -q -f name=${mongoContainerName})
                            redisExists=\$(docker ps -q -f name=${redisContainerName})

                            echo "MONGO_EXISTS=\${mongoExists}"
                            echo "REDIS_EXISTS=\${redisExists}"
                        """, returnStdout: true).trim()

                        def mongoExists = dockerStatus.split('\n').find { it.contains("MONGO_EXISTS") }.split('=')[1].trim()
                        def redisExists = dockerStatus.split('\n').find { it.contains("REDIS_EXISTS") }.split('=')[1].trim()

                        env.mongoExists = "${mongoExists}"
                        env.redisExists = "${redisExists}"
                    }
                }
            }
        }

        stage('Backup') {
            steps {
                script {
                    sshagent(credentials: ['ssh-ubuntu22']) {
                        if (env.mongoExists) {
                            echo "Creating backup for MongoDB..."
                            echo "Script: \n docker exec ${mongoContainerName} mongodump --archive=${env.backupFileMongo} --gzip"

                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                docker exec ${mongoContainerName} mongodump --archive=${env.backupFileMongo} --gzip
                            """

                            echo "Backup created at ${env.backupFileMongo}"
                        } else {
                            echo "Container ${mongoContainerName} does not exist. Skipping backup."
                        }

                        if (env.redisExists) {
                            echo "Creating backup for Redis..."
                            echo "Script: \n docker exec ${redisContainerName} redis-cli SAVE \n docker exec ${redisContainerName} cp /data/dump.rdb ${env.backupFileRedis}"

                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                docker exec ${redisContainerName} redis-cli SAVE
                                docker exec ${redisContainerName} cp /data/dump.rdb ${env.backupFileRedis}
                            """

                            echo "Backup created at ${env.backupFileRedis}"
                        } else {
                            echo "Container ${redisContainerName} does not exist. Skipping backup."
                        }
                    }
                }
            }
        }

        stage('Clone code') {
            steps {
                git url: 'https://github.com/TranMinhTruyen/work-flow', branch: 'main'
            }
        }

        stage('Install & build FE') {
            steps {
                dir('FE') {
                    script {
                        echo "Start build FE..."
                        sh """
                            yarn install
                            yarn build
                        """
                        echo "Build FE finish..."
                    }
                }
            }
        }

        stage('Install & build BE') {
            steps {
                dir('BE') {
                    script {
                        echo "Start build BE..."
                        sh """
                            chmod +x gradlew
                            ./gradlew clean build -x test
                        """
                        echo "Build BE finish..."
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(credentials: ['ssh-ubuntu22']) {
                        echo "Start deploy FE..."

                        // Clear folder html
                        sh """
                            ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                            rm -rf ${htmlDir}/*
                        """

                        // Copy webpack bundle to html
                        sh "scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/FE/dist/* root@${sshHost}:${htmlDir}"

                        // Check status nginx
                        def nginxStatus = sh(script: """
                            ssh -o StrictHostKeyChecking=no root@${sshHost} << 'EOF'
                            systemctl is-active nginx
                        """, returnStatus: true)

                        if (nginxStatus == 0) {
                            echo "Nginx service is active, reload nginx..."
                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                systemctl reload nginx
                            """
                        } else {
                            echo "Nginx service deactive, start nginx..."
                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                systemctl start nginx
                            """
                        }

                        echo "Deploy FE finish..."

                        echo "Start deploy BE..."

                        warFile = "${WORKSPACE}/BE/build/libs/work-flow.war"

                        echo "Checking for file: ${warFile}"

                        if (fileExists(warFile)) {
                            sh "scp -o StrictHostKeyChecking=no -r ${warFile} root@${sshHost}:${springAppDir}"

                            // Reload tomcat
                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                systemctl restart tomcat
                            """
                        } else {
                            error "File war not exists!"
                        }
                    }
                }
            }
        }

        stage('Import backup') {
            steps {
                script {
                    sshagent(credentials: ['ssh-ubuntu22']) {
                        def mongodb = sh(script: """
                            ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                            docker exec ${mongoContainerName} test -f ${env.backupFileMongo} && echo 'true' || echo 'false'
                        """, returnStdout: true).trim()

                        def redis = sh(script: """
                            ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                            docker exec ${redisContainerName} test -f ${env.backupFileRedis} && echo 'true' || echo 'false'
                        """, returnStdout: true).trim()

                        if (mongodb == 'true') {
                            echo "Start restore mongodb..."
                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                docker exec -i ${mongoContainerName} mongorestore --gzip --archive=${env.backupFileMongo} --db ${dbName}
                            """
                        } else {
                            echo "File backup does not exist. Skipping restore."
                        }

                        if (redis == 'true') {
                            echo "Start restore redis..."
                            sh """
                                ssh -o StrictHostKeyChecking=no -T root@${sshHost} << 'EOF'
                                docker exec ${redisContainerName} cp ${env.backupFileRedis} /data/dump.rdb
                            """
                        } else {
                            echo "File backup does not exist. Skipping restore."
                        }
                    }
                }
            }
        }
    }
}