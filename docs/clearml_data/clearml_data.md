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

## Setup

`clearml-data` comes built-in with our `clearml` python package! Just check out the [getting started](getting_started/ds/ds_first_steps.md) guide for more info!

## Using ClearML Data

ClearML Data offers two interfaces:
- `clearml-data` - CLI utility for creating, uploading, and managing datasets. See [CLI](clearml_data_cli.md) for a reference of `clearml-data` commands.
- `clearml.Dataset` - A python interface for creating, retrieving, managing, and using datasets. See [SDK](clearml_data_sdk.md) for an overview of the basic methods of the `Dataset` module.

For an overview of our recommendations for ClearML Data workflow and practices, see [Best Practices](best_practices.md).

## Tutorials 

Take a look at the ClearML Data tutorials:
* [Dataset Management with CLI and SDK](data%20management/data_man_cifar_classification)
* [Dataset Management with CLI](data%20management/data_man_simple)
* [Folder Sync with CLI](data%20management/data_man_folder_sync)

## WebApp 

When using either interface of ClearML Data, the data can be visualized and retrieved in ClearML's WebApp. 

Once a dataset has been finalized, view its data genealogy in the dataset's
page **>** **RESULTS** **>** **PLOTS**

![Dataset genealogy and summary](../img/dataset_genealogy_summary.png)

View a list of a dataset's contents in the dataset's page **> ARTIFACTS > data**. Download the dastaset 
in zip folder format by clicking  <img src="/docs/latest/icons/ico-download-json.svg" alt="Download" className="icon size-sm space-sm" />,
next to the **FILE PATH**.

![Dataset data WebApp](../img/dataset_data.png)

View the  DAG of the dataset dependencies (all previous dataset versions and their parents) in the dataset's page **> ARTIFACTS > state**.

![Dataset state WebApp](../img/dataset_data_state.png)



