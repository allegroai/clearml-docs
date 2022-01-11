---
title: Environment Variables
---

:::info
ClearML's environment variables override the clearml.conf file, SDK, and [configuration vault](../webapp/webapp_profile.md#configuration-vault), 
but can be overridden by command-line arguments. 
:::

## ClearML SDK Variables

### General
|Name|Description|
|---|---|
|**CLEARML_LOG_ENVIRONMENT** | List of Environment variables to log|
|**CLEARML_TASK_NO_REUSE** | Control Task reuse|
|**CLEARML_CACHE_DIR** | Sets the location of the cache directory|
|**CLEARML_DOCKER_IMAGE** | Sets the default docker image to run from|
|**CLEARML_LOG_LEVEL** | debug / warning / error / info - Sets the ClearML package's log verbosity|
|**CLEARML_SUPPRESS_UPDATE_MESSAGE** | Suppresses the message that notifies users of new ClearML package version|

### VCS
Overrides Repository Auto-logging

|Name|Description|
|---|---|
|**CLEARML_VCS_REPO_URL**| Repository's URL|
|**CLEARML_VCS_COMMIT_ID**| Repository's Commit ID|
|**CLEARML_VCS_BRANCH**| Repository's Branch|
|**CLEARML_VCS_ROOT**| Repository's Root directory|

### Server Connection
|Name|Description|
|---|---|
|**CLEARML_API_HOST** | Sets the API Server URL|
|**CLEARML_CONFIG_FILE**| Sets the ClearML configuration file. Overrides the default configuration file location |
|**CLEARML_WEB_HOST** | Sets the Web UI Server URL|
|**CLEARML_FILES_HOST** | Sets the File Server URL
|**CLEARML_API_ACCESS_KEY** | Sets the Server's Public Access Key|
|**CLEARML_API_SECRET_KEY** | Sets the Server's Private Access Key|
|**CLEARML_API_HOST_VERIFY_CERT**| Enables / Disables server certificate verification (if behind a firewall)|
|**CLEARML_OFFLINE_MODE** | Sets Offline mode|
|**CLEARML_NO_DEFAULT_SERVER** | Disables sending information to demo server when no HOST server is set|

## ClearML Agent Variables
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
|**CLEARML_AGENT_SKIP_PIP_VENV_INSTALL**| Skips Python virtual env installation on execute and provides a custom venv binary |
|**CLEARML_AGENT_VENV_CACHE_PATH**|Overrides venv cache folder configuration|