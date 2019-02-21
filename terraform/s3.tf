data "template_file" "policy" {
    template     = "${file("policy.json")}"
    vars {
        bucket  = "${var.basename}-${var.env}"
    }
}

resource "aws_s3_bucket" "frontend" {
    bucket      = "${var.basename}-${var.env}"
    acl         = "public-read"
    policy      = "${data.template_file.policy.rendered}"

    website {
        index_document = "index.html"
        error_document = "index.html"
    }

    tags {
        Name        = "Bucket for frontend static content"
        Creator     = "frontend"
        Environment = "${var.env}"
    }

    force_destroy = true
}

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
