provider "aws" {
  region = "us-west-2"
}

data "aws_security_group" "default" {
  name   = "default"
  vpc_id = module.vpc.vpc_id
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "bars-n-grills"

  cidr = "10.0.0.0/16"

  azs             = ["us-west-2a", "us-west-2b", "us-west-2c"]
  private_subnets = ["10.0.1.0/24"]
  public_subnets  = ["10.0.101.0/24"]

  enable_ipv6 = true

  enable_nat_gateway = true
  single_nat_gateway = true

  public_subnet_tags = {
    Name = "bars-n-grills-public"
  }

  tags = {
    Owner       = "user"
    Environment = "dev"
  }

  vpc_tags = {
    Name = "bars-n-grills"
  }
}