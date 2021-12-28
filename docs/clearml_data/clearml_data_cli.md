---
title: CLI 
--- 

:::important
This page covers `clearml-data`, ClearML's file-based data management solution.
See [Hyper-Datasets](../hyperdatasets/overview.md) for ClearML's advanced queryable dataset management solution.
:::

The `clearml-data` utility is a CLI tool for controlling and managing your data with ClearML.  

The following page provides a reference to `clearml-data`'s CLI commands. 

### Creating a Dataset
```bash
clearml-data create --project <project_name> --name <dataset_name> --parents <existing_dataset_id>`
```
Creates a new dataset. <br/>

:::tip Locating Dataset ID
To locate a dataset's ID, go to the dataset task's info panel in the [WebApp](../webapp/webapp_overview.md). In the top of the panel, 
to the right of the dataset task name, click `ID` and the dataset ID appears
:::

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--name` |Dataset's name| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--project`|Dataset's project| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--parents`|IDs of the dataset's parents. The dataset inherits all of its parents' content. Multiple parents can be entered, but they are merged in the order they were entered| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--tags` |Dataset user tags. The dataset can be labeled, which can be useful for organizing datasets| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>


:::info
clearml-data works in a stateful mode so once a new dataset is created, the following commands
do not require the `--id` flag.
:::

<br/>

### Adding Files
```bash
clearml-data add --id <dataset_id> --files <filenames/folders_to_add>
```
It's possible to add individual files or complete folders.<br/>

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id` | Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--files`|Files / folders to add. Wildcard selection is supported, for example: `~/data/*.jpg ~/data/json` | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--dataset-folder` | Dataset base folder to add the files to in the dataset. Default: dataset root| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--non-recursive` | Disable recursive scan of files | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

### Removing Files
```bash
clearml-data remove --id <dataset_id_to_remove_from> --files <filenames/folders_to_remove>
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id` | Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--files` |  Files / folders to remove (wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`). Notice: file path is the path within the dataset, not the local path.| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--non-recursive` | Disable recursive scan of files | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

### Uploading Dataset Content
```bash
clearml-data upload [--id <dataset_id>] [--storage <upload_destination>]
```
Uploads added files to [ClearML Server](../deploying_clearml/clearml_server.md) by default. It's possible to specify a different storage
medium by entering an upload destination, such as `s3://bucket`, `gs://`, `azure://`, `/mnt/shared/`.


**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--storage`| Remote storage to use for the dataset files. Default: files_server | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

### Finalizing a Dataset
```bash
clearml-data close --id <dataset_id>
```
Finalizes the dataset and makes it ready to be consumed.
It automatically uploads all files that were not previously uploaded.
Once a dataset is finalized, it can no longer be modified.

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--storage`| Remote storage to use for the dataset files. Default: files_server | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--disable-upload` | Disable automatic upload when closing the dataset | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

### Syncing Local Storage
```
clearml-data sync [--id <dataset_id] --folder <folder_location>  [--parents '<parent_id>']`
```
This option syncs a folder's content with ClearML. It is useful in case a user has a single point of truth (i.e. a folder) which
updates from time to time.


Once an update should be reflected into ClearML's system, users can call `clearml-data sync`, create a new dataset, enter the folder,
and the changes (either file addition, modification and removal) will be reflected in ClearML.

This command also uploads the data and finalizes the dataset automatically.

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--folder`|Local folder to sync. Wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--storage`|Remote storage to use for the dataset files. Default: files_server |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--parents`|IDs of the dataset's parents (i.e. merge all parents). All modifications made to the folder since the parents were synced will be reflected in the dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--project`|If creating a new dataset, specify the dataset's project name|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--name`|If creating a new dataset, specify the dataset's name|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--tags`|Dataset user tags|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--skip-close`|Do not auto close dataset after syncing folders|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose` | Verbose reporting |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

### Listing Dataset Content
```bash
clearml-data list [--id <dataset_id>]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`|Dataset ID whose contents will be shown (alternatively, use project / name combination). Default: previously accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--project`|Specify dataset project name (if used instead of ID, dataset name is also required)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--name`|Specify dataset name (if used instead of ID, dataset project is also required)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--filter`|Filter files based on folder / wildcard. Multiple filters are supported. Example: `folder/date_*.json folder/sub-folder`|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--modified`|Only list file changes (add / remove / modify) introduced in this version|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

###  Deleting a Dataset
```
clearml-data delete [--id <dataset_id_to_delete>]
```
Deletes an entire dataset from ClearML. This can also be used to delete a newly created dataset.

This does not work on datasets with children.

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`|ID of dataset to be deleted. Default: previously created / accessed dataset that hasn't been finalized yet|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--force`|Force dataset deletion even if other dataset versions depend on it|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />||

</div>

<br/>

### Searching for a Dataset
```
clearml-data search [--name <name>] [--project <project_name>] [--tags <tag>]
```
Lists all datasets in the system that match the search request.

Datasets can be searched by project, name, ID, and tags. 

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--ids`|A list of dataset IDs|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|`--project`|The project name of the datasets|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|`--name`|A dataset name or a partial name to filter datasets by|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|
|`--tags`|A list of dataset user tags|<img src="/docs/latest/icons/ico-optional-yes.svg" className="icon size-md center-md" />|

</div>

<br/>

### Comparing Two Datasets 

```
clearml-data compare [--source SOURCE] [--target TARGET] 
```

Compare two datasets (target vs. source). The command returns a comparison summary that looks like this:

```
Comparison summary: 4 files removed, 3 files modified, 0 files added
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--source`|Source dataset id (used as baseline)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--target`|Target dataset id (compare against the source baseline dataset)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--verbose`|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

### Merging Datasets

```
clearml-data squash --name NAME --ids [IDS [IDS ...]] 
```

Squash (merge) multiple datasets into a single dataset version.

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--name`|Create squashed dataset name|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--ids`|Source dataset IDs to squash (merge down)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--storage`|Remote storage to use for the dataset files. Default: files_server |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose`|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

### Verifying a Dataset

```
clearml-data verify [--id ID] [--folder FOLDER] 
```

Verify that the dataset content matches the data from the local source.  

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`|Specify dataset ID. Default: previously created/accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--folder`|Specify dataset local copy (if not provided the local cache folder will be verified)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--filesize`| If True, only verify file size and skip hash checks (default: false)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose`|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

### Getting a Dataset 

```
clearml-data get [--id ID] [--copy COPY] [--link LINK] [--overwrite]
```

Get a local copy of a dataset. By default, you get a read only cached folder, but you can get a mutable copy by using the 
`--copy` flag. 

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Specify dataset ID. Default: previously created / accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--copy`| Get a writable copy of the dataset to a specific output folder|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--link`| Create a soft link (not supported on Windows) to a read-only cached folder containing the dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--overwrite`| If True, overwrite the target folder|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose`| Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

### Publishing a Dataset

```
clearml-data publish --id ID
```

Publish the dataset for public use. The dataset must be [finalized](#finalizing-a-dataset) before it is published.


**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| The dataset task id to be published.|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|

</div>
