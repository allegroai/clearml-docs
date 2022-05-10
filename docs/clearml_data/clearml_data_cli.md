---
title: CLI 
--- 

:::important
This page covers `clearml-data`, ClearML's file-based data management solution.
See [Hyper-Datasets](../hyperdatasets/overview.md) for ClearML's advanced queryable dataset management solution.
:::

The `clearml-data` utility is a CLI tool for controlling and managing your data with ClearML.  

The following page provides a reference to `clearml-data`'s CLI commands. 

## create

Creates a new dataset. 

```bash
clearml-data create [-h] [--parents [PARENTS [PARENTS ...]]] [--project PROJECT] 
                    --name NAME [--tags [TAGS [TAGS ...]]]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--name` |Dataset's name| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--project`|Dataset's project| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--parents`|IDs of the dataset's parents. The dataset inherits all of its parents' content. Multiple parents can be entered, but they are merged in the order they were entered| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--tags` |Dataset user tags. The dataset can be labeled, which can be useful for organizing datasets| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>


:::tip Dataset ID
* To locate a dataset's ID, go to the dataset task's info panel in the [WebApp](../webapp/webapp_exp_track_visual.md). In the top of the panel, 
to the right of the dataset task name, click `ID` and the dataset ID appears.

* clearml-data works in a stateful mode so once a new dataset is created, the following commands
do not require the `--id` flag.
:::

<br/>

## add

Add individual files or complete folders to the dataset.

```bash
clearml-data add [-h] [--id ID] [--dataset-folder DATASET_FOLDER]
                 [--files [FILES [FILES ...]]] [--links [LINKS [LINKS ...]]] 
                 [--non-recursive] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id` | Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--files`| Files / folders to add. Wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`. Items will be uploaded to the dataset’s designated storage.  | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--links`| Files / folders link to add. Supports s3, gs, azure links. Example: `s3://bucket/data` `azure://bucket/folder`. Items remain in their original location. | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--dataset-folder` | Dataset base folder to add the files to in the dataset. Default: dataset root| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--non-recursive` | Disable recursive scan of files | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

## remove

Remove files/links from the dataset.

```bash
clearml-data remove [-h] [--id ID] [--files [FILES [FILES ...]]] 
                    [--non-recursive] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id` | Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--files` |  Files / folders to remove (wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`). Notice: file path is the path within the dataset, not the local path. For links, you can specify their URL (e.g. `s3://bucket/data`) | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
|`--non-recursive` | Disable recursive scan of files | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

## upload

Upload the local dataset changes to the server. By default, it's uploaded to the [ClearML Server](../deploying_clearml/clearml_server.md). It's possible to specify a different storage
medium by entering an upload destination, such as `s3://bucket`, `gs://`, `azure://`, `/mnt/shared/`.

```bash
clearml-data upload [-h] [--id ID] [--storage STORAGE] [--chunk-size CHUNK_SIZE] 
                    [--verbose]
```


**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--storage`| Remote storage to use for the dataset files. Default: files_server | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--chunk-size`| Set dataset artifact upload chunk size in MB. Default 512, (pass -1 for a single chunk). Example: 512, dataset will be split and uploaded in 512 MB chunks. | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

## close

Finalize the dataset and makes it ready to be consumed. This automatically uploads all files that were not previously uploaded.
Once a dataset is finalized, it can no longer be modified.

```bash
clearml-data close [-h] [--id ID] [--storage STORAGE] [--disable-upload]
                   [--chunk-size CHUNK_SIZE] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--storage`| Remote storage to use for the dataset files. Default: files_server | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--disable-upload` | Disable automatic upload when closing the dataset | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--chunk-size`| Set dataset artifact upload chunk size in MB. Default 512, (pass -1 for a single chunk). Example: 512, dataset will be split and uploaded in 512 MB chunks. | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose` | Verbose reporting | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

## sync

Sync a folder's content with ClearML. This option is useful in case a user has a single point of truth (i.e. a folder) which
updates from time to time.

Once an update should be reflected in ClearML's system, call `clearml-data sync` and pass the folder path,
and the changes (either file addition, modification and removal) will be reflected in ClearML.

This command also uploads the data and finalizes the dataset automatically.

```bash
clearml-data sync [-h] [--id ID] [--dataset-folder DATASET_FOLDER] --folder FOLDER
                  [--parents [PARENTS [PARENTS ...]]] [--project PROJECT] [--name NAME]
                  [--tags [TAGS [TAGS ...]]] [--storage STORAGE] [--skip-close]
                  [--chunk-size CHUNK_SIZE] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Dataset's ID. Default: previously created / accessed dataset| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
