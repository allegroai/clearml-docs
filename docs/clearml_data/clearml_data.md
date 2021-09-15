---
title: Introduction
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

## Creating a Dataset

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

### Using a Dataset
Now we can programmatically access and utilize the created dataset from anywhere:

```python
from clearml import Dataset

local_path = Dataset.get(dataset_id='dataset_id_from_previous_command').get_local_copy()
```

We have all our files in the same folder structure under `local_path`, it is that simple!<br/>

We can now train on any dataset we have in the system.


## Tutorials 

Take a look at the ClearML Data tutorials:
* [Dataset Management with CLI and SDK](data%20management/data_man_cifar_classification)
* [Dataset Management with CLI](data%20management/data_man_simple)
* [Folder Sync with CLI](data%20management/data_man_folder_sync)
