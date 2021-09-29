---
title: Best Practices
---

The following are some recommendations for using ClearML Data. 

## Manage Datasets
### Version Datasets

Use ClearML Data to version datasets. After a dataset has been created and finalized, it can no longer be modified. This way the 
dataset is reproducible, and it is clear which version of the data was used with which tasks. 

Once you need to modify the data, you can create a new version of the dataset and specify the previous dataset as a parent. 
This way, the new dataset version inherits the previous version's contents, and the dataset's contents can be updated. 

### Organize Datasets for Easier Access

Organize the datasets according to use-cases and use tags. This makes managing multiple datasets and 
accessing the most updated datasets for different use-cases easier. 

Like other tasks, datasets can be organized into [projects and sub-projects](../fundamentals/projects.md#creating-sub-projects). 
Additionally, when creating a dataset, tags can be applied to the dataset, which will make searching for the dataset easier.

When datasets are organized, you can more easily access the most recent dataset from a specific use-case. For instance, if 
only a project is specified when using [`Dataset.get`](../references/sdk/dataset.md#datasetget), the method returns the 
most recent dataset in a project. The same is true with tags; if a tag is specified, the method will return the most recent dataset that is labeled with that tag.

## Add Statistics to Datasets 

Report statistics metrics and debug samples on the Dataset itself. Use the [`get_logger`](../references/sdk/dataset.md#get_logger)
method to access the dataset's logger object, then feel free to log a bunch of data to the dataset, using the methods
available with a [logger](../references/sdk/logger.md) object. 

You can add some metric reporting (like [table reporting](../references/sdk/logger.md#report_table)) to create a preview 
of the data stored for better visibility, or create some statistics as part of a data ingestion script. 


## Deal with Periodic Data Modifications   

Your data probably changes periodically. If the data is updated into the same local / network folder structure, which 
serves as a dataset's single point of truth, you can schedule a script which uses the dataset `sync` functionality which 
will update a dataset based the modifications made to the folder. This way, there is no need to manually modify a dataset. 
This functionality will also track the modifications made to a folder.

See the sync function with the [CLI](clearml_data_cli.md#sync-local-folder) or [SDK](clearml_data_sdk.md#sync-local-folder)
interface. 

## Workflows 

Workflows involving datasets usually include these three steps:
* Creating a dataset object
* Populating the dataset
* Using or modifying the dataset

Take a look at the ClearML Data example workflows which use one or both ClearML Data interfaces:
* [Dataset Management with CLI](data_management_examples/data_man_simple) - Tutorial for creating, modifying, and consuming dataset with CLI
* [Folder Sync with CLI](data_management_examples/data_man_folder_sync) - Tutorial for using `clearml-data sync` CLI option to update a dataset according 
  to a local folder.
* [Dataset Management with CLI and SDK](data_management_examples/data_man_cifar_classification) - Tutorial for creating a dataset with the CLI
  and ingesting the data with the SDK
* [Data Management with Python](data_management_examples/data_man_python.md) - Example scripts for creating and consuming a dataset with the SDK. 
