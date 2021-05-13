---
title: ClearML SDK
---

The **ClearML Python Package** supports the [automatic logging](fundamentals/logger.md#automatic-reporting) 
that documents the experiment for you, and an extensive set of powerful features and functionality you can use to improve experimentation, other workflows, and get more out of **ClearML**. 

The **ClearML Python Package** collects data from scripts including the Git repository (branch, commit ID, and uncommitted changes), working directory and entry point, hyperparameters, initial weights model, model snapshots (checkpoints), output model, other artifacts, metrics, logs, other reported data (from libraries and visualization toolkits), and debug samples. 

In conjunction with the **ClearML Hosted Service** (or self-hosted **ClearML Server**) and **ClearML Agent**, the **ClearML Python Package** allows you and your teammates to collaborate programmatically and using the **ClearML Web UI**.

## Modules

* [Task](references/sdk/task.md) - The `task` module contains the `task.Task` class which is the code template for all `Task` features and functionality, including collecting data from scripts, storing that data in a `Task` object, automatic bindings with frameworks (TensorFlow/TensorBoard, PyTorch, Keras, Fastai, scikit-learn), libraries (Pandas, Plotly, AutoKeras), and visualization tools (Matplotlib, Seaborn), and a robust set of methods for Task execution, cloning, connecting parameter dictionaries, configurations, models, working with storage, and more.

* [Logger](references/sdk/logger.md) - The `logger` module contains the `logger.Logger` class which is the **ClearML** console log and metric statistics interface, and contains methods for explicit reporting, setting an upload destination in storage for debug samples, logger cache control, and TensorBoard support in addition to **ClearML** automatic TensorBoard logging.

* [Model](references/sdk/model_model.md) - The `model` module contains three classes: `model.Model` which represents an existing model in **ClearML** that can be loaded and connected to a Task, `model.InputModel` which represents an existing model that you can load into **ClearML**, and `model.OutputModel` which represents the experiment output model that is always connected to the Task.

* [Automation](references/sdk/automation_controller_pipelinecontroller.md) - The `automation` module contains classes supporting hyperparameter optimization, including Optuna, HpBandSter, grid searching, random searching, you own customized search strategies, and resource budgeting for searches; the AWS autoscaler; pipeline controllers; and Task monitoring.  

* [StorageManager](references/sdk/storage.md) - The `storage` module contains the `storage.manager.StorageManager` class which provides support for downloading and uploading from storage, including folders, S3, Google Cloud Storage, Azure Storage, and http(s).

* [Dataset](references/sdk/dataset) - The `dataset` module contains classes that helps manage Dataset. Users can create, modify and delete datasets as well as retrieve them for use in their code

## Examples 

**ClearML** example scripts in the [examples folder](https://github.com/allegroai/clearml/tree/master/examples) of the `clearml` GitHub repository. They are pre-loaded in the **ClearML Hosted Service**, and can be viewed, cloned, and edited in the  **ClearML Web UI**, `ClearML Examples` project. The examples are each explained in this documentation's [examples section](guides/main.md). 

