---
title: Using Artifacts
---

The [using_artifacts_example](https://github.com/allegroai/clearml/blob/master/examples/reporting/using_artifacts_example.py) 
script demonstrates uploading a data file to a task as an artifact method and then accessing and utilizing the artifact in another task. 

## Task 1: Uploading an Artifact 


Uploads to the task a data file as an artifact using the [Task.upload_artifact](../../references/sdk/task.md#upload_artifact) inputting a name and file location
   ```python
    task1.upload_artifact(name='data file', artifact_object='data_samples/sample.json')
   ```

1. Closes the task in order to be able to initialize another task in the same script, using the [Task.close](../../references/sdk/task.md#close) method  

## Task 2: Accessing an Artifact
1. Creates a second task `use artifact from other task` associated with the `examples` project. 
1. Gets the first task and accesses its artifacts,  

## WebApp 

![Artifacts in WebApp](../../img/examples_using_artifacts_1.png)