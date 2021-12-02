---
title: Tasks
---
 
Hyper-Datasets extend the **ClearML** [**Task**](../fundamentals/task.md) with [Dataviews](dataviews.md)

## Usage 

Hyper-Datasets are supported by the `allegroai` python package.

### Connecting Dataviews to a Task

Use [`Task.connect`](../references/sdk/task.md#connect) to connect a Dataview object to a Task: 

```python
from allegroai import DataView, Task

task = Task.init(project_name='examples', task_name='my task')
dataview = DataView()
task.connect(dataview)
```

### Accessing a Task's Dataviews

Use the `Task.get_dataviews` method to access the Dataviews that are connected to a Task. 

```python
task.get_dataviews()
```

This returns a dictionary of Dataview objects and their names.
        
