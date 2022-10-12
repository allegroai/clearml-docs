---
title: Environment Variables
---

This page lists the available environment variables for configuring ClearML Agent. 

:::info
ClearML's environment variables override the clearml.conf file, SDK, and [configuration vault](../webapp/webapp_profile.md#configuration-vault), 
but can be overridden by command-line arguments. 
:::

|Name|Description|
|---|---|
|**CLEARML_DOCKER_IMAGE** | Default ClearML Agent docker image|
|**CLEARML_WORKER_NAME** | Sets the Worker's name|
|**CLEARML_WORKER_ID** | Sets the Worker ID|
|**CLEARML_CUDA_VERSION** | Sets the CUDA version to be used|
|**CLEARML_CUDNN_VERSION** | Sets the CUDNN version to be used|
|**CLEARML_CPU_ONLY** | Force CPU only mode|
|**CLEARML_DOCKER_SKIP_GPUS_FLAG**| Skips the GPUs flag (support for docker V18|
|**CLEARML_AGENT_DISABLE_SSH_MOUNT**| Disables the auto `.ssh` mount into the docker|
|**CLEARML_AGENT_GIT_USER** | Sets the Git user for ClearML Agent|
|**CLEARML_AGENT_GIT_PASS** | Sets the Git password for ClearML Agent|
|**CLEARML_AGENT_GIT_HOST** | Sets Git host (only sending login to this host)|
|**CLEARML_AGENT_EXEC_USER**| User for Agent executing tasks (root by default)|
|**CLEARML_AGENT_EXTRA_DOCKER_ARGS**| Overrides extra docker args configuration |
|**CLEARML_AGENT_EXTRA_PYTHON_PATH**| Sets extra python path|
|**CLEARML_AGENT_INITIAL_CONNECT_RETRY_OVERRIDE**| Overrides initial server connection behavior (true by default), allows explicit number to specify number of connect retries) | 
|**CLEARML_AGENT_K8S_HOST_MOUNT / CLEARML_AGENT_DOCKER_HOST_MOUNT**| Specifies Agent's mount point for Docker / K8s|
|**CLEARML_K8S_GLUE_START_AGENT_SCRIPT_PATH**| Provide an alternate path to place the agent startup script generated inside a k8s task pod (instead of the default `~/~/__start_agent__.sh`)|
|**CLEARML_AGENT_DEBUG_INFO**| Provide additional debug information for a specific context (currently only the `docker` value is supported)|
|**CLEARML_AGENT_CHILD_AGENTS_COUNT_CMD**|Provide an alternate bash command to list child agents while working in services mode|
|**CLEARML_AGENT_SKIP_PIP_VENV_INSTALL**| Skips Python virtual env installation on execute and provides a custom venv binary |
|**CLEARML_AGENT_SKIP_PYTHON_ENV_INSTALL**| Skips entire Python venv installation and assumes python as well as every dependency is preinstalled|
|**CLEARML_AGENT_VENV_CACHE_PATH**|Overrides venv cache folder configuration|