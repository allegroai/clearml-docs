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
