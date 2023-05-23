--- 
title: Comparing Dataviews
---

In addition to [ClearML's comparison features](../../webapp/webapp_exp_comparing.md), the ClearML Enterprise WebApp 
supports comparing input data selection criteria of experiment Dataviews, enabling to easily locate, visualize, and analyze differences.

## Selecting Experiments 

To select experiments to compare:
1. Go to an experiments table that includes the experiments to be compared.
1. Select the experiments to compare. Once multiple experiments are selected, the batch action bar appears.
1. In the batch action bar, click **COMPARE**. 

The comparison page opens in the **DETAILS** tab, showing a column for each experiment. The experiment on the left is 
used as the base experiment, to which the other experiments are compared. 

## Dataviews (Input Data)

**To locate the input data differences:**

1. Click the **DETAILS** tab **>** Expand the **DATAVIEWS** section, or, in the header, click <img src="/docs/latest/icons/ico-previous-diff.svg" alt="Previous diff" className="icon size-md" /> 
   (Previous diff) or <img src="/docs/latest/icons/ico-next-diff.svg" alt="Next diff" className="icon size-md space-sm" /> (Next diff).
1. Expand any of the following sections:

   * **Augmentation** - On-the-fly data augmentation.
   * **Filtering** - Frame inclusion and exclusion rules based on:
     * Custom filter - frame and source rules
     * Dataset version that the filter is applied
     * ROI rules
       * Confidence levels
       * Instances - Number of instances of a rule matching ROIs in each frame 
     * Frame metadata
     * Frame sources 
     * 
     * 
   * **Iteration** - Iteration controls.
   * **Labels Enumeration** - Class label enumeration.
   * **Mapping** - ROI label translation.
   * **View**

![Dataview comparison](../../img/hyperdatasets/web-app/compare_dataviews.png)