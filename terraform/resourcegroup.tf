resource "aws_resourcegroups_group" "resg-frontend" {
    name = "frontend-${var.env}"
    description = "Resources built for the frontend - ${var.env}"
    
    resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": ["AWS::AllSupported"],
  "TagFilters": [
    {
      "Key": "Creator",
      "Values": ["frontend"]
    },
    {
      "Key": "Environment",
      "Values": ["${var.env}"]
    }
  ]
}
JSON
  }
}

# vim:ts=4:sw=4:sts=4:expandtab:syntax=conf
