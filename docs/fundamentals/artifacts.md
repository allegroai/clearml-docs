---
title: Artifacts
---

Artifacts are the output files created by a task. ClearML uploads and logs these products, so they can later be easily 
accessed, modified, and used.

ClearML allows easy storage of experiment outputs as artifacts that can later be accessed and used, 
through the web UI or programmatically. 

ClearML provides methods to track files generated throughout your experiments' execution such as:
* Numpy objects
* Pandas DataFrames
* PIL
* Files and folders
* Python objects
* and more!

ClearML also logs experiments' input and output models as well as interim model snapshots (see [Models](models.md)).

## Logging Artifacts 
ClearML provides an explicit logging interface that supports manually reporting a variety of artifacts. Any type of 
artifact can be logged to a task using [`Task.upload_artifact()`](../references/sdk/task.md#upload_artifact). 
See more details in the [Artifacts Reporting example](../guides/reporting/artifacts.md).

ClearML can be configured to upload artifacts to any of the supported types of storage, which include local and shared 
folders, AWS S3 buckets, Google Cloud Storage, and Azure Storage. For more information, see [Storage](../integrations/storage.md). 

:::note Debug Sample Storage
Debug samples are handled differently, see [`Logger.set_default_upload_destination`](../references/sdk/logger.md#set_default_upload_destination).
:::

## Accessing Artifacts
Artifacts that have been logged can be accessed by other tasks [through the task](../clearml_sdk/task_sdk.md#accessing-tasks) 
they are attached to, and then retrieving the artifact with one of its following methods:
* `get_local_copy()` - caches the files for later use and returns a path to the cached file. 
* `get()` - use for Python objects. The method that returns the Python object.
   
See more details in the [Using Artifacts example](https://github.com/allegroai/clearml/blob/master/examples/reporting/using_artifacts_example.py).

## Models 
Models are a special kind of artifact and, unlike regular artifacts, which can only be accessed with the creating Task's ID,
Models are entities with their own unique ID that can be accessed directly or via the creating task.
