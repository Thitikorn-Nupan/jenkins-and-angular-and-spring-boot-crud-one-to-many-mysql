// the first start with pipeline { set up agent and stages inside pipeline }
pipeline {
    // any คือ ใช้ executor ใด ๆ ก็ได้
    agent any
    environment {
            // you have to call tru env.<var name> ex, env.DOMAIN
            JAR_TARGET = 'backend/target/backend-0.0.1-SNAPSHOT.jar'
            PATH_DEMO_PROPERTIES = 'B:\\env\\demo-info\\docker_info.properties'
            DOCKER_BACKEND_IMAGE_NAME = 'backend-app'
            DOCKER_UI_IMAGE_NAME = 'ui-app'
            DOCKER_UI_CONTAINER_NAME = 'angular-and-nginx'
            DOCKER_UI_NGINX_PORT_REMOTE = '8080'
    }

    // stages as working Flows tell Pipeline what gonna do
    stages {

            stage('Before init get key from properties file') {
                steps {
                    script {
                        // def props = readProperties file: 'info.properties' // root path
                        def props = readProperties file: env.PATH_DEMO_PROPERTIES // abs path
                        env.DOCKER_APP_PORT_REMOTE = props['DOCKER_APP_PORT_REMOTE']
                        env.DOCKER_DB_USERNAME = props['DOCKER_DB_USERNAME']
                        env.DOCKER_DB_PASSWORD = props['DOCKER_DB_PASSWORD']
                        env.DOCKER_DB_NAME = props['DOCKER_DB_NAME']
                        env.DOCKER_DB_PORT_REMOTE = props['DOCKER_DB_PORT_REMOTE']
                        env.IP4 = props['IP4']
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



            stage('Build docker container database') {
                steps {
                   sh "docker build -t mysql:latest --build-arg USERNAME=${env.DOCKER_DB_USERNAME} --build-arg PASSWORD=${env.DOCKER_DB_PASSWORD} --build-arg DATABASE=${env.DOCKER_DB_NAME} .  -f backend/dockerfiles/database/Dockerfile"
                }
                post {
                     success {
                         echo 'After build successfully.'
                         sh 'docker images' // check is image create
                     }
                }
            }



           stage('Deploy docker image database') {
                steps {
                   sh "docker run -d --name=mysql_database -p ${env.DOCKER_DB_PORT_REMOTE}:3306 -e MYSQL_ROOT_PASSWORD=${env.DOCKER_DB_PASSWORD} -it mysql:latest"
                }
                post {
                     success {
                         echo 'After run successfully.'
                         sh 'docker ps' // check is container running create
                     }
                }
            }

            stage('Build maven') {
                steps {
                    // Shows current working directory (e.g., /var/jenkins_home/workspace/my-pipeline)
                    sh 'pwd'
                    // Go to target dir
                    dir('backend/target') {
                        echo 'Before build jar'
                        sh "ls -l"
                    }
                    // Returns to the original working directory
                    sh 'pwd'
                    dir('backend') {
                       // Builds the Spring Boot application using maven
                       sh "mvn clean install -DskipTests"
                    }
                    sh 'pwd'
                    // Returns to the original working directory
                    // Go to target dir
                    dir('backend/target') {
                        echo 'After build jar'
                        sh "ls -l"
                    }
                    // Returns to the original working directory
                    sh 'pwd'
                }
            }



            stage('Build docker container backend app') {
                steps {
                    sh "docker build -t springboot:latest --build-arg JAR_FILE=${env.JAR_TARGET} --build-arg JDBC_USERNAME=${env.DOCKER_DB_USERNAME} --build-arg JDBC_PASSWORD=${env.DOCKER_DB_PASSWORD} --build-arg JDBC_DATABASE=${env.DOCKER_DB_NAME} --build-arg IP4=${env.IP4} . -f backend/dockerfiles/app/Dockerfile"
                }
                post {
                     success {
                         echo 'After build successfully.'
                         sh 'docker images' // check is image create
                     }
                }
            }



            stage('Deploy docker image backend app') {
                steps {
                    sh "docker run --name ${env.DOCKER_BACKEND_IMAGE_NAME} -p ${env.DOCKER_APP_PORT_REMOTE}:6789 -d springboot:latest"
                }
                post {
                      success {
                          echo 'After run successfully.'
                          sh 'docker ps' // check is image running
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
