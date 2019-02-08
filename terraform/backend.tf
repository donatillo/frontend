terraform {
  backend "s3" {
    // bucket = "give-and-take-terraform"
    key    = "frontend.state"
    region = "us-east-1"
  }
}
