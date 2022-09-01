---
title: execute
---

This reference page provides detailed information about ClearML Agent's `execute` subcommand, which you can use to 
build and execute an experiment without a queue.

## Syntax

```bash
clearml-agent execute [-h] --id TASK_ID [--log-file LOG_FILE] [--disable-monitoring] 
                      [--full-monitoring] [--require-queue]
                      [--standalone-mode] [--docker [DOCKER [DOCKER ...]]] [--clone] 
                      [-O] [--git-user GIT_USER] [--git-pass GIT_PASS] 
                      [--log-level {DEBUG,INFO,WARN,WARNING,ERROR,CRITICAL}] 
                      [--gpus GPUS] [--cpu-only]
```

                            
## Arguments                            

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
