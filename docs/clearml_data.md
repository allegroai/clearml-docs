---
title: ClearML Data
---

In Machine Learning, you are very likely dealing with a gargantuan amount of data that you need to put in a dataset,
which you then need to be able to share, reproduce, and track.

ClearML Data Management solves two important challenges:
- Accessibility - Making data easily accessible from every machine,
- Versioning - Linking data and experiments for better **traceability**.

**We believe Data is not code**. It should not be stored in a git tree, because progress on datasets is not always linear.
Moreover, it can be difficult and inefficient to find on a git tree the commit associated with a certain version of a dataset.

A `clearml-data` dataset is a collection of files, stored on a central storage location (S3 / GS / Azure / Network Storage).
Datasets can be set up to inherit from other datasets, so data lineages can be created,
and users can track when and how their data changes.

Dataset changes are stored using differentiable storage, meaning a version will store the change-set from its previous dataset parents.

Local copies of datasets are always cached, so the same data never needs to be downloaded twice.
When a dataset is pulled it will automatically pull all parent datasets and merge them into one output folder for you to work with.

ClearML Data offers two interfaces:
- `clearml-data` - CLI utility for creating, uploading, and managing datasets.
- `clearml.Dataset` - A python interface for creating, retrieving, managing, and using datasets.

## Setup

`clearml-data` comes built-in with our `clearml` python package! Just check out the [getting started](getting_started/ds/ds_first_steps.md) guide for more info!

## Workflow 
Below is an example of a workflow using ClearML Data's command line tool to create a dataset and inegrating the dataset into code
using ClearML Data's python interface. 

### Creating a Dataset

Using the `clearml-data` CLI, users can create datasets using the following commands:
```bash
clearml-data create --project dataset_example --name initial_version
clearml-data add --files data_folder
clearml-data close
```

The commands will do the following:

1. Start a Data Processing Task called "initial_version" in the "dataset_example" project

1. The CLI will return a unique ID for the dataset

1. All the files from the "data_folder" folder will be added to the dataset and uploaded
by default to the [ClearML server](deploying_clearml/clearml_server.md).
   
1. The dataset will be finalized, making it immutable and ready to be consumed. 

:::note
`clearml-data` is stateful and remembers the last created dataset so there's no need to specify a specific dataset ID unless
we want to work on another dataset.
:::

### Using a Dataset
Now in our python code, we can access and use the created dataset from anywhere:

```python
from clearml import Dataset

local_path = Dataset.get(dataset_id='dataset_id_from_previous_command').get_local_copy()
```

We have all our files in the same folder structure under `local_path`, it is that simple!<br/>

The next step is to set the dataset_id as a parameter for our code and voilà! We can now train on any dataset we have in
the system.

## CLI Options

It's possible to manage datasets (create / modify / upload / delete) with the `clearml-data` command line tool.

