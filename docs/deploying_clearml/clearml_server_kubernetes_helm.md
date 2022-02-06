---
title: Kubernetes
---

:::warning
If ClearML Server is being reinstalled, we recommend clearing browser cookies for ClearML Server. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the ClearML Server URL.
:::

For information about upgrading ClearML Server in Kubernetes Clusters using Helm, see [here](upgrade_server_kubernetes_helm.md).

## Prerequisites

* Set up a Kubernetes cluster - For setting up Kubernetes on various platforms refer to the Kubernetes [getting started guide](https://kubernetes.io/docs/setup).
* Set up a single node LOCAL Kubernetes on laptop/desktop - For setting up Kubernetes on your laptop/desktop we suggest [kind](https://kind.sigs.k8s.io).
* Install `helm` - Helm is a tool for managing Kubernetes charts. Charts are packages of pre-configured Kubernetes resources.
To install Helm, refer to the [Helm installation guide](https://helm.sh/docs/using_helm.html#installing-helm) in the Helm documentation.
Ensure that the `helm` binary is in the PATH of your shell.

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
 (### Step 2. Deploy ClearML Server in the Kubernetes Using Helm)

[comment]: <> (After modifying several Elasticsearch settings in the Docker configuration &#40;see Step 1 above&#41;, deploy **ClearML Server**.)

[comment]: <> (**To deploy ClearML Server in Kubernetes using Helm:**)

[comment]: <> (1. Add the clearml-server repository to Helm:)

[comment]: <> (        helm repo add allegroai https://allegroai.github.io/clearml-helm-charts)
z
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


$$$$




See detailed deployment instructions in [clearml-helm-charts](https://github.com/allegroai/clearml-helm-charts/tree/main/charts/clearml) 
repository 

## Usage

```bash
$ helm repo add allegroai https://allegroai.github.io/clearml-helm-charts
$ helm repo update
$ helm search repo allegroai
$ helm install <release-name> allegroai/<chart>
```

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
