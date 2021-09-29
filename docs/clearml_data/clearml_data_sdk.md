---
title: SDK
---


Datasets can be created, modified, and managed with ClearML Data's python interface. The following page provides an overview
of the basic methods of the `Dataset` module. See a detailed list of all methods in the [Dataset](../references/sdk/dataset.md) 
reference page.

Import the `Dataset` module, and let's get started!

```python
from clearml import Dataset
```

## Create Datasets 

ClearML Data supports multiple ways to create datasets programmatically, which provides for a variety of use-cases:
* [`Dataset.create()`](#datasetcreate) - Create a new dataset. Parent datasets can be specified, from which the new dataset 
  will inherit its data
* [`Dataset.squash()`](#datasetsquash)  - Generate a new dataset from the squashed set of dataset versions

### Dataset.create()

Use the [`Dataset.create`](../references/sdk/dataset.md#datasetcreate) class method to create a dataset.

Creating datasets programmatically is especially helpful when data preprocessing is done and then the 
preprocessing code and the dataset can be saved in a single task (see `use_current_task` parameter in [`Dataset.create`](../references/sdk/dataset.md#datasetcreate)).  

```python

# Preprocessing code here

dataset = Dataset.create(dataset_name='dataset name',
                         dataset_project='dataset project', 
                         parent_datasets=[PARENT_DS_ID_1, PARENT_DS_ID_2])
```

The dataset which is created inherits the content of the `parent_datasets`. Multiple dataset parents can
be listed. Merging of parent datasets into the new dataset is done based on the list's order, where each parent 
overrides overlapping files from the previous parent dataset.

### Dataset.squash()

To improve deep dataset DAG storage and speed, dataset squashing was introduced. The [`Dataset.squash`](../references/sdk/dataset.md#datasetsquash) 
class method generates a new dataset from the squashed set of dataset versions, merging down all changes introduced in 
the DAG, creating a new flat version without parent datasets.

The datasets being squashed into a single dataset can be listed by their IDs or by project & name pairs. 

```python
# option 1 - list dataset IDs
squashed_dataset_1 = Dataset.squash(dataset_name='squashed dataset\'s name',
                         dataset_ids=[DS1_ID, DS2_ID, DS3_ID)

# option 2 - list project and dataset pairs 
squashed_dataset_2 = Dataset.squash(dataset_name='squashed dataset 2',
                         dataset_project_name_pairs=[('dataset1 project', 'dataset1 name'), 
                                                     ('dataset2 project', 'dataset2 name')]
                         )
```

In addition, the target storage of the compressed dataset can be specified using the `output_url` parameter of [`Dataset.squash`](../references/sdk/dataset.md#datasetsquash).

## Access Datasets
Once a dataset has been created and uploaded to a server, the dataset can be accessed programmatically from anywhere. 

Use the [`Dataset.get`](../references/sdk/dataset.md#datasetget) class method to access a specific Dataset object, either 
with the dataset's ID or with its project and name. If only a project name or tag is provided, the method returns the 
most recent dataset in the specified project, or the most recent dataset with the specified tag.

Once a specific dataset object has been accessed, get a local copy of the dataset using one of the following options:
* [`Dataset.get_local_copy()`](../references/sdk/dataset.md#get_local_copy) - get a read-only local copy of an entire dataset. 
  This method returns a path to the dataset in cache, and it downloads the dataset if it is not already in cache
* [`Dataset.get_mutable_local_copy()`](../references/sdk/dataset.md#get_mutable_local_copy) - get a writable local copy 
of an entire dataset. This method downloads the dataset to a specific folder (non-cached), specified with the `target_folder` parameter. If 
the specified folder already has contents, specify whether to overwrite its contents with the dataset contents, using the `overwrite` parameter.

## Modify Datasets

Once a dataset has been created, users can add and remove files from it using the [`Dataset.add_files`](#add_files) 
and [`Dataset.remove_files`](#remove_files) methods respectively. 

### add_files()

To add files or folders into the current dataset, use the [`Dataset.add_files`](../references/sdk/dataset.md#add_files) 
method.  

```python
dataset = Dataset.create()
dataset.add_files(path="path/to/folder_or_file")
```

There is an option to add a set of files based on wildcard matching of a single string or a list of strings, using the 
`wildcard` parameter. Specify whether to match the wildcard files recursively using the `recursive` parameter.

For example:

```python
dataset.add_files(path="path/to/folder",
                  wildcard="~/data/*.jpg",
                  recursive=True)
```
 
### remove_files()
To remove files from a current dataset, use the [`Dataset.remove_files`](../references/sdk/dataset.md#remove_files) method.
Input the path to the folder or file to be removed in the `dataset_path` parameter. The path is relative to the dataset. 

There is also an option to input a wildcard into `dataset_path` in order to remove a set of files matching the wildcard. 
Set the `recursive` parameter to `True` in order to match all wildcard files recursively

For example:

```python
dataset.remove_files(dataset_path="*.csv", 
                     recursive=True)
```

## Upload Files

To upload the dataset files for storage, use the [`Dataset.upload`](../references/sdk/dataset.md#upload) method. 
Use the `output_url` parameter to specify storage target, such as S3 / GS / Azure / local folder (e.g. `s3://bucket/data`, `gs://bucket/data`, `azure://bucket/data` , `/mnt/share/data`). 
By default, the dataset uploads to ClearML's file server. 

Dataset files must be uploaded before a dataset is [finalized](#finalize-dataset). 


## Finalize Dataset

Use the [`Dataset.finalize`](../references/sdk/dataset.md#finalize) method to close the current dataset. This marks the 
dataset as *Completed*, at which point, the dataset can no longer be modified. 

Before closing a dataset, its files must first be [uploaded](#upload-files).


## Sync Local Folder

Use the [`Dataset.sync_folder`](../references/sdk/dataset.md#sync_folder) method in order to update a dataset according
to a specific folder's content changes. Specify the folder to sync with the `local_path` parameter (the method assumes all files within the folder and recursive). 

This method is useful in the case where there's a single point of truth, either a local or network folder, that gets updated periodically. 
The folder changes will be reflected in a new dataset version. This method saves time since you don't have to manually 
update (add / remove) files in a dataset.
