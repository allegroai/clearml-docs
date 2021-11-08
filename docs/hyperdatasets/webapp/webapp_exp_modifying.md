---
title: Modifying Dataviews
---

An experiment that has been executed can be [cloned](../../webapp/webapp_exp_reproducing.md), then the cloned experiment's 
execution details can be modified, and the modified experiment can be executed. 

In addition to all the [**ClearML** tuning capabilities](../../webapp/webapp_exp_tuning.md), the **ClearML Enterprise WebApp** (UI) 
enables modifying Dataviews, including: 
* [Selected Dataview](#selected-dataview)
* [Dataset versions](#selecting-dataset-versions)
* [Frame filtering](#filtering-frames)
* [Label mapping](#mapping-labels-label-translation)
* [Class label enumeration](#label-enumeration)
* [Data augmentation](#data-augmentation)
* [Input frame iteration controls](#iteration-controls)


The selection and control of input data can be modified in *Draft* experiments that are not [development experiments](../task.md#development-experiments). 
Do this by modifying the Dataview used by the experiment. The Dataview specifies the Hyper-Dataset versions from which frames 
are iterated and frame filters (see [Dataviews](webapp_dataviews.md)).   

**To choose a Dataview**, do any of the following:

* Create a new Dataview  
    
    * Click **+** and then follow the instructions below to select Hyper-Dataset versions, filter frames, map labels (label translation), 
      and set label enumeration, data augmentation, and iteration controls.
      
* Select a different Dataview already associated with the experiment. 
    
    * In the **SELECTED DATAVIEW** list, choose a Dataview.  
  
* Import a different Dataview associated with the same or another project.  
    
    * Click <img src="/docs/latest/icons/ico-import.svg" className="icon size-md space-sm" /> (**Import dataview**) and then 
      select **Import to current dataview** or **Import to aux dataview**.
      
:::note
After importing a Dataview, it can be renamed and / or removed. 
:::

### Selecting Dataset Versions

To input data from a different data source or different version of a data source, select a different Dataset version used 
by the Dataview.

**To select Dataset versions for input data:**

1. In the **INPUT** area, click **EDIT**.
1. Do any of the following:

    * Add a Dataset version - Input frames from another a version of another Dataset.
    
        * Click **+** 
    
        * Select a Dataset and a Dataset version 
        
    * Remove a Dataset version - Do not input frames from a Dataset version.
    
   Select frames from as many Dataset versions as are needed.

1. Click **SAVE**.
   
## Filtering Frames

Filtering of SingleFrames iterated by a Dataview for input to the experiment is accomplished by frame filters. 
For more detailed information, see [Filtering](../dataviews.md#filtering).

**To modify frame filtering:**

1. In the **FILTERING** area, click **EDIT**.
1. For each frame filter:

    1. Select the Hyper-Dataset version to which the frame filter applies.
    1. Add, change, or remove any combination of the following rules:
    
        * ROI rule - Include or exclude frames containing any single ROI with any combination of labels in the Dataset 
          version. Specify a range of the number of matching ROI (instances) per frame, and a range of confidence levels.
        * Frame rule - Filter by frame metadata key-value pairs, or ROI labels.
        * Source rule - Filter by frame `source` dictionary key-value pairs.
    
    1. Optionally, debias input data by setting ratios for frames returned by the Dataview for each frame filter. These 
       ratios allow adjusting an imbalance in input data.

1. Click **SAVE**.
    
## Mapping Labels (Label Translation)

Modify the ROI label mapping rules, which translate one or more input labels to another label for the output model. Labels 
that are not mapped are ignored. 

**To modify label mapping:**

1. In the **MAPPING** section, click **EDIT**
    * Add (**+**) or edit a mapping:
      
        1. Select the Hyper-Dataset and version whose labels will be mapped.
      
        1. Select one or more labels to map.
      
        1. Select or enter the label to map to in the output model.
    
    * Remove (<img src="/docs/latest/icons/ico-trash.svg" className="icon size-md space-sm" />) a mapping.

1. Click **SAVE**

## Label Enumeration

Modify the label enumeration assigned to output models.

**To modify label enumeration:**

1. In the **LABELS ENUMERATION** section, click **EDIT**.

    * Add (**+**) or edit an enumeration:
    
        * Select a label and then enter an integer for it.
    
    * Remove (<img src="/docs/latest/icons/ico-trash.svg" className="icon size-md space-sm" />)  an enumeration.

1. Click **SAVE**.

## Data Augmentation

Modify the on-the-fly data augmentation applied to frames input from the select Hyper-Dataset versions and filtered by the frame filters. Data augmentation is applied in steps, where each step applies a method, operation, and strength.
 
For more detailed information, see [Data Augmentation](../dataviews.md#data-augmentation).

**To modify data augmentation**

1. In the **AUGMENTATION** section, click **EDIT**.

    * Add (**+**) or edit an augmentation step - Select a **METHOD**, **OPERATION**, and **STRENGTH**.
        
    * Remove (<img src="/docs/latest/icons/ico-trash.svg" className="icon size-md space-sm" />)  an augmentation step.
    
1. Click **SAVE**.    
    
## Iteration Controls

Modify the frame iteration performed by the Dataview to control the order, number, timing, and reproducibility of frames 
for training.

For more detailed information, see [Iteration Control](../dataviews.md#iteration-control).

**To modify iteration controls:**

1. In the **ITERATION** sections, click **EDIT**.

1. Select the **ORDER** of the SingleFrames returned by the iteration, either:

    * **Sequential** - Iterate SingleFrames in sorted order by context ID and timestamp.
    * **Random** - Iterate SingleFrames randomly using the random seed you can set (see Random Seed below).
    
1. Select the frame **REPETITION** option, either:

    * **Use Each Frame Once**  

    * **Limit Frames**    
         
    * **Infinite Iterations**
        
1. Select the **RANDOM SEED** - If the experiment is rerun and the seed remains unchanged, the frames iteration is the same.

1. For video, enter a **CLIP LENGTH** - For video data sources, in the number of sequential frames from a clip to iterate.

1. Click **SAVE**.
