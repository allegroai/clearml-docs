---
title: Kubernetes Using Helm
---

:::important
**This documentation page is being updated.** Please see the new and improved **[ClearML Helm Charts repository](https://github.com/allegroai/clearml-helm-charts)**
for the most updated instructions. 
::: 

:::note
This documentation page applies to deploying your own open source **ClearML Server**. It does not apply to **ClearML Hosted Service** users.
:::

:::warning
If **ClearML Server** is being reinstalled, we recommend clearing browser cookies for **ClearML Server**. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the **ClearML Server** URL.
:::

For information about upgrading **ClearML Server** in Kubernetes Clusters using Help, see [here](upgrade_server_kubernetes_helm.md).

## Prerequisites

* A Kubernetes cluster.
* `kubectl` installed and configured (see [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) in the Kubernetes documentation).
* `helm` is installed (see [Installing Helm](https://helm.sh/docs/using_helm.html#installing-helm) in the Helm documentation).
* One node labeled `app=clearml`.

:::warning
ClearML Server deployment uses node storage. If more than one node is labeled as ``app=clearml``, and the server is later 
redeployed or updated, then **ClearML Server**  may not locate all the data.
:::

## Deploying

:::warning
By default, **ClearML Server** launches with unrestricted access. To restrict **ClearML Server** access, follow the 
instructions in the [Security](clearml_server_security.md) page.
:::


### Step 1: Modify Elasticsearch Default Values in the Docker Configuration File

Before deploying **ClearML Server** in a Kubernetes cluster, modify several Elasticsearch settings in the Docker configuration. 
For more information, see [Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/master/docker.html#_notes_for_production_use_and_defaults) 
in the Elasticsearch documentation and [Daemon configuration file](https://docs.docker.com/config/daemon/) in the Docker documentation.

**To modify Elasticsearch default values in the Docker configuration file:**

1. Connect to the node in the Kubernetes cluster labeled `app=clearml`.
1. Create or edit (if one exists) the `/etc/docker/daemon.json` file, and add or modify the `defaults-ulimits` section as 
   the following example shows:

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

1. Elasticsearch requires that the `vm.max_map_count` kernel setting, which is the maximum number of memory map areas a 
   process can use, be set to at least `262144`.

    For CentOS 7, Ubuntu 16.04, Mint 18.3, Ubuntu 18.04 and Mint 19.x, use the following commands to set `vm.max_map_count`:

        echo "vm.max_map_count=262144" > /tmp/99-clearml.conf
        sudo mv /tmp/99-clearml.conf /etc/sysctl.d/99-clearml.conf
        sudo sysctl -w vm.max_map_count=262144

1. Restart docker:

        sudo service docker restart

### Step 2. Deploy ClearML Server in the Kubernetes Using Helm

After modifying several Elasticsearch settings in the Docker configuration (see Step 1 above), deploy **ClearML Server**.

**To deploy ClearML Server in Kubernetes using Helm:**

1. Add the clearml-server repository to Helm:

        helm repo add allegroai https://allegroai.github.io/clearml-helm-charts

1. Confirm the clearml repository is now in Helm:
    
        helm search repo allegroai

    The helm search results must include `allegroai/clearml`.
    
1. Install `clearml` on your cluster:
    
        helm install clearml-server allegroai/clearml -n clearml --create-namespace

    A clearml `namespace` is created in the cluster and clearml-server is deployed in it.

## Port Mapping

After **ClearML Server** is deployed, the services expose the following node ports:

* API server on `30008`.
* Web server on `30080`.
* File server on `30081`.

The node ports map to the following  container ports:

* `30080` maps to `clearml-webserver` container on port `8080`
* `30008` maps to `clearml-apiserver` container on port `8008`
* `30081` maps to `clearml-fileserver` container on port `8081`

:::important
We recommend using the container ports (``8080``, ``8008``, and ``8081``), or a load balancer (see the next section, [Accessing ClearML Server](#accessing-clearml-server)).
:::

## Accessing ClearML Server 

**To access ClearML Server:**

* Create a load balancer and domain with records pointing to **ClearML Server** using the following rules, which **ClearML** 
  uses to translate domain names:

    * The record to access the **ClearML Web UI**:

            *app.<your domain name>.* 

    For example, `clearml.app.mydomainname.com` points to your node on port `30080`.
    
    * The record to access the **ClearML** API:

            *api.<your domain name>.* 

    For example, `clearml.api.mydomainname.com` points to your node on port `30008`.
    
    * The record to access the **ClearML** file server:

            *files.<your domain name>.*

        For example, `clearmlfiles.mydomainname.com` points to your node on port `30081`.

    
## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
