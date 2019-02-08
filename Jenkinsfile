pipeline {

    agent none

    environment {
        CI               = true
        HOME             = '.'
        npm_config_cache = 'npm-cache'
    }

    stages {

        stage('Install NPM') {
            agent { docker 'node:8-alpine' }
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            agent { docker 'node:8-alpine' }
            steps {
                sh 'npm test'
            }
        }

        stage('Plan infrastructure') {
            agent { label 'master' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    script {
                        sh """
                            cd terraform 
                            terraform init -backend-config='access_key=$USER' -backend-config='secret_key=$PASS'
                            terraform plan -out=tfplan -var \"env=${env.BRANCH_NAME}\" -var \"access_key=$USER\" -var \"secret_key=$PASS\" -var \"domain=${env.MY_DOMAIN}\" -var \"subdomain=${BRANCH_NAME == 'master' ? 'www' : BRANCH_NAME}\"
                        """
                        // timeout(time: 10, unit: 'MINUTES') {
                        //    input(id: "Deploy Gate", message: "Deploy application?", ok: 'Deploy')
                        // }
                    }
                }
            }
        }

        stage('Apply infrastrcuture') {
            agent { label 'master' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "cd terraform && terraform apply -lock=false -input=false tfplan"
                }
            }
        }

        stage('Build') {
            agent { docker 'node:8-alpine' }
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            agent { label 'master' }
            steps {
                withAWS(region:'us-east-1', credentials:'aws') {
                    s3Upload(file: 'build', bucket: "${env.MY_DOMAIN}-${env.BRANCH_NAME}")
                }
            }
        }

    }
}


// vim:st=4:sts=4:sw=4:expandtab:syntax=groovy
