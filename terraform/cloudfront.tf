locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "frontend_cf_${var.env}" {
    origin {
        domain_name         = "${var.domain}-${var.env}.s3.amazonaws.com"
        origin_id           = "frontend-${var.env}-s3"
    }

    enabled                 = true
    is_ipv6_enabled         = true
    default_root_object     = "index.html"

    aliases = ["${var.subdomain}.${var.domain}"]

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
            restriction_type    = "none"
        }
    }

    viewer_certificate {
        acm_certificate_arn     = "${aws_acm_certificate.cert.arn}"
        ssl_support_method      = "sni-only"
    }

}

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
