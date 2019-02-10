terraform {
  backend "s3" {
    key    = "frontend.state"
    region = "us-east-1"
  }
}
