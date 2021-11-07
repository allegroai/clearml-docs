---
title: First Steps
---

:::note
This tutorial assumes that you've already [signed up](https://app.community.clear.ml) to ClearML
:::

MLOps is all about automation! We'll discuss the need for automation and the Tools ClearML offers for automation, orchestration and tracking!<br/>

Effective MLOps relies on being able to scale work beyond one's own computer. Moving from your own machine can be inefficient, 
assuming that you have  all the drivers and applications installed, you still need to manage multiple python environments
for different packages \ package versions, or worst - manage different docker for different package versions.<br/> 
Not to mention, when working on remote machines, executing experiments and tracking what's running where and making sure they are fully utilized at all times
becomes a daunting task.<br/>
This can create overhead that derails you from the core work!

ClearML Agent was designed to deal with these and more! It is a module responsible  executing experiments,
on remote machines, on premise or in the cloud!<br/>
It will setup the environment for the specific Task (inside a docker, or bare-metal) install the required python packages and execute & monitor the process itself. 

## Spin up an Agent

First, let's install the agent!

```bash
pip install clearml-agent
```

Connect the Agent to the server by [creating credentials](https://app.community.clear.ml/profile), then run this:

```bash
clearml-agent init
```

:::note
If you've already created credentials, you can copy-paste the default agent section from [here](https://github.com/allegroai/clearml-agent/blob/master/docs/clearml.conf#L15) (this is obviously optional if the section is not provided the default values will be used)
:::

Start the agent's daemon. The agent will start pulling Tasks from the assigned queue(default in our case), and execute them one after the other.

```bash
clearml-agent daemon --queue default
```

## Clone an Experiment
Creating a new "job" to be executed, is essentially cloning a Task in the system, then enqueueing the Task in one of the execution queues for the agent to execute it.
When cloning a Task we are creating another copy of the Task in a *draft* mode, allowing us to edit the Task's environment definitions. <br/>
We can edit the git \ code references, control the python packages to be installed, specify docker container image to be used, or change the hyper-parameters and configuration files.
Once we are done, enqueuing the Task in one of the execution queues will  put it in the execution queue. 
Multiple agents can listen to the same queue (or even multiple queues), but only a single agent will pick the Task to be executed.  

You can clone an experiments from our [examples](https://app.community.clear.ml/projects/764d8edf41474d77ad671db74583528d/experiments) project and enqueue it to a queue!

### Accessing Previously Executed Experiments
All executed Tasks in the system can be accessed based on the unique Task ID, or by searching for the Task based on its properties.
For example:

```python
from clearml import Task
executed_task = Task.get_task(task_id='aabbcc')
```

## Log Hyperparameters
Hyperparameters are an integral part of Machine Learning code as it lets you control the code without directly modifying it.<br/>
Hyperparameters can be added from anywhere in your code, and ClearML supports [multiple](../../fundamentals/hyperparameters.md) ways to obtain them!

ClearML also allows users to change and track hyperparameter values without changing the code itself.
When a cloned experiment is executed by an Agent, it will override the default values with new ones.

It's also possible to programatically change cloned experiments' parameters
For example:
```python
from clearml import Task
cloned_task = Task.clone(task_id='aabbcc')
cloned_task.set_parameter(name='internal/magic', value=42)
Task.enqueue(cloned_task, queue_name='default')
```


## Logging Artifacts
Artifacts are a great way to pass and reuse data between Tasks in the system.
From anywhere in the code you can upload [multiple](../../fundamentals/artifacts.md#logging-artifacts) types of data, object and files.
Artifacts are the base of ClearML's [Data Management](../../clearml_data/clearml_data.md) solution and as a way to communicate complex objects between different
stages of a [pipeline](../../fundamentals/pipelines.md)

```python
import numpy as np
from clearml import Task
Task.current_task().upload_artifact(name='a_file', artifact_object='local_file.bin')
Task.current_task().upload_artifact(name='numpy', artifact_object=np.ones(4,4))
```


### Using Artifacts
Artifacts can be retrieved by [accessing](../../fundamentals/artifacts.md#uing-artifacts) the Task that created it.
```python
from clearml import Task
executed_task = Task.get_task(task_id='aabbcc')
# artifact as a file
local_file = executed_task.artifacts['file'].get_local_copy()
# artifact as object
a_numpy = executed_task.artifacts['numpy'].get()
```

### Models
Model are a special type of artifact that's automatically logged.
Logging models into the model repository is the easiest way to integrate the development process directly with production.<br/>
Any model stored by the supported frameworks (Keras \ TF \PyTorch \ Joblib) will be automatically logged into ClearML.
Models can be automatically stored on a preferred storage medium (s3 bucket, google storage, etc...).

## Log Metrics
Log as many metrics from your processes! It improves visibility on their progress.
Use the Logger class from to report scalars and plots.
```python
from clearml import Logger
Logger.current_logger().report_scalar(graph='metric', series='variant', value=13.37, iteration=counter)
```

You can later analyze reported scalars
```python
from clearml import Task
executed_task = Task.get_task(task_id='aabbcc')
# get a summary of the min/max/last value of all reported scalars
min_max_vlues = executed_task.get_last_scalar_metrics()
# get detailed graphs of all scalars
full_scalars = executed_task.get_reported_scalars()
```

## Track Experiments
You can also search and query Tasks in the system.
Use the `Task.get_tasks` call to retrieve Tasks objects and filter based on the specific values of the Task - status, parameters, metrics and more!
```python
from clearml import Task
tasks = Task.get_tasks(project_name='examples', task_name='partial_name_match', task_filter={'status': 'in_progress'})
```

## Manage Your Data
Data is probably one of the biggest factors that determines the success of a project.
Associating the data a model used to the model's configuration, code and results (such as accuracy) is key to deducing meaningful insights into how
models behave. <br/>
[ClearML Data](../../clearml_data/clearml_data.md) allows you to version your data so it's never lost, fetch it from every machine with minimal code changes 
and associate data to experiments results.
Logging data can be done via command line, or via code. If any preprocessing code is involved, ClearML logs it as well!<br/> 
Once data is logged, it can be used by other experiments.

