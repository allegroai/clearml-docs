---
title: Best Practices
---

Use ClearML Data to version your data, then link it to running experiments for easy reproduction. Make datasets machine 
agnostic (i.e. store original dataset in a shared storage location, e.g. shared-folder/S3/Gs/Azure) ClearML Data supports 
efficient Dataset storage and caching, differentiable & compressed.

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

$$$$
* Arrange datasets in "topics" or use-cases in projects
* How to manage multiple datasets in a single project. how to save "best" or "latest" for multiple datasets
* Manage it with multiple datasets with different names. maybe you put some searchable metadata on it
is there a recommended way to manage multiple datasets?
* Possibly add example - find a tabular dataset online and say you want to update it from time to time but before it goes in, you need to preprocess it so maybe you have 2 datasets that are the "latest", one is the raw one and the other is the preprocessed one 
* Talk about how to version datasets. (i.e. have a dataset and I want to add stuff \ remove stuff from it.)  --
* With versioning -- that would be creating a new dataset with the old dataset as a parent and then adding / removing stuff? Unclear what versioning would entail
talk about how to mark the latest dataset (with tags probably)
* How to do something like "find the latest dataset in a project, then use it as a parent and add data to it”
* How to associate preprocessing code to the dataset itself
* When to using sync mode, when to add stuff manually with "add"
* How to deal with data periodically coming in
* Erez thinks that for data periodically coming in, just show the script that creates the data each evening. how you schedule it is irrelevant plus people might not use the scheduler for that but maybe some scheduling function of cloud provider or just regular cron job in linux
* CLI => push data => Use it on the Task. Erez said maybe to extend this example (https://clear.ml/docs/latest/docs/guides/data%20management/data_man_cifar_classification/) which covers this workflow 
* Erez thinks maybe we should add an example of a dataset that updates every day, and how to manage it