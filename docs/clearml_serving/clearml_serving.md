---
title: Introduction
---

`clearml-serving` is a command line utility for model deployment and orchestration.
It enables model deployment including serving and preprocessing code to a Kubernetes cluster or custom container based 
solution.


## Features

* Easy to deploy & configure
    * Support Machine Learning Models (Scikit Learn, XGBoost, LightGBM)
    * Support Deep Learning Models (Tensorflow, PyTorch, ONNX)
    * Customizable RestAPI for serving (i.e. allow per model pre/post-processing for easy integration)
* Flexible
    * On-line model deployment
    * On-line endpoint model/version deployment (i.e. no need to take the service down)
    * Per model standalone preprocessing and postprocessing python code
* Scalable
    * Multi model per container
    * Multi models per serving service
    * Multi-service support (fully seperated multiple serving service running independently)
    * Multi cluster support
    * Out-of-the-box node auto-scaling based on load/usage
* Efficient
    * Multi-container resource utilization
    * Support for CPU & GPU nodes
    * Auto-batching for DL models
* [Automatic deployment](clearml_serving_tutorial.md#automatic-model-deployment)
    * Automatic model upgrades w/ canary support
    * Programmable API for model deployment
* [Canary A/B deployment](clearml_serving_tutorial.md#canary-endpoint-setup) - online Canary updates
* [Model Monitoring](clearml_serving_tutorial.md#model-monitoring-and-performance-metrics)
    * Usage Metric reporting
    * Metric Dashboard
    * Model performance metric
    * Model performance Dashboard

## Components

![ClearML Serving](https://github.com/allegroai/clearml-serving/raw/main/docs/design_diagram.png?raw=true)

* **CLI** - Secure configuration interface for on-line model upgrade/deployment on running Serving Services

* **Serving Service Task** - Control plane object storing configuration on all the endpoints. Support multiple separated 
  instance, deployed on multiple clusters.

* **Inference Services** - Inference containers, performing model serving pre/post processing. Also supports CPU model 
  inferencing.

* **Serving Engine Services** - Inference engine containers (e.g. Nvidia Triton, TorchServe etc.) used by the Inference 
  Services for heavier model inference.

* **Statistics Service** - Single instance per Serving Service collecting and broadcasting model serving & performance 
  statistics

* **Time-series DB** - Statistics collection service used by the Statistics Service, e.g. Prometheus

* **Dashboards** - Customizable dashboard solution on top of the collected statistics, e.g. Grafana

## Installation

:::important Updating ClearML Serving
To update to ClearML Serving version 1.1, see instructions [here](../release_notes/ver_1_1.md#clearml-serving-110).
:::

### Prerequisites

* ClearML-Server : Model repository, Service Health, Control plane
* Kubernetes / Single-instance Machine : Deploying containers
* CLI : Configuration & model deployment interface

### Initial Setup
1. Set up your [ClearML Server](../deploying_clearml/clearml_server.md) or use the 
  [free hosted service](https://app.clear.ml)
1. Connect `clearml` SDK to the server, see instructions [here](../getting_started/ds/ds_first_steps.md#install-clearml)

1. Install clearml-serving CLI:
   
   ```bash
   pip3 install clearml-serving
   ```

1. Create the Serving Service Controller:
   
   ```bash
   clearml-serving create --name "serving example"
   ```
   
   The new serving service UID should be printed 
   
   ```console
   New Serving Service created: id=aa11bb22aa11bb22
   ```
   
   Write down the Serving Service UID

1. Clone the `clearml-serving` repository:
   ```bash
   git clone https://github.com/allegroai/clearml-serving.git
   ```

1. Edit the environment variables file (docker/example.env) with your clearml-server credentials and Serving Service UID. 
   For example, you should have something like
   ```bash
   cat docker/example.env
   ```
   
   ```console 
    CLEARML_WEB_HOST="https://app.clear.ml"
    CLEARML_API_HOST="https://api.clear.ml"
    CLEARML_FILES_HOST="https://files.clear.ml"
    CLEARML_API_ACCESS_KEY="<access_key_here>"
    CLEARML_API_SECRET_KEY="<secret_key_here>"
    CLEARML_SERVING_TASK_ID="<serving_service_id_here>"
   ```

1. Spin up the `clearml-serving` containers with `docker-compose` (or if running on Kubernetes, use the helm chart)
   
   ```bash
   cd docker && docker-compose --env-file example.env -f docker-compose.yml up
   ```
    
   If you need Triton support (keras/pytorch/onnx etc.), use the triton docker-compose file
   ```bash
   cd docker && docker-compose --env-file example.env -f docker-compose-triton.yml up 
   ```
   
   If running on a GPU instance w/ Triton support (keras/pytorch/onnx etc.), use the triton gpu docker-compose file:
   ```bash
   cd docker && docker-compose --env-file example.env -f docker-compose-triton-gpu.yml up
   ```
    
:::note
Any model that registers with Triton engine will run the pre/post processing code on the Inference service container, 
and the model inference itself will be executed on the Triton Engine container.
:::

### Advanced Setup - S3/GS/Azure Access (Optional)
To add access credentials and allow the inference containers to download models from your S3/GS/Azure object-storage, 
add the respective environment variables to your env files (example.env). See further details on configuring the storage 
access [here](../integrations/storage.md#configuring-storage).

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION

GOOGLE_APPLICATION_CREDENTIALS

AZURE_STORAGE_ACCOUNT
AZURE_STORAGE_KEY
```

## Tutorial

For further details, see the ClearML Serving [Tutorial](clearml_serving_tutorial.md).