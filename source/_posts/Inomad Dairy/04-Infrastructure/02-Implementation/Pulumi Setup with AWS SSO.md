---
title: Inomad Diary-04-Infrastructure-02-Implementations-Pulumi Setup with AWS SSO
date: 2024-07-08 20:32:44
tags: [Inomad, Infrastructure, Pulumi, AWS SSO]
---

## **🔎 Intro**

From this post, I will start exploring the implementation of infrastructure technologies in the Inomad. In this post, I will set up Pulumi with AWS SSO to manage the cloud infrastructure as code. The post will cover biref steps of the configuration and mainly focus on the issues and solutions encountered during the setup process.

<!-- more -->

## **🔧 Pulumi Setup with AWS SSO**

## 1. What is Pulumi?
- Pulumi is an open-source infrastructure as code tool that allows you to define, deploy, and manage cloud infrastructure using familiar programming languages like JavaScript, TypeScript, Python, and Go.

## 2. Why Pulumi?
- Pulumi provides a modern approach to infrastructure as code by allowing you to use your favorite programming languages and tools to define and manage cloud resources.

## 3. Setting up Pulumi with AWS SSO

**Step 1: Install Pulumi CLI**
- Install the Pulumi CLI by following the instructions on the [official Pulumi website](https://www.pulumi.com/docs/get-started/install/).

**Step 2: Configure AWS SSO**

The exact steps to configure AWS SSO may vary based on your organization's setup, but the general steps are as follows:

- Configure AWS SSO to manage access to AWS accounts and services. Follow the instructions in the [AWS SSO documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html). 
⚠️ Note: AWS SSO now is called AWS IAM Identity Center.
- Create an AWS SSO user and assign the necessary permissions to access the AWS accounts.
- Set up AWS CLI with AWS SSO by following the instructions in the [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html).
- Create an AWS SSO profile in the AWS CLI configuration specifically for Pulumi by running the following command:
```bash
aws configure sso --profile [profile-name]
```
- Follow the prompts to configure the AWS SSO profile with the necessary details.

⚠️ One thing to notice is there is a 'sso-session' and 'profile' in the AWS CLI configuration. The [sso-session] section is used to centralize and standardize SSO configuration settings that can be shared across multiple profiles. Here's why it is beneficial:
- Centralized Configuration: By defining SSO settings in the [sso-session] section, you can maintain a single configuration point for SSO-related parameters. This reduces redundancy and makes it easier to update SSO settings if needed.
- Reusability: Multiple profiles can reference the same [sso-session] configuration. This is particularly useful if you have several profiles that all use the same SSO start URL and region but differ in account IDs or roles.
- Clarity and Organization: Separating the session configuration from the profile configuration improves the readability and organization of your AWS configuration file. It becomes clearer which settings are for SSO sessions and which are for specific profiles.

Example of AWS CLI configuration file:
Imagine you have multiple AWS profiles that use the same SSO start URL and region but different roles and account IDs. Using [sso-session] makes it easier to manage:

[sso-session] section:
```bash
[sso-session my-sso]
sso_start_url = https://my-sso-portal.awsapps.com/start
sso_region = us-west-2
```

Multiple profiles referencing the same SSO session:
```bash
[profile dev]
sso_session = my-sso
sso_account_id = 123456789012
sso_role_name = DevRole
region = us-west-2

[profile prod]
sso_session = my-sso
sso_account_id = 234567890123
sso_role_name = ProdRole
region = us-west-2
```

Without [sso-session]:
Without using [sso-session], you would have to duplicate the SSO settings in each profile, which can be cumbersome and error-prone:

```bash
[profile dev]
sso_start_url = https://my-sso-portal.awsapps.com/start
sso_region = us-west-2
sso_account_id = 123456789012
sso_role_name = DevRole
region = us-west-2

[profile prod]
sso_start_url = https://my-sso-portal.awsapps.com/start
sso_region = us-west-2
sso_account_id = 234567890123
sso_role_name = ProdRole
region = us-west-2
```

So the [sso-session] section is a powerful feature that reduces redundancy and enhances maintainability in your AWS CLI configuration.

**Step 3: Configure Pulumi with AWS SSO**

Once you have set up AWS SSO and configured the AWS CLI, you can configure Pulumi to use AWS SSO by running the following command:
```bash
pulumi config set cloud:provider aws profile [profile-name]
```
This command tells Pulumi to use the specified AWS SSO profile when interacting with AWS resources.

⚠️ I have encountered an issue where Pulumi was not able to authenticate with AWS SSO using the profile I configured. The issue was related to the fact that Pulumi is not using the correct AWS credentials. To resolve this issue, there are several ways you can try:
- Verify AWS SSO Login:
Ensure that you have logged in with AWS SSO:
```bash
aws sso login --profile [profile-name]
```
- Set the AWS_PROFILE for Pulumi:
Set the AWS_PROFILE environment variable for Pulumi to use the correct profile:
```bash
export AWS_PROFILE=[profile-name]
```
- Check Environment Variables:
Confirm that the AWS_PROFILE environment variable is set correctly:
```bash
echo $AWS_PROFILE
```
It should output your SSO profile name.
- Unset Conflicting Environment Variables:
Ensure no other AWS-related environment variables are set that could conflict with the SSO profile:
```bash
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN
```
