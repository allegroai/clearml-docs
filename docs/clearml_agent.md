---
title: ClearML Agent
---

**ClearML Agent** is a virtual environment and execution manager for DL / ML solutions on GPU machines. It integrates with the **ClearML Python Package** and **ClearML Server** to provide a full AI cluster solution. <br/>
Its main focus is around:
- Reproducing experiments, including their complete environments. 
- Scaling workflows on multiple target machines. 

**ClearML Agent** executes an experiment or other workflow by reproducing the state of the code from the original machine 
to a remote machine, and executing the code as follows:

1. **ClearML Agent** creates a new Python virtual environment (for every experiment).
1. In the new Python virtual environment, **ClearML Agent** installs the required Python package versions.
1. **ClearML Agent** clones the Git repository based on the definition stored in the experiment.
1. **ClearML Agent** applies the uncommitted changes to the newly cloned code.
1. Once the state of the code is reproduced on a remote machine, **ClearML Agent** runs the Python script based on the 
   working directory and entry point stored in the experiment. It executes with logging and monitoring.
1. While the Task is executing, and anytime after, track the experiment and visualize results in the **ClearML Web UI**.

Continue using **ClearML Agent** once it is running on a target machine. Reproduce experiments and execute 
automated workflows in one (or both) of the following ways: 
* Programmatically
* By using the **ClearML Web UI** (without directly working with code), by enqueuing experiments 
to the queue that a **ClearML Agent** is listening to.

