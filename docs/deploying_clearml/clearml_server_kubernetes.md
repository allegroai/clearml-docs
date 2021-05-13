---
title: Kubernetes
---

:::important 
This documentation page applies to deploying your own open source **ClearML Server**. It does not apply to **ClearML Hosted Service** users.
:::

This page describes the prerequisites and procedures for deploying **ClearML Server** to Kubernetes clusters, using manual 
instructions, as well as accessing **ClearML Server**, and port mappings.

To deploy **ClearML Server** to Kubernetes using Helm, see [Deploying ClearML Server: Kubernetes using Helm](clearml_server_kubernetes_helm.md).

For more information about upgrading **ClearML Server** in a Kubernetes Cluster, see [here](upgrade_server_kubernetes.md)

:::important
If **ClearML Server** is being reinstalled, we recommend clearing browser cookies for **ClearML Server**. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the **ClearML Server** URL.
:::


## Prerequisites

* A Kubernetes cluster.
* `kubectl` installed and configured (see [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) in the Kubernetes documentation).
* One node labeled `app=clearml`.


:::warning
ClearML Server deployment uses node storage. If more than one node is labeled as ``app=clearml``, and the server is later 
redeployed or updated, then **ClearML Server**  may not locate all the data.
:::


## Deploying


:::warning
By default, **ClearML Server** launches with unrestricted access. To restrict **ClearML Server** access, follow the instructions 
in the [Security](clearml_server_security.md) page.
:::




### Step 1: Modify Elasticsearch default values in the Docker configuration file

Before deploying **ClearML Server** in a Kubernetes cluster, modify several Elasticsearch settings in the Docker configuration. 
For more information, see [Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/master/docker.html#_notes_for_production_use_and_defaults) 
in the Elasticsearch documentation and [Daemon configuration file](https://docs.docker.com/config/daemon/) in the Docker documentation.

**To modify Elasticsearch default values in the Docker configuration file:**

1. Connect to the node in the Kubernetes cluster labeled `app=clearml`.
1. Create or edit (if one exists) the `/etc/docker/daemon.json` file, and add or modify the `defaults-ulimits` section 
   as the following example shows:

        {
            "default-ulimits": {
                "nofile": {
                    "name": "nofile",
                    "hard": 65536,
                    "soft": 1024
                },
                "memlock":
                {
                    "name": "memlock",
                    "soft": -1,
                    "hard": -1
                }
            }
        }

1. Elasticsearch requires that the `vm.max_map_count` kernel setting, which is the maximum number of memory map areas a process can use, be set to at least `262144`.

    For CentOS 7, Ubuntu 16.04, Mint 18.3, Ubuntu 18.04 and Mint 19.x, use the following commands to set `vm.max_map_count`:

        echo "vm.max_map_count=262144" > /tmp/99-clearml.conf
        sudo mv /tmp/99-clearml.conf /etc/sysctl.d/99-clearml.conf
        sudo sysctl -w vm.max_map_count=262144
        
1. Restart docker:

        sudo service docker restart

### Step 2. Deploy ClearML Server in the Kubernetes Cluster

After modifying several Elasticsearch settings in the Docker configuration (see Step 1 above), deploy **ClearML 
Server**.

**To deploy ClearML Server in Kubernetes Clusters:**

1. Clone the `clearml-server-k8s` repository and change to the new `clearml-server-k8s` directory:

        git clone https://github.com/allegroai/clearml-server-k8s.git && cd clearml-server-k8s/clearml-server-k8s

1. Create the clearml `namespace` and deployments:

        kubectl apply -k overlays/current_version
   
   :::note 
   This installs the templates for the current ``clearml-server`` version and updates patch versions whenever the deployment is restarted (or reinstalled). 
   :::
   
        
   To use the latest version, which is **_not recommended_**:
         
         kubectl apply -k base

## Port Mapping

After deploying **ClearML Server**, the services expose the following node ports:

* API server on `30008`.
* Web server on `30080`.
* File server on `30081`.

## Accessing ClearML Server

**To access the ClearML Server, do the following:**

1. Create domain records.

    * Create records for the **ClearML Server** web server, file server, and API access using the following rules: 
         * `app.<your_domain_name>` 
         * `files.<your_domain_name>`
         * `api.<your_domain_name>`
     
    For example:
    * `app.clearml.mydomainname.com`
    * `files.clearml.mydomainname.com`
    * `api.clearml.mydomainname.com`
     
1. Point the created records to the load balancer.

1. Configure the load balancer to redirect traffic coming from the records:

     * `app.<your_domain_name>` should be redirected to k8s cluster nodes on port `30080`
     * `files.<your_domain_name>` should be redirected to k8s cluster nodes on port `30081`
     * `api.<your_domain_name>` should be redirected to k8s cluster nodes on port `30008`

   
## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).