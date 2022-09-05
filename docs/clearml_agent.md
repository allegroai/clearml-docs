---
title: ClearML Agent Overview
---

**ClearML Agent** is a virtual environment and execution manager for DL / ML solutions on GPU machines. It integrates with the **ClearML Python Package** and ClearML Server to provide a full AI cluster solution. <br/>
Its main focus is around:
- Reproducing experiments, including their complete environments. 
- Scaling workflows on multiple target machines. 

ClearML Agent executes an experiment or other workflow by reproducing the state of the code from the original machine 
to a remote machine.

![ClearML Agent flow diagram](img/clearml_agent_flow_diagram.png)

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

For more information, see [ClearML Agent Reference](clearml_agent/clearml_agent_ref.md), 
and [configuration options](configs/clearml_conf.md#agent-section).



## Installation

:::note
If ClearML was previously configured, follow [this](#adding-clearml-agent-to-a-configuration-file) to add 
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

    The setup wizard prompts for ClearML credentials (see [here](webapp/webapp_profile.md#clearml-credentials) about obtaining credentials).
    ```
    Please create new clearml credentials through the settings page in your `clearml-server` web app, 
    or create a free account at https://app.clear.ml/settings/webapp-configuration
    
    In the settings > workspace  page, press "Create new credentials", then press "Copy to clipboard".

    Paste copied configuration here:    
    ```
    
    If the setup wizard's response indicates that a configuration file already exists, follow the instructions [here](#adding-clearml-agent-to-a-configuration-file). 
   The wizard does not edit or overwrite existing configuration files.

1. At the command prompt `Paste copied configuration here:`, copy and paste the ClearML credentials and press **Enter**. 
   The setup wizard confirms the credentials. 
        
   ```
   Detected credentials key="********************" secret="*******"
   ```
        
1. **Enter** to accept default server URL, which is detected from the credentials or enter a ClearML web server URL.

   A secure protocol, https, must be used. **Do not use http.**
    
   ```
   WEB Host configured to: [https://app.clear.ml] 
   ```
        
   :::note
   If you are using a self-hosted ClearML Server, the default URL will use your domain.        
   :::
   
1. Do as above for API, URL, and file servers.

1. The wizard responds with your configuration:
   ```
   CLEARML Hosts configuration:
   Web App: https://app.clear.ml
   API: https://api.clear.ml
   File Store: https://files.clear.ml
        
   Verifying credentials ...
   Credentials verified!
   ```

1. Enter your Git username and password. Leave blank for SSH key authentication or when only using public repositories.
   
   This is needed for cloning repositories by the agent.
   ```
   Enter git username for repository cloning (leave blank for SSH key authentication): []
   Enter password for user '<username>':
   ```     
   The setup wizard confirms your git credentials.
   ``` 
   Git repository cloning will be using user=<username> password=<password>        
   ```
1. Enter an additional artifact repository, or press **Enter** if not required.
   
   This is needed for installing Python packages not found in pypi. 

   ```
   Enter additional artifact repository (extra-index-url) to use when installing python packages (leave blank if not required):
   ```
    The setup wizard completes.
   
   ```
   New configuration stored in /home/<username>/clearml.conf
   CLEARML-AGENT setup completed successfully.
   ```
   
    The configuration file location depends upon the operating system:
            
    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. Optionally, configure ClearML options for **ClearML Agent** (default docker, package manager, etc.). See the [ClearML Configuration Reference](configs/clearml_conf.md). 
   
:::note
The ClearML Enterprise server provides a [configuration vault](webapp/webapp_profile.md#configuration-vault), the contents 
of which are categorically applied on top of the agent-local configuration
:::


### Adding ClearML Agent to a Configuration File

In case a `clearml.conf` file already exists, add a few ClearML Agent specific configurations to it.<br/>

**Adding ClearML Agent to a ClearML configuration file:**

1. Open the ClearML configuration file for editing. Depending upon the operating system, it is:
    * Linux - `~/clearml.conf`
    * Mac - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. After the `api` section, add your `agent` section. For example:
   ```
   agent {
       # Set GIT user/pass credentials (if user/pass are set, GIT protocol will be set to https)
       git_user=""
       git_pass=""
       # all other domains will use public access (no user/pass). Default: always send user/pass for any VCS domain
       git_host=""
   
       # Force GIT protocol to use SSH regardless of the git url (Assumes GIT user/pass are blank)
       force_git_ssh_protocol: false
   
       # unique name of this worker, if None, created based on hostname:process_id
       # Overridden with os environment: CLEARML_WORKER_NAME
       worker_id: ""
   }   
   ```
   View a complete ClearML Agent configuration file sample including an `agent` section [here](https://github.com/allegroai/clearml-agent/blob/master/docs/clearml.conf).

1. Save the configuration.

## Execution

### Spinning Up an Agent
You can spin up an agent on any machine: on-prem and/or cloud instance. When spinning up an agent, you assign it to 
service a queue(s). Utilize the machine by enqueuing tasks to the queue that the agent is servicing, and the agent will 
pull and execute the tasks. 

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
This ensures the agent first tries to pull a Task from the `high_q` queue, and only if it is empty, the agent will try to pull 
from the `low_q` queue.

To make sure an agent pulls from all queues equally, add the `--order-fairness` flag.
```bash
clearml-agent daemon --detached --queue group_a group_b --order-fairness  --gpus 0
```
It will make sure the agent will pull from the `group_a` queue, then from `group_b`, then back to `group_a`, etc. This ensures 
that `group_a` or `group_b` will not be able to starve one another of resources.

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

:::note Using Poetry with Pyenv
Some versions of poetry (using `install-poetry.py`) do not respect `pyenv global`.  
If you are using pyenv to control the environment where you use ClearML Agent, you can:
  * Use poetry v1.2 and above (which [fixes this issue](https://github.com/python-poetry/poetry/issues/5077))
  * Install poetry with the deprecated `get-poetry.py` installer

:::

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

All ClearML Agent flags (such as `--gpus` and `--foreground`) are applicable to Docker mode as well. 

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

:::important Enterprise Feature
This feature is available under the ClearML Enterprise plan
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

Let's say a server has three queues:
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

Notice that a minimum and maximum value of GPUs is specified for the `opportunistic` queue. This means the agent
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

To limit the number of simultaneous tasks run in services mode, pass the maximum number immediately after the 
`--services-mode` option (e.g. `--services-mode 5`)

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
By default, the server is open and does not require username and password, but it can be [password-protected](deploying_clearml/clearml_server_security.md#user-access-security).
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

Check out [this tutorial](guides/clearml_agent/executable_exp_containers.md) for building executable experiment 
containers.

### Base Docker Container

Build a Docker container according to the execution environment of a specific task.

```bash
clearml-agent build --id <task-id> --docker --target <new-docker-name>
```

It's possible to add the Docker container as the base Docker image to a task (experiment), using one of the following methods:

- Using the **ClearML Web UI** - See [Base Docker image](webapp/webapp_exp_tuning.md#base-docker-image) on the "Tuning
  Experiments" page.
- In the ClearML configuration file - Use the ClearML configuration file [agent.default_docker](configs/clearml_conf.md#agentdefault_docker)
  options.

Check out [this tutorial](guides/clearml_agent/exp_environment_containers.md) for building a Docker container 
replicating the execution environment of an existing task.

## Google Colab

ClearML Agent can run on a [Google Colab](https://colab.research.google.com/) instance. This helps users to leverage 
compute resources provided by Google Colab and send experiments for execution on it. 

Check out [this tutorial](guides/ide/google_colab.md) on how to run a ClearML Agent on Google Colab!


## Scheduling Working Hours

:::important Enterprise Feature
This feature is available under the ClearML Enterprise plan
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
Use only one of these properties
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
* An expiry date is optional. Use the format `"expiry":<time>`. For example,  `"expiry":86400` will set an expiry of 24 hours.
* To delete the property, set the expiry date to zero, `"expiry":0`.

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

    from clearml.backend_api.session.client import APIClient
    client = APIClient()
    client.queues.update(queue="<queue_id>", tags=["force_workers:on"]

Or, force workers on for a queue using the REST API:

```bash
curl --user <key>:<secret> --header "Content-Type: application/json" --data '{"queue":"<queue_id>","tags":["force_workers:on"]}' http://<api-server-hostname-or-ip>:8008/queues.update
```