For more information, see [ClearML Agent Reference](references/clearml_agent_ref.md), 
and [configuration options](configs/clearml_conf.md#agent-section).



## Installation

:::note
If **ClearML** was previously configured, follow [this](clearml_agent#adding-clearml-agent-to-a-configuration-file) to add 
ClearML Agent specific configurations
:::

To install ClearML Agent execute
```bash
pip install clearml-agent
```

## Configuration

1. In a terminal session, execute
   ```bash
   clearml-agent init
   ```

    The setup wizard prompts for **ClearML** credentials (see [here](webapp/webapp_profile.md#creating-clearml-credentials) about obtaining credentials).
    
        CLEARML-AGENT setup process

        Please create new clearml credentials through the profile page in your clearml web app (e.g., https://demoapp.demo.clear.ml/profile)
        In the profile page, press "Create new credentials", then press "Copy to clipboard".

        Paste copied configuration here:
    
    If the setup wizard's response indicates that a configuration file already exists, follow the instructions [here](#adding-clearml-agent-to-a-configuration-file). 
   The wizard does not edit or overwrite existing configuration files.

1. At the command prompt `Paste copied configuration here:`, copy and paste the **ClearML** credentials and press **Enter**. 
   The setup wizard confirms the credentials. 
        
        Detected credentials key="********************" secret="*******"
        
1. **Enter** to accept default server URL, which is detected from the credentials or Enter a ClearML web server URL.

   A secure protocol, https, must be used. **Do not use http.**
    
        WEB Host configured to: [https://app.community.clear.ml] 
        
   :::note
   If you are using a self-hosted ClearML Server, the default URL will use your domain.        
   :::
   
1. Do as above for API, URL, and file servers.

1. The wizard responds with your configuration:
    
        CLEARML Hosts configuration:
        Web App: https://app.community.clear.ml
        API: https://demoapi.clearml.allegro.ai
        File Store: https://demofiles.clearml.allegro.ai
        
        Verifying credentials ...
        Credentials verified!

1. Enter your Git username and password. Leave blank for SSH key authentication or when only using public repositories.<br/>
   This is needed for cloning repositories by the agent.

        Enter git username for repository cloning (leave blank for SSH key authentication): []
        Enter password for user '<username>':
        
    The setup wizard confirms your git credentials.
    
        Git repository cloning will be using user=<username> password=<password>        

1. Enter an additional artifact repository, or press **Enter** if not required.<br/>
   This is needed for installing Python packages not found in pypi. 

        Enter additional artifact repository (extra-index-url) to use when installing python packages (leave blank if not required):

    The setup wizard completes.
    
        New configuration stored in /home/<username>/clearml.conf
        CLEARML-AGENT setup completed successfully.

    The configuration file location depends upon the operating system:
            
    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. Optionally, configure **ClearML** options for **ClearML Agent** (default docker, package manager, etc.). See the [ClearML Configuration Reference](configs/clearml_conf.md). 

### Adding ClearML Agent to a configuration file

In case a `clearml.conf` file already exists, add a few ClearML Agent specific configurations to it.<br/>

**Adding ClearML Agent to a ClearML configuration file:**

1. Open the **ClearML** configuration file for editing. Depending upon the operating system, it is:
    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. After the `api` section, add the following `agent` section:
    
        agent {
            # Set GIT user/pass credentials (if user/pass are set, GIT protocol will be set to https)
            # leave blank for GIT SSH credentials (set force_git_ssh_protocol=true to force SSH protocol)
            git_user: ""
            git_pass: ""
            # Limit credentials to a single domain, for example: github.com,
            # all other domains will use public access (no user/pass). Default: always send user/pass for any VCS domain
            git_host=""
   
            # Force GIT protocol to use SSH regardless of the git url (Assumes GIT user/pass are blank)
            force_git_ssh_protocol: false
            # Force a specific SSH port when converting http to ssh links (the domain is kept the same)
            # force_git_ssh_port: 0
            # Force a specific SSH username when converting http to ssh links (the default username is 'git')
            # force_git_ssh_user: git
   
            # unique name of this worker, if None, created based on hostname:process_id
            # Override with os environment: CLEARML_WORKER_ID
            # worker_id: "clearml-agent-machine1:gpu0"
            worker_id: ""
        
            # worker name, replaces the hostname when creating a unique name for this worker
            # Override with os environment: CLEARML_WORKER_ID
            # worker_name: "clearml-agent-machine1"
            worker_name: ""
   
            # Set the python version to use when creating the virtual environment and launching the experiment
            # Example values: "/usr/bin/python3" or "/usr/local/bin/python3.6"
            # The default is the python executing the clearml_agent
            python_binary: ""
        
            # select python package manager:
            # currently supported pip and conda
            # poetry is used if pip selected and repository contains poetry.lock file
            package_manager: {
               # supported options: pip, conda, poetry
               type: pip,
        
               # specify pip version to use (examples "<20", "==19.3.1", "", empty string will install the latest version)
               pip_version: "<20.2",
        
               # virtual environment inheres packages from system
               system_site_packages: false,
               # install with --upgrade
               force_upgrade: false,
        
               # additional artifact repositories to use when installing python packages
               # extra_index_url: ["https://allegroai.jfrog.io/clearmlai/api/pypi/public/simple"]
               extra_index_url: []
                
               # additional conda channels to use when installing with conda package manager
               conda_channels: ["defaults", "conda-forge", "pytorch", ]
               # conda_full_env_update: false
               # conda_env_as_base_docker: false
               
               # set the priority packages to be installed before the rest of the required packages
               # priority_packages: ["cython", "numpy", "setuptools", ]

               # set the optional priority packages to be installed before the rest of the required packages,
               # In case a package installation fails, the package will be ignored,
               # and the virtual environment process will continue
               # priority_optional_packages: ["pygobject", ]

               # set the post packages to be installed after all the rest of the required packages
               # post_packages: ["horovod", ]

               # set the optional post packages to be installed after all the rest of the required packages,
               # In case a package installation fails, the package will be ignored,
               # and the virtual environment process will continue
               # post_optional_packages: []

               # set to True to support torch nightly build installation,
               # notice: torch nightly builds are ephemeral and are deleted from time to time
               torch_nightly: false,
            },
        
            # target folder for virtual environments builds, created when executing experiment
            venvs_dir = ~/.clearml/venvs-builds
        
            # cached virtual environment folder
            venvs_cache: {
               # maximum number of cached venvs
               max_entries: 10
               # minimum required free space to allow for cache entry, disable by passing 0 or negative value
               free_space_threshold_gb: 2.0
               # unmark to enable virtual environment caching
               # path: ~/.clearml/venvs-cache
            },

            # cached git clone folder
            vcs_cache: {
                enabled: true,
                path: ~/.clearml/vcs-cache
            },
        
            # use venv-update in order to accelerate python virtual environment building
            # Still in beta, turned off by default
            venv_update: {
                enabled: false,
            },
        
            # cached folder for specific python package download (mostly pytorch versions)
            pip_download_cache {
                enabled: true,
                path: ~/.clearml/pip-download-cache
            },
        
            translate_ssh: true,
            # reload configuration file every daemon execution
            reload_config: false,
        
            # pip cache folder mapped into docker, used for python package caching
            docker_pip_cache = ~/.clearml/pip-cache
            # apt cache folder mapped into docker, used for ubuntu package caching
            docker_apt_cache = ~/.clearml/apt-cache
        
            # optional arguments to pass to docker image
            # these are local for this agent and will not be updated in the experiment's docker_cmd section
            # extra_docker_arguments: ["--ipc=host", "-v", "/mnt/host/data:/mnt/data"]
        
            # optional shell script to run in docker when started before the experiment is started
            # extra_docker_shell_script: ["apt-get install -y bindfs", ]
        
            # Install the required packages for opencv libraries (libsm6 libxext6 libxrender-dev libglib2.0-0),
            # for backwards compatibility reasons, true as default,
            # change to false to skip installation and decrease docker spin up time
            # docker_install_opencv_libs: true
   
            # set to true in order to force "docker pull" before running an experiment using a docker image.
            # This makes sure the docker image is updated.
            docker_force_pull: false
        
            default_docker: {
                # default docker image to use when running in docker mode
                image: "nvidia/cuda:10.1-runtime-ubuntu18.04"
        
                # optional arguments to pass to docker image
                # arguments: ["--ipc=host", ]
            }
        
            # set the OS environments based on the Task's Environment section before launching the Task process.
            enable_task_env: false

            # CUDA versions used for Conda setup & solving PyTorch wheel packages
            # it Should be detected automatically. Override with os environment CUDA_VERSION / CUDNN_VERSION
            # cuda_version: 10.1
            # cudnn_version: 7.6
        }

1. Save the configuration.

## Execution

### Simple Execution

#### Executing an Agent
To execute an agent, listening to a queue, run:

```bash
clearml-agent daemon --queue <queue_name>
```

#### Executing in Background
To execute an agent in the background, run:
```bash
clearml-agent daemon --queue <execution_queue_to_pull_from> --detached
```
#### Stopping Agents
To stop an agent running in the background, run:
```bash
clearml-agent daemon <arguments> --stop
```

#### Allocating Resources
To specify GPUs associated with the agent, add the `--gpus` flag.
To execute multiple agents on the same machine (usually assigning GPU for the different agents), run:
```bash
clearml-agent daemon --detached --queue default --gpus 0
clearml-agent daemon --detached --queue default --gpus 1
```
To allocate more than one GPU, provide a list of allocated GPUs
```bash
clearml-agent daemon --gpus 0,1 --queue dual_gpu &
```

#### Queue Prioritization
A single agent can listen to multiple queues. The priority is set by their order.

```bash
clearml-agent daemon --detached --queue high_q low_q --gpus 0
```
This ensures the agent first tries to pull a Task from the “hiqh_q” queue, and only if it is empty, the agent will try to pull 
from the “low_q” queue.

To make sure an agent pulls from all queues equally, add the `--order-fairness` flag.
```bash
clearml-agent daemon --detached --queue group_a group_b --order-fairness  --gpus 0
```
It will make sure the agent will pull from the “group_a” queue, then from “group_b”, then back to “group_a”, etc. This ensures 
that “group A” or ”group_b” will not be able to starve one another of resources.

### Explicit Task execution

ClearML Agent can also execute specific tasks directly, without listening to a queue.

#### Execute a Task without queue

Execute a Task with a `clearml-agent` worker without a queue.
```bash
clearml-agent execute --id <task-id>
```
#### Clone a Task and execute the cloned Task

Clone the specified Task and execute the cloned Task with a `clearml-agent` worker without a queue.
```bash
clearml-agent execute --id <task-id> --clone
```

#### Execute Task inside a Docker

Execute a Task with a `clearml-agent` worker using a Docker container without a queue.
```bash
clearml-agent execute --id <task-id> --docker
```

### Debugging

* Run a `clearml-agent` daemon in foreground mode, sending all output to the console.
```bash
clearml-agent daemon --queue default --foreground
```


## Building Docker Containers

### Task Container

Build a Docker container that when launched executes a specific experiment, or a clone (copy) of that experiment.

- Build a Docker container that at launch will execute a specific Task.
  ```bash
  clearml-agent build --id <task-id> --docker --target <new-docker-name> --entry-point reuse_task
  ```
- Build a Docker container that at launch will clone a Task  specified by Task ID, and will execute the newly cloned Task.
  ```bash
  clearml-agent build --id <task-id> --docker --target <new-docker-name> --entry-point clone_task
  ```
- Run built Docker by executing:
  ```bash
  docker run <new-docker-name>
  ```

### Base Docker Container

Build a Docker container according to the execution environment of a specific Task.

```bash
clearml-agent build --id <task-id> --docker --target <new-docker-name>
```


It's possible to add the Docker container as the base Docker image to a Task (experiment), using one of the following methods:

- Using the **ClearML Web UI** - See [Base Docker image](webapp/webapp_exp_tuning.md#base-docker-image) on the "Tuning 
  Experiments" page.
- In the **ClearML** configuration file - Use the **ClearML** configuration file [agent.default_docker](configs/clearml_conf.md#agentdefault_docker) 
  options.

## Execution Environments

ClearML Agent supports executing tasks in multiple environments.

### PIP Mode 
By default, ClearML Agent works in PIP Mode, in which it uses [pip](https://en.wikipedia.org/wiki/Pip_(package_manager)) 
as the package manager. When ClearML runs, it will create a virtual environment 
(or reuse an exisitng one, see [here](clearml_agent.md#virtual-environment-reuse)).
Task dependencies (Python packages) will be installed in the virtual environment.

### Conda Mode 
This mode is similar to the PIP mode but uses [Conda](https://docs.conda.io/en/latest/) as the package 
manager. To enable Conda mode, edit the `clearml.conf` file, and modify the `type: pip` to `type: conda` in the “package_manager” section. 
If extra conda channels are needed, look for “conda_channels” under “package_manager”, and add the missing channel.

### Poetry Mode
This mode is similar to the PIP mode but uses [Poetry](https://python-poetry.org/) as the package manager.
To enable Poetry mode, edit the `clearml.conf` file, and modify the `type: pip` to `type: poetry` in the “package_manager” 
section.

### Docker Mode 
:::note
Docker Mode is only supported in linux.<br/>
Docker Mode requires docker service v19.03 or higher installed.
:::

When executing the ClearML Agent in Docker mode, it will: 
1. Run the provided Docker container 
1. Install ClearML Agent in the container 
1. Execute the Task in the container, and monitor the process. 
   
ClearML Agent uses the provided default Docker container, which can be overridden from the UI. 

All ClearML Agent flags (Such as `--gpus` and `--foreground`) are applicable to Docker mode as well. 

To execute ClearML Agent in Docker mode, run: 
```bash
clearml-agent daemon --queue <execution_queue_to_pull_from> --docker [optional default docker image to use]
```

To use the current `clearml-agent` version in the Docker container, instead of the latest `clearml-agent` version that is 
automatically installed, run:
```bash
clearml-agent daemon --queue default --docker --force-current-version
```

For Kubernetes, specify a host mount on the daemon host. Do not use the host mount inside the Docker container.
Set the environment variable `CLEARML_AGENT_K8S_HOST_MOUNT`.
For example:
```
CLEARML_AGENT_K8S_HOST_MOUNT=/mnt/host/data:/root/.clearml
``` 

## Environment Caching

ClearML Agent caches virtual environments so when running experiments multiple times, there's no need to spend time reinstalling 
pre-installed packages. To make use of the cached virtual environments, enable the virtual environment reuse mechanism. 

#### Virtual Environment Reuse

The virtual environment reuse feature may reduce experiment startup time dramatically.

By default, ClearML uses the package manager's environment caching. This means that even if no 
new packages need to be installed, checking the list of packages can take a long time.

ClearML has a virtual environment reuse mechanism which, when enabled, allows using environments as-is without resolving 
installed packages. This means that when executing multiple experiments with the same package dependencies, 
the same environment will be used.

:::note
ClearML does not support environment reuse when using Poetry package manager
:::

To enable environment reuse, modify the `clearml.conf` file and unmark the venvs_cache section.
```
venvs_cache: {
        # maximum number of cached venvs
        max_entries: 10
        # minimum required free space to allow for cache entry, disable by passing 0 or negative value
        free_space_threshold_gb: 2.0
        # unmark to enable virtual environment caching
        # path: ~/.clearml/venvs-cache
    },
```

## Services Mode
The ClearML Agent Services Mode executes an Agent that can execute multiple Tasks. This is useful for Tasks that are mostly 
idling, such as periodic cleanup services, or a [pipeline controller](references/sdk/automation_controller_pipelinecontroller.md). 

Launch a service Task like any other Task, by enqueuing it to the appropriate queue.

:::note
The default `clearml-server` configuration already runs a single `clearml-agent` in services mode that listens to the “services” queue.
:::

To run a `clearml-agent` in services mode, run:
```bash
clearml-agent daemon --services-mode --queue services --create-queue --docker <docker_name> --cpu-only
```
:::note
`services-mode` currently only supports Docker mode. Each service spins on its own Docker image.
:::

:::warning
Do not enqueue training or inference Tasks into the services queue. They will put an unnecessary load on the server.
:::


