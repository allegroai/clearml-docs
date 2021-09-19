---
title: Best Practices
---

Use ClearML Data to version and manage your data. 

The following are recommendations for practices for ClearML Data usage. 

## Make Datasets Machine-Agnostic 

Store original dataset in a shared storage location (e.g. shared-folder/S3/Gs/Azure). 

ClearML Data supports efficient Dataset storage and caching, differentiable & compressed.  Use ClearML Data to store 
data in a central location that you and your teammates can easily access and utilize anywhere

## Version Datasets

Use ClearML Data to version datasets. After creating and populating datasets, they can be finalized. Once finalized,
the dataset can no longer be modified. This way the dataset is reproducible and it is clear which version of the data was used
in certain contexts. 

Once you have additional data, you can create a new version of the dataset and specify the previous dataset as a parent. 
This way, the new dataset version inherits the previous version's contents and the dataset's contents can be updated. 

### Manage Datasets 

Arrange datasets in "topics" or use-cases in projects

When creating a dataset, the dataset creates an individual task (unless otherwise specified). Datasets can be organized
in projects and sub-projects by use case. Another tool available for organizing datasets are tags. When creating a dataset, 
add labels to the dataset, which will make searching for the dataset easier.

Arranging and organizing datasets according to use cases and using tag makes managing multiple datasets easier.

## Accessing Datasets
Organizing the dataset will make it easier to access datasets. 

Specific individual datasets can be accessed with their ID or a name & project combination. 
If only a project is specified, the `get` method returns the most recent dataset in a project. The same is true with tags; 
if only a tag is specified with the `get` method, the method will return the most recent dataset labeled with that tag.

With ClearML, you easily access the most recent datasets from a specific project or the most recent projects with a specific
tag or combination of tags. Use the `Dataset.get` to get a specific Dataset. If only `dataset_project` is input, the method 
returns the most recent Dataset in the Dataset project. 

## Adding Statistics to Datasets 
(i.e. reporting some metrics/stats on the Datasets with the Logger)

Users can report statistics metrics and debug samples on the Dataset itself. Use the [`get_logger`](../references/sdk/dataset.md#get_logger)
method to access the dataset's logger object, then feel free to log a bunch of data to the dataset, using the methods
available through the [logger](../references/sdk/logger.md) object

plus you can add some metric reporting (like table reporting) to create a preview of the data stored for better visibility, or maybe create some statistics as part of the data ingest script. 

you can use logger's [`report_table`](../references/sdk/logger.md#report_table) method

### Deal with Periodic Data Modifications   

Your dataset probably changes periodically, with more data coming in, fixes being introduced. If the data is updated into the same 
folder structure, which serves as a dataset's single point of truth, you can schedule a script which uses the dataset sync 
functionality which will update a dataset based on a folder . This will track 
the modifications made to a folder.


## Link versions to running experiments for easy reproduction

In `Dataset.create` there is the method `use_current_task` (bool) – False (default), a new Dataset task is created. If True, the dataset is created on the current Task.

