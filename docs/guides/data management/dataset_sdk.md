---
title: Data Management with Python
---

The [dataset_creation.py](https://github.com/allegroai/clearml/blob/master/examples/datasets/dataset_creation.py) and 
[data_ingestion.py](https://github.com/allegroai/clearml/blob/master/examples/datasets/data_ingestion.py) 
together demonstrate how to use ClearML's [`Dataset`](../../references/sdk/dataset.md) class to create a dataset and then 
to ingest the data. 

## Dataset Creation

The [dataset_creation.py](https://github.com/allegroai/clearml/blob/master/examples/datasets/dataset_creation.py) script 
demonstrates how to do the following:
* Create a dataset and add files to it
* Upload the dataset to the ClearML Server
* Finalize the dataset


### Downloading the data

We first need to obtain a local copy of the CIFAR dataset.

 ```python
 from clearml import StorageManager
 # We're using the StorageManager to download the data for us! 
 # It's a neat little utility that helps us download
 # files we need and cache them :)

 manager = StorageManager()
 dataset_path = manager.get_local_copy(remote_url="https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz")
```

This script downloads the data and `dataset_path` contains the path to the downloaded data. 

### Creating the dataset

```python
from clearml import Dataset

dataset = Dataset.create(dataset_name="cifar_dataset", dataset_project="dataset examples" )
 ```

This creates a data processing task called "cifar_dataset" that is associated with the "dataset examples" project, which
can be viewed in the WebApp.

### Adding files

```python
dataset.add_files(path=dataset_path)
```

This adds the downloaded files to the current dataset.  

### Uploading the files

```python
dataset.upload()
```
This uploads the dataset to the ClearML Server by default. The dataset's destination can be changed by specifying the 
target storage with the `output_url` parameter of the [`upload`](../../clearml_data.md#datasetupload) method. 

### Finalizing the dataset

Run the `finalize` command to close the dataset and mark it as *completed*. The dataset can only be finalized if it doesn't have any pending uploads. 

```python
dataset.finalize()
```

After a dataset has been closed, it can no longer be modified. This way the dataset is reproducible. 

The information about the dataset, including a list of files and their sizes, can be viewed
in the WebApp, in the experiment's page, in the **ARTIFACTS** tab, 

![image](../../img/examples_data_management_cifar_dataset.png)

## Data Ingestion

Now that we have a new dataset registered, we can consume it!

The [data_ingestion.py](https://github.com/allegroai/clearml/blob/master/examples/datasets/data_ingestion.py) script 
demonstrates data ingestion using the dataset created in the first script.

```python
dataset_name = "cifar_dataset"
dataset_project = "dataset_examples"

# The below gets the dataset and stores in the cache. If you want to download the dataset regardless if it's in the
# cache, use the Dataset.get(dataset_name, dataset_project).get_mutable_local_copy(path to download)
dataset_path = Dataset.get(dataset_name=dataset_name, dataset_project=dataset_project).get_local_copy()

trainset = datasets.CIFAR10(root=dataset_path,
                            train=True,
                            download=False,
                            transform=transform)
```

The Dataset's [`get_local_copy`](../../references/sdk/dataset.md#get_local_copy) method will return a path to the cached, 
downloaded dataset. Then we provide the path to Pytorch's dataset object.

The script then creates a neural network to train a model to classify images from the dataset that was
created above.