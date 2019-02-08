#
# VARIABLES
#

variable "access_key" {}
variable "secret_key" {}
variable "env" {}
variable "domain" {}
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

data "template_file" "policy" {
	template 	= "${file("policy.json")}"
	vars {
		bucket  = "${var.domain}-${var.env}"
	}
}


resource "aws_s3_bucket" "frontend" {
    bucket      = "${var.domain}-${var.env}"
    acl         = "public-read"
    policy      = "${data.template_file.policy.rendered}"

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
        domain_name         = "frontend-${var.env}.s3.amazonaws.com"
        origin_id           = "frontend-${var.env}-s3"
    }

    enabled                 = true
    is_ipv6_enabled         = true
    default_root_object     = "index.html"

    aliases = ["${var.env}.${var.domain}"]

    default_cache_behavior {
        allowed_methods     = ["GET", "HEAD", "OPTIONS"]
        cached_methods      = ["GET", "HEAD", "OPTIONS"]
        target_origin_id    = "frontend-${var.env}-s3"

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

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    viewer_certificate {
        cloudfront_default_certificate = true
    }

}

# TODO - custom domain
# TODO - register certificate
# TODO - register CNAME on R53
# TODO - register A record on R53
# TODO - register AAAA record on R53
# TODO - automatically get new commits

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
