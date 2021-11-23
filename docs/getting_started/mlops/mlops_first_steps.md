---
title: First Steps
---

:::note
This tutorial assumes that you've already [signed up](https://app.community.clear.ml) to ClearML
:::

MLOps is all about automation! We'll discuss the need for automation, and the tools ClearML offers for automation, orchestration and tracking!

Effective MLOps relies on the ability to scale work beyond one's own computer. Moving from your own machine can be inefficient. 
Assuming that you have all the drivers and applications installed, you still need to manage multiple python environments
for different packages / package versions, or worse - manage different Dockers for different package versions.

Not to mention, when working on remote machines, executing experiments and tracking what's running where and making sure machines are fully utilized at all times
becomes a daunting task.

This can create overhead that derails you from the core work!

ClearML Agent was designed to deal with these and more! It is a module responsible for executing experiments
on remote machines, on-premises, or in the cloud!

It will set up the environment for the specific Task (inside a Docker, or bare-metal), install the required python packages, 
and execute & monitor the process itself. 

## Set up an Agent

1. Let's install the agent!

    ```bash
    pip install clearml-agent
    ```

1. Connect the agent to the server by [creating credentials](https://app.community.clear.ml/profile), then run this:

    ```bash
    clearml-agent init
    ```

    :::note
    If you've already created credentials, you can copy-paste the default agent section from [here](https://github.com/allegroai/clearml-agent/blob/master/docs/clearml.conf#L15) (this is optional. If the section is not provided the default values will be used)
    :::

1. Start the agent's daemon and assign it to a [queue](../../fundamentals/agents_and_queues.md#what-is-a-queue). 

    ```bash
    clearml-agent daemon --queue default
    ```

    A queue is an ordered list of Tasks that are scheduled for execution. The agent will pull Tasks from the assigned queue 
    (`default` in this case), and execute them one after the other. 
   
    $$$ Once we are done, enqueuing the Task in one of the execution queues will  put it in the execution queue. 
    Multiple agents can listen to the same queue (or even multiple queues), but only a single agent will pick the Task to be executed.  


## Clone an Experiment
Experiments already in ClearML Server, whether previously executed or pushed into the server, can be used as a baseline 
for further experimentation. Clone a Task, which will create a copy of the task with all its configuration, but not its
outputs. 

The new cloned task is in a *draft* mode, so it can be edited. We can edit the git / code references, control the python 
packages to be installed, specify the Docker container image to be used, or change the hyper-parameters and configuration files. 



You can clone an experiments from our [examples](https://app.community.clear.ml/projects/764d8edf41474d77ad671db74583528d/experiments) project and enqueue it to a queue!

## Enqueue an Experiment
Once you have an experiment, it is now time to execute it. 

, then enqueueing the Task in one of the execution queues for the agent to execute it


## Programmatic Interface

It is also possible to clone tasks, modify, and enqueue tasks . 

```python
cloned_task = Task.clone(task_id='aabbcc')
Task.enqueue(cloned_task, queue_name='default')
```


## Modify Hyperparameters
Hyperparameters are an integral part of Machine Learning code as it lets you control the code without directly modifying it.

Hyperparameters can be added from anywhere in your code, and ClearML supports [multiple](../../fundamentals/hyperparameters.md) ways to obtain them!

ClearML also allows users to change and track hyperparameter values without changing the code itself.
When a cloned experiment is executed by an Agent, it will override the default values with new ones.

It's also possible to programmatically change cloned experiments' parameters.

For example:
```python
from clearml import Task
cloned_task = Task.clone(task_id='aabbcc')
cloned_task.set_parameter(name='internal/magic', value=42)
Task.enqueue(cloned_task, queue_name='default')
```


## Logging Artifacts
Artifacts are a great way to pass and reuse data between Tasks in the system.
From anywhere in the code you can upload [multiple](../../fundamentals/artifacts.md#logging-artifacts) types of data, 
object and files. Artifacts are the base of ClearML's [Data Management](../../clearml_data/clearml_data.md) solution and 
as a way to communicate complex objects between different
stages of a [pipeline](../../fundamentals/pipelines.md).

```python
import numpy as np
from clearml import Task
Task.current_task().upload_artifact(name='a_file', artifact_object='local_file.bin')
Task.current_task().upload_artifact(name='numpy', artifact_object=np.ones(4,4))
```


### Using Artifacts
Artifacts can be retrieved by [accessing](../../fundamentals/artifacts.md#using-artifacts) the Task that created it.
```python
from clearml import Task
executed_task = Task.get_task(task_id='aabbcc')
# artifact as a file
local_file = executed_task.artifacts['file'].get_local_copy()
# artifact as object
a_numpy = executed_task.artifacts['numpy'].get()
```
