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
|Name| Description                                                                    |
|---|--------------------------------------------------------------------------------|
|**CLEARML_LOG_ENVIRONMENT** | List of Environment variable names. These environment variables will be logged in the ClearML task’s configuration hyperparameters `Environment` section. When executed by a ClearML agent, these values will be set in the task’s execution environment. |
|**CLEARML_TASK_NO_REUSE** | Boolean. <br/> When set to `true`, a new task is created for every execution (see Task [reuse](../clearml_sdk/task_sdk#task-reuse)).                                                              |
|**CLEARML_CACHE_DIR** | Set the path for the ClearML cache directory, where ClearML stores all downloaded content.   |
|**CLEARML_DOCKER_IMAGE** | Sets the default docker image to use when running an agent in [Docker mode](../clearml_agent.md#docker-mode).  |
|**CLEARML_LOG_LEVEL** | Sets the ClearML package's log verbosity. Log levels adhere to [Python log levels](https://docs.python.org/3/library/logging.config.html#configuration-file-format): CRITICAL, ERROR, WARNING, INFO, DEBUG, NOTSET |
|**CLEARML_SUPPRESS_UPDATE_MESSAGE** | Boolean. <br/> When set to `1`, suppresses new ClearML package version availability message. |
|**CLEARML_DEFAULT_OUTPUT_URI** | The default output destination for model checkpoints (snapshots) and artifacts. |
|**CLEARML_SET_ITERATION_OFFSET** | Set initial iteration value for the executed task. The task will report its iterations starting with the specified value +1. Specify `0` to force resetting the iteration count.|

### VCS
Overrides Repository Auto-logging

|Name| Description                    |
|---|--------------------------------|
|**CLEARML_VCS_REPO_URL** | Repository's URL               |
|**CLEARML_VCS_COMMIT_ID** | Repository's Commit ID         |
|**CLEARML_VCS_BRANCH** | Repository's Branch            |
|**CLEARML_VCS_ROOT** | Repository's Root directory    |
|**CLEARML_VCS_WORK_DIR** | Repository's working directory |
|**CLEARML_VCS_STATUS** | Repository status              |
|**CLEARML_VCS_DIFF** | Script diff                    |
|**CLEARML_VCS_ENTRY_POINT** | Entry point script             |

### Server Connection
|Name|Description|
|---|---|
|**CLEARML_API_HOST** | Sets the API Server URL|
|**CLEARML_CONFIG_FILE** | Sets the ClearML configuration file. Overrides the default configuration file location|
|**CLEARML_WEB_HOST** | Sets the Web UI Server URL|
|**CLEARML_FILES_HOST** | Sets the File Server URL|
|**CLEARML_API_ACCESS_KEY** | Sets the Server's Public Access Key|
|**CLEARML_API_SECRET_KEY** | Sets the Server's Private Access Key|
|**CLEARML_API_HOST_VERIFY_CERT** | Enables / Disables server certificate verification (if behind a firewall)|
|**CLEARML_OFFLINE_MODE** | Sets Offline mode|
|**CLEARML_NO_DEFAULT_SERVER** | Disables sending information to demo server when no HOST server is set|

