---
title: Inomad Diary-04-Infrastructure-02-Implementations-01-Azure Setup
date: 2024-07-18 15:35:25
tags: [Inomad Diary, Infrastructure, Azure]
---

## **🔎 Intro**

This post is the beginning of the implementation phase for Inomad's infrastructure on Azure. As the usual like other posts in Inomad series, I will just highlight the key points I've encountered instead of making the series an instruction of 'How to'. This post will cover the initial steps and considerations for deploying Inomad's infrastructure on Azure.

<!--more-->

## **❓ Why Azure?**

Azure is chosen as the cloud provider for Inomad's infrastructure due to one simple fact that it seems to be the best choice to integrate with the existing Microsoft ecosystem. As Microsoft provides a wide range of services like Office 365, Teams, and Azure, it makes sense to leverage Azure for Inomad's infrastructure. Also comparing AWS, Azure seems to have more cost-effective database solutions and better integration for SQL based applications.

## **📚 Initial Steps**

## 1. Azure Account Setup
Setting up an Azure account is quite straightforward. But miandering through the Azure portal and Microsoft 365 admin center can be a bit tricky as you are managing multiple services at once.

## 2.  Creating Multiple Environments
**Development Environments:**
- Development Environment: This environment is where the development team will work on the application. It will have the necessary resources for development and testing.
- Staging Environment: This environment is used for testing the application before it goes live. It will have a replica of the production environment to ensure that the application works as expected.
- Production Environment: This is the live environment where the application will be hosted and accessed by users.

**Reasongs for Multiple Environments:** 
- Development and Testing: Developers need a dedicated envrionments (dev) to build and test new features without affecting the live product. A staging environment allows for thorough testing in conditions similar to production before deploying changes.
- Quality Assurance: Ensures that new features and bug fixes are tested in isolation, preventing untested code from reaching production. QA teams can validate functionality and performance in a controlled setting.
- Risk Mitigation: Reduces the risk of introducing bugs or performance issues in the live environment. Allows for rollback and troubleshooting in a non-critical environment if issues arise.
- Performance Testing: Staging environments can simulate real-world loads and conditions to test application performance and scalability.
- User Acceptance Testing: Provides a space for end-users or stakeholders to validate new features and changes before they go live. Ensures that the changes meet business requirements and user expectations.
- Configuration Managements: Different environments can be configured with different settings, allowing for configuration testing and validation. Ensures that configuration changes do not negatively impact the production envrionment.
- CI/CD: Support automtaed build, test, and deployment pipelines, enabling faster and more reliable releases. Each environment can have its own CI/CD pipeline, ensuring taht code is properly tested at each stage.
- Compliance and Security: Provides separate environments to ensure compliance with security and regulatory requirements. Allows for security testing and validation in an isolated environment.

## 3.Creating Environments in Azure:
There are main two ways to create environments in Azure:
**Resource Groups:** 
Resource groups are logical containers that hold related resources for an Azure solution. They help manage and organize resources, control access, and simplify billing. You can create a resource group for each environment (dev, staging, production) and deploy resources to the respective group. [More on Resource Groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)

**Pros**:
- Simplified Management: Easier to manage and navigate within a single subscription.
- Cost Efficiency: Single subscription billing can simplify tracking and possibly reduce costs.
- Permissions Management: Fine-grained access control using Azure RBAC within the same subscription.
- Resource Limits: Quicker setup and fewer resource limitations compared to separated subscriptions.

**Cons**:
- Isolation: Less isolation between environments; issues in one environment can potentially affect others.
- Resource Limits: All environments share the subscription's resource limits, which can be restrictive.
- Complexity: Though setup is simple but actually managing multiple environments within a single subscription can be complex and require careful organization.

**Azure Subscriptions:** 
Azure subscriptions are used to manage billing, access control, and resource limits. You can create separate subscriptions for each environment to isolate resources and manage costs. This approach provides more granular control over resource usage and access. [More on Azure Subscriptions](https://abouttmc.com/glossary/azure-subscription/)

**Pros**:
- Isolation: Complete isolation between environments, reducing risk of cross-environment impact.
- Resource Limits: Each environment has its own set of resource limits, avoiding conflict.
- Billing: Seprate billing and cost tracking for each environment, enhancing financial management.
- Compliance: Easier to manage compliance and security requirements with separate subscriptions.

**Cons**:
- Mangagement: More complex to manage multiple subscriptions, requiring careful organization and access control.
- Cost: Potentially higher costs when scaling up due to separate billing and resource limits for each environment.
- Permissions Management: requires separate RBAC configurations for each subscriptoin, which can be cumbersome.
- Complex Setup: Initial setup and configuration for multiple subscriptions can be more tim-econsuming and complex.

Depending on the specific requirements and constraints of the project, you can choose the most suitable approach for creating environments in Azure.

Once the envrionments are created, we can move to next steps.

## **⚠️ Next Steps**
In the next step, I will be creating a Pulumi project to manage the infrastructure for Inomad on Azure. During the initial steps, we will come back to Azure to create necessary resource, namely Azure Blob Storage for storing the state file of the Pulumi project.




