---
title: build
---

This reference page provides detailed information about ClearML Agent's `build` subcommand, which you can use to create 
a worker environment without executing the experiment.

## Syntax

```bash
clearml-agent build [-h] --id TASK_ID [--target TARGET]
                    [--install-globally]
                    [--docker [DOCKER [DOCKER ...]]] [--force-docker] 
                    [--python-version PYTHON_VERSION]
                    [--entry-point {reuse_task,clone_task}] [-O]
                    [--git-user GIT_USER] [--git-pass GIT_PASS]
                    [--log-level {DEBUG,INFO,WARN,WARNING,ERROR,CRITICAL}]
                    [--gpus GPUS] [--cpu-only]
```
                          
## Arguments                          

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

**`force-docker`**

* Force using the agent-specified docker image (either explicitly in the `--docker` argument or using the agent's 
  default docker image). If provided, the agent will not use any docker container information stored in the task itself 
  (default `False`)


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
        
