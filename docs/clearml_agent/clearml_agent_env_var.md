---
title: ClearML Agent Environment Variables
---

This page lists the available environment variables for configuring ClearML Agent. 

In addition to the environment variables listed below, ClearML also supports **dynamic environment variables** to override 
any configuration option that appears in the [`agent`](../configs/clearml_conf.md#agent-section) section of the `clearml.conf`. 
For more information, see [Dynamic Environment Variables](../clearml_agent.md#dynamic-environment-variables).

:::info
ClearML's environment variables override the [clearml.conf file](../configs/clearml_conf.md), SDK, and 
[configuration vault](../webapp/webapp_profile.md#configuration-vault), 
but can be overridden by command-line arguments. 
:::

|Name| Description                                                                                                                                                                                                                                     |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|**CLEARML_DOCKER_IMAGE** | Sets the default docker image to use when running an agent in [Docker mode](../clearml_agent.md#docker-mode)                                                                                                                                                                                                              |
|**CLEARML_WORKER_NAME** | Sets the Worker's name                                                                                                                                                                                                                          |
|**CLEARML_WORKER_ID** | Sets the Worker ID                                                                                                                                                                                                                              |
|**CLEARML_CUDA_VERSION** | Sets the CUDA version to be used                                                                                                                                                                                                                |
|**CLEARML_CUDNN_VERSION** | Sets the CUDNN version to be used                                                                                                                                                                                                               |
|**CLEARML_CPU_ONLY** | Force CPU only mode                                                                                                                                                                                                                             |
|**CLEARML_DOCKER_SKIP_GPUS_FLAG** | Skips the GPUs flag (support for docker V18                                                                                                                                                                                                     |
|**CLEARML_AGENT_DOCKER_ARGS_HIDE_ENV** | Hide Docker environment variables containing secrets when printing out the Docker command. When printed, the variable values will be replaced by `********`. See [`agent.hide_docker_command_env_vars`](../configs/clearml_conf.md#hide_docker) |
|**CLEARML_AGENT_DISABLE_SSH_MOUNT** | Disables the auto `.ssh` mount into the docker                                                                                                                                                                                                  |
|**CLEARML_AGENT_FORCE_CODE_DIR**| Allows overriding the remote execution code directory to bypass repository cloning and use a repo already available where the remote agent is running. |
|**CLEARML_AGENT_FORCE_EXEC_SCRIPT**| Allows overriding the remote execution script to bypass repository cloning and execute code already available where the remote agent is running. Use `module:file.py` format to specify a module and a script to execute (e.g. `.:main.py` to run `main.py` from the working dir)|
|**CLEARML_AGENT_FORCE_SYSTEM_SITE_PACKAGES** | If set to `1`, overrides default [`agent.package_manager.system_site_packages: true`](../configs/clearml_conf.md#system_site_packages) behavior when running tasks in containers (docker mode and k8s-glue)|
|**CLEARML_AGENT_GIT_CLONE_VERBOSE**| If set to `1`, `git clone` calls will report progress verbosely  |
|**CLEARML_AGENT_GIT_USER** | Sets the Git user for ClearML Agent                                                                                                                                                                                                             |
|**CLEARML_AGENT_GIT_PASS** | Sets the Git password for ClearML Agent                                                                                                                                                                                                         |
|**CLEARML_AGENT_GIT_HOST** | Sets Git host (only sending login to this host)                                                                                                                                                                                                 |
|**CLEARML_AGENT_EXEC_USER** | User for Agent executing tasks (root by default)                                                                                                                                                                                                |
|**CLEARML_AGENT_EXTRA_DOCKER_ARGS** | Overrides extra docker args configuration                                                                                                                                                                                                       |
|**CLEARML_AGENT_EXTRA_DOCKER_LABELS** | List of labels to add to docker container. See [Docker documentation](https://docs.docker.com/config/labels-custom-metadata/). |
|**CLEARML_EXTRA_PIP_INSTALL_FLAGS**| List of additional flags to use when the agent installs packages. For example: `["--use-deprecated=legacy-resolver", ]`|
|**CLEARML_AGENT_EXTRA_PYTHON_PATH** | Sets extra python path                                                                                                                                                                                                                          |
|**CLEARML_AGENT_INITIAL_CONNECT_RETRY_OVERRIDE** | Overrides initial server connection behavior (true by default), allows explicit number to specify number of connect retries)                                                                                                                    | 
|**CLEARML_AGENT_NO_UPDATE** | Boolean. Set to `1` to skip agent update in the k8s pod container before the agent executes the task |
|**CLEARML_AGENT_K8S_HOST_MOUNT / CLEARML_AGENT_DOCKER_HOST_MOUNT** | Specifies Agent's mount point for Docker / K8s                                                                                                                                                                                                  |
|**CLEARML_AGENT_TEMP_STDOUT_FILE_DIR**|Allows overriding the default `/tmp` location for agent temporary files|
|**CLEARML_K8S_GLUE_START_AGENT_SCRIPT_PATH** | Provide an alternate path to place the agent startup script generated inside a k8s task pod (instead of the default `~/~/__start_agent__.sh`)                                                                                                   |
|**CLEARML_AGENT_PACKAGE_PYTORCH_RESOLVE**|Sets the PyTorch resolving mode. The options are: <ul><li>`none` - No resolving. Install PyTorch like any other package</li><li>`pip` (default) - Sets extra index based on cuda and lets pip resolve</li><li>`direct` - Resolve a direct link to the PyTorch wheel by parsing the pytorch.org pip repository, and matching the automatically detected cuda version with the required PyTorch wheel. If the exact cuda version is not found for the required PyTorch wheel, it will try a lower cuda version until a match is found</li></ul>  |
|**CLEARML_AGENT_DEBUG_INFO** | Provide additional debug information for a specific context (currently only the `docker` value is supported)                                                                                                                                    |
|**CLEARML_AGENT_CHILD_AGENTS_COUNT_CMD** | Provide an alternate bash command to list child agents while working in services mode                                                                                                                                                           |
|**CLEARML_AGENT_SKIP_PIP_VENV_INSTALL** | Skips Python virtual env installation on execute and provides a custom venv binary                                                                                                                                                              |
|**CLEARML_AGENT_SKIP_PYTHON_ENV_INSTALL** | Skips entire Python venv installation and assumes python as well as every dependency is preinstalled                                                                                                                                            |
|**CLEARML_AGENT_VENV_CACHE_PATH** | Overrides venv cache folder configuration                                                                                                                                                                                                       |