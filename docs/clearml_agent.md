---
title: ClearML Agent
---

**ClearML Agent** is a virtual environment and execution manager for DL / ML solutions on GPU machines. It integrates with the **ClearML Python Package** and **ClearML Server** to provide a full AI cluster solution. <br/>
Its main focus is around:
- Reproducing experiments, including their complete environments. 
- Scaling workflows on multiple target machines. 

**ClearML Agent** executes an experiment or other workflow by reproducing the state of the code from the original machine 
to a remote machine.

![image](img/clearml_agent_flow_diagram.png)

The diagram above demonstrates a typical flow where an agent executes a task:  

1. Enqueue a task for execution on the queue.
1. The agent pulls the task from the queue.
1. The agent launches a docker container in which to run the task's code.
1. The task's execution environment is set up:
   1.  Execute any custom setup script configured.
   1.  Install any required system packages.
   1.  Clone the code from a git repository.
   1.  Apply any uncommitted changes recorded.
   1.  Set up the python environment and required packages.
1. The task's script/code is executed.  

While the agent is running, it continuously reports system metrics to the ClearML Server (These can be monitored in the **Workers and Queues** page).  

Continue using **ClearML Agent** once it is running on a target machine. Reproduce experiments and execute 
automated workflows in one (or both) of the following ways: 
* Programmatically
* By using the **ClearML Web UI** (without directly working with code), by enqueuing experiments 
to the queue that a **ClearML Agent** is listening to.

