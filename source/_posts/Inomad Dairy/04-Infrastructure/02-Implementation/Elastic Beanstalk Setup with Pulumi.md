---
title: Inomad Diary-04-Infrastructure-02-Implementations-Elastic Beanstalk Setup with Pulumi
date: 2024-07-09 22:04:22
tags: [Inomad, Infrastructure, Beanstalk, Pulumi]
---

## **🔎 Intro**

In this post, I will set up Pulumi with AWS Elastic Beanstalk to manage the cloud infrastructure as code. The post will cover biref steps of the configuration and mainly focus on the issues and solutions encountered during the setup process.

<!-- more -->

AWS Elastic Beanstalk is a fully managed service for deploying and scaling web applications and services. It supports several programming languages and frameworks, including Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker. Key features include:
- Simplified Deployment: Automatically handles the deployment, from capacity provisioning, load balancing, and auto-scaling to application health monitoring.
- Support for Multiple Environments: Easily create and manage multiple environments for development, testing, and production.
- Customization: Allows customization of the environment, including instance type, database, and network settings.
- Integration with AWS Services: Seamlessly integrates with other AWS services like RDS, S3, and CloudWatch for a comprehensive solution.
- Monitoring and Management: Provides tools for monitoring and managing your applications, including real-time health monitoring and metrics.

## **⚖️ Elastic Beanstalk and EC2, Why Elastic Beanstalk**

Elastic Beanstalk is built on top of Amazon EC2, which provides the underlying compute resources for your applications. When you deploy an application to Elastic Beanstalk, it creates an environment that includes an EC2 instance or instances to run your application. Elastic Beanstalk abstracts the complexity of managing EC2 instances, load balancers, and auto-scaling groups, making it easier to deploy and manage your applications.

## 1. Use Case
**EC2:**
- Custom applications requiring specific configurations.
- Legacy applications needing full control over the OS.
- Scnearios demanding high-performance computing.

**Elastic Beanstalk:**
- Web applications using supported platforms (e.g., JAva, .NET, Python).
- Developers who prefer managing applications over infrastructure.
- Quickly deploying and mangaging applications in the cloud.

## 2. Management
**EC2:**
- User manages OS, server software, scaling, and fault tolerance.
- greater control over the environment

**Elastic Beanstalk:**
- AWS manages underlying infrastructure, auto-scaling, and load balancing.
- User focuses on application development and deployment.

## 3. Scaling
**EC2:**
- User configures auto-scaling groups and load balancers.
- User manages scaling policies and health checks.

**Elastic Beanstalk:**
- Elastic Beanstalk automatically scales the environment based on traffic and application needs.
- User can configure scaling triggers and thresholds.

## 4. Deployment
**EC2:**
- Manual deployment, automated with scripts or configuration management tools (e.g., Ansible, Chef)
- Can use AMIs (Amazon Machine Images) for faster deployment.

**Elastic Beanstalk:**
- Deploy applications through the AWS Management Consol, CLI, or CI/CD pipelines.
- Supports deployment from source code repositories like Git and AWS CodeCommit.

## 5. Maintenance
**EC2:**
- User responsible for OS updates, patching, and backups.
- High maintainance overhead for managing infrastructure.

**Elastic Beanstalk:**
- AWS manages the underlying infrastructure, including OS updates and patching.
- User focuses on application development and deployment, responsible for application updates and configuration.

## 6. Integration
**EC2:**
- User integrates with any other AWS services manually.
- Suitable for complex, custom integrations.

**Elastic Beanstalk:**
- Integrate with other AWS services like RDS, S3, and CloudWatch.
- Simplifies integration with built-in features and configurations, suitable for web applications with common integration needs.

**Conclusion:**
- EC2: Best for applications needing full control over the encironment and custom configurations.
- Elastic Beanstalk: Suitable for developers wanting to focus on application code and prefer automated deployment and management for supported platforms.

## **🔧 Beanstalk Setup with Pulumi**

## 1. Elastic Beanstalk Setup Overview on AWS Console

Setting up Elastic Beanstalk on the AWS Console seems quite straightforward. You can create a new environment, select the platform, configure the environment settings, and deploy your application.

⚠️ Interesting things I've noticed during my reading through the documentation:
Elabstic Beanstalk creates an envrionment with the following resources:
- EC2 instances: The underlying compute resources for your application.
- instance Security group: Controls inbound and outbound traffic to the EC2 instances.
- Load balancer: Distributes incoming traffic across the EC2 instances.
- Load balancer Security group: Controls inbound and outbound traffic to the load balancer.
- Auto-scaling group: Automatically adjusts the number of EC2 instances based on traffic.
- S3 bucket: Stores application versions and logs.
- CloudWatch alarms: Monitors the environment and triggers alarms based on metrics.
- CloudFormation stack: Manages the resources created by Elastic Beanstalk.
- Domain name: Maps to the load balancer for accessing the application.

So for starters, Elastic Beanstalk manages the underlying infrastructure, abstracts the complexity of managing these resources, allowing you to focus on deploying and managing your applications.

⚠️ Elastic Beanstalk also creates a default VPC and subnets for the environment. You can customize the VPC settings, including the CIDR block, subnets, and security groups if needed. Again, very convenient for developers who want to focus on the application code and not worry about the infrastructure, especially newbies like me.

[More details](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers.html)

## 2. Pulumi Setup with Elastic Beanstalk

There are major three steps to set up Pulumi with Elastic Beanstalk:
- Setup a new application for the Elastic Beanstalk. [Link to example code](https://www.pulumi.com/registry/packages/aws/api-docs/elasticbeanstalk/application/)
- Configure the Elastic Beanstalk environment settings as needed. [Link to example code](https://www.pulumi.com/registry/packages/aws/api-docs/elasticbeanstalk/configurationtemplate/)
- Create a new environment for the Elastic Beanstalk application. [Link to example code](https://www.pulumi.com/registry/packages/aws/api-docs/elasticbeanstalk/environment/)

Since I will mostly use the default settings for the Elastic Beanstalk environment as it's the first time, the setup process should be relatively straightforward like this. I will explore more customized settings in the future as needed.