|`--dataset-folder`|Dataset base folder to add the files to (default: Dataset root)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--folder`|Local folder to sync. Wildcard selection is supported, for example: `~/data/*.jpg ~/data/json`|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--storage`|Remote storage to use for the dataset files. Default: files_server |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--parents`|IDs of the dataset's parents (i.e. merge all parents). All modifications made to the folder since the parents were synced will be reflected in the dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--project`|If creating a new dataset, specify the dataset's project name|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--name`|If creating a new dataset, specify the dataset's name|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--tags`|Dataset user tags|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--skip-close`|Do not auto close dataset after syncing folders|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--chunk-size`| Set dataset artifact upload chunk size in MB. Default 512, (pass -1 for a single chunk). Example: 512, dataset will be split and uploaded in 512 MB chunks. |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose` | Verbose reporting |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

<br/>

## list

List a dataset's contents.

```bash
clearml-data list [-h] [--id ID] [--project PROJECT] [--name NAME]
                  [--filter [FILTER [FILTER ...]]] [--modified]
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

## delete

Delete an entire dataset from ClearML. This can also be used to delete a newly created dataset.

This does not work on datasets with children.

```bash
clearml-data delete [-h] [--id ID] [--force]
```


**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`|ID of dataset to be deleted. Default: previously created / accessed dataset that hasn't been finalized yet|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--force`|Force dataset deletion even if other dataset versions depend on it|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />||

</div>

<br/>

## search

Search datasets in the system by project, name, ID, and/or tags.

Returns list of all datasets in the system that match the search request, sorted by creation time.

```bash
clearml-data search [-h] [--ids [IDS [IDS ...]]] [--project PROJECT] 
                    [--name NAME] [--tags [TAGS [TAGS ...]]]
```

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

## compare 


Compare two datasets (target vs. source). The command returns a comparison summary that looks like this:
`Comparison summary: 4 files removed, 3 files modified, 0 files added`

```bash
clearml-data compare [-h] --source SOURCE --target TARGET [--verbose]
```


**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--source`|Source dataset ID (used as baseline)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--target`|Target dataset ID (compare against the source baseline dataset)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--verbose`|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

## squash

Squash multiple datasets into a single dataset version (merge down).

```bash
clearml-data squash [-h] --name NAME --ids [IDS [IDS ...]] [--storage STORAGE] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--name`|Create squashed dataset name|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--ids`|Source dataset IDs to squash (merge down)|<img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|
|`--storage`|Remote storage to use for the dataset files. Default: files_server |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose`|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

## verify

Verify that the dataset content matches the data from the local source.  

```bash
clearml-data verify [-h] [--id ID] [--folder FOLDER] [--filesize] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`|Specify dataset ID. Default: previously created/accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--folder`|Specify dataset local copy (if not provided the local cache folder will be verified)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--filesize`| If `True`, only verify file size and skip hash checks (default: `False`)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose`|Verbose report all file changes (instead of summary)|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

## get

Get a local copy of a dataset. By default, you get a read only cached folder, but you can get a mutable copy by using the 
`--copy` flag. 

```bash
clearml-data get [-h] [--id ID] [--copy COPY] [--link LINK] [--part PART]
                 [--num-parts NUM_PARTS] [--overwrite] [--verbose]
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| Specify dataset ID. Default: previously created / accessed dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--copy`| Get a writable copy of the dataset to a specific output folder|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--link`| Create a soft link (not supported on Windows) to a read-only cached folder containing the dataset|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--part`|Retrieve a partial copy of the dataset. Part number (0 to `--num-parts`-1) of total parts `--num-parts`.|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--num-parts`|Total number of parts to divide the dataset into. Notice, minimum retrieved part is a single chunk in a dataset (or its parents). Example: Dataset gen4, with 3 parents, each with a single chunk, can be divided into 4 parts |<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--overwrite`| If `True`, overwrite the target folder|<img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|
|`--verbose`| Verbose report all file changes (instead of summary)| <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" />|

</div>

## publish

Publish the dataset for public use. The dataset must be [finalized](#close) before it is published.

```bash
clearml-data publish [-h] --id ID
```

**Parameters**

<div className="tbl-cmd">

|Name|Description|Optional|
|---|---|---|
|`--id`| The dataset task ID to be published.| <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" />|

</div>
