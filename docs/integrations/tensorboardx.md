---
title: TensorboardX
---

:::tip
If you are not already using ClearML, see [Getting Started](../getting_started/ds/ds_first_steps.md).
:::

[TensorboardX](https://tensorboardx.readthedocs.io/en/latest/tutorial.html#what-is-tensorboard-x) is a data 
visualization toolkit to log information through PyTorch and visualize it through [TensorBoard](https://www.tensorflow.org/tensorboard). 
ClearML automatically captures all data logged to TensorboardX, including scalars, images, video, plots, and text. All you have 
to do is add two lines of code to your script:

```python
from clearml import Task
task = Task.init(task_name="<task_name>", project_name="<project_name>")
```

This will create a [ClearML Task](../fundamentals/task.md) that captures your script's information, including Git details,
uncommitted code, python environment, your TensorboardX metrics, plots, images, and text. 

View the TensorboardX outputs in the [WebApp](../webapp/webapp_overview.md), in the experiment's page.

![TensorboardX WebApp scalars](../img/examples_pytorch_tensorboardx_03.png)

## Manual Logging
To augment its automatic logging, ClearML also provides an explicit logging interface.

See more information about explicitly logging information to a ClearML Task:
* [Models](../clearml_sdk/model_sdk.md#manually-logging-models)
* [Configuration](../clearml_sdk/task_sdk.md#configuration) (e.g. parameters, configuration files)
* [Artifacts](../clearml_sdk/task_sdk.md#artifacts) (e.g. output files or python objects created by a task)
* [Scalars](../clearml_sdk/task_sdk.md#scalars) 
* [Text/Plots/Debug Samples](../fundamentals/logger.md#manual-reporting)

### Examples

Take a look at ClearML’s TensorboardX examples: 

* [TensorboardX with PyTorch](../guides/frameworks/tensorboardx/tensorboardx.md) - Demonstrates ClearML logging TensorboardX scalars, debug 
  samples, and text in code using PyTorch
* [MegEngine MNIST](../guides/frameworks/megengine/megengine_mnist.md) - Demonstrates ClearML logging TensorboardX scalars in code using MegEngine
* [TensorboardX Video](../guides/frameworks/tensorboardx/video_tensorboardx.md) - Demonstrates ClearML logging TensorBoardX video data. 