### Creating a Dataset
```bash
clearml-data create --project <project_name> --name <dataset_name> --parents <existing_dataset_id>`
```
Creates a new dataset. <br/>

**Parameters**

|Name|Description|Optional|
|---|---|---|
|name |Dataset's name| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|project|Dataset's project| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|parents|IDs of the dataset's parents. The dataset inherits all of its parents' content. Multiple parents can be entered, but they are merged in the order they were entered| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|tags |Dataset user tags. The dataset can be labeled, which can be useful for organizing datasets| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

:::important
clearml-data works in a stateful mode so once a new dataset is created, the following commands
do not require the `--id` flag.
:::

<br/>

### Add Files
```bash
clearml-data add --id <dataset_id> --files <filenames/folders_to_add>
```
It's possible to add individual files or complete folders.<br/>

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id | Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|files|Files / folders to add. Wildcard selection is supported, for example: `~/data/*.jpg ~/data/json` | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|dataset-folder | Dataset base folder to add the files to in the dataset. Default: dataset root| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|non-recursive | Disable recursive scan of files | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|verbose | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

<br/>

### Remove Files
```bash
clearml-data remove --id <dataset_id_to_remove_from> --files <filenames/folders_to_remove>
```

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id | Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|files |  Files / folders to remove (wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`). Notice: file path is the path within the dataset, not the local path.| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|non-recursive | Disable recursive scan of files | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|verbose | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

<br/>

### Upload Dataset Content
```bash
clearml-data upload [--id <dataset_id>] [--storage <upload_destination>]
```
Uploads added files to [ClearML Server](deploying_clearml/clearml_server.md) by default. It's possible to specify a different storage
medium by entering an upload destination, such as `s3://bucket`, `gs://`, `azure://`, `/mnt/shared/`.


**Parameters**

|Name|Description|Optional|
|---|---|---|
|id| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|storage| Remote storage to use for the dataset files. Default: files_server | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|verbose | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

<br/>

### Finalize Dataset
```bash
clearml-data close --id <dataset_id>
```
Finalizes the dataset and makes it ready to be consumed.
It automatically uploads all files that were not previously uploaded.
Once a dataset is finalized, it can no longer be modified.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|storage| Remote storage to use for the dataset files. Default: files_server | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|disable-upload | Disable automatic upload when closing the dataset | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|verbose | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

<br/>

### Sync Local Folder
```
clearml-data sync [--id <dataset_id] --folder <folder_location>  [--parents '<parent_id>']`
```
This option syncs a folder's content with ClearML. It is useful in case a user has a single point of truth (i.e. a folder) which
updates from time to time.


Once an update should be reflected into ClearML's system, users can call `clearml-data sync`, create a new dataset, enter the folder,
and the changes (either file addition, modification and removal) will be reflected in ClearML.

This command also uploads the data and finalizes the dataset automatically.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|folder|Local folder to sync. Wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|storage|Remote storage to use for the dataset files. Default: files_server |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|parents|IDs of the dataset's parents (i.e. merge all parents). All modifications made to the folder since the parents were synced will be reflected in the dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|project|If creating a new dataset, specify the dataset's project name|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|name|If creating a new dataset, specify the dataset's name|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|tags|Dataset user tags|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|skip-close|Do not auto close dataset after syncing folders|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|verbose | Verbose reporting |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

<br/>

### List Dataset Content
```bash
clearml-data list [--id <dataset_id>]
```

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id|Dataset ID whose contents will be shown (alternatively, use project / name combination). Default: previously accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|project|Specify dataset project name (if used instead of ID, dataset name is also required)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|name|Specify dataset name (if used instead of ID, dataset project is also required)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|filter|Filter files based on folder / wildcard. Multiple filters are supported. Example: `folder/date_*.json folder/sub-folder`|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|modified|Only list file changes (add / remove / modify) introduced in this version|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

<br/>

###  Delete Dataset
```
clearml-data delete [--id <dataset_id_to_delete>]
```
Deletes an entire dataset from ClearML. This can also be used to delete a newly created dataset.

This does not work on datasets with children.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id|ID of dataset to be deleted. Default: previously created / accessed dataset that hasn't been finalized yet|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|force|Force dataset deletion even if other dataset versions depend on it|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />||

<br/>

### Search for a Dataset
```
clearml-data search [--name <name>] [--project <project_name>] [--tags <tag>]
```
Lists all datasets in the system that match the search request.

Datasets can be searched by project, name, ID, and tags.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|ids|A list of dataset IDs|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|project|The project name of the datasets|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|name|A dataset name or a partial name to filter datasets by|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|tags|A list of dataset user tags|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|

<br/>

### Compare Two Datasets 

```
clearml-data compare [--source SOURCE] [--target TARGET] 
```

Compare two datasets (target vs. source). The command returns a comparison summary that looks like this:

```
Comparison summary: 4 files removed, 3 files modified, 0 files added
```

**Parameters**

|Name|Description|Optional|
|---|---|---|
|source|Source dataset id (used as baseline)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|target|Target dataset id (compare against the source baseline dataset)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|verbose|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

### Merge Datasets

```
clearml-data squash --name NAME --ids [IDS [IDS ...]] 
```

Squash (merge) multiple datasets into a single dataset version.

**Parameters**

|Name|Description|Optional|
|---|---|---|
|name|Create squashed dataset name|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|ids|Source dataset IDs to squash (merge down)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|storage|Remote storage to use for the dataset files. Default: files_server |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|verbose|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

### Verify Dataset

```
clearml-data verify [--id ID] [--folder FOLDER] 
```

Verify that the dataset content matches the data from the local source.  

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id|Specify dataset ID. Default: previously created/accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|folder|Specify dataset local copy (if not provided the local cache folder will be verified)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|filesize| If True, only verify file size and skip hash checks (default: false)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|verbose|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

### Get a Dataset 

```
clearml-data get [--id ID] [--copy COPY] [--link LINK] [--overwrite]
```

Get a local copy of a dataset. By default, you get a read only cached folder, but you can get a mutable copy by using the 
`--copy` flag. 

**Parameters**

|Name|Description|Optional|
|---|---|---|
|id| Specify dataset ID. Default: previously created / accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|copy| Get a writable copy of the dataset to a specific output folder|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|link| Create a soft link (not supported on Windows) to a read-only cached folder containing the dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|overwrite| If True, overwrite the target folder|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|verbose| Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

### Publish a Dataset

```
clearml-data publish --id ID
```

Publish the dataset for public use. The dataset must be [finalized](#finalize-dataset) before it is published.


**Parameters**

|Name|Description|Optional|
|---|---|---|
|id| The dataset task id to be published.|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|



## Python API

It's also possible to manage a dataset using ClearML Data's python interface. 

All API commands should be imported with:

```python
from clearml import Dataset
```

See all API commands in the [Dataset](references/sdk/dataset.md) reference page.

## Tutorials 

Take a look at the ClearML Data tutorials:
* [Dataset Management with CLI and SDK](guides/data%20management/data_man_cifar_classification)
* [Dataset Management with CLI](guides/data%20management/data_man_simple)
* [Folder Sync with CLI](guides/data%20management/data_man_folder_sync)
