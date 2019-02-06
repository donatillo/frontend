pipeline {

    agent none

    environment {
        CI               = true
        HOME             = '.'
        npm_config_cache = 'npm-cache'
    }

    stages {

        stage('Build') {
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
            when { branch 'devl' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    script {
                        sh "cd terraform && terraform init && terraform plan -var \"env=${env.BRANCH_NAME}\" -var \"access_key=$USER\" -var \"secret_key=$PASS\" -out=tfplan"
                        timeout(time: 10, unit: 'MINUTES') {
                            input(id: "Deploy Gate", message: "Deploy ${params.project_name}?", ok: 'Deploy')
                        }
                    }
                }
            }
        }

        stage('Apply infrastrcuture') {
            agent { label 'master' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "cd terraform && terraform apply -lock=false -input=false -var \"env=${env.BRANCH_NAME}\" -var \"access_key=$USER\" -var \"secret_key=$PASS\" tfplan"
                }
            }
        }

        stage('Deploy devl') {
            agent { docker 'node:8-alpine' }
            when { branch 'devl' }
            steps {
                sh 'npm run build'
                echo 'Deploy not implemented.'
            }
        }

        stage('Deploy master') {
            when { branch 'master' }
            steps {
                echo 'Deploy not implemented.'
            }
        }

    }
}

// vim:st=4:sts=4:sw=4:expandtab:syntax=groovy
