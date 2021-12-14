---
title: Datasets and Dataset Versions
---

ClearML Enterprise's **Datasets** and **Dataset versions** provide the internal data structure 
and functionality for the following purposes:
* Connecting source data to the ClearML Enterprise platform
* Using ClearML Enterprise's GIT-like [Dataset versioning](#dataset-versioning)
* Integrating the powerful features of [Dataviews](dataviews.md) with an experiment
* [Annotating](webapp/webapp_datasets_frames.md#annotations) images and videos

Datasets consist of versions with SingleFrames and / or FrameGroups. Each Dataset can contain multiple versions, where 
each version can have multiple children that inherit their parent's SingleFrames and / or FrameGroups. This inheritance 
includes the frame metadata and data connecting the source data to the ClearML Enterprise platform, as well as the other 
metadata and data. 

These parent-child version relationships can be represented as version trees with a root-level parent. A Dataset 
can contain one or more trees.

Mask-labels can be defined globally, for a DatasetVersion, which will be applied to all masks in that version.

## Dataset Version State

Dataset versions can have either **Draft** or **Published** status. 

A **Draft** version is editable, so frames can be added to and deleted and / or modified from the Dataset. 
 
A **Published** version is read-only, which ensures reproducible experiments and preserves a version of a Dataset. 
Child versions can only be created from *Published* versions. To create a child of a *Draft* Dataset version, 
it must be published first.

## Example Datasets

ClearML Enterprise provides Example Datasets, available to in the ClearML Enterprise platform, with frames already built, 
and ready for your experimentation. Find these example Datasets in the ClearML Enterprise WebApp (UI). They appear 
with an "Example" banner in the WebApp (UI).

## Usage

### Creating Datasets

Use the [`Dataset.create`](../references/hyperdataset/hyperdataset.md#datasetcreate) method to create a Dataset. It will 
contain an empty version named `Current`.

```python
from allegroai import Dataset

myDataset = Dataset.create(dataset_name='myDataset')
```

Or, use the [`DatasetVersion.create_new_dataset`](../references/hyperdataset/hyperdatasetversion.md#datasetversioncreate_new_dataset) 
method.

```python
from allegroai import DatasetVersion

myDataset = DatasetVersion.create_new_dataset(dataset_name='myDataset Two')
```

To raise a `ValueError` exception if the Dataset exists, specify the `raise_if_exists` parameters as `True`.

* With `Dataset.create`
```python
try:
    myDataset = Dataset.create(dataset_name='myDataset One', raise_if_exists=True)
except ValueError:
    print('Dataset exists.')
```

* Or with `DatasetVersion.create_new_dataset`

```python
try:
    myDataset = DatasetVersion.create_new_dataset(dataset_name='myDataset Two', raise_if_exists=True)
except ValueError:
    print('Dataset exists.')
```

Additionally, create a Dataset with tags and a description.

```python
myDataset = DatasetVersion.create_new_dataset(
  dataset_name='myDataset', 
  tags=['One Tag', 'Another Tag', 'And one more tag'], 
  description='some description text'
)
```
    
### Accessing Current Dataset

To get the current Dataset, use the [`DatasetVersion.get_current`](../references/hyperdataset/hyperdatasetversion.md#datasetversionget_current) 
method.

```python
myDataset = DatasetVersion.get_current(dataset_name='myDataset')
```

### Deleting Datasets

Use the [`Dataset.delete`](../references/hyperdataset/hyperdataset.md#datasetdelete) method to delete a Dataset.

Delete an empty Dataset (no versions).

```python
Dataset.delete(dataset_name='MyDataset', delete_all_versions=False, force=False)
```

Delete a Dataset containing only versions whose status is *Draft*.

```python
Dataset.delete(dataset_name='MyDataset', delete_all_versions=True, force=False)
```    

Delete a Dataset even if it contains versions whose status is *Published*.

```python
Dataset.delete(dataset_name='MyDataset', delete_all_versions=True, force=True)
```
    

## Dataset Versioning

Dataset versioning refers to the group of ClearML Enterprise SDK and WebApp (UI) features for creating, 
modifying, and deleting Dataset versions.

ClearML Enterprise supports simple and sophisticated Dataset versioning, including **simple version structures** and 
**advanced version structures**. 

In a **simple version structure**, a parent can have one and only one child, and the last child in the Dataset versions 
tree must be a *Draft*. This simple structure allows working with a single set of versions of a Dataset. Create children 
and publish versions to preserve data history. Each version whose status is *Published* in a simple version structure is 
referred to as a **snapshot**.

In an **advanced version structure**, at least one parent has more than one child (this can include more than one parent 
version at the root level), or the last child in the Dataset versions tree is *Published*.

Creating a version in a simple version structure may convert it to an advanced structure. This happens when creating 
a Dataset version that yields a parent with two children, or when publishing the last child version.  

## DatasetVersion Usage

Manage Dataset versioning using the DatasetVersion class in the ClearML Enterprise SDK.

### Creating Snapshots

If the Dataset contains only one version whose status is *Draft*, snapshots of the current version can be created.
When creating a snapshot, the current version becomes the snapshot (it keeps the same version ID),
and the newly created version (with its new version ID) becomes the current version.

To create a snapshot, use the `DatasetVersion.create_snapshot` method. 


#### Snapshot Naming

In the simple version structure, ClearML Enterprise supports two methods for snapshot naming:
* **Timestamp naming** - If only the Dataset name or ID is provided, the snapshot is named `snapshot` with a timestamp 
  appended.  
  The timestamp format is ISO 8601 (`YYYY-MM-DDTHH:mm:ss.SSSSSS`). For example, `snapshot 2020-03-26T16:55:38.441671`.  
  
  **Example:**  
  ```python 
  from allegroai import DatasetVersion
  
  myDataset = DatasetVersion.create_snapshot(dataset_name='MyDataset')
  ```  
  
  After the statement above runs, the previous current version keeps its existing version ID, and it becomes a 
  snapshot named `snapshot` with a timestamp appended. The newly created version with a new version ID becomes 
  the current version, and its name is `Current`.
  
* **User-specified snapshot naming** - If the `publish_name` parameter is provided, it will be the name of the snapshot name.  
  
  **Example:**
  ```python
  myDataset = DatasetVersion.create_snapshot(dataset_name='MyDataset', publish_name='NewSnapshotName')
  ```
  After the above statement runs, the previous current version keeps its existing version ID and becomes a snapshot named 
  `NewSnapshotName`.
  The newly created version (with a new version ID) becomes the current version, and its name is `Current`.


#### Current Version Naming

In the simple version structure, ClearML Enterprise supports two methods for current version naming:

* **Default naming** - If the `child_name` parameter is not provided, `Current` is the current version name.
* **User-specified current version naming** - If the `child_name` parameter is provided, that child name becomes the current 
  version name.

For example, after the following statement runs, the previous current version keeps its existing version ID and becomes 
a snapshot named `snapshot` with the timestamp appended. 
The newly created version (with a new version ID) is the current version, and its name is `NewCurrentVersionName`.

```python
myDataset = DatasetVersion.create_snapshot(
  dataset_name='MyDataset', 
  child_name='NewCurrentVersionName'
)
```

#### Adding Metadata and Comments

Add a metadata dictionary and / or comment to a snapshot.

For example:
 
```python
myDataset = DatasetVersion.create_snapshot(
  dataset_name='MyDataset',
  child_metadata={'abc':'1234','def':'5678'}, 
  child_comment='some text comment'
)
```

### Creating Child Versions

Create a new version from any version whose status is *Published*. 

To create a new version, call the [`DatasetVersion.create_version`](../references/hyperdataset/hyperdataset.md#datasetversioncreate_version) 
method, and provide: 
* Either the Dataset name or ID
* The parent version name or ID from which the child inherits frames 
* The new version's name.

For example, create a new version named `NewChildVersion` from the existing version `PublishedVersion`,
where the new version inherits the frames of the existing version. If `NewChildVersion` already exists,
it is returned.

```python
myVersion = DatasetVersion.create_version(
  dataset_name='MyDataset',
  parent_version_names=['PublishedVersion'], 
  version_name='NewChildVersion'
)
```
                                          
To raise a ValueError exception if `NewChildVersion` exists, set `raise_if_exists` to `True`.                                           
                                          
```python
myVersion = DatasetVersion.create_version(
  dataset_name='MyDataset',
  parent_version_names=['PublishedVersion'], 
  version_name='NewChildVersion',
  raise_if_exists=True
)
```
                                          
### Creating Root-level Parent Versions                                          

Create a new version at the root-level. This is a version without a parent, and it contains no frames.

```python
myDataset = DatasetVersion.create_version(
  dataset_name='MyDataset', 
  version_name='NewRootVersion'
)
```

### Getting Versions

To get a version or versions, use the [`DatasetVersion.get_version`](../references/hyperdataset/hyperdatasetversion.md#datasetversionget_version) 
and [`DatasetVersion.get_versions`](../references/hyperdataset/hyperdatasetversion.md#datasetversionget_versions) 
methods, respectively.

**Getting a list of all versions**

```python
myDatasetversion = DatasetVersion.get_versions(dataset_name='MyDataset')
```

**Getting a list of all _published_ versions**

```python
myDatasetversion = DatasetVersion.get_versions(
  dataset_name='MyDataset', 
  only_published=True
)
```

**Getting a list of all _drafts_ versions**

```python
myDatasetversion = DatasetVersion.get_versions(
  dataset_name='MyDataset', 
  only_draft=True
)
```

**Getting the current version** 

If more than one version exists, ClearML Enterprise outputs a warning.

```python
myDatasetversion = DatasetVersion.get_version(dataset_name='MyDataset')
```

**Getting a specific version**

```python
myDatasetversion = DatasetVersion.get_version(
  dataset_name='MyDataset', 
  version_name='VersionName'
)
```

### Deleting Versions

Delete versions which are status *Draft* using the [`Dataset.delete_version`](../references/hyperdataset/hyperdataset.md#delete_version)
method.

```python
from allegroai import Dataset

myDataset = Dataset.get(dataset_name='MyDataset')
myDataset.delete_version(version_name='VersionToDelete')
```


### Publishing Versions

Publish (make read-only) versions which are status *Draft* using the [`DatasetVersion.publish_version`](../references/hyperdataset/hyperdatasetversion.md#publish_version) 
method. This includes the current version, if the Dataset is in the simple version structure.

```python
myVersion = DatasetVersion.get_version(
  dataset_name='MyDataset', 
  version_name='VersionToPublish'
)

myVersion.publish_version()
```

### Managing Version Mask-labels

#### Setting Version Mask-label Mapping

In order to visualize masks in a dataset version, the mask values need to be mapped to their labels. Mask-label 
mapping is stored in a version's metadata. 

To define the DatasetVersion level mask-label mapping, use the [`DatasetVersion.set_masks_labels`](../references/hyperdataset/hyperdatasetversion.md#set_masks_labels) 
method, and input a dictionary of RGB-value tuple keys and label-list values.

```python
from allegroai import DatasetVersion

# Getting a version 
myDatasetversion = DatasetVersion.get_version(dataset_name='MyDataset', 
                                              version_name='VersionName')

# Mapping out colors and labels of masks 
myDatasetversion.set_masks_labels(
    {
      (0, 0, 0): ["background"],
      (1, 1, 1): ["person", "sitting"],
      (2, 2, 2): ["cat"],
    }
)
```

#### Accessing Version Mask-label Mapping

The mask values and labels are stored as a property in a dataset version's metadata.

```python
mapping = myDatasetversion.get_metadata()['mask_labels']

print(mapping)
```         

This should return a dictionary of the version's masks and labels, which should look something like this:

```python
{'_all_': [{'value': [0, 0, 0], 'labels': ['background']}, {'value': [1, 1, 1], 'labels': ['person', 'sitting']}, {'value': [2, 2, 2], 'labels': ['cat']}]}
```