For more information, see [ClearML Agent Reference](references/clearml_agent_ref.md), 
and [configuration options](configs/clearml_conf.md#agent-section).



## Installation

:::note
If **ClearML** was previously configured, follow [this](#adding-clearml-agent-to-a-configuration-file) to add 
ClearML Agent specific configurations
:::

To install ClearML Agent, execute
```bash
pip install clearml-agent
```

:::info
Install ClearML Agent as a system Python package and not in a Python virtual environment.
:::

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

1. Enter your Git username and password. Leave blank for SSH key authentication or when only using public repositories.
   
   This is needed for cloning repositories by the agent.

        Enter git username for repository cloning (leave blank for SSH key authentication): []
        Enter password for user '<username>':
        
    The setup wizard confirms your git credentials.
    
        Git repository cloning will be using user=<username> password=<password>        

1. Enter an additional artifact repository, or press **Enter** if not required.
   
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
   
:::note
The ClearML Enterprise server provides a [configuration vault](webapp/webapp_profile.md#configuration-vault), the contents 
of which are categorically applied on top of the agent-local configuration
:::


### Adding ClearML Agent to a Configuration File

In case a `clearml.conf` file already exists, add a few ClearML Agent specific configurations to it.<br/>

**Adding ClearML Agent to a ClearML configuration file:**

1. Open the **ClearML** configuration file for editing. Depending upon the operating system, it is:
    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. After the `api` section, add your `agent` section
     <details className="cml-expansion-panel configuration">
     <summary className="cml-expansion-panel-summary">View sample agent section</summary>
     <div className="cml-expansion-panel-content">

         agent {
            # Set GIT user/pass credentials (if user/pass are set, GIT protocol will be set to https)
            # leave blank for GIT SSH credentials (set force_git_ssh_protocol=true to force SSH protocol)
            git_user=""
            git_pass=""
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
            # Overridden with os environment: CLEARML_WORKER_NAME
            # worker_id: "clearml-agent-machine1:gpu0"
            worker_id: ""
   
            # worker name, replaces the hostname when creating a unique name for this worker
            # Overridden with os environment: CLEARML_WORKER_ID
            # worker_name: "clearml-agent-machine1"
            worker_name: ""
   
            # Set the python version to use when creating the virtual environment and launching the experiment
            # Example values: "/usr/bin/python3" or "/usr/local/bin/python3.6"
            # The default is the python executing the clearml_agent
            python_binary: ""
            # ignore any requested python version (Default: False, if a Task was using a
            # specific python version and the system supports multiple python the agent will use the requested python version)
            # ignore_requested_python_version: true
   
            # select python package manager:
            # currently supported: pip, conda and poetry
            # if "pip" or "conda" are used, the agent installs the required packages
            # based on the "installed packages" section of the Task. If the "installed packages" is empty,
            # it will revert to using `requirements.txt` from the repository's root directory.
            # If Poetry is selected and the root repository contains `poetry.lock` or `pyproject.toml`,
            # the "installed packages" section is ignored, and poetry is used.
            # If Poetry is selected and no lock file is found, it reverts to "pip" package manager behaviour.
            package_manager: {
               # supported options: pip, conda, poetry
               type: pip,
               
               # specify pip version to use (examples "<20", "==19.3.1", "", empty string will install the latest version)
               # pip_version: "<20"
               
               # virtual environment inheres packages from system
               system_site_packages: false,
               # install with --upgrade
               force_upgrade: false,
               
               # additional artifact repositories to use when installing python packages
               # extra_index_url: ["https://allegroai.jfrog.io/clearml/api/pypi/public/simple"]
               extra_index_url: []
   
               # additional conda channels to use when installing with conda package manager
               conda_channels: ["pytorch", "conda-forge", "defaults", ]
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
   
            # DEPRECATED: please use `venvs_cache` and set `venvs_cache.path`
            # use venv-update in order to accelerate python virtual environment building
            # Still in beta, turned off by default
            # venv_update: {
            #     enabled: false,
            # },
   
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
                image: "nvidia/cuda:10.1-cudnn7-runtime-ubuntu18.04"
   
                # optional arguments to pass to docker image
                # arguments: ["--ipc=host"]
            }
   
            # set the OS environments based on the Task's Environment section before launching the Task process.
            enable_task_env: false
   
            # CUDA versions used for Conda setup & solving PyTorch wheel packages
            # it Should be detected automatically. Override with os environment CUDA_VERSION / CUDNN_VERSION
            # cuda_version: 10.1
            # cudnn_version: 7.6
   
            # Hide docker environment variables containing secrets when printing out the docker command by replacing their
            # values with "********". Turning this feature on will hide the following environment variables values:
            #   CLEARML_API_SECRET_KEY, CLEARML_AGENT_GIT_PASS, AWS_SECRET_ACCESS_KEY, AZURE_STORAGE_KEY
            # To include more environment variables, add their keys to the "extra_keys" list. E.g. to make sure the value of
            # your custom environment variable named MY_SPECIAL_PASSWORD will not show in the logs when included in the
            # docker command, set:
            #   extra_keys: ["MY_SPECIAL_PASSWORD"]
            hide_docker_command_env_vars {
               enabled: true
               extra_keys: []
            }
   
            # allow to set internal mount points inside the docker,
            # especially useful for non-root docker container images.
            # docker_internal_mounts {
            #     sdk_cache: "/clearml_agent_cache"
            #     apt_cache: "/var/cache/apt/archives"
            #     ssh_folder: "/root/.ssh"
            #     pip_cache: "/root/.cache/pip"
            #     poetry_cache: "/root/.cache/pypoetry"
            #     vcs_cache: "/root/.clearml/vcs-cache"
            #     venv_build: "/root/.clearml/venvs-builds"
            #     pip_download: "/root/.clearml/pip-download-cache"
            # }
   
            # Name docker containers created by the daemon using the following string format (supported from Docker 0.6.5)
            # Allowed variables are task_id, worker_id and rand_string (random lower-case letters string, up to 32 characters)
            # Note: resulting name must start with an alphanumeric character and
            #       continue with alphanumeric characters, underscores (_), dots (.) and/or dashes (-)
            # docker_container_name_format: "clearml-id-{task_id}-{rand_string:.8}"
        }

   </div></details>   
1. Save the configuration.

## Execution

### Spinning Up an Agent

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

### Explicit Task Execution

ClearML Agent can also execute specific tasks directly, without listening to a queue.

#### Execute a Task without Queue

Execute a Task with a `clearml-agent` worker without a queue.
```bash
clearml-agent execute --id <task-id>
```
#### Clone a Task and Execute the Cloned Task

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



## Execution Environments

ClearML Agent supports executing tasks in multiple environments.

### PIP Mode 
By default, ClearML Agent works in PIP Mode, in which it uses [pip](https://en.wikipedia.org/wiki/Pip_(package_manager)) 
as the package manager. When ClearML runs, it will create a virtual environment 
(or reuse an existing one, see [here](clearml_agent.md#virtual-environment-reuse)).
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

## Dynamic GPU Allocation

:::important
Available with the ClearML Enterprise offering
:::

The ClearML Enterprise server supports dynamic allocation of GPUs based on queue properties.
Agents can spin multiple Tasks from different queues based on the number of GPUs the queue
needs.

`dynamic-gpus` enables dynamic allocation of GPUs based on queue properties.
To configure the number of GPUs for a queue, use the `--queue` flag and specify the queue name and number of GPUs:

```console
clearml-agent daemon --dynamic-gpus --queue dual_gpus=2 single_gpu=1
```

### Example

Let's say there are three queues on a server, named:
* `dual_gpu`
* `quad_gpu`
* `opportunistic`

An agent can be spun on multiple GPUs (e.g. 8 GPUs, `--gpus 0-7`), and then attached to multiple
queues that are configured to run with a certain amount of resources:

```console
clearml-agent daemon --dynamic-gpus --gpus 0-7 --queue quad_gpu=4 dual_gpu=2 
``` 

The agent can now spin multiple Tasks from the different queues based on the number of GPUs configured to the queue.
The agent will pick a Task from the `quad_gpu` queue, use GPUs 0-3 and spin it. Then it will pick a Task from `dual_gpu`
queue, look for available GPUs again and spin on GPUs 4-5.

Another option for allocating GPUs:

```console
clearml-agent daemon --dynamic-gpus --gpus 0-7 --queue dual=2 opportunistic=1-4
``` 

Notice that a minimum and maximum value of GPUs was specified for the `opportunistic` queue. This means the agent
will pull a Task from the `opportunistic` queue and allocate up to 4 GPUs based on availability (i.e. GPUs not currently
being used by other agents).

## Services Mode
ClearML Agent supports a **Services Mode** where, as soon as a task is launched off of its queue, the agent moves on to the 
next task without waiting for the previous one to complete. This mode is intended for running resource-sparse tasks that 
are usually idling, such as periodic cleanup services or a [pipeline controller](references/sdk/automation_controller_pipelinecontroller.md). 

To run a `clearml-agent` in services mode, run:
```bash
clearml-agent daemon --services-mode --queue services --create-queue --docker <docker_name> --cpu-only
```
:::note Notes
* `services-mode` currently only supports Docker mode. Each service spins on its own Docker image.
* The default `clearml-server` configuration already runs a single `clearml-agent` in services mode that listens to the 
  `services` queue.
:::

Launch a service task like any other task, by enqueuing it to the appropriate queue.

:::warning
Do not enqueue training or inference tasks into the services queue. They will put an unnecessary load on the server.
:::

### Setting Server Credentials

Self hosted [ClearML Server](deploying_clearml/clearml_server.md) comes by default with a services queue.
By default, the server is open and does not require username and password, but it can be [password-protected](deploying_clearml/clearml_server_security#user-access-security).
In case it is password-protected, the services agent will need to be configured with server credentials (associated with a user).

To do that, set these environment variables on  the ClearML Server machine with the appropriate credentials:
```
CLEARML_API_ACCESS_KEY
CLEARML_API_SECRET_KEY
```

## Exporting a Task into a Standalone Docker Container

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

## Google Colab

ClearML Agent can run on a [Google Colab](https://colab.research.google.com/) instance. This helps users to leverage 
compute resources provided by Google Colab and send experiments for execution on it. 

Check out [this tutorial](guides/ide/google_colab.md) on how to run a ClearML Agent on Google Colab!


## Scheduling Working Hours

:::important
Available with the ClearML Enterprise offering
:::

The Agent scheduler enables scheduling working hours for each Agent. During working hours, a worker will actively poll 
queues for Tasks, fetch and execute them. Outside working hours, a worker will be idle.

Schedule workers by:

* Setting configuration file options
* Running `clearml-agent` from the command line (overrides configuration file options)

Override worker schedules by:

* Setting runtime properties to force a worker on or off
* Tagging a queue on or off

### Running clearml-agent with a Schedule (Command Line)

Set a schedule for a worker from the command line when running `clearml-agent`. Two properties enable setting working hours:

:::warning
Use only one of these properties
:::

* `uptime` - Time span during which a worker will actively poll a queue(s) for Tasks, and execute them. Outside this 
  time span, the worker will be idle.
* `downtime` - Time span during which a worker will be idle. Outside this time span, the worker will actively poll and 
  execute Tasks.

Define `uptime` or `downtime` as `"<hours> <days>"`, where:

* `<hours>` - A span of hours (`00-23`) or a single hour. A single hour defines a span from that hour to midnight. 
* `<days>` - A span of days (`SUN-SAT`) or a single day.

Use `-` for a span, and `,` to separate individual values. To span before midnight to after midnight, use two spans.

For example:

* `"20-23 SUN"` - 8 PM to 11 PM on Sundays.
* `"20-23 SUN,TUE"` - 8 PM to 11 PM on Sundays and Tuesdays.
* `"20-23 SUN-TUE"` - 8 PM to 11 PM on Sundays, Mondays, and Tuesdays.
* `"20 SUN"` - 8 PM to midnight on Sundays.
* `"20-00,00-08 SUN"` - 8 PM to midnight and midnight to 8 AM on Sundays
* `"20-00 SUN", "00-08 MON"` - 8 PM on Sundays to 8 AM on Mondays (spans from before midnight to after midnight).

### Setting Worker Schedules in the Configuration File

Set a schedule for a worker using configuration file options. The options are:

:::warning
Only use one of these properties
:::

* ``agent.uptime``
* ``agent.downtime``

Use the same time span format for days and hours as is used in the command line.

For example, set a worker's schedule from 5 PM to 8 PM on Sunday through Tuesday, and 1 PM to 10 PM on Wednesday.

    agent.uptime: ["17-20 SUN-TUE", "13-22 WED"]

### Overriding Worker Schedules Using Runtime Properties

Runtime properties override the command line uptime / downtime properties. The runtime properties are:

:::warning
Use only one of these properties
:::

* `force:on` - Pull and execute Tasks until the property expires.
* `force:off` - Prevent pulling and execution of Tasks until the property expires.

Currently, these runtime properties can only be set using an ClearML REST API call to the `workers.set_runtime_properties`
endpoint, as follows: 

* The body of the request must contain the `worker-id`, and the runtime property to add.
* An expiry date is optional. Use the format `”expiry”:<time>`. For example,  `”expiry”:86400` will set an expiry of 24 hours.
* To delete the property, set the expiry date to zero, `'expiry:0'`.

For example, to force a worker on for 24 hours:

    curl --user <key>:<secret> --header "Content-Type: application/json" --data '{"worker":"<worker_id>","runtime_properties":[{"key": "force", "value": "on", "expiry": 86400}]}' http://<api-server-hostname-or-ip>:8008/workers.set_runtime_properties

### Overriding Worker Schedules Using Queue Tags

Queue tags override command line and runtime properties. The queue tags are the following:

:::warning
Use only one of these properties
:::

* ``force_workers:on`` - Any worker listening to the queue will keep pulling Tasks from the queue.
* ``force_workers:off`` - Prevent all workers listening to the queue from pulling Tasks from the queue.

Currently, you can set queue tags using an ClearML REST API call to the ``queues.update`` endpoint, or the 
APIClient. The body of the call must contain the ``queue-id`` and the tags to add.

For example, force workers on for a queue using the APIClient:

    from trains.backend_api.session.client import APIClient
    client = APIClient()
    client.queues.update(queue=”<queue_id>”, tags=["force_workers:on"]

Or, force workers on for a queue using the REST API:

    curl --user <key>:<secret> --header "Content-Type: application/json" --data '{"queue":"<queue_id>","tags":["force_workers:on"]}' http://<api-server-hostname-or-ip>:8008/queues.update
