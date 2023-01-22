---
title: Configuration File
---
This reference page provides detailed information about the configurable options for ClearML and ClearML Agent. 
ClearML and ClearML Agent use the same configuration file `clearml.conf`. 

This reference page is organized by configuration file section:

* [agent](#agent-section) - Contains ClearML Agent configuration options. If ClearML Agent was not installed, the configuration 
  file will not have an `agent` section.
* [api](#api-section) - Contains ClearML and ClearML Agent configuration options for ClearML Server.
* [sdk](#sdk-section) - Contains ClearML and ClearML Agent configuration options for ClearML Python Package and ClearML Server.

An example configuration file is located [here](https://github.com/allegroai/clearml-agent/blob/master/docs/clearml.conf), 
in the ClearML Agent GitHub repository. 

:::info
The values in the ClearML configuration file can be overridden by environment variables, the [configuration vault](../webapp/webapp_profile.md#configuration-vault), 
and command-line arguments. 
:::

# Editing Your Configuration File

To add, change, or delete options, edit your configuration file.

**To edit your ClearML configuration file:**

1. Open the configuration file for editing, depending upon your operating system:

    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. In the required section (sections listed on this page), add, modify, or remove required options.
1. Save configuration file.

## Environment Variables
ClearML's configuration file uses [HOCON](https://github.com/lightbend/config/blob/main/HOCON.md) configuration format, 
which supports environment variable reference.

For example: 
```editorconfig
 google.storage {
        # # Default project and credentials file
        # # Will be used when no bucket configuration is found
        project: "clearml"
        credentials_json: ${GOOGLE_APPLICATION_CREDENTIALS}
}
```

`${GOOGLE_APPLICATION_CREDENTIALS}` will automatically be substituted by the environment variable value.

See [Note on Windows](https://github.com/lightbend/config/blob/main/HOCON.md#note-on-windows-and-case-sensitivity-of-environment-variables)
for information about using environment variables with Windows in the configuration file. 


## Configuration File Sections

### agent section

**`agent`** (*dict*)
        
* Dictionary of top-level ClearML Agent options to configure ClearML Agent for Git credentials, package managers, cache management, workers, and Docker for workers.
---

**`agent.crash_on_exception`** (*bool*)

* By default, when encountering an exception while running a task, the agent will catch the exception, log it, and 
continue running. When set to `true`, the agent crashes when encountering an exception.

---
        
**`agent.cuda_version`** (*float*)
        
* The CUDA version to use.

    * If specified, this is the CUDA version used. 
    * If not specified, the CUDA version is automatically detected. 

    Alternatively, override this option with the environment variable `CUDA_VERSION`.
    
---
        
**`agent.cudnn_version`** (*float*)
        
* The cuDNN version to use.
    
    * If specified, this is the cuDNN version used. 
    * If not specified, the cuDNN version is automatically detected. 

    Alternatively, override this option with the environment variable `CUDNN_VERSION`.

---

**`agent.disable_ssh_mount`** (*bool*)

* Set to `true` to disable the auto `.ssh` mount into the docker. The environment variable `CLEARML_AGENT_DISABLE_SSH_MOUNT` 
  overrides this configuration option.

___

**`agent.disable_task_docker_override`** (*bool*)

* If set to `true`, agent uses the default docker image and ignores any docker image and arguments specified in the 
task's container section (if setup shell script is specified in task container section, it is used 
in either case).         

---

**`agent.docker_apt_cache`** (*string*)
        
* The apt (Linux package tool) cache folder for mapping Ubuntu package caching into Docker.
        
---

**`agent.docker_container_name_format`** (*string*)

:::note Compatibility Required
Compatible with Docker versions 0.6.5 and above
:::

* Set a name format for Docker containers created by an agent

* The following variables can be used:
  * `task_id`
  * `worker_id` 
  * `rand_string` - random lower-case letters string (up to 32 characters)

* The resulting name must start with an alphanumeric character, while the rest of the name may contain alphanumeric characters, 
  underscores (`_`), dots (`.`) and / or dashes (`-`)
  
* For example: `clearml-id-{task_id}-{rand_string:.8}`

---

        
**`agent.docker_force_pull`** (*bool*)
        
* Always update the Docker image by forcing a Docker `pull` before running an experiment

    The values are:
    
    * `true` - Always update the Docker image.
    * `false` - Do not always update.
  

---

**`agent.docker_install_opencv_libs`** (*bool*)

* Install the required packages for opencv libraries (libsm6 libxext6 libxrender-dev libglib2.0-0), for backwards 
  compatibility reasons. Change to `false` to skip installation and decrease docker spin-up time.

---

<a id="docker_internal_mounts"/> 

**`agent.docker_internal_mounts`** (*dict*) 

* Set internal mount points inside the Docker. This is especially useful for non-root Docker container images.  

For example:
  
  ```
  docker_internal_mounts {
       sdk_cache: "/clearml_agent_cache"
       apt_cache: "/var/cache/apt/archives"
       ssh_folder: "/root/.ssh"
       pip_cache: "/root/.cache/pip"
       poetry_cache: "/root/.cache/pypoetry"
       vcs_cache: "/root/.clearml/vcs-cache"
       venv_build: "/root/.clearml/venvs-builds"
       pip_download: "/root/.clearml/pip-download-cache"
  }
  ```

---
        
**`agent.docker_pip_cache`** (*string*)
        
        
* The pip (Python package tool) cache folder for mapping Python package caching into Docker.
        
---

**`agent.enable_git_ask_pass`** (*bool*)

:::note
`enable_git_ask_pass` is supported only on Linux systems
:::

* If enabled, uses `GIT_ASKPASS` to pass Git user/pass when cloning/fetching repositories
* It solves passing user/token to git submodules.
* This is a safer way to ensure multiple users using the same repository will not accidentally leak credentials

---

**`agent.enable_task_env`** (*bool*)

* Set the OS environments based on the Task's Environment section before launching the Task process.

---

**`agent.extra_docker_arguments`** (*[string]*)
        
* Optional arguments to pass to the Docker image. These are local for this agent, and will not be updated in the experiment's `docker_cmd` section. For example, ` ["--ipc=host", ]`.
        
---
        
**`agent.extra_docker_shell_script`** (*[string]*)
        
* An optional shell script to run in the Docker, when the Docker starts, before the experiment starts. For example, `["apt-get install -y bindfs", ]`
        
---
        
**`agent.force_git_ssh_protocol`** (*bool*)
        
* Force Git protocol to use SSH regardless of the Git URL. This assumes the Git user/pass are blank.

    The values are:
    
    * `true` - Force
    * `false` - Do not force
    
---

**`agent.force_git_ssh_port`** (*integer*)

* Force a specific SSH port when converting HTTP to SSH links. The domain remains unchanged.
        
---

**`agent.force_git_ssh_user`** (*string*)

* Force a specific SSH username when converting HTTP to SSH links (the default username is 'git')

---
        
**`agent.git_host`** (*string*)

* Limit Git credentials usage to this host. The environment variable `CLEARML_AGENT_GIT_HOST` overrides this configuration option.

---
        
**`agent.git_pass`** (*string*)
        
* Git repository password.

    * If using Git SSH credentials, do not specify this option.
    * If not using Git SSH credentials, use this option to specify a Git password for cloning your repositories.
        
---
        
**`agent.git_user`** (*string*)
        
* Git repository username.

    * If using Git SSH credentials, do not specify this option.
    * If not using Git SSH credentials, use this option to specify a Git password for cloning your repositories.
        
---

<a id="hide_docker"/> 

**`agent.hide_docker_command_env_vars`** (*dict*)

  * Hide Docker environment variables containing secrets when printing out the Docker command. When printed, the variable
   values will be replaced by `********`
   
  * Enable this feature by setting `enabled` to `true`. Doing this will hide the following environment variables values:
  
    * `CLEARML_API_SECRET_KEY`
    * `CLEARML_AGENT_GIT_PASS`
    * `AWS_SECRET_ACCESS_KEY` 
    * `AZURE_STORAGE_KEY`
  
  * To mask additional environment variables, add their keys to the `extra_keys` list.  
  For example, to hide the value of a custom environment variable named `MY_SPECIAL_PASSWORD`, set `extra_keys: ["MY_SPECIAL_PASSWORD"]`

  * By default, `parse_embedded_urls` is set to `true`, so agent will also hide passwords in URLs and handle environment variables
    containing docker commands

  ```
  hide_docker_command_env_vars {
    enabled: true 
    extra_keys: ["MY_SPECIAL_PASSWORD"]
    parse_embedded_urls: true
  }
  ```

---

**`agent.ignore_requested_python_version`** (*bool*)

  * Indicates whether to ignore any requested python version 
  
  * The values are:
    
    * `true` - ignore any requested python version
    * `false` - if a task was using a specific python version, and the system supports multiple versions, the agent will 
      use the requested python version (default)

___
        
**`agent.python_binary`** (*string*)
        
* Set the Python version to use when creating the virtual environment, and when launching the experiment. For example, `/usr/bin/python3` or `/usr/local/bin/python3.6`.
        
---
        
**`agent.reload_config`** (*bool*)
        
* Indicates whether to reload the configuration each time the worker daemon is executed.

---
        
**`agent.translate_ssh`** (*bool*)

* Translate HTTPS communication to SSH
        
---

        
**`agent.venvs_dir`** (*string*)
        
* The target folder for virtual environments builds that are created when executing an experiment.
        
---
        
**`agent.worker_id`** (*string*)
        
* When creating a worker, assign the worker a name.

    * If specified, a unique name for the worker. For example, `clearml-agent-machine1:gpu0`.
    * If not specified, the following is used: `<hostname>:<process_id>`.

        For example, `MyHost:12345`.
        
        Alternatively, specify the environment variable `CLEARML_WORKER_NAME` to override this worker name.
        
---
        
**`agent.worker_name`** (*string*)
            
* Use to replace the hostname when creating a worker if `agent.worker_id` is not specified. For example, if `worker_name` 
  is `MyMachine` and the `process_id` is `12345`, then the worker is named `MyMachine.12345`.

    Alternatively, specify the environment variable `CLEARML_WORKER_ID` to override this worker name.
        
<br/>

#### agent.default_docker
        
<a class="tr_top_negative" name="agent_default_docker"></a> 

**`agent.default_docker`** (*dict*)
        
* Dictionary containing the default options for workers in Docker mode.
        
---
        
**`agent.default_docker.arguments`** (*string*)
        
* If running a worker in Docker mode, this option specifies the options to pass to the Docker container.
        
---
        
**`agent.default_docker.image`** (*string*)
        
* If running a worker in Docker mode, this option specifies the default Docker image to use.
        
---

**`agent.match_rules`** (*[dict]*)

:::note Enterprise Feature
This feature is available under the ClearML Enterprise plan
:::

* Lookup table of rules for default container. The first matched rule will be picked, according to rule order. 
  
* Each dictionary in the list lays out rules, and the container to be used if the rules are matched. The
rules can be script requirements, Git details, and/or Python binary, and/or the task's project. 

```console
match_rules: [
      {
          image: "nvidia/cuda:10.1-cudnn7-runtime-ubuntu18.04"
          arguments: "-e define=value"
          match: {
              script{
                  # Optional: must match all requirements (not partial)
                  requirements: {
                      # version selection matching PEP-440
                      pip: {
                          tensorflow: "~=2.6"
                      },
                  }
                  # Optional: matching based on regular expression, example: "^exact_match$"
                  repository: "/my_repository/"
                  branch: "main"
                  binary: "python3.6"
              }
              # Optional: matching based on regular expression, example: "^exact_match$"
              project: "project/sub_project"
          }
      },
  ]
```


<br/>

#### agent.package_manager

**`agent.package_manager`** (*dict*)
        
* Dictionary containing the options for the Python package manager. The currently supported package managers are pip, conda, 
  and, if the repository contains a `poetry.lock` file, poetry.
        
---
        
**`agent.package_manager.conda_channels`** (*[string]*)
        
* If conda is used, then this is the list of conda channels to use when installing Python packages.
        
---

**`agent.package_manager.conda_full_env_update`** (*bool*)

* Enables update of conda environment (Conda environment does not update by default as it might break)

---

**`agent.package_manager.conda_env_as_base_docker`** (*bool*)

* Uses conda environment for execution (Like a docker)

___

**`agent.package_manager.extra_index_url`** (*[string]*)
        
* A list of URLs for additional artifact repositories when installing Python packages.

---
        
**`agent.package_manager.force_upgrade`** (*bool*)
           
        
* Indicates whether to force an upgrade of Python packages.

    The values are:
    
    * `true` - Force
    * `false` - Do not force
        
---

**`agent.package_manager.pip_version`** (*string*)

* The `pip` version to use. For example, `"<20"`, `"==19.3.1"`, `""` (empty string will install the latest version).

---

**`agent.package_manager.poetry_version`** (*string*)

* The `poetry` version to use. For example, `"<2"`, `"==1.1.1"`, `""` (empty string will install the latest version).

---
        
**`agent.package_manager.post_optional_packages`** (*string*)
        
* A list of optional packages that will be installed after the required packages. If the installation of an optional post 
  package fails, the package is ignored, and the virtual environment process continues.


---

**`agent.package_manager.post_packages`** (*[string]*)
        
* A list of packages that will be installed after the required packages.

___
        
**`agent.package_manager.priority_optional_packages`** (*[string]*)

* A list of optional priority packages to be installed before the rest of the required packages, but in case a 
  package installation fails, the package will be ignored, and the virtual environment process will continue.

---

**`agent.package_manager.priority_packages`** (*[string]*)

* A list of packages with priority to be installed before the rest of the required packages. For example: `["cython", "numpy", "setuptools", ]`

---

<a id="system_site_packages"/>

**`agent.package_manager.system_site_packages`** (*bool*)
        
* Indicates whether Python packages for virtual environments are inherited from the system when building a virtual environment 
  for an experiment.

    The values are:
    
    * `true` - Inherit
    * `false` - Do not inherit (load Python packages)
        
---

**`agent.package_manager.torch_nightly`** (*bool*)
        
* Indicates whether to support installing PyTorch Nightly builds.

    The values are:
    
    * `true` - If a stable `torch` wheel is not found, install the nightly build.
    * `false` - Do not install.

:::note
Torch Nightly builds are ephemeral and are deleted from time to time.
:::

---
        
**`agent.package_manager.type`** (*string*)
        
* Indicates the type of Python package manager to use.

    The values are:
    
    * `pip`
    * `conda`
    * `poetry`
  
* If `pip` or `conda` are used, the agent installs the required packages based on the "installed packages" section of the 
  Task. If the "installed packages" is empty, it will revert to using `requirements.txt` from the repository's root 
  directory. If `poetry` is selected, and the root repository contains `poetry.lock` or `pyproject.toml`, the "installed 
  packages" section is ignored, and `poetry` is used. If `poetry` is selected and no lock file is found, it reverts to 
  `pip` package manager behaviour.
  
<br/>

#### agent.pip_download_cache
        
**`agent.pip_download_cache`** (*dict*)
        
* Dictionary containing pip download cache options.
        
---
        
**`agent.pip_download_cache.enabled`** (*bool*)
        
* Indicates whether to use a specific cache folder for Python package downloads.

    The values are:
    
    * `true` - Use a specific folder which is specified in the option `agent.pip_download_cache.path`
    * `false` - Do not use a specific folder.
        
---
        
**`agent.pip_download_cache.path`** (*string*)
        
* If `agent.pip_download_cache.enabled` is `true`, then this specifies the cache folder.

<br/>

#### agent.vcs_cache
        
**`agent.vcs_cache`** (*dict*)
        
* Dictionary containing version control system clone cache folder.
        
---
        
**`agent.vcs_cache.enabled`** (*bool*)
        
* Indicates whether the version control system cache is used. 

    The values are:

    * `true` - Use cache
    * `false` - Do not use cache
    
---
        
**`agent.vcs_cache.path`** (*string*)
        
* The version control system cache clone folder when executing experiments.
     
<br/>

#### agent.venvs_cache

**`agent.venvs_cache`** (*dict*)

* Dictionary containing virtual environment cache options.

---

**`agent.venvs_cache.free_space_threshold_gb`** (*integer*)

* Minimum required free space to allow for cache entry.
* Disable minimum by passing 0 or negative value.
---

**`agent.venvs_cache.max_entries`** (*integer*)

* Maximum number of cached virtual environments.

---

**`agent.venvs_cache.path`** (*string*)

* Folder of the virtual environment cache.
* Uncomment to enable virtual environment caching.

<br/>

#### agent.venv_update

**`agent.venv_update`** (*dict*)
        
* Dictionary containing virtual environment update options.
        
---
        
**`agent.venv_update.enabled`** (*bool*)
        
* Indicates whether to use accelerated Python virtual environment building (this is a beta feature).

    The values are:
    
    * `true` - Accelerate
    * `false` - Do not accelerate (default value)

<a class="tr_top_negative" name="api"></a>

### api section

**`api`** (*dict*)

Dictionary of configuration options for the ClearML Server API, web, and file servers and credentials.

---

**`api.api_server`** (*string*)
        
* The URL of your ClearML API server. For example, `https://api.MyDomain.com`.
        
---
        
**`api.web_server`** (*string*)
        
* The URL of your ClearML web server. For example, `https://app.MyDomain.com`.
        
---

**`api.files_server`** (*string*)
        
* The URL of your ClearML file server. For example, `https://files.MyDomain.com`.
        
:::warning
You must use a secure protocol with ``api.web_server``, ``api.files_server``, and ``api.api_server``. Use `https`, not `http`. 
:::
  
<br/>

#### api.credentials
        
**`api.credentials`** (*dict*)
        
* Dictionary of API credentials.   
  Alternatively, specify the environment variable ` CLEARML_API_ACCESS_KEY / CLEARML_API_SECRET_KEY` to override these keys.

        
---
        
**`api.credentials.access_key`** (*string*)
        
* Your ClearML access key.
        
---
        
**`api.credentials.secret_key`** (*string*)
        
* Your ClearML credentials.
        
---

**`api.verify_certificate`** (*bool*)
        
* Indicates whether to verify the host SSL certificate. 

    The values are:

    * `true` - Verify   
    * `false` - Do not verify. 

:::warning
Set to False only if required.
:::

<a class="tr_top_negative" name="sdk"></a>

<br/>

### sdk section

**`sdk`** (*dict*)

* Dictionary that contains configuration options for the ClearML Python Package and related options, including storage, 
metrics, network, AWS S3 buckets and credentials, Google Cloud Storage, Azure Storage, log, and development. 

<br/>

#### sdk.aws

**`sdk.aws`** (*dict*)

* Dictionary with AWS storage options.

<br/>

##### sdk.aws.boto3
    
**`sdk.aws.boto3`** (*dict*)
    
* Dictionary of AWS Storage, Boto2 options.
    
---
    
**`sdk.aws.boto3.pool_connections`** (*integer*)
    
* For AWS Boto3, The maximum number of Boto3 pool connections.
    
---
    
**`sdk.aws.boto3.max_multipart_concurrency`** (*integer*)
    
* For AWS Boto3, the maximum number of threads making requests for a transfer.
    
<br/>

##### sdk.aws.s3
    
**`sdk.aws.s3`** (*dict*)
    
* Dictionary of AWS Storage, AWS S3 options.
    
---

**`sdk.aws.s3.extra_args`** (*dict*)

* Additional [ExtraArgs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html#the-extraargs-parameter) 
  passed to boto3 when uploading files. This can be set per-bucket under `sdk.aws.s3.credentials`.

---
    
**`sdk.aws.s3.key`** (*string*)
    
* For AWS S3, the default access key for any bucket that is not specified in the `sdk.aws.s3.credentials` section.
    
---
    
**`sdk.aws.s3.region`** (*string*)
    
* For AWS S3, the default region name for any bucket that is not specified in the `sdk.aws.s3.credentials` section.
    
---
    
**`sdk.aws.s3.secret`** (*string*)
    
* For AWS S3, the default secret access key for any bucket that is not specified in the `sdk.aws.s3.credentials` section.
    
---

**`sdk.aws.s3.use_credentials_chain`** (*bool*)

* Instead of using default credentials for an unspecified bucket, enable credentials chain to let Boto3 pick the right 
  credentials. This includes picking credentials from environment variables,
  a credential file, and metadata service with an IAM role configured. See [Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials)
  

<br/>

###### sdk.aws.s3.credentials
    
**`sdk.aws.s3.credentials`** (*[dict]*)
    
* List of dictionaries, for AWS S3, each dictionary can contain the credentials for individual S3 buckets or hosts for individual buckets.

---
    
**`sdk.aws.s3.credentials.bucket`** (*string*)
    
* For AWS S3, if specifying credentials for individual buckets, then this is the bucket name for an individual bucket.
 
:::note
See the [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for restrictions 
and limitations on bucket naming.
:::
  
---
    
**`sdk.aws.s3.credentials.host`** (*string*)
    
* For AWS S3, if specifying credentials for individual buckets by host, then this option is the host URL and optionally the port number.
    
---
    
**`sdk.aws.s3.credentials.key`** (*string*)
    
* For AWS S3:

    * If specifying individual bucket, then this is the access key for the bucket.
    * If specifying individual buckets by host, then this is access key for all buckets on the host.
    
---
    
**`sdk.aws.s3.credentials.multipart`** (*bool*)
    
* For AWS S3, if specifying credentials for individual buckets by host, then this indicates whether to allow multipart upload of a single object (object as a set of parts).

    The values are:

    * `true` - Enabled
    * `false` - Disabled
    
---
    
**`sdk.aws.s3.credentials.secret`** (*bool*)
    
* For AWS S3:
    
    * If specifying credentials for a specific bucket, then this is the secret key for the bucket.
    * If specifying credentials for individual buckets by host, then this is the secret key for all buckets on the host.
    
---
    
**`sdk.aws.s3.credentials.secure`** (*string*)
    
* For AWS S3, if specifying credentials for individual buckets by host, then this indicates whether the host is secure.

    The values are:
    
    * `true` - Secure
    * `false` - Not secure
  
<br/>

---
    
**`sdk.aws.s3.credentials.verify`** (*string*/*boolean*)

* Specify whether to verify SSL certificates. By default, they are verified. Input a path to a CA bundle, or set to 
  `false` to skip SSL certificate verification. 

  
<br/>

#### sdk.azure.storage

**`sdk.azure.storage.containers`** (*[dict]*)
    
* List of dictionaries, each dictionary contains credentials for an Azure Storage container.
    
---

**`sdk.azure.storage.containers.account_key`** (*string*)
    
* For Azure Storage, this is the credentials key.
    
---

**`sdk.azure.storage.containers.account_name`** (*string*)
    
* For Azure Storage, this is the account name.
    
---

**`sdk.azure.storage.containers.container_name`** (*string*)
    
* For Azure Storage, this is the container name.

<br/>


#### sdk.development
    
**`sdk.development`** (*dict*)
    
* Dictionary of development mode options.
    
---
    
**`sdk.development.default_output_uri`** (*string*) <a class="tr_top_negative" id="config_default_output_uri"></a> 
    
* The default output destination for model checkpoints (snapshots) and artifacts. If the `output_uri` parameter is not provided 
  when calling the `Task.init` method, then use the destination in `default_output_uri`.
    

--
 
**`sdk.development.detailed_import_report`** (*bool*)

* If `true` (default is `false`), provide a detailed report of all python package imports as comments inside the "Installed packages" section.

---

**`sdk.development.detect_with_conda_freeze`** (*bool*)

* If `true` (default is `false`), instead of analyzing the code with Pigar, analyze with `conda freeze`

---

**`sdk.development.detect_with_pip_freeze`** (*bool*)

* If `true` (default is `false`), instead of analyzing the code with Pigar, analyze with `pip freeze`

---


**`sdk.development.force_analyze_entire_repo`** (*bool*)
      
* Default auto-generated requirements optimize for smaller requirements.

 The values are:        
    * `true` - Analyze the entire repository regardless of the entry point.
    * `false`- First analyze the entry point script, if it does not contain other local files, 
   do not analyze the entire repository.

---

**`sdk.development.log_os_environments`** (*[string]*)

* Log specific environment variables. OS environments are listed in the UI, under an experiment's  
  **CONFIGURATION > HYPERPARAMETERS > Environment** section. 
  Multiple selected variables are supported including the suffix "\*". For example: "AWS\_\*" will log any OS environment 
  variable starting with "AWS\_". Example: `log_os_environments: ["AWS_*", "CUDA_VERSION"]`
        
* This value can be overwritten with OS environment variable `CLEARML_LOG_ENVIRONMENT="[AWS_*, CUDA_VERSION]"`. 

---
    
**`sdk.development.store_uncommitted_code_diff_on_train`** (*bool*)
    
* For development mode, indicates whether to store the uncommitted `git diff` or `hg diff` in the experiment manifest. 

    The values are:

    * `true` - Store the `diff` in the `script.requirements.diff` section
    * `false` - Do not store the diff.
    
---

**`sdk.development.suppress_update_message`** (*bool*)

* If `true` (default `false`), *clearml* update messages will not be printed to the console. 
  
* This value can be overwritten with OS environment variable `CLEARML_SUPPRESS_UPDATE_MESSAGE=1`
        
---

**`sdk.development.support_stopping`** (*bool*)
    
* For development mode, indicates whether to allow stopping an experiment if the experiment was aborted externally, its status was changed, or it was reset.

    The values are:
    
    * `true` - Allow
    * `false` - Do not allow
    
---
    
<a id="task_reuse"/>

**`sdk.development.task_reuse_time_window_in_hours`** (*float*)
    
* For development mode, the number of hours after which an experiment with the same project name and experiment name is reused.
    
---
    
**`sdk.development.vcs_repo_detect_async`** (*bool*)
    
* For development mode, indicates whether to run version control repository detection asynchronously. 

    The values are:

    * `true` - Run asynchronously
    * `false` - Do not run asynchronously

<br/>

##### sdk.development.worker
    
**`sdk.development.worker`** (*dict*)
    
* Dictionary of development mode options for workers.
    
---
    
**`sdk.development.worker.log_stdout`** (*bool*)
    
* For development mode workers, indicates whether all stdout and stderr messages are logged.
 
    The values are:
    
    * `true` - Log all
    * `false` - Do not log all

---
 
**`sdk.development.worker.ping_period_sec`** (*integer*)
        
* For development mode workers, the interval in seconds for a worker to ping the server testing connectivity.
        
---

**`sdk.development.worker.report_event_flush_threshold`** (*integer*)

* The number of events that trigger a report 

---
        
**`sdk.development.worker.report_global_mem_used`** (*bool*)

* Compatibility feature to report memory usage for the entire machine
  
  The values are: 
  * `true` - Report memory usage for the entire machine
  * `false` (default) - Report memory usage only on the running process and its sub-processes

---

**`sdk.development.worker.report_period_sec`** (*integer*)
        
* For development mode workers, the interval in seconds for a development mode ClearML worker to report.
        
<br/>

#### sdk.google.storage

**`sdk.google.storage`** (*dict*)
        
* Dictionary of Google Cloud Storage credentials.
        
---

**`sdk.google.storage.project`** (*string*)
        
* For Google Cloud Storage, the name of project.
        
---

**`sdk.google.storage.credentials_json`** (*string*)
        
* For Google Cloud Storage, the file path for the default Google storage credentials JSON file.

<br/>

##### sdk.google.storage.credentials

**`sdk.google.storage.credentials`** (*[dict]*)

* A list of dictionaries, with specific credentials per bucket and subdirectory

---

**`sdk.google.storage.credentials.bucket`** (*string*)
        
* For Google Cloud Storage, if specifying credentials by the individual bucket, the name of the bucket.
        
---

**`sdk.google.storage.credentials.credentials_json`** (*string*)
        
* For Google Cloud Storage, if specifying credentials by the individual bucket, the file path for the default Google storage credentials JSON file.
        
---

**`sdk.google.storage.credentials.project`** (*string*)
        
* For Google Cloud Storage, if specifying credentials by the individual bucket, the name of the project.
        
---

**`sdk.google.storage.credentials.subdir`** (*string*)
        
* For Google Cloud Storage, if specifying credentials by the individual bucket, a subdirectory within the bucket.
        
<br/>

#### sdk.log
        
**`sdk.log`** (*dict*)
        
* Dictionary of log options.
        
---
        
**`sdk.log.disable_urllib3_info`** (*bool*)
        
* Indicates whether to disable `urllib3` info messages.
 
    The values are:
    
    * `true` - Disable
    * `false` - Do not disable
        
---
        
**`sdk.log.null_log_propagate`** (*bool*)
        
* As debugging feature, indicates whether to allow null log messages to propagate to the root logger (so they appear as stdout).
 
    The values are:
    
    * `true` - Allow
    * `false` - Do not allow
        
---
        
**`sdk.log.task_log_buffer_capacity`** (*integer*)
        
* The maximum capacity of the log buffer.
        
#### sdk.metrics
        
**`sdk.metrics`** (*dict*)
        
* Dictionary of metrics options.
        
---
        
**`sdk.metrics.file_history_size`** (*string*)
        
* The history size for debug files per metric / variant combination 
* Each metric / variant combination, `file_history_size` indicates the number of files stored in the upload destination
* Files are recycled so that `file_history_size` is the maximum number of files at any time.
        
---
        
**`sdk.metrics.matplotlib_untitled_history_size`** (*integer*)
        
* The maximum history size for `matplotlib` `imshow` files per plot title. 
* File names for the uploaded images are recycled so that the number of images stored in the upload destination for each matplotlib plot title 
will not exceed the value of `matplotlib_untitled_history_size`
        
---

**`sdk.metrics.plot_max_num_digits`** (*integer*)
        
* The maximum number of digits after the decimal point in plot reporting. This can reduce the report size.
        
---
        
**`sdk.metrics.tensorboard_single_series_per_graph`** (*bool*)
        
* Indicates whether plots appear using TensorBoard behavior where each series is plotted in its own graph (plot-per-graph).
 
    The values are:
    
    * `true` - Support TensorBoard behavior
    * `false` - Do not
        
<br/>

##### sdk.metrics.images
        
**`sdk.metrics.images`** (*dict*)
        
* Dictionary of metrics images options.
        
---
        
**`sdk.metrics.images.format`** (*string*)
        
* The image file format for generated debug images (e.g., JPEG).
        
---
        
**`sdk.metrics.images.quality`** (*integer*)
        
* The image quality for generated debug images.

---
        
**`sdk.metrics.images.subsampling`** (*integer*)
        
* The image subsampling for generated debug images.
    
<br/>

#### sdk.network

**`sdk.network.file_upload_retries`** (*int*)
* Number of retries before failing to upload a file

---
        
**`sdk.network.iteration`** (*dict*)
        
* Dictionary of network iteration options.
        
---
        
**`sdk.network.iteration.max_retries_on_server_error`**` (*integer*)
        
* For retries when getting frames from the server, if the server returned an error (http code 500), then this is the maximum number of retries.
        
---
        
**`sdk.network.iteration.retry_backoff_factor_sec`** (*integer*)
        
* For retries when getting frames from the server, this is backoff factor for consecutive retry attempts. This is used to 
  determine the number of seconds between retries. The retry backoff factor is calculated as {backoff factor} * (2 ^ ({number of total retries} - 1)).
        
<br/>

##### sdk.network.metrics
        
**`sdk.network.metrics`** (*dict*)
        
* Dictionary of network metrics options.
        
---
        
**`sdk.network.metrics.file_upload_starvation_warning_sec`** (*integer*)
        
* The number of seconds before a warning is issued that file-bearing events are sent for upload, but no uploads occur.
        
---
        
**`sdk.network.metrics.file_upload_threads`** (*integer*)
        
* The number of threads allocated to uploading files when transmitting metrics for a specific iteration.
  
<br/>

#### sdk.storage

**`sdk.storage`** (*dict*)

* Dictionary of storage options.

<br/>

##### sdk.storage.cache
        
**`sdk.storage.cache`** (*dict*)
        
* Dictionary of storage cache options.

---
        
**`sdk.storage.cache.default_base_dir`** (*string*)
        
* The default base directory for caching. The default is the system temp folder for caching.
        
<br/>

##### sdk.storage.direct_access 
    
**`sdk.storage.direct_access`** (*dict*)
    
* Dictionary of storage direct access options.
    
---
    
**`sdk.storage.direct_access.url`** (*string*)
    
* Specify a list of direct access objects using glob patterns which matches sets of files using wildcards. Direct access 
  objects are not downloaded or cached, and any download request will return a direct reference.

##### sdk.storage.log

**`sdk.storage.log.report_download_chunk_size_mb`** (*int*)
* Specify how often in MB the `StorageManager` reports its download progress to the console. By default, it reports 
every 5MB

---

**`sdk.storage.log.report_upload_chunk_size_mb`** (*int*)
* Specify how often in MB the `StorageManager` reports its upload progress to the console. By default, it reports every 
5MB

## Configuration Vault

:::note Enterprise Feature
This feature is available under the ClearML Enterprise plan
:::

The ClearML Enterprise Server includes the configuration vault. Users can add configuration sections to the vault and, once 
the vault is enabled, the configurations will be merged into the ClearML and ClearML Agent configurations upon code execution and / or agent launch. 

These configurations override the configurations written in the configuration file. 

See [configuration vault](../webapp/webapp_profile.md#configuration-vault). 
