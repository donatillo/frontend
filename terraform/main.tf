#
# VARIABLES
#

variable "access_key" {}
variable "secret_key" {}
variable "env" {}
variable "region" {
    default = "us-east-1"
}

# 
# SETUP
#

provider "aws" {
    access_key      = "${var.access_key}"
    secret_key      = "${var.secret_key}"
    region          = "${var.region}"
}

# 
# S3 bucket
# 

resource "aws_s3_bucket" "frontend" {
    bucket      = "give-and-take-${var.env}"
    acl         = "public-read"
    policy      = "${file("policy-${var.env}.json")}"

    website {
        index_document = "index.html"
        error_document = "index.html"
    }
}

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
