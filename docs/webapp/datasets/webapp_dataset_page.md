---
title: Datasets Page
---

Use the **Datasets** Page to navigate between and manage datasets. The page shows summaries 
for all datasets created using [ClearML Data](../../clearml_data/clearml_data.md).

Click on a dataset card to navigate to its [Dataset Versions Table](webapp_dataset_table.md), where you can view the 
dataset’s versions and history. 

$$$NEW IMAGE ![Pipelines page](../../img/webapp_pipeline_table.png)


## Dataset Cards

The dataset cards display summarized dataset information:

<div class="max-w-50">

IMAGE - DATASET CARD

</div>

* Dataset name
* Time since last update
* Number of versions
* Details about latest version
  * Number of files
  * Size
* Tags 

### Dataset Actions

Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> on the top right
of a dataset card to open its context menu and access dataset actions.  

<div class="max-w-50">

![Project context menu](../../img/webapp_pipeline_context_menu.png)

</div>

* **Rename** - Change the dataset’s name
* **Add Tag** - Add label to the dataset to help easily classify groups of dataset.
* **Delete** - Delete the dataset: delete all its versions$$$. To delete a dataset, all its versions must first be 
  [archived](../webapp_archiving.md). 