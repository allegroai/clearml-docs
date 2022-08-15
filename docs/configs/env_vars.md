---
title: Environment Variables
---

This page lists the available environment variables for configuring ClearML. See [here](../clearml_agent/clearml_agent_env_var.md)
for environment variables to configure ClearML Agent. 

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

