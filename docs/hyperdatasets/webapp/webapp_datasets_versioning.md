---
title: Dataset Versioning
---

Use the Dataset versioning WebApp (UI) features for viewing, creating, modifying, and 
deleting Dataset versions.

From the Datasets page, click on one of the Datasets in order to see and work with its versions. 

## Snapshots
### Viewing Snapshots
    
View snapshots in the simple version structure using either:
        
* The simple view, a table of snapshots.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">Simple view (snapshot table)</summary>
<div className="cml-expansion-panel-content">

![image](../../img/hyperdatasets/web-app/dataset_simple_adv_01.png)

</div>
</details>
<br/>

* The advanced view, a tree of versions. The tree contains one version whose status is <i>Draft</i>, and snapshots appear in
chronological order, with oldest at the top, and the most recent at the bottom.
  
<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">Advanced view (version tree)</summary>
<div className="cml-expansion-panel-content">

![image](../../img/hyperdatasets/web-app/dataset_simple_adv_02.png)

</div>   
</details>

### Creating Snapshots

To create a snapshot, you must be in the simple (version table) view. 

**To create a snapshot, do the following:**

1. If you are in the advanced view, click **Switch to Simple View** (In certain situations, this may not be possible, 
   see [Dataset Versioning](../dataset.md#dataset-versioning)) 
1. If the **DATASET HISTORY** section is not opened, click it.
1. If a snapshot is currently selected, click **RETURN TO CURRENT VERSION**.
1. Click **+ CREATE SNAPSHOT**.
1. Enter a version name, and optionally a description.
1. Click **CREATE**.


:::note Snapshot Naming
The WebApp (UI) does not currently support the automatic naming of snapshots with timestamps appended. You must provide 
a snapshot name.
:::

## Versions
### Creating Versions

To create a version, you must be in the advanced (version tree) view.

**To create a child version, do the following:**

1. If you are in the simple view, click **Switch to Advanced View**.
1. Click the (parent) version from which to create a child (inherit all frames).
1. Click **+ CREATE NEW VERSION**.
1. Enter a version name, and optionally a description.
1. Click **CREATE**.

### Publishing Versions

Publish (make read-only) any Dataset version whose status is *Draft*. If the Dataset is in the simple structure,
and you publish the current version, then only the advanced view is available,
and you cannot create snapshots. 

**To publish a version, do the following:**

1. If you are in the simple view, click **Switch to Advanced View**.
1. Click the version to publish.
1. Click **PUBLISH**.
1. Click **PUBLISH** again to confirm.

### Modifying Version Names

**To modify a Dataset version name, do the following:**

* At the top left of the Dataset page, hover over the Dataset version name, click <img src="/docs/latest/icons/ico-edit.svg" alt="Edit pencil" className="icon size-md space-sm" /> , edit the name, and then click <img src="/docs/latest/icons/ico-save.svg" alt="Check mark" className="icon size-md space-sm" /> (check).

## Version and Snapshot Information
Additional information about the selected dataset version is presented below the version selection panel in collapsible 
panels:

### Version Info Panel 
Provides general version information:
* Version ID 
* Dataset ID 
* Dataset name 
* Status (*Draft* or *Published*) 
* Creating user
* Version update time
* Version description.

**To modify a version description, do the following:**

1. Expand the **INFO** area 
1. Hover over the **Description** element
1. Click <img src="/docs/latest/icons/ico-edit.svg" alt="Edit pencil" className="icon size-md space-sm" />
1. Edit the description
1. Click <img src="/docs/latest/icons/ico-save.svg" alt="Check mark" className="icon size-md space-sm" /> (check)

### Version Metadata Panel 
Any version specific metadata, in HOCON format.
The content icon color signifies whether any metadata is currently accompanying the dataset version.

**To edit a version's metadata:**

1. Click <img src="/docs/latest/icons/ico-metadata.svg" alt="Edit metadata" className="icon size-md space-sm" /> on the 
   **VERSION METADATA** panel to open the edit window
1. Edit the section contents (HOCON format)
1. Click **OK**

### Version Label Statistics Panel
Label usage stats for this dataset version. 
* Each label is listed along with the number of times it was used in the version
* The pie chart visualizes these stats. Hover over a chart slice and its associated label and usage 
  percentage will appear at the center of the chart. 
  
 

## Deleting Versions

You can delete versions whose status is *Draft*. 

**To delete the current version, do the following:**

* If you are in the simple view, click **Switch to Advanced View**.
* Click the version to delete.
* Click **DELETE**.
* Click **DELETE** again to confirm.

## Exporting Frames

Frame exports downloaded filtered frames as a JSON file.

**To export frames, do the following:**

* In the **Version Browser** area, click **EXPORT FRAMES**. The frames JSON file downloads.
  
