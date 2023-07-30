---
title: TensorBoard
---

:::tip
If you are not already using ClearML, see [Getting Started](../getting_started/ds/ds_first_steps.md).
:::

[TensorBoard](https://www.tensorflow.org/tensorboard) is TensorFlow's data visualization toolkit. 
ClearML automatically captures all data logged to TensorBoard. All you have to do is add two
lines of code to your script:

```python
from clearml import Task
task = Task.init(task_name="<task_name>", project_name="<project_name>")
```

This will create a [ClearML Task](../fundamentals/task.md) that captures your script's information, including Git details,
uncommitted code, python environment, your TensorBoard plots, images, and metrics. 

View the TensorBoard visualizations in the [WebApp](../webapp/webapp_overview.md), in the experiment's **Plots** tab.

[//]: # (![Seaborn plot]&#40;../img/integrations_seaborn_plots.png&#41;)

View code example [here](https://github.com/allegroai/clearml/blob/master/examples/frameworks/matplotlib/matplotlib_example.py). 
