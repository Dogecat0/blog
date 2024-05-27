---
title: 04-Infrastructure-Foundations_of_Cloud_Computing
date: 2024-05-27 22:30:34
tags: [Inomad, Infrastructure, Cloud Computing]
---

## **🔎 Intro**

From this post onwards, I will start exploring the related knowledge of infrastructure for software applications, particularly in the cloud. This post will cover the basics of cloud computing.

<!-- more -->

## **☁️ Core Foundations of Cloud Computing**

Cloud computing is a technology paradigm that allows users to access and store data and applications on remote servers over the internet rather than on local servers or personal computers. This model offers flexibility, scalability, and cost efficiency. Here are the core foundations of cloud computing:

## 1. On-Demand Self-Service
- Definition: Users can provision computing capabilities, such as server time and network storage, as needed automatically without requiring human interaction with each service provider.
- Key Features: Web-based interfaces, automation tools, API access.

## 2. Broad Network Access
- Definition: Cloud services are available over the network and accessed through standard mechanisms that promote use by heterogeneous thin or thick client platforms (e.g., mobile phones, tablets, laptops, and workstations).
- Key Features: Accessibility from any device, anywhere.

## 3. Resource Pooling
- Definition: The provider's computing resources are pooled to serve multiple consumers using a multi-tenant model, with different physical and virtual resources dynamically assigned and reassigned according to consumer demand.
- Key Features: Location independence, resource sharing, virtualization.

## 4. Rapid Elasticity
- Definition: Capabilities can be elastically provisioned and released to scale rapidly outward and inward with demand. To the consumer, the capabilities available for provisioning often appear to be unlimited and can be appropriated in any quantity at any time.
- Key Features: Scalability, flexibility, auto-scaling.

## 5. Measured Service
- Definition: Cloud systems automatically control and optimize resource use by leveraging a metering capability at some level of abstraction appropriate to the type of service (e.g., storage, processing, bandwidth, and active user accounts). Resource usage can be monitored, controlled, and reported, providing transparency for both the provider and consumer of the utilized service.
- Key Features: Pay-per-use, metered service, resource monitoring, billing.

These core foundations are the building blocks of cloud computing that enable businesses to scale and grow without the need for significant capital investment in infrastructure. Next, I will explore the cloud service models and deployment models.

## **🧩 Cloud Service Model**

Cloud computing services are typically categorized into three service models based on the level of abstraction and control they provide to users. These models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).

## Infrastructure as a Service (IaaS)

- Definition: Provides virtualized computing resources over the internet. It offers fundamental computing resources such as virtual machines, storage, and networks.
- Examples: Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP).
- Use Cases: Hosting websites, running enterprise applications, backup and disaster recovery.

## Platform as a Service (PaaS)

- Definition: Provides a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining the infrastructure.
- Examples: Heroku, Google App Engine, Microsoft Azure App Service.
- Use Cases: Web application development, mobile application development, API development.

## Software as a Service (SaaS)

- Definition: Delivers software applications over the internet, on a subscription basis, eliminating the need for organizations to install and run applications on their own computers or data centers.
- Examples: Salesforce, Google Workspace, Microsoft Office 365.
- Use Cases: CRM, email services, collaboration tools.

## **🚀 Cloud Deployment Models**

Cloud deployment models define the type of cloud environment based on ownership, size, and access. The common deployment models are Public Cloud, Private Cloud, Hybrid Cloud, and Community Cloud.

## Public Cloud

- Definition: Services are delivered over the public internet and shared across multiple organizations.
- Benefits: Cost-effective, scalable, no maintenance overhead.
- Examples: AWS, Azure, GCP.

## Private Cloud

- Definition: Services are maintained on a private network for a single organization, providing greater control and security.
- Benefits: Enhanced security, compliance, customizable.
- Examples: VMware vSphere, OpenStack.

## Hybrid Cloud

- Definition: Combines public and private clouds, allowing data and applications to be shared between them.
- Benefits: Flexibility, cost-efficiency, improved security.
- Examples: Microsoft Azure Stack, AWS Outposts.

## Community Cloud

- Definition: A collaborative effort in which infrastructure is shared between several organizations from a specific community with common concerns (e.g., security, compliance).
- Benefits: Cost-sharing, improved collaboration.
- Examples: Government cloud services.