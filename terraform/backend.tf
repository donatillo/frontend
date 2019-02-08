terraform {
  backend "s3" {
    bucket = "give-and-take-terraform-devl"
    key    = "frontend.state"
    region = "us-east-1"
  }
}
