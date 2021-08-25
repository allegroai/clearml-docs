---
title: Configuration File
---
This reference page provides detailed information about the configurable options for **ClearML** and **ClearML Agent**. 
**ClearML** and **ClearML Agent** use the same configuration file `clearml.conf`. 

This reference page is organized by configuration file section:

* [agent](#agent-section) - Contains **ClearML Agent** configuration options. If **ClearML Agent** was not installed, the configuration 
  file will not have an `agent` section.
* [api](#api-section) - Contains **ClearML** and **ClearML Agent** configuration options for **ClearML Server**.
* [sdk](#sdk-section) - Contains **ClearML** and **ClearML Agent** configuration options for **ClearML Python Package** and **ClearML Server**.

An example configuration file is located [here](https://github.com/allegroai/clearml-agent/blob/master/docs/clearml.conf), 
in the **ClearML** GitHub repositories  

## Editing your configuration file

To add, change, or delete options, edit your configuration file.

**To edit your **ClearML** configuration file:**

1. Open the configuration file for editing, depending upon your operating system:

    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. In the required section (sections listed on this page), add, modify, or remove required options.
1. Save configuration file.

## Environment variables
ClearML's configuration file uses [HOCON](https://github.com/lightbend/config/blob/main/HOCON.md) configuration format, 
which supports environment variable reference.

For example: 
```editorconfig
 google.storage {
        # # Default project and credentials file
        # # Will be used when no bucket configuration is found
        project: "clearml"
        credentials_json: "${GOOGLE_APPLICATION_CREDENTIALS}"
}
```

`${GOOGLE_APPLICATION_CREDENTIALS}` will automatically be substituted by the environment variable value.

See [Note on Windows](https://github.com/lightbend/config/blob/main/HOCON.md#note-on-windows-and-case-sensitivity-of-environment-variables)
for information about using environment variables with Windows in the configuration file. 


## Configuration file sections

### agent section

**`agent`** (*dict*)
        
* Dictionary of top-level **ClearML Agent** options to configure **ClearML Agent** for Git credentials, package managers, cache management, workers, and Docker for workers.
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
        
**`agent.docker_apt_cache`** (*string*)
        
* The apt (Linux package tool) cache folder for mapping Ubuntu package caching into Docker.
        
---
        
**`agent.docker_force_pull`** (*bool*)
        
* Always update the Docker image by forcing a Docker `pull` before running an experiment

    The values are:
    
    * `true` - Always update the Docker image.
    * `false` - Do not always update.
  

---
        
**`agent.docker_pip_cache`** (*string*)
        
        
* The pip (Python package tool) cache folder for mapping Python package caching into Docker.
        
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
            
* Use to replace the hostname when creating a worker, if `agent.worker_id` is not specified. For example, if `worker_name` 
  is `MyMachine` and the process_id is `12345`, then the worker is name `MyMachine.12345`.

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
        
<br/>

#### agent.package_manager

**`agent.package_manager`** (*dict*)
        
* Dictionary containing the options for the Python package manager. The currently supported package managers are pip, conda, 
  and, if the repository contains a poetry.lock file, poetry.
        
---
        
**`agent.package_manager.conda_channels`** (*[string]*)
        
* If conda is used, then this is list of conda channels to use when installing Python packages.
        
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
    
    * `pip` - use pip as the package manager or, if a `poetry.lock` file exists in the repository, use poetry as the package manager
    * `conda` - use conda as the package manager
    
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

Dictionary of configuration options for the **ClearML Server** API, web, and file servers and credentials.

---

**`api.api_server`** (*string*)
        
* The URL of your **ClearML**  API server. For example, `https://api.MyDomain.com`.
        
---
        
**`api.web_server`** (*string*)
        
* The URL of your **ClearML**  web server. For example, `https://app.MyDomain.com`.
        
---

**`api.files_server`** (*string*)
        
* The URL of your **ClearML**  file server. For example, `https://files.MyDomain.com`.
        
:::warning
You must use a secure protocol. For ``api.web_server``, ``api.files_server``, and ``api.files_server``. You must use a secure protocol, "https". Do not use "http".
:::
  
<br/>

#### api.credentials
        
**`api.credentials`** (*dict*)
        
* Dictionary of API credentials.   
  Alternatively, specify the environment variable ` CLEARML_API_ACCESS_KEY / CLEARML_API_SECRET_KEY` to override these keys.

        
---
        
**`api.credentials.access_key`** (*string*)
        
* Your **ClearML**  access key.
        
---
        
**`api.credentials.secret_key`** (*string*)
        
* Your **ClearML**  credentials.
        
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

* Dictionary that contains configuration options for the **ClearML Python Package** and related options, including storage, 
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
    
**`sdk.aws.s3.key`** (*string*)
    
* For AWS S3, the default access key for any bucket that is not specified in the `sdk.aws.s3.credentials` section.
    
---
    
**`sdk.aws.s3.region`** (*string*)
    
* For AWS S3, the default region name for any bucket that is not specified in the `sdk.aws.s3.credentials` section.
    
---
    
**`sdk.aws.s3.secret`** (*string*)
    
* For AWS S3, the default secret access key for any bucket that is not specified in the `sdk.aws.s3.credentials` section.
    
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

#### sdk.azure.storage

**`sdk.azure.storage.containers`** (*[dict]*)
    
* List of dictionaries, each dictionary contains credentials for an Azure Storage container.
    
---

**`sdk.azure.storage.containers.account_key`** (*string*)
    
* For Azure Storage, this is the credentials key.
    
---

**`sdk.azure.storage.containers.account_name`** (*string*)
    
* For Azure Storage, this is account name.
    
---

**`sdk.azure.storage.containers.container_name`** (*string*)
    
* For Azure Storage, this the container name.

<br/>


#### sdk.development
    
**`sdk.development`** (*dict*)
    
* Dictionary of development mode options.
    
---
    
**`sdk.development.default_output_uri`** (*string*) <a class="tr_top_negative" id="config_default_output_uri"></a> 
    
* The default output destination for model checkpoints (snapshots) and artifacts. If the `output_uri` parameter is not provided 
  when calling the `Task.init` method, then use the destination in `default_output_uri`.
    

---

    
**`sdk.development.store_uncommitted_code_diff_on_train`** (*bool*)
    
* For development mode, indicates whether to store the uncommitted `git diff` or `hg diff` in the experiment manifest 

    The values are:

    * `true` - Store the `diff` in the `script.requirements.diff` section
    * `false` - Do not store the diff.
    
---
    
**`sdk.development.support_stopping`** (*bool*)
    
* For development mode, indicates whether to allow stopping an experiment if the experiment was aborted externally, its status was changed, or it was reset.

    The values are:
    
    * `true` - Allow
    * `false` - Do not allow
    
---
    
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

        
**`sdk.development.worker.report_period_sec`** (*integer*)
        
* For development mode workers, the interval in seconds for a development mode **ClearML**  worker to report.
        
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

* A list of dictionaries, with specific credentials per bucket and sub-directory

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
        
**`sdk.network.iteration`** (*dict*)
        
* Dictionary of network iteration options.
        
---
        
**`sdk.network.iteration.max_retries_on_server_error`**` (*integer*)
        
* For retries when getting frames from the server, if the server returned an error (http code 500), then this is the maximum number of retries.
        
---
        
**`sdk.network.iteration.retry_backoff_factor_sec`**
        
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
