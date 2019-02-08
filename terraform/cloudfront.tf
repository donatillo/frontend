locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "frontend_cf" {
    origin {
        domain_name         = "${var.domain}-${var.env}.s3.amazonaws.com"
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

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
