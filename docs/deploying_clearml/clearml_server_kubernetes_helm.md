---
title: Kubernetes
---

:::warning
If ClearML Server is being reinstalled, we recommend clearing browser cookies for ClearML Server. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the ClearML Server URL.
:::

For information about upgrading ClearML Server in Kubernetes Clusters using Help, see [here](upgrade_server_kubernetes_helm.md).

## Prerequisites

* A Kubernetes cluster - For setting up Kubernetes on various platforms refer to the Kubernetes [getting started](https://kubernetes.io/docs/setup) guide.
* `helm` is installed - Helm is a tool for managing Kubernetes charts. Charts are packages of pre-configured Kubernetes resources.
To install Helm, refer to the [Helm installation guide](https://helm.sh/docs/using_helm.html#installing-helm) in the Helm documentation.
Ensure that the `helm` binary is in the PATH of your shell
* Set up a single node LOCAL Kubernetes on laptop/desktop - For setting up Kubernetes on your laptop/desktop we suggest [kind](https://kind.sigs.k8s.io).

[comment]: <> (* `kubectl` installed and configured &#40;see [Install and Set Up kubectl]&#40;https://kubernetes.io/docs/tasks/tools/install-kubectl/&#41; in the Kubernetes documentation&#41;.)
[comment]: <> (* One node labeled `app=clearml`.)

:::warning
ClearML Server deployment uses node storage. If more than one node is labeled as ``app=clearml``, and the server is later 
redeployed or updated, then ClearML Server  may not locate all the data.
:::

## Deploying

:::warning
By default, ClearML Server launches with unrestricted access. To restrict ClearML Server access, follow the 
instructions in the [Security](clearml_server_security.md) page.
:::

$$$$

[comment]: <> (### Step 1: Modify Elasticsearch Default Values in the Docker Configuration File)

[comment]: <> (Before deploying ClearML Server in a Kubernetes cluster, modify several Elasticsearch settings in the Docker configuration. )

[comment]: <> (For more information, see [Install Elasticsearch with Docker]&#40;https://www.elastic.co/guide/en/elasticsearch/reference/master/docker.html#_notes_for_production_use_and_defaults&#41; )

[comment]: <> (in the Elasticsearch documentation and [Daemon configuration file]&#40;https://docs.docker.com/config/daemon/&#41; in the Docker documentation.)

[comment]: <> (**To modify Elasticsearch default values in the Docker configuration file:**)

[comment]: <> (1. Connect to the node in the Kubernetes cluster labeled `app=clearml`.)

[comment]: <> (1. Create or edit &#40;if one exists&#41; the `/etc/docker/daemon.json` file, and add or modify the `defaults-ulimits` section as )

[comment]: <> (   the following example shows:)

[comment]: <> (        {)

[comment]: <> (            "default-ulimits": {)

[comment]: <> (                "nofile": {)

[comment]: <> (                    "name": "nofile",)

[comment]: <> (                    "hard": 65536,)

[comment]: <> (                    "soft": 1024)

[comment]: <> (                },)

[comment]: <> (                "memlock":)

[comment]: <> (                {)

[comment]: <> (                    "name": "memlock",)

[comment]: <> (                    "soft": -1,)

[comment]: <> (                    "hard": -1)

[comment]: <> (                })

[comment]: <> (            })

[comment]: <> (        })

[comment]: <> (1. Elasticsearch requires that the `vm.max_map_count` kernel setting, which is the maximum number of memory map areas a )

[comment]: <> (   process can use, be set to at least `262144`.)

[comment]: <> (    For CentOS 7, Ubuntu 16.04, Mint 18.3, Ubuntu 18.04 and Mint 19.x, use the following commands to set `vm.max_map_count`:)

[comment]: <> (        echo "vm.max_map_count=262144" > /tmp/99-clearml.conf)

[comment]: <> (        sudo mv /tmp/99-clearml.conf /etc/sysctl.d/99-clearml.conf)

[comment]: <> (        sudo sysctl -w vm.max_map_count=262144)

[comment]: <> (1. Restart docker:)

[comment]: <> (        sudo service docker restart)

[comment]: <> (### Step 2. Deploy ClearML Server in the Kubernetes Using Helm)

[comment]: <> (After modifying several Elasticsearch settings in the Docker configuration &#40;see Step 1 above&#41;, deploy **ClearML Server**.)

[comment]: <> (**To deploy ClearML Server in Kubernetes using Helm:**)

[comment]: <> (1. Add the clearml-server repository to Helm:)

[comment]: <> (        helm repo add allegroai https://allegroai.github.io/clearml-helm-charts)

[comment]: <> (1. Confirm the clearml repository is now in Helm:)
    
[comment]: <> (        helm search repo allegroai)

[comment]: <> (    The helm search results must include `allegroai/clearml`.)
    
[comment]: <> (1. Install `clearml` on your cluster:)
    
[comment]: <> (        helm install clearml-server allegroai/clearml -n clearml --create-namespace)

[comment]: <> (    A clearml `namespace` is created in the cluster and clearml-server is deployed in it.)

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
