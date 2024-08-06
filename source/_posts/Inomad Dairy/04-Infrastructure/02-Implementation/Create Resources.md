---
title: Inomad Diary-04-Infrastructure-02-Implementations-03-Create Resources
date: 2024-07-23 20:29:57
tags: [Inomad, Infrastructure, Azure, Pulumi]
---

## **🔎 Intro**
In this post, I will start creating resources in Azure using Pulumi. The full process is quite complex, so I will try to break it down into smaller parts and raise the key points here during my implementation.

<!--more-->

## **📁 Resource Group**

The resources in Azure are organized into resource groups. A resource group is a logical container for resources deployed on Azure. You can deploy, update, and delete multiple resources in a resource group together. More about [Azure Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal).

Probably more to be added while it's going but at this moment the key resources I am using are:
- Container App
- Container Registry
- SQL Server    
- SQL Database
- Key Vault
- Storage Account
- Blob Container
- DevOps
- Network
- Insights

I've organized my resources into three resource groups:
## 1. `web_app_rg`:
- Container App
- Container Registry
- SQL Server
- SQL Database
- Key Vault
- Storage Account
- Blob Container

**The pros of organizing resources into a resource group are:**
- This group has all application-realted resources, making it easier to manage and monitor the web application.
- It's easier to mange updates, scaling, and eployments since all app components are in one place.
- Simplifies tracking and optimizing costs specifically associated with the web application itself.
- It grants the easier managing permissions for developers and operators who need access only to the application resources.

## 2. `devops_rg`:
- DevOps

**The pros of organizing resources into a resource group are:**
- It keeps DevOps resources reparate from the actual application resources, reducing the risk of accidental interference.
- It enhanced security by isolating DevOps tools and credentials, ensuring taht only DevOps access.
- It simplifies scaling DevOps tools independently of the application resources.

## 3. `network_and_monitoring_rg`:
- Network
- Insights

**The pros of organizing resources into a resource group are:**
- Network resources like VNETS, subnets, and security groups are in one place, making it easier to manage network configurations and security.
- It centralized location for all monitoring tools, which simplifies the process of setting up and managing alerts, dashboards, and logs.
- It enhanced security byisolating network and monitoring resources, ensuring network configurations are not tampered with unintentially.

Organizing resources into resource groups is a good practice for managing and monitoring resources in Azure. It depends on the complexity of the application and the team's requirements bae on the resources' nature and purpose. Resources in different resource groups can communicate with each other, which makes it possible if you need more resource groups in the future.

## **📦 Container Registry**

Azure Container Registry is a managed, private Docker registry service based on the open-source Docker Registry 2.0. It allows you to store and manage container images for all types of container deployments. More about [Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/).

