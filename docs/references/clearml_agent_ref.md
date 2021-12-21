---
title: ClearML Agent Reference
---
This reference page provides detailed information about **ClearML Agent** commands, including:

* [build](#build) - Create a worker environment, without executing an experiment.
* [config](#config) - List your **ClearML Agent** configuration.
* [daemon](#daemon) - Run a worker daemon listening to a queue for Task (experiments) to execute.
* [execute](#execute) - Execute an experiment, locally without a queue.
* [list](#list) - List the current workers.

## build

Use the `build` subcommand to create a worker environment without executing the experiment.

### Syntax 

```bash
clearml-agent build [-h] --id TASK_ID [--target TARGET]
                    [--install-globally]
                    [--docker [DOCKER [DOCKER ...]]]
                    [--python-version PYTHON_VERSION]
                    [--entry-point {reuse_task,clone_task}] [-O]
                    [--git-user GIT_USER] [--git-pass GIT_PASS]
                    [--log-level {DEBUG,INFO,WARN,WARNING,ERROR,CRITICAL}]
                    [--gpus GPUS] [--cpu-only]
```
                          
### Arguments                          

---

**`id`** 
(*mandatory*)

* Build a worker environment for this Task ID.

---

**`cpu-only`**
        
* Disable GPU access for the Docker container.

---

**`docker`**

* Docker mode. A Docker container that a worker will execute at launch. 

    To specify the image name and optional arguments, either:
    
    * Use `--docker <image_name> <args>` on the command line, or
    * Use `--docker` on the command line, and specify the image name and arguments in the configuration file.
    
    Environment variable settings for Dockers:
    
    * `CLEARML_DOCKER_SKIP_GPUS_FLAG` - Ignore the `gpus` flag inside the Docker container. This also allows you to execute **ClearML Agent** using Docker versions earlier than 19.03.
    * `NVIDIA_VISIBLE_DEVICES` - Limit GPU visibility for the Docker container. 
    * `CLEARML_AGENT_GIT_USER` and `CLEARML_AGENT_GIT_PASS` - Pass these credentials to the Docker container at execution.        

    To limit GPU visibility for Docker, set the `NVIDIA_VISIBLE_DEVICES` environment variable.       

---

**`entry-point`** 
        
* Used in conjunction with `--docker`, indicates how to run the Task specified by `task-id` on Docker startup.
     
    The `entry-point` options are:
        
    * `reuse` - Overwrite the existing Task data.
    * `clone_task` - Clone the Task, and execute the cloned Task.
        
---

**`git-pass`** 
        
* Git password for repository access.
        
---

**`git-user`**
        
* Git username for repository access.
        
---

**`gpus`**
        
* Specify the active GPUs for the Docker containers to use. These are the same GPUs set in the `NVIDIA_VISIBLE_DEVICES` environment variable.
    
    For example:
    
    * `--gpus 0`
    * `--gpu 0,1,2`
    * `--gpus all`

---

**`h`, `help`**
        
* Get help for this command.

---

**`install-globally`**
        
* Install the required Python packages before creating the virtual environment. Use `agent.package_manager.system_site_packages` to control the installation of the system packages. When `--docker` is used, `install-globally` is always true.

---

**`log-level`**
        
* SDK log level. The values are:
       
    * `DEBUG`
    * `INFO`
    * `WARN`
    * `WARNING`
    * `ERROR`
    * `CRITICAL`

---

**`python-version`**
        
* Virtual environment Python version to use.
        
---

**`O`**
        
* Compile optimized pyc code (see python documentation). Repeat for more optimization.

---

**`target`**
        
* The target folder for the virtual environment and source code that will be used at launch.
        

## config

Use the `config` subcommand to list your **ClearML Agent** configuration.

### Syntax

    clearml-agent config [-h]


## daemon

Use the `daemon` subcommand to run a worker, optionally in a Docker container, listening to a queue.

### Syntax

```bash
clearml-agent daemon [-h] [--foreground] [--queue QUEUES [QUEUES ...]] [--order-fairness] 
                     [--standalone-mode] [--services-mode [SERVICES_MODE]] 
                     [--child-report-tags CHILD_REPORT_TAGS [CHILD_REPORT_TAGS ...]]
                     [--create-queue] [--detached] [--stop] [--dynamic-gpus] 
                     [--uptime [UPTIME [UPTIME ...]]] [--downtime [DOWNTIME [DOWNTIME ...]]] 
                     [--status] [--use-owner-token] [-O] 
                     [--git-user GIT_USER] [--git-pass GIT_PASS] 
                     [--log-level {DEBUG,INFO,WARN,WARNING,ERROR,CRITICAL}] 
                     [--gpus GPUS] [--cpu-only] 
                     [--docker [DOCKER [DOCKER ...]]] [--force-current-version]
```

                           
### Arguments

---

**`child-report-tags`**

List of tags to send with the status reports from the worker that executes a task.

---

**`cpu-only`**
        
* If running in Docker mode (see the `docker` option), disable GPU access for the Docker container or virtual environment.
        
---

**`create-queue`**
        
* If the queue name provided does not exist in the server, create and use it.

---

**`detached`**
        
* Run agent in the background. The `clearml-agent` command returns immediately.  
        
---

**`docker`**
        
* Run in Docker mode. Execute the Task inside a Docker container.

    To specify the image name and optional arguments, either:
    
    * use `--docker <image_name> <args>` on the command line, or
    * use `--docker` on the command line, and specify the image name and arguments in the configuration file.
    
    Environment variable settings for Dockers:  
    
    * `CLEARML_DOCKER_SKIP_GPUS_FLAG` - Ignore the `gpus` flag inside the Docker container. This also allows you to execute **ClearML Agent** using Docker versions earlier than 19.03.
    * `NVIDIA_VISIBLE_DEVICES` - Limit GPU visibility for the Docker container. 
    * `ClearML_AGENT_GIT_USER` and `ClearML_AGENT_GIT_PASS` - Pass these credentials to the Docker container at execution.        

---

**`downtime`** 

* Specify downtime for clearml-agent in `<hours> <days>` format.

  For example, use `09-13 TUE` to set Tuesday's downtime to 09-13. 
  
:::info
* This feature is only supported by the ClearML Enterprise Server 
* Make sure to have only one of uptime / downtime configuration and not both.
::: 
  
---

**`dynamic-gpus`**

*  Allow to dynamically allocate gpus based on queue properties, configure with `--queue <queue_name>=<num_gpus>`.

  For example: `--dynamic-gpus --queue dual_gpus=2 single_gpu=1`

:::info Enterprise Feature
This feature is only supported by the ClearML Enterprise Server 
:::


   
---

**`force-current-version`**
        
* To use your current version of **ClearML Agent** when running in Docker mode (the `docker` argument is specified),
 instead of the latest **ClearML Agent** version which is automatically installed, specify `force-current-version`.

    For example, if your current **ClearML Agent** version is `0.13.1`, but the latest version of **ClearML Agent** is 
  `0.13.3`, use `--force-current-version` and your Task will execute in the Docker container with **ClearML Agent** version `0.13.1`.
        
---

**`foreground`**
        
* Pipe full log to stdout/stderr. Do not use this option if running in background.

---

**`git-pass`**
        
* Git password for repository access.

---

**`git-user`**
        
* Git username for repository access.
        
---

**`gpus`**
        
* If running in Docker mode (see the `docker` option), specify the active GPUs for the Docker containers to use. 
        
    These are the same GPUs set in the `NVIDIA_VISIBLE_DEVICES` environment variable.
    
    For example:
    
    * `--gpus 0`
    * `--gpu 0,1,2`
    * `--gpus all`

---

**`h`, `help`**
        
* Get help for this command.

---
**`log-level`**
        
* SDK log level. The values are:
    
    * `DEBUG`
    * `INFO`
    * `WARN`
    * `WARNING`
    * `ERROR`
    * `CRITICAL`

---

**`O`**
        
* Compile optimized pyc code (see python documentation). Repeat for more optimization.
        
---

**`order-fairness`**
        
* Pull from each queue in a round-robin order, instead of priority order.
        
---

**`queue`**
        
* Specify the queues which the worker is listening to. The values can be any combination of:

    * One or more queue IDs.
    * One or more queue names.
    * `default` indicating the default queue.

---

**`services-mode`** <a class="tr_top_negative" name="services_mode"></a>
        
* Launch multiple long-term docker services. Spin multiple, simultaneous Tasks, each in its own Docker container, on the same machine. Each Task will be registered 
  as a new node in the system, providing tracking and transparency capabilities. Start up and shutdown of each Docker is 
  verified. Use in CPU mode (`--cpu-only`), only. 
        
---

**`standalone-mode`**
        
* Do not use any network connects. This assumes all requirements are pre-installed.            
  
---

**`status`**

* Print the worker's schedule (uptime properties, server's runtime properties and listening queues)
 

---

**`stop`**
        
* Terminate a running ClearML Agent, if other arguments are the same. If no additional arguments are provided, agents are 
  terminated in lexicographical order.  

---

**`uptime`** 
* Specify uptime for clearml-agent in `<hours> <days>` format. for example, use `17-20 TUE` to set Tuesday's
  uptime to 17-20
  
:::info
* This feature is only supported by the ClearML Enterprise Server 
* Make sure to have only one of uptime / downtime configuration and not both.
::: 
  
---

**`use-owner-token`**

Generate and use the task owner's token for the execution of the task.
  
## execute

Use the `execute` subcommand to build and execute an experiment without a queue.

### Syntax

```bash
clearml-agent execute [-h] --id TASK_ID [--log-file LOG_FILE] [--disable-monitoring] 
                      [--full-monitoring] [--require-queue]
                      [--standalone-mode] [--docker [DOCKER [DOCKER ...]]] [--clone] 
                      [-O] [--git-user GIT_USER] [--git-pass GIT_PASS] 
                      [--log-level {DEBUG,INFO,WARN,WARNING,ERROR,CRITICAL}] 
                      [--gpus GPUS] [--cpu-only]
```

                            
### Arguments                            

---

**`id`** (*mandatory*)
        
* The ID of the Task to build.
        
---

**`clone`**
        
* Clone the Task specified by `id`, and then execute that cloned Task.
        
---

**`cpu-only`**
* Disable GPU access for the daemon, only use CPU in either docker or virtual environment.


---

**`docker`**
        
* Run in Docker mode. Execute the Task inside a Docker container.

    To specify the image name and optional arguments, either:

    * use `--docker <image_name> <args>` on the command line, or
    * use `--docker` on the command line, and specify the default image name and arguments in the configuration file.

    Environment variable settings for Dockers containers:
    
    * `ClearML_DOCKER_SKIP_GPUS_FLAG` - Ignore the `gpus` flag inside the Docker container. This also allows you to execute **ClearML Agent** using Docker versions earlier than 19.03.
    * `NVIDIA_VISIBLE_DEVICES` - Limit GPU visibility for the Docker container. 
    * `ClearML_AGENT_GIT_USER` and `ClearML_AGENT_GIT_PASS` - Pass these credentials to the Docker container at execution.        

---

**`disable-monitoring`**
        
* Disable logging and monitoring, except for stdout.
        
---

**`full-monitoring`**
        
* Create a full log, including the environment setup log, Task log, and monitoring, as well as stdout.
        
---

**`git-pass`** 
        
* Git password for repository access.
        
---

**`git-user`**
        
* Git username for repository access.
        
---

**`gpus`** 
* Specify active GPUs for the daemon to use (docker / virtual environment), Equivalent to setting
  `NVIDIA_VISIBLE_DEVICES`. Examples: `--gpus 0` or `--gpu 0,1,2` or `--gpus all`


---

**`h`, `help`**
        
* Get help for this command.
        
---

**`log-file`**
        
* The log file for Task execution output (stdout / stderr) to a text file.
        
---

**`log-level`**
        
* SDK log level. The values are:
    
    * `DEBUG`
    * `INFO`
    * `WARN`
    * `WARNING`
    * `ERROR`
    * `CRITICAL`

---

**`O`**
        
* Compile optimized pyc code (see python documentation). Repeat for more optimization.

---

**`require-queue`** 

* If the specified task is not queued (in any Queue), the execution will fail. (Used for 3rd party scheduler
  integration, e.g. K8s, SLURM, etc.)
 
---

**`standalone-mode`** 

* Do not use any network connects, assume everything is pre-installed

        
## list

Use the `list` subcommand to list information about all workers

### Syntax

    clearml-agent list [-h]