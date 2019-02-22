variable "access_key"  {}
variable "secret_key"  {}
variable "basename"    {}
variable "env"         {}
variable "main_domain" {}
variable "domain"      {}
variable "subdomain"   {}

variable "region" {
    default = "us-east-1"
}

provider "aws" {
    access_key      = "${var.access_key}"
    secret_key      = "${var.secret_key}"
    region          = "${var.region}"
}

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