The Pulumi code to create a container registry in Azure can be find [here](https://www.pulumi.com/registry/packages/azure-native/api-docs/containerregistry/registry/)

## Things to consider when creating a container registry:
**1. Assign role-based access control (RBAC):** RBAC roles to the registry to control access to the registry like `AcrPull` and `AcrPush`.

⚠️ Note here, when assigning the roles using `pulumi_azure_native.authorization.RoleAssignment` to groups or uses in Pulumi Azure, there is one thing quite confusing:
`roleDefinitionId`: This is the Identifier of the role definition to assign to the principal, which uses the ID of the roles in Azure as part of it.
example of the Identifier: `"/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/00000000-0000-0000-0000-000000000000"` and `providers/Microsoft.Authorization/roleDefinitions/00000000-0000-0000-0000-000000000000"`is the ID of the role in Azure you are going to assign.
Currently in Pulumi latest azure-native module, it does not support retrieving the role ID from the role name, so you need to define a function using Azure CLI and use it in the Pulumi code. For example:
```python
def get_role_id_by_name(role_name):
    try:
        result = subprocess.run(
            [
                "az",
                "role definition",
                "list",
                "--query",
                f"[?roleName=='{role_name}'].id",
                "--output",
                "json",
            ],
            capture_output=True,
            text=True,
            check=True,
        )
        roles = json.loads(result.stdout)
        if roles:
            return roles[0]
        return None
    except subprocess.CalledProcessError as e:
        print(f"Error running az command: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None
```

- **2. SKU:** Choose the SKU based on the requirements of the application. The SKU determines the capabilities and features of the registry. Here it has `Basic` and `Standard` SKUs.
- **3. Registry Name:** The name of the registry must be unique within Azure. It must be between 5 and 50 characters long alphanumeric.
(⚠️ Note here, since the registry name must be unique within Azure, so it's a good idea to include a unique name like your organization name or project name in it. (e.g., `<your-project-name>containerregistry`). This also applies to other resources in Azure. It's also a good practice if you can add corresponding environment names to the resources to make it easier to identify which resources belong to which environment.)

## **🖥️ SQL Server and Database**

Azure SQL Database is a fully managed relational database service that provides a broad variety of features to enable you to scale, secure, and monitor your database. More about [Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/).

The Pulumi code to create a SQL Server and SQL Database in Azure can be find [here](https://www.pulumi.com/registry/packages/azure-native/api-docs/sql/).

## Things to consider when creating a SQL Server and SQL Database:
- **1. KeyVault Creation:** Create a `KeyVault` and assign the Server credentials to the KeyVault to secure them. Of course you need to assign the proper RBAC roles to the KeyVault to allow the SQL Server to access the credentials.

⚠️ Note here, pulumi_azure_native does not suppport retireving the actual key value from the KeyVault, so you need to use Azure CLI to retrieve the secret value from the KeyVault and use it in the Pulumi code. For example:
```python
def get_kv_secret(vault_name, secret_name, access_token, secret_version=None):
    url = f"https://{vault_name}.vault.azure.net/secrets/{secret_name}"
    if secret_version:
        url += f"/{secret_version}"
    url += "?api-version=7.0"

    headers = {
        "Authorization": f"Bearer {access_token}",
    }

    response = requests.get(url, headers=headers, timeout=30)
    if response.status_code != 200:
        raise requests.exceptions.HTTPError(f"Failed to get secret: {response.text}")

    secret = response.json()
    print(json.dumps(secret))
    return secret
```

## **🫙 Storage Account and Blob Container**

This is the straghtforward part of the implementation. The Pulumi code to create a Storage Account and Blob Container in Azure can be find [here](https://www.pulumi.com/registry/packages/azure-native/api-docs/storage/).

## **🚚 Content Delivery Network (CDN)**

Azure Content Delivery Network (CDN) is a global content delivery network solution for delivering high-bandwidth content. [Pulumi Docs](https://www.pulumi.com/registry/packages/azure-native/api-docs/cdn/).

## Things to consider when creating a Container App:
**1. CDN Profile:** The CDN profile is a container for the CDN endpoints. It defines the pricing tier and the CDN provider. The profile should be global.

**2. CDN Endpoint:** The CDN endpoint is the actual CDN service that delivers content to end-users. It is associated with a CDN profile and a custom domain name.
- `origin`: The origin of the CDN endpoint. This is the source of the content that the CDN delivers to end-users. The origin can be a storage account, a web app, or any other public endpoint.
(⚠️ Note, in [Micsoft doc](https://learn.microsoft.com/en-us/cli/azure/cdn/endpoint?view=azure-cli-latest#az-cdn-endpoint-create), when you create an endpoint, the `origin` means the `custom domain` which in Pulumi, is `origin_host_header`.)
- `origin_group`: The origin group is a collection of origins that the CDN endpoint uses to deliver content. The CDN endpoint can use multiple origins to deliver content to end-users. The origin group can be used to define failover and load balancing rules for the CDN endpoint.

## **🛢️ ContainerApp**

Azure Container Apps is a fully managed serverless container service that enables you to deploy and run containerized applications without having to manage the underlying infrastructure. More about [Azure Container Apps](https://learn.microsoft.com/en-us/azure/templates/microsoft.app/containerapps?pivots=deployment-language-bicep#container).

The Pulumi code to create a Container App in Azure can be find [here](https://www.pulumi.com/registry/packages/azure-native/api-docs/app/containerapp/).

## Things to consider when creating a Container App:
**1. Docker Image:** First, you need to create a image source from the container registry you created earlier and here you also need to install a new module `pulumi_docker`. Example can be found here in [Pulumi Docs](https://www.pulumi.com/docs/reference/pkg/docker/image/). 

⚠️ Note here, in `RegistryArgs` you need to fill in the registry credentials to access the container registry. If you've created your registry without having credentials, you can use `az acr login` with your Microsoft Entra ID which you should have assigned acr permissions to or a Service Principle to access the registry.

**2. Container App:** Defining the container app requires more configuration. Below is the example of the configuration from the [Pulumi Docs](https://www.pulumi.com/registry/packages/azure-native/api-docs/app/containerapp/):

⚠️ Concepts I picked up here:
- `Microsoft.web` and `Microsoft.app` are the namespaces for the different resources, you can find the full list [here](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-services-resource-providers). Another confusing part is, you can still find `Microsoft.web.ContainerApp` resource but it is an old version of this resource and it's better to use the new version `Microsoft.app.ContainerApp` as it is stated [here](https://learn.microsoft.com/en-us/azure/templates/microsoft.web/containerapps?pivots=deployment-language-bicep) in Microsoft Docs.
- `dapr`: Distributed Application Runtime (Dapr) is a portable, event-driven runtime that makes it easy for developers to build resilient, microservice applications.
- `ingress`: Ingress is the process of routing external HTTP(S) traffic to the correct service in your cluster. In ingress there are multiple concepts need attention. 
- `client_cerfiticate_mode` is the mode of client certificate.
`IGNORE`: means the client certificate is ignored. This is the default mode where only server-side SSL/TLS is enforced, ensuring that the server is authenticated but not the client. `ACCEPT`: The application accepts client certificates if presented, but does not require them. If a client certificate is provided, the server will validate it. This mode is useful for applications that can optionally support mTLS for clients that have the necessary certificates but do not require it for all clients. `REQUIRE`: The application requires all clients to present a valid client certificate to establish a connection. This mode enforces strict mutual authentication, ensuring that only clients with valid certificates can access the application. It is suitable for highly secure environments where all clients are expected to be authenticated.
- `cors_policy`: This defines Cross-Origin Resource Sharing policy for Azure Container App. CORS is a security feature that allows or restricts web applications running at one origin (domain) from interacting with resources from different origins.
- `custom_domains`: This is the domain that you want to use to access the Azure Container App. `binding_type`: The type of binding for the custom domain. `certificate`: The certificate that you want to use for the custom domain gained from associated Container App envrionment. `host_name`: The host name that you want to use for the custom domain.
- `probes` property of `containers` in `templates: Probes are mechanisms used to check the halth and status of a container. There are three types of probes in Kubernetes and other container orchestrators: liveness probes, readiness probes, and startup probes. Liveness probes are used to determine if a container is running correctly. Readiness probes determine if a container is ready to accept traffic. Startup probes are used to check if an application within a container has started.

**3. Managed Envrionment:** This is the environment where the container app is going to run. The pulumi code to create a managed environment can be found [here](https://www.pulumi.com/registry/packages/azure-native/api-docs/app/managedenvironment/). And the Microsoft docs for the managed environment can be found [here](https://learn.microsoft.com/en-us/azure/templates/microsoft.app/managedenvironments?pivots=deployment-language-bicep).

⚠️ Concepts I picked up here:
- `app_logs_configuration`: Cluster configuration which enables the log daemon to export app logs to a destination. Currently only "log-analytics" is supported
- `log_analytics_configuration`: Log Analytics configuration, must only be provided when destination is configured as 'log-analytics'. This leads to the creation of another resource `LogAnalyticsWorkspace` which is a workspace for storing log data. [Microsoft doc](https://learn.microsoft.com/en-us/azure/container-apps/log-monitoring?tabs=bash). [Pulumi doc](https://www.pulumi.com/registry/packages/azure-native/api-docs/operationalinsights/workspace/).
- `custom_domain_configuration`: Custom domain configuration allows you to map a custom domain (e.g., www.my-name.com) to your Azure managed environment or specific resources within it. This is often necessary when you want your application to be accessible via a branded domain name rather than the default Azure-generated domain name.

## **🔍 Insights**