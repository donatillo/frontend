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

#
# CLOUDFRONT
#

locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "frontend_cf" {
    origin {
        domain_name         = "give-and-take-${var.env}.s3.amazonaws.com"
        origin_id           = "give-and-take-${var.env}-s3"
    }

    enabled                 = true
    is_ipv6_enabled         = true
    default_root_object     = "index.html"

    aliases = ["${var.env}.give-and-take.tk"]

    default_cache_behaviour {
        allowed_methods     = ["GET", "HEAD", "OPTIONS"]
        cached_methods      = ["GET", "HEAD", "OPTIONS"]
        target_origin_id    = "give-and-take-${var.env}-s3"

        forwarded_values {
            query_string    = false

            cookies {
                forward     = "none"
            }
        }

        viewer_protocol_policy = "allow-all"
        min_ttl                = 0
        default_ttl            = 86400
        max_ttl                = 31636000

        compress               = true
        viewer_protocol_policy = "redirect-to-https"
    }

    price_class                 = "PriceClass_200"

    viewer_certificate {
        cloudfront_default_certificate = true
    }

}

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
