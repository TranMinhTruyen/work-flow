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

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}

// pipeline {
//     agent any

//     stages {
//         stage('Clean workspace when start') {
//             steps {
//                 cleanWs()
//             }
//         }

//         stage('Clone code') {
//             steps {
//                 git url: 'https://github.com/TranMinhTruyen/work-flow', branch: 'main'
//             }
//         }

//         stage('Install dependencies') {
//             steps {
//                 dir('FE') {
//                     script {
//                     sh '''
//                         yarn install
//                     '''
//                 }
//                 }
//             }
//         }

//         stage('Build') {
//             steps {
//                 dir('FE') {
//                     script {
//                     sh '''
//                         yarn build
//                     '''
//                 }
//                 }
//             }
//         }

//         stage('Clean nginx') {
//             steps {
//                 dir('FE') {
//                     script {
//                         sh '''
//                             if [ -d /nginx-1.26.2/html ]; then rm -rf /nginx-1.26.2/html/*; fi
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 dir('FE') {
//                     script {
//                         sh '''
//                             mv dist/* /nginx-1.26.2/html
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Reload nginx') {
//             steps {
//                 script {
//                     withCredentials([usernamePassword(credentialsId: 'ssh-windows', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
//                         sh """
//                             sshpass -p "\$PASS" ssh \$USER@192.168.1.7 "
//                                 if (Get-Service -Name nginx -ErrorAction SilentlyContinue) {
//                                     if ((Get-Service -Name nginx).Status -eq 'Running') {
//                                         nginx -s reload
//                                     } else {
//                                         Start-Service nginx
//                                     }
//                                 }
//                             "
//                         """
//                     }
//                 }
//             }
//         }

//         stage('Clean workspace when finish') {
//             steps {
//                 cleanWs()
//             }
//         }
//     }

//     post {
//         success {
//             echo 'Deployment Successful!'
//         }
//         failure {
//             echo 'Deployment Failed!'
//         }
//     }
// }