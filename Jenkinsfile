pipeline {
    agent any

    stages {
        stage('Clean workspace when start') {
            steps {
                cleanWs()
            }
        }

        stage('Clone code') {
            steps {
                git url: 'https://github.com/TranMinhTruyen/work-flow', branch: 'main'
            }
        }

        stage('Stop container') {
            steps {
                script {
                    sh '''
                        if [ $(docker ps -q -f name=work-flow-tomcat) ]; then
                            docker compose -f docker-compose-prod.yml stop work-flow-tomcat
                        fi
                        if [ $(docker ps -q -f name=work-flow-react) ]; then
                            docker compose -f docker-compose-prod.yml stop work-flow-react
                        fi
                    '''
                }
            }
        }

        stage('Clean container') {
            steps {
                script {
                    sh '''
                        if [ $(docker ps -a -q -f name=work-flow-tomcat) ]; then
                            docker compose -f docker-compose-prod.yml rm -f work-flow-tomcat
                        fi
                        if [ $(docker ps -a -q -f name=work-flow-react) ]; then
                            docker compose -f docker-compose-prod.yml rm -f work-flow-react
                        fi
                    '''
                }
            }
        }

        stage('Build image') {
            steps {
                script {
                    sh "docker compose -f docker-compose-prod.yml build"
                }
            }
        }

        stage('Run container') {
            steps {
                script {
                    sh '''
                        if [ $(docker ps -a -q -f name=work-flow-mongodb) ] && [ $(docker ps -a -q -f name=work-flow-redis) ]; then
                            echo "Containers work-flow-mongodb or work-flow-redis do not exist. Building all services."
                            docker compose -f docker-compose-prod.yml -p work-flow-prod up -d
                        else
                            echo "Containers work-flow-mongodb and work-flow-redis exist. Running work-flow-tomcat and work-flow-react."
                            docker compose -f docker-compose-prod.yml -p work-flow-prod up -d work-flow-tomcat work-flow-react
                        fi
                    '''
                }
            }
        }

        stage('Clean workspace when finish') {
            steps {
                cleanWs()
            }
        }
    }
}