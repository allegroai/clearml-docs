---
title: SDK
---

:::important
This page covers `clearml-data`, ClearML's file-based data management solution.
See [Hyper-Datasets](../hyperdatasets/overview.md) for ClearML's advanced queryable dataset management solution.
:::

Datasets can be created, modified, and managed with ClearML Data's python interface. The following page provides an overview
for using the most basic methods of the `Dataset` class. See the [Dataset reference page](../references/sdk/dataset.md) 
for a complete list of available methods.

Import the `Dataset` class, and let's get started!

```python
from clearml import Dataset
```

## Creating Datasets 

ClearML Data supports multiple ways to create datasets programmatically, which provides for a variety of use-cases:
* [`Dataset.create()`](#datasetcreate) - Create a new dataset. Parent datasets can be specified, from which the new dataset 
  will inherit its data
* [`Dataset.squash()`](#datasetsquash)  - Generate a new dataset from by squashing together a set of related datasets

### Dataset.create()

Use the [`Dataset.create`](../references/sdk/dataset.md#datasetcreate) class method to create a dataset.

Creating datasets programmatically is especially helpful when preprocessing the data so that the 
preprocessing code and the resulting dataset are saved in a single task (see `use_current_task` parameter in [`Dataset.create`](../references/sdk/dataset.md#datasetcreate)).  

```python
# Preprocessing code here
dataset = Dataset.create(
  dataset_name='dataset name',
  dataset_project='dataset project', 
  parent_datasets=[PARENT_DS_ID_1, PARENT_DS_ID_2],
  dataset_version="1.0",
  output_uri="gs://bucket-name/folder"	
)
```

:::tip Locating Dataset ID
For datasets created with `clearml` v1.6 or newer on ClearML Server v1.6 or newer, find the ID in the dataset version’s info panel in the [Dataset UI](../webapp/datasets/webapp_dataset_viewing.md).  
For datasets created with earlier versions of `clearml`, or if using an earlier version of ClearML Server, find the ID in the task header of the [dataset task's info panel](../webapp/webapp_exp_track_visual.md).  
:::

Use the `output_uri` parameter to specify a network storage target to upload the dataset files, and associated information 
(such as previews) to (e.g. `s3://bucket/data`, `gs://bucket/data`, `azure://bucket/data`, `file:///mnt/share/data`). 
By default, the dataset uploads to ClearML's file server. The `output_uri` parameter of the [`Dataset.upload`](#uploading-files)
method overrides this parameter’s value.

The created dataset inherits the content of the `parent_datasets`. When multiple dataset parents are listed, 
they are merged in order of specification. Each parent overrides any overlapping files from a previous parent dataset.

### Dataset.squash()

To improve deep dataset DAG storage and speed, dataset squashing was introduced. The [`Dataset.squash`](../references/sdk/dataset.md#datasetsquash) 
class method generates a new dataset by squashing a set of dataset versions, and merging down all changes introduced in 
their lineage DAG, creating a new, flat, independent version.

The datasets being squashed into a single dataset can be specified by their IDs or by project & name pairs. 

```python
# option 1 - list dataset IDs
squashed_dataset_1 = Dataset.squash(
  dataset_name='squashed dataset\'s name',
  dataset_ids=[DS1_ID, DS2_ID, DS3_ID]
)

# option 2 - list project and dataset pairs 
squashed_dataset_2 = Dataset.squash(
  dataset_name='squashed dataset 2',
  dataset_project_name_pairs=[('dataset1 project', 'dataset1 name'), 
                              ('dataset2 project', 'dataset2 name')]
)
```

In addition, the target storage location for the squashed dataset can be specified using the `output_uri` parameter of the 
[`Dataset.squash`](../references/sdk/dataset.md#datasetsquash) method.

## Accessing Datasets
Once a dataset has been created and uploaded to a server, the dataset can be accessed programmatically from anywhere. 

Use the [`Dataset.get`](../references/sdk/dataset.md#datasetget) class method to access a specific Dataset object, by 
providing any of the dataset’s following attributes: dataset ID, project, name, tags, and or version. If multiple 
datasets match the query, the most recent one is returned.

```python
dataset = Dataset.get(
        dataset_id=None,  
        dataset_project="Example Project",
        dataset_name="Example Dataset",
        dataset_tags="my tag",
        dataset_version="1.2",
        only_completed=True, 
        only_published=False, 
)
```

Pass `auto_create=True`, and a dataset will be created on-the-fly with the input attributes (project name, dataset name, 
and tags) if no datasets match the query. 

In cases where you use a dataset in a task (e.g. consuming a dataset), you can have its ID stored in the task’s hyper 
parameters: pass `alias=<dataset_alias_string>`, and the task using the dataset will store the dataset’s ID in the 
`dataset_alias_string` parameter under the `Datasets` hyper parameters section. This way you can easily track which 
dataset the task is using. If you use `alias` with `overridable=True`, you can override the dataset ID from the UI’s 
**CONFIGURATION > HYPER PARAMETERS >** `Datasets` section, allowing you to change the dataset used when running a task 
remotely. 

In case you want to get a modifiable dataset, you can get a newly created mutable dataset with the current one as its 
parent, by passing `writable_copy=True`.

Once a specific dataset object has been obtained, get a local copy of the dataset using one of the following options:
* [`Dataset.get_local_copy()`](../references/sdk/dataset.md#get_local_copy) - get a read-only local copy of an entire dataset. 
  This method returns a path to the dataset in local cache (downloading the dataset if it is not already in cache).
* [`Dataset.get_mutable_local_copy()`](../references/sdk/dataset.md#get_mutable_local_copy) - get a writable local copy 
of an entire dataset. This method downloads the dataset to a specific folder (non-cached), specified with the `target_folder` parameter. If 
the specified folder already has contents, specify whether to overwrite its contents with the dataset contents, using the `overwrite` parameter.

ClearML supports parallel downloading of datasets. Use the `max_workers` parameter of the `Dataset.get_local_copy` or 
`Dataset.get_mutable_copy` methods to specify the number of threads to use when downloading the dataset. By default, it’s 
the number of your machine’s logical cores.

## Modifying Datasets

Once a dataset has been created, its contents can be modified and replaced. When your data is changed, you can 
add updated files or remove unnecessary files. 

### add_files()

To add local files or folders into the current dataset, use the [`Dataset.add_files`](../references/sdk/dataset.md#add_files) 
method. 

If a file is already in a dataset, but it has been modified, it can be added again, and ClearML will 
upload the file diff.

```python
dataset = Dataset.create()
dataset.add_files(path="path/to/folder_or_file")
```

There is an option to add a set of files based on wildcard matching of a single string or a list of strings, using the 
`wildcard` parameter. Specify whether to match the wildcard files recursively using the `recursive` parameter.

For example:

```python
dataset.add_files(
  path="path/to/folder",
  wildcard="~/data/*.jpg",
  recursive=True
)
```
 
### add_external_files()

To add files or folders to the current dataset, leaving them in their original location, use the [`Dataset.add_external_files`](../references/sdk/dataset.md#add_external_files) 
method. Input the `source_url` argument, which can be a link from cloud storage (`s3://`, `gs://`, `azure://`) 
or local / network storage (`file://`). 

```python
dataset = Dataset.create()
dataset.add_external_files(
  source_url="s3://my/bucket/path_to_folder_or_file", 
  dataset_path="/my_dataset/new_folder/"
) 
```

There is an option to add a set of files based on wildcard matching of a single string or a list of wildcards, using the 
`wildcard` parameter. Specify whether to match the wildcard files recursively using the `recursive` parameter.

```python
# Add all jpg files located in s3 bucket called "my_bucket" to the dataset:
dataset.add_external_files(
  source_url="s3://my/bucket/", 
  wildcard = "*.jpg",
  dataset_path="/my_dataset/new_folder/"
)
```

### remove_files()
To remove files from a current dataset, use the [`Dataset.remove_files`](../references/sdk/dataset.md#remove_files) method.
Input the path to the folder or file to be removed in the `dataset_path` parameter. The path is relative to the dataset.
To remove links, specify their URL (e.g. `s3://bucket/file`).

There is also an option to input a wildcard into `dataset_path` in order to remove a set of files matching the wildcard. 
Set the `recursive` parameter to `True` in order to match all wildcard files recursively

For example:

```python
dataset.remove_files(dataset_path="*.csv", recursive=True)
```

## Uploading Files

To upload the dataset files to network storage, use the [`Dataset.upload`](../references/sdk/dataset.md#upload) method. 

Use the `output_url` parameter to specify storage target, such as S3 / GS / Azure (e.g. `s3://bucket/data`, `gs://bucket/data`, `azure://bucket/data` , `/mnt/share/data`). 
By default, the dataset uploads to ClearML's file server. This target storage overrides the `output_uri` value of the 
[`Dataset.create`](#creating-datasets) method.    

ClearML supports parallel uploading of datasets. Use the `max_workers` parameter to specify the number of threads to use 
when uploading the dataset. By default, it’s the number of your machine’s logical cores.

Dataset files must be uploaded before a dataset is [finalized](#finalizing-a-dataset). 


## Finalizing a Dataset

Use the [`Dataset.finalize`](../references/sdk/dataset.md#finalize) method to close the current dataset. This marks the 
dataset task as *Completed*, at which point, the dataset can no longer be modified. 

Before closing a dataset, its files must first be [uploaded](#uploading-files).


## Syncing Local Storage

Use the [`Dataset.sync_folder`](../references/sdk/dataset.md#sync_folder) method in order to update a dataset according
to a specific folder's content changes. Specify the folder to sync with the `local_path` parameter (the method assumes all files within the folder and recursive). 

This method is useful in the case where there's a single point of truth, either a local or network folder, that gets updated periodically. 
The folder changes will be reflected in a new dataset version. This method saves time since you don't have to manually 
update (add / remove) files in a dataset.

## Deleting Datasets
Delete a dataset using the [`Dataset.delete`](../references/sdk/dataset.md#datasetdelete) class method. Input any of the 
attributes of the dataset(s) you want to delete, including ID, project name, version, and/or dataset name. Multiple 
datasets matching the query will raise an exception, unless you pass `entire_dataset=True` and `force=True`. In this 
case, all matching datasets will be deleted. 

If a dataset is a parent to a dataset(s), you must pass `force=True` in order to delete it. 

:::warning
Deleting a parent dataset may cause child datasets to lose data!
:::


```python
Dataset.delete(
  dataset_id=None,
  dataset_project="example project",
  dataset_name="example dataset", 
  force=False,  
  dataset_version="3.0",
  entire_dataset=False
) 
``` 

## Renaming Datasets
Rename a dataset using the [`Dataset.rename`](../references/sdk/dataset.md#datasetrename) class method. All the datasets 
with the given `dataset_project` and `dataset_name` will be renamed.  

```python
Dataset.rename(
  new_dataset_name="New name",
  dataset_project="Example project", 
  dataset_name="Example dataset",  
)
```

## Moving Datasets to Another Project
Move a dataset to another project using the [`Dataset.move_to_project`](../references/sdk/dataset.md#datasetmove_to_projetc) 
class method. All the datasets with the given `dataset_project` and `dataset_name` will be moved to the new dataset 
project. 

```python
Dataset.move_to_project(
  new_dataset_project="New project",
  dataset_project="Example project", 
  dataset_name="Example dataset",  
)
```

