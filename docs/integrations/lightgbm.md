---
title: LightGBM 
---

:::tip
If you are not already using ClearML, see [Getting Started](../getting_started/ds/ds_first_steps.md) for setup 
instructions.
:::

ClearML integrates seamlessly with [LightGBM](https://github.com/microsoft/LightGBM), automatically logging its models, 
metric plots, and parameters. 

All you have to do is simply add two lines of code to your LightGBM script:

```python
from clearml import Task
task = Task.init(task_name="<task_name>", project_name="<project_name>")
```

And that’s it! This creates a [ClearML Task](../fundamentals/task.md) which captures: 
* Source code and uncommitted changes
* Installed packages
* LightGBM model files 
* Configuration applied to LightGBM (parameters)
* LightGBM metric plots 
* Console output
* General details such as machine details, runtime, creation date etc.
* And more

You can view all the task details in the [WebApp](../webapp/webapp_exp_track_visual.md). 

See an example of LightGBM and ClearML in action [here](../guides/frameworks/lightgbm/lightgbm_example.md).

![Experiment scalars](../img/examples_lightgbm_scalars.png)

## Automatic Logging Control 
By default, when ClearML is integrated into your LightGBM script, it captures models, metric plots, and configuration. 
But, you may want to have more control over what your experiment logs.

To control a task's framework logging, use the `auto_connect_frameworks` parameter of [`Task.init()`](../references/sdk/task.md#taskinit). 
Completely disable all automatic logging by setting the parameter to `False`. For finer grained control of logged 
frameworks, input a dictionary, with framework-boolean pairs.

For example:

```python
auto_connect_frameworks={
   'lightgbm': False, 'catboost': False, 'tensorflow': False, 'tensorboard': False, 
   'xgboost': False, 'scikit': True, 'fastai': True, 'pytorch': True,
   'hydra': True, 'detect_repository': True, 'tfdefines': True, 'joblib': True,
   'megengine': True, 'jsonargparse': True
}
```

You can also input wildcards as dictionary values, so ClearML will log a model created by a framework only if its local 
path matches at least one wildcard. 

For example, in the code below, ClearML will log LightGBM models only if their paths have the `.pt` extension. The 
unspecified frameworks' values default to true so all their models are automatically logged.

```python
auto_connect_frameworks={'lightgbm' : '*.pt'}
```

## Manual Logging
To augment its automatic logging, ClearML also provides an explicit logging interface.

See more information about explicitly logging information to a ClearML Task:
* [Models](../clearml_sdk/model_sdk.md#manually-logging-models)
* [Configuration](../clearml_sdk/task_sdk.md#configuration) (e.g. parameters, configuration files)
* [Artifacts](../clearml_sdk/task_sdk.md#artifacts) (e.g. output files or python objects created by a task)
* [Scalars](../clearml_sdk/task_sdk.md#scalars) 
* [Text/Plots/Debug Samples](../fundamentals/logger.md#manual-reporting)

See [Explicit Reporting Tutorial](../guides/reporting/explicit_reporting.md).

## Remote Execution
ClearML logs all the information required to reproduce an experiment on a different machine (installed packages, 
uncommitted changes etc.). The [ClearML Agent](../clearml_agent) listens to designated queues and when a task is enqueued, 
the agent pulls it, recreates its execution environment, and runs it, reporting its scalars, plots, etc. to the 
experiment manager.

Deploy a ClearML Agent onto any machine (e.g. a cloud VM, a local GPU machine, your own laptop) by simply running the 
following command on it:

```commandline
clearml-agent daemon --queue <queues_to_listen_to> [--docker]
```

Use the ClearML [Autoscalers](../cloud_autoscaling/autoscaling_overview.md) to help you manage cloud workloads in the 
cloud of your choice (AWS, GCP, Azure) and automatically deploy ClearML agents: the autoscaler automatically spins up 
and shuts down instances as needed, according to a resource budget that you set.

### Cloning, Editing, and Enqueuing

![Cloning, editing, enqueuing gif](../img/gif/integrations_yolov5.gif)

Use ClearML's web interface to edit task details, like configuration parameters or input models, then execute the task 
with the new configuration on a remote machine:

* Clone the experiment
* Edit the hyperparameters and/or other details
* Enqueue the task

The ClearML Agent executing the task will use the new values to [override any hard coded values](../clearml_agent).

### Executing a Task Remotely

You can set a task to be executed remotely programmatically by adding [`Task.execute_remotely()`](../references/sdk/task.md#execute_remotely) 
to your script. This method stops the current local execution of the task, and then enqueues it to a specified queue to 
re-run it on a remote machine.

```python
# If executed locally, process will terminate, and a copy will be executed by an agent instead
task.execute_remotely(queue_name='default', exit_process=True)
```

## Hyperparameter Optimization
Use ClearML’s [`HyperParameterOptimizer`](../references/sdk/hpo_optimization_hyperparameteroptimizer.md) class to find 
the hyperparameter values that yield the best performing models. See [Hyperparameter Optimization](../fundamentals/hpo.md) 
for more information.
