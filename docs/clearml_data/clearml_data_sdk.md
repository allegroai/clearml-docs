---
title: SDK
---


Datasets can be created, modified, and managed with ClearML Data's python interface. The following page provides an overview
of the basic methods of the `Dataset` module. See a detailed list of all methods in the [Dataset](../references/sdk/dataset.md) 
reference page.

First things first: import the `Dataset` module, and then we can get cracking :)

```python
from clearml import Dataset
```

## Dataset Creation 

ClearML Data supports multiple ways to create datasets programmatically, which provides for a variety of use-cases:
* [`Dataset.create()`](#datasetcreate) - Create a new dataset, parent datasets can be specified, from which the new dataset will inherit$$$
* [`Dataset.squash()`](#datasetsquash)  - Generate a new dataset from the squashed set of dataset versions

### Dataset.create()

Creating datasets programmatically is especially helpful when some preprocessing is done on raw data and we want to save 
preprocessing code as well as dataset in a single task.

```python
from clearml import Dataset

# Preprocessing code here

dataset = Dataset.create(dataset_name='dataset name',dataset_project='dataset project', parent_datasets=[PARENTS_DS_ID])
```

Parent datasets can be specified, and the new dataset inherits all of its parent's content. Multiple dataset parents can
be listed. Merging of parent datasets is done based on the list's order, where each parent can override overlapping files
in the previous parent dataset.

### Dataset.squash()

To improve deep dataset DAG storage and speed, dataset squashing was introduced. The `squash` method generates a new dataset 
from the squashed set of dataset versions, merging down all changes introduced in the DAG, creating a new flat version 
without parent datasets.

If a single version or a set of versions is provided, the method will squash into a single version.$$$

```python
# option 1 - list dataset IDs
squashed_dataset_1 = Dataset.squash(dataset_name='squashed dataset\'s name',
                         dataset_ids=[DS1_ID, DS2_ID, DS3_ID)

# option 2 - list project and dataset pairs 
squashed_dataset_2 = Dataset.squash(dataset_name='squashed dataset 2',
                         dataset_project_name_pairs=[('dataset1 project', 'dataset1 name'), ('dataset2 project', 'dataset2 name')]
                         )
```


## Accessing datasets
Once a dataset has been created and uploaded to a server, the dataset can be accessed programmatically from anywhere. 

Get a specific Dataset. If only dataset_project is given, return the last Dataset in the Dataset project

`Dataset.get()`

either readonly --link, or writable --copy

### Dataset.get(dataset_id=DS_ID).get_local_copy() 

will return the entire dataset (the zip file)()

Returns a path to dataset in cache, and downloads it if it is not already in cache.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|use_soft_links|If True, use soft links. Default: False on Windows, True on Posix systems|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|raise_on_error|If True, raise exception if dataset merging failed on any file|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|

<br/>

### Dataset.get(dataset_id=DS_ID).get_mutable_local_copy()

Downloads the dataset to a specific folder (non-cached). If the folder already has contents, specify whether to overwrite
its contents with the dataset contents.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|target_folder|Local target folder for the writable copy of the dataset|<img src="/docs/latest/icons/ico-optional-no.svg" className="icon size-md center-md" />|
|overwrite|If True, recursively delete the contents of the target folder before creating a copy of the dataset. If False (default) and target folder contains files, raise exception or return None|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|raise_on_error|If True, raise exception if dataset merging failed on any file|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|

<br/>


## Modify datasets

Adding / Removing files  

```python
dataset.add_files(path="path/to/folder")
```

Add files or folder into the current dataset.
Add a folder into the current dataset. calculate file hash, and compare against parent, mark files to be uploaded

**Parameters**

|Name|Description|Optional|
|---|---|---|
|path|Add a folder / file to the dataset|<img src="/docs/latest/icons/ico-optional-no.svg" className="icon size-md center-md" />|
|wildcard|Add only a specific set of files based on wildcard matching. Wildcard matching can be a single string or a list of wildcards, for example: `~/data/*.jpg`, `~/data/json`|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|local_base_folder|Files will be located based on their relative path from local_base_folder|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|dataset_path|Where in the dataset the folder / files should be located|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|recursive|If True, match all wildcard files recursively|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|


`Dataset.remove_files()`

Remove files from the current dataset

Parameters

dataset_path (Optional[str]) – Remove files from the dataset. The path is always relative to the dataset (e.g ‘folder/file.bin’)

recursive (bool) – If True match all wildcard files recursively


Return type

int

Returns

Number of files removed


<br/>

## Dataset.upload()

Start file uploading, the function returns when all files are uploaded.

Upload the dataset (use output_url to specify storage target such as S3/GS/Azure/Folder, default: file server)
**Parameters**

|Name|Description|Optional|
|---|---|---|
|show_progress|If True, show upload progress bar|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|verbose|If True, print verbose progress report|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
||Target storage for the compressed dataset (default: file server). Examples: `s3://bucket/data`, `gs://bucket/data` , `azure://bucket/data`, `/mnt/share/data` |<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|compression|Compression algorithm for the Zipped dataset file (default: ZIP_DEFLATED)|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|

<br/>

## Dataset.finalize()
Closes the dataset and marks it as *Completed*. After a dataset has been closed, it can no longer be modified.
Before closing a dataset, its files must first be uploaded.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|verbose|If True, print verbose progress report|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|raise_on_error|If True, raise exception if dataset finalizing failed|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|

## Folder Sync Mode
Dataset.sync_folder()
Useful in case there's a single point of truth, either a local or network folder that gets updated periodically, when using 
clearml-data sync and specifying parent dataset, the folder changes will be reflected in a new dataset version. This saves 
time manually updating (adding \ removing) files.

Folder sync mode
Folder sync mode updates dataset according to folder content changes.
Dataset.sync_folder()
sync_folder(local_path, dataset_path=None, verbose=False)

Synchronize the dataset with a local folder. The dataset is synchronized from the

relative_base_folder (default: dataset root)  and deeper with the specified local path.
Parameters

local_path (Union [ Path , _Path , str ] ) – Local folder to sync (assumes all files and recursive)

dataset_path (Union [ Path , _Path , str ] ) – Target dataset path to sync with (default the root of the dataset)


Return type

(int, int)

Returns

number of files removed, number of files modified/added


