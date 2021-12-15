---
title: AutoKeras Integration
---
Integrate **ClearML** into code that uses [autokeras](https://github.com/keras-team/autokeras). Initialize a **ClearML** 
Task in a code, and **ClearML** automatically logs scalars, plots, and images reported to TensorBoard, Matplotlib, Plotly, 
and Seaborn, and all other automatic logging, and explicit reporting added to the code (see [Logging](../../../fundamentals/logger.md)).

**ClearML** allows to:

* Visualize experiment results in the **ClearML Web UI**.
* Track and upload models.
* Track model performance and create tracking leaderboards.
* Rerun experiments, reproduce experiments on any target machine, and tune experiments.
* Compare experiments.

See the [AutoKeras](autokeras_imdb_example.md) example, which shows **ClearML** automatically logging: 
* Scalars
* Hyperparameters
* The console log 
* Models. 

Once these are logged, they can be visualized in the **ClearML Web UI**.
 
:::note
If you are not already using **ClearML**, see [Getting Started](/getting_started/ds/best_practices.md).
:::

## Adding ClearML to Code

Add two lines of code:
```python
from clearml import Task
task = Task.init(project_name="myProject", task_name="myExperiment")
```

When the code runs, it initializes a Task in **ClearML Server**. A hyperlink to the experiment's log is output to the console.

    CLEARML Task: created new task id=c1f1dc6cf2ee4ec88cd1f6184344ca4e
    CLEARML results page: https://app.community.clear.ml/projects/1c7a45633c554b8294fa6dcc3b1f2d4d/experiments/c1f1dc6cf2ee4ec88cd1f6184344ca4e/output/log

Later in the code, define callbacks using TensorBoard, and **ClearML** logs TensorBoard scalars, histograms, and images.