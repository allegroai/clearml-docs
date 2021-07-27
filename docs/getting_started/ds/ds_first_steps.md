---
title: First Steps
---


## Install ClearML

First, [sign up for free](https://app.community.clear.ml)

Install the clearml python package:
```bash
pip install clearml
```

Connect your computer to the server by [creating credentials](https://app.community.clear.ml/profile), then run the below and follow the setup instructions:
```bash
clearml-init
```


## Auto-log experiment

In ClearML, experiments are organized as [Tasks](../../fundamentals/task). 

ClearML will automatically log your experiment and code once you integrate the ClearML [SDK](../../clearml_sdk.md) with your code.
At the begging of your code, import the clearml package 

```python
From clearml import Task
```

:::note
To ensure full automatic logging it is recommended to import the ClearML package at the top of your entry script.
:::

Then initialize the Task object in your `main()` function, or the beginning of the script.

```python
Task = Task.init(project_name=”great project”, task_name=”best experiment”)
```

Task name is not unique, it's possible to have multiple experiments with the same name.
If the project does not already exist, a new one will be created automatically.

The console should return the following output:

```
ClearML Task: created new task id=1ca59ef1f86d44bd81cb517d529d9e5a
2021-07-25 13:59:09
ClearML results page: https://community/projects/4043a1657f374e9298649c6ba72ad233/experiments/1ca59ef1f86d44bd81cb517d529d9e5a/output/log
2021-07-25 13:59:16
```

**That’s it!** You are done integrating ClearML with your code :)

Now, [command-line arguments](../../fundamentals/hyperparameters.md#argument-parser), [console output](../../fundamentals/logger#types-of-logged-results) as well as Tensorboard and Matplotlib will automatically be logged in the UI under the created Task.
<br/>

Sit back, relax, and watch your models converge :) or continue to see what else can be done with ClearML [here](ds_second_steps.md).
 