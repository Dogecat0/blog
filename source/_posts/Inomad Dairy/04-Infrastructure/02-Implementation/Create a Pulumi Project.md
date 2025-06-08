---
title: Inomad Diary-04-Infrastructure-02-Implementations-02-Create a Pulumi Project
date: 2024-07-19 11:45:38
tags: [Inomad, Infrastructure, Azure, Pulumi]
---

### **🔎 Intro**

In the last post, I discussed some points of setting up Azure for Inomad's infrastructure. In this post, I will be creating a Pulumi project and discuss some interesting points about the initial setup and considerations.

<!--more-->

### **❓ What is Pulumi?**

Pulumi is an open-source infrastructure as code tool that allows you to define, deploy, and manage cloud infrastructure using familiar programming languages. It supports multiple cloud providers, including Azure, AWS, Google Cloud, and Kubernetes. Pulumi enables you to write infrastructure code using languages like Python, TypeScript, Go, and C#, providing a more flexible and powerful way to manage cloud resources, which in contrast to traditional IaC tools like Terraform or CloudFormation that use declarative configuration files.

### **📚 Initial Steps**

### 1. Pulumi Projects and Stacks

During the initial setup of a Pulumi project, you will encouter some new concepts from Pulumi such as [projects](https://www.pulumi.com/docs/concepts/projects/) and [stacks](https://www.pulumi.com/docs/concepts/stack/).

### 2. Pulumi State Management

One another one worth mentioning is when you create a stack, the `orgName` depends on whether you choose to use [Pulumi Cloud or Self-managed Backends](https://www.pulumi.com/docs/concepts/state/#using-a-self-managed-backend) to mange your Pulumi state files. Since I am using self-managed backend, below are some key points to consider.

**Where to Store State Files**:
Decide where to store your state files: You can store your state files locally, in a shared file system, or in a cloud storage bucket like Azure Blob Storage or AWS S3.

If you choose Azure Blog Storage like me, here are the links to get started:

- [Azure Blob Storage for Pulumi state](<](https://www.pulumi.com/docs/concepts/state/#using-a-self-managed-backend)>)
- [Azure Blob Storage](https://azure.microsoft.com/en-gb/products/storage/blobs)

The general steps to set up an Azure Blob Storage for Pulumi state are:

- Create a resource group if you haven't done so to hold the storage account (e.g., `rg-dev-storage`).
- Create a storage account in the resource group. (e.g., `dev-storage`)
  ⚠️ Note here, for Azure storage account, you can only name it with Lowercase letters and numbers and must be between 3 and 24 characters long. It is also universally unique so it's a good idea to include a unique name like your organization name or project name in it.(e.g., `<your-project-name>devstorage`)Sometimes the error message is not clear and you might get stuck here. [Resource Name Rules](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules)
- Create a Blob container in the storage account to hold the state files specifically for your Pulumi project.(e.g., `state-container`)
- Get the storage account key and set environment variable `AZURE_STORAGE_KEY` to the name of it for Pulumi to use to store the state files in the Azure Blob Storage.
- Create and Microsoft Entra user group for developers in the current subscription and assign the `Storage Blob Data Contributor` role to the group. This is to allow developers to access the storage account and container to read and write the state files.
- Login to Pulumi backend using the Azure Blob Storage account and container URL and the storage account key.

```bash
pulumi login azblob://<blob-container-name>?storage_account=<storage-account-name>
```

### 3. Pulumi Stack Initialization

Once you have set up the backends for Pulumi state, you can now initialize a Pulumi project and stack.

- Create a new stack for the project. Try to use the same name as the environment you are working on (e.g., `dev`, `staging`, `prod`). So the suggested practice here is you creating a stack for each environment you are working on.

```bash
pulumi stack init dev
pulumi config set azure:subscriptionId <subscription-id> --stack dev
pulumi stack select dev
```

- When you create a stack you will be asked to specify a secret provider. You can choose to use the default secret provider `passphrase` or use a custom secret provider. If you choose to use a custom secret provider, you will need to provide the [URL](https://www.pulumi.com/docs/cli/commands/pulumi_stack_change-secrets-provider/) of the secret provider. For example, you can use Azure Key Vault as a secret provider. [Azure Key Vault](https://azure.microsoft.com/en-gb/services/key-vault/)
