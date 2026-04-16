// the first start with pipeline { set up agent and stages inside pipeline }
pipeline {
    // any คือ ใช้ executor ใด ๆ ก็ได้
    agent any
    environment {
            PATH_ENV_DOCKER_COMPOSE = 'B:/env/demo-info/.env'
            DOCKER_UI_CONTAINER_NAME = 'angular-and-nginx-app'
            DOCKER_UI_NGINX_PORT_REMOTE = '8081'
    }

    // stages as working Flows tell Pipeline what gonna do
    stages {

            stage('Before initial check env file') {
                steps {
                    script {
                        if (fileExists(PATH_ENV_DOCKER_COMPOSE)) {
                            echo 'File found! Proceed with actions.'
                        } else {
                            echo 'File not found. Skipping some actions.'
                        }
                    }
                }
           }


            stage('Before initial check software installed') {
                steps {
                      sh 'java -version'
                      sh 'mvn -version'
                      sh 'git --version'
                      sh 'docker --version'
                      sh 'node --version'
                }
            }


            stage('Checkout git repo') {
                steps {
                    // Checks out the source code from your Git repository. *** Note, by default it will pull repo to C:\ProgramData\Jenkins\.jenkins\workspace\...
                    git branch: 'ttknp', url: 'https://github.com/Thitikorn-Nupan/jenkins-and-angular-and-spring-boot-crud-one-to-many-mysql.git'
                }
            }


            stage('Build + Deploy docker container backend and database') {
                steps {
                   sh "docker-compose --env-file ${env.PATH_ENV_DOCKER_COMPOSE} -f backend/dockercomposes/docker-compose.yml up -d"
                }
                post {
                     success {
                         echo 'After build + deploy successfully.'
                         sh 'docker images' // check is image create
                     }
                }
            }


            stage('Build docker container frontend app') {
                 steps {
                    sh "docker build -t angular:latest -f frontend/dockers/angular/Dockerfile ."
                 }
                 post {
                      success {
                          echo 'After build successfully.'
                          sh 'docker images' // check is image create
                      }
                 }
            }


           stage('Deploy docker image frontend app') {
                steps {
                   sh "docker run --name ${DOCKER_UI_CONTAINER_NAME} -p ${env.DOCKER_UI_NGINX_PORT_REMOTE}:8000 -d angular:latest"
                }
                post {
                     success {
                         echo 'After run successfully.'
                         sh 'docker ps' // check is container running create
                     }
                }
           }

        }

        // The post section can be defined at both the global Pipeline level and within individual stage blocks, allowing for granular control over post-execution actions.
        post {
                /*
                    always: Steps within this block execute regardless of the Pipeline's or stage's final status (success, failure, unstable, aborted).
                    success: Steps execute only if the Pipeline or stage completes successfully.
                    failure: Steps execute only if the Pipeline or stage fails.
                    unstable: Steps execute only if the Pipeline or stage completes with an "unstable" status.
                    aborted: Steps execute only if the Pipeline or stage is aborted.
                    changed: Steps execute if the current run's status differs from the previous run's status.
                    fixed: Steps execute if the current run is successful and the previous run was either failed or unstable.
                    regression: Steps execute if the current run's status is worse than the previous run's status (e.g., successful to unstable, unstable to failure).
                    cleanup: This is a special condition within the global post section, primarily used for tasks like workspace cleanup, regardless of the build result.
                 */
                 success { // If some it is failure success won't work
                     echo 'Pipeline deploy fullstack + docker completed successfully.'
                 }
                 failure { // After failure on stages alert this still alert too (last process)
                     echo 'Pipeline deploy fullstack + docker failed.'
                 }
        }
    }
