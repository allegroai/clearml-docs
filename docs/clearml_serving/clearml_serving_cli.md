---
title: CLI 
--- 

The `clearml-serving` utility is a CLI tool for model deployment and orchestration. 

The following page provides a reference for `clearml-serving`'s CLI commands:
* [list](#list) -  List running Serving Services
* [create](#create) - Create a new Serving Service
* [metrics](#metrics) - Configure inference metrics Service
* [config](#config) - Configure a new Serving Service
* [model](#model) - Configure Model endpoints for a running Service


```bash
clearml-serving [-h] [--debug] [--id ID] {list,create,metrics,config,model} 
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`|Serving Service (Control plane) Task ID to configure (if not provided automatically detect the running control plane Task) | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--debug` |  Print debug messages | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |

</div>

:::info Service ID
The Serving Service's ID (`--id`) is required to execute the `metrics`, `config`, and `model` commands.
:::

### list
```bash
clearml-serving list [-h]
```

List running Serving Services. 

### create

```bash
clearml-serving create [-h] [--name NAME] [--tags TAGS [TAGS ...]] [--project PROJECT]
```

Create a new Serving Service

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--name` |Serving service's name. Default: `Serving-Service`| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--project`|Serving service's project. Default: `DevOps`| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--tags` |Serving service's user tags. The serving service can be labeled, which can be useful for organizing | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

### metrics

Configure inference metrics Service

```bash
clearml-serving metrics [-h] {add,remove,list}
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--add` | Add/modify metric for a specific endpoint| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--remove` | Remove metric from a specific endpoint| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--list` | list metrics logged on all endpoints | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |

</div>

<br/>

### config

Configure a new Serving Service. 

```bash
clearml-serving {base-serving-url, triton-grpc, kafka-metric-server, metric-log-freq}
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--base-serving-url`|External base serving service url. Example: `http://127.0.0.1:8080/serve`|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--triton-grpc-server`|External ClearML-Triton serving container gRPC address. Example: `127.0.0.1:9001`|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--kafka-metric-server`|External Kafka service url. Example: `127.0.0.1:9092`|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--metric-log-freq`|Set default metric logging frequency. 1.0 is 100% of all requests are logged|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

### model

Configure Model endpoints for an already running Service

```bash
clearml-serving model [-h] {list,remove,upload,canary,auto-update,add}
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--list`|  List current models| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--remove`| Remove model by its endpoint name | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--upload` | Upload and register model files/folder | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--canary` | Add model Canary/A/B endpoint | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--auto-update` | Add/Modify model auto update service | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--add` | Add/Update model | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>
