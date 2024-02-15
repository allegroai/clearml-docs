---
title: Comparing Experiments
---

The ClearML Web UI provides features for comparing experiments, allowing to locate, visualize, and analyze the 
differences in experiments' results and their causes. You can view the differences in: 
* [Details](#side-by-side-textual-comparison) - Compare experiment source code, package versions, models, configuration 
objects, and other details.
* Hyperparameters
  * [Values](#side-by-side-textual-comparison) - Compare parameters and their values
  * [Parallel coordinates](#parallel-coordinates-mode) - View the impact of hyperparameters on a selected metric
  * [Scatter plot](#scatter-plot) - View the correlation between a selected hyperparameter and metric
* Scalars - Compare experiment metrics:
  * [Values](#tabular-scalar-comparison) - Compare minimal, maximal or last reported values in a concise comparison 
  table
  * [Graphs](#plot-comparison) - Overlay compared experiments in a single graph per metric
* [Plots](#plot-comparison) - Compare experiment plots
* [Debug samples](#side-by-side-debug-sample-comparison) - Compare debug samples by iteration

With these comparisons, you can investigate the impact of different setups on your experiment results, and gain insight 
for crafting future experiments.

## Selecting Experiments to Compare

To select experiments to compare:
1. Go to an experiments table that includes the experiments to be compared.
1. Select the experiments to compare. Once multiple experiments are selected, the batch action bar appears.
1. In the batch action bar, click **COMPARE**. 

The comparison page opens in the **DETAILS** tab with the experiments [compared side by side](#side-by-side-textual-comparison).

### Modifying Experiment Selection

Click the `EXPERIMENTS` button to view your currently compared experiments. Click `X` on a listed experiment to remove
it from the comparison.

![Experiments list](../img/webapp_compare_exp_select_2.png)

You can add/remove experiments to your comparison:
1. Click the `+` button in any of the comparison tabs. This opens up a window with an experiment table with the currently 
compared experiments at the top.
   ![Adding experiments](../img/webapp_compare_exp_select_1.png)
1. Find the experiments to add by sorting and [filtering](webapp_exp_table.md#filtering-columns) the experiments with the 
appropriate column header controls. Alternatively, use the search bar to find experiments by name.
1. Select experiments to include in the comparison (and/or clear the selection of any experiments you wish to remove).
1. Click **APPLY**.

## Sharing Comparison Page
To share a comparison page, copy the full URL from the address bar and send it to a teammate to collaborate. They will 
get the exact same page (including selected tabs etc.).

## Embedding Comparison Visualization
To embed plots and debug samples from the comparison pages in your [Reports](webapp_reports.md), hover over the
resource and click <img src="/docs/latest/icons/ico-plotly-embed-code.svg" alt="Embed code" className="icon size-md space-sm" />, 
which will copy to clipboard the embed code to put in your Reports. These visualizations are updated live as the 
experiments update. The Enterprise Plan and Hosted Service support embedding resources in external tools (e.g. Notion).

## Comparison Modes 
The comparison pages provide the following views:
* [Side-by-side textual comparison](#side-by-side-textual-comparison)
* [Tabular scalar comparison](#tabular-scalar-comparison)
* [Parallel coordinates](#parallel-coordinates-mode) for parameter impact on metric
* [Scatter plot](#scatter-plot)
* [Overlaid plot comparison](#plot-comparison)
* Side-by-side [debug sample](#side-by-side-debug-sample-comparison) and [plot](#plot-comparison) comparison

### Side-by-side Textual Comparison 

In the **Details** and **Hyperparameters** (Values view) tabs, you can view differences in the experiments' parameters' nominal 
values. The **Details** tab displays the experiments' execution details (source code, uncommitted changes, python packages), 
models, artifacts, configuration objects, and additional general information. **Hyperparameters** (Values view) displays the 
experiments' hyperparameter and their values. 

The experiments are laid out in vertical cards, so each field is lined up side-by-side. The experiment on the 
left is used as the base experiment, to which the other experiments are compared. You can set a new base experiment in 
one of the following ways:
* Click on <img src="/docs/latest/icons/ico-switch-base.svg" alt="Switch base experiment" className="icon size-md space-sm" /> on the top right of the experiment that will be the new base.
* Click on <img src="/docs/latest/icons/ico-pan.svg" alt="Pan" className="icon size-md space-sm" /> the new base experiment and drag it all the way to the left

The differences between the experiments are highlighted. Easily locate 
value differences by clicking click <img src="/docs/latest/icons/ico-previous-diff.svg" alt="Up arrow" className="icon size-md" />
(previous diff) or <img src="/docs/latest/icons/ico-next-diff.svg" alt="Down arrow" className="icon size-md space-sm" /> (next diff) 
in the tab header. Obscure identical fields by switching on the **Hide Identical Fields** toggle. 

Use the search bar to find any field names or values. Lines that match the search query are highlighted, and you can
navigate between search results. 

![Side-by-side textual comparison](../img/webapp_compare_05.png)


### Tabular Scalar Comparison 
The **Scalars** tab **Values** view lays out the experiments' metric values in a table: a row per metric/variant and a 
column for each experiment. Select from the dropdown menu which metric values to display:
* Last Values: The last reported values for each experiment
* Min Values: The minimal value reported throughout the experiment execution
* Max Values: The maximal value reported throughout the experiment execution

You can download the scalar comparison table as a CSV file by clicking <img src="/docs/latest/icons/ico-download.svg" alt="Download" className="icon size-md space-sm" />. 

Switch on the **Show row extremes** toggle to highlight each variant's maximum and minimum values.  

![side-by-side scalar comparison](../img/webapp_compare_exp_scalar_vals.png)

### Parallel Coordinates Mode

The **Hyperparameters** tab's **Parallel Coordinates** comparison shows experiments' hyperparameter impact on a specific metric.

**To compare by metric:**
1. Under **Performance Metric**, select a metric to compare for
1. Select the metric values to use in the plot:
    * LAST - The final value, or the most recent value, for currently running experiments 
    * MIN - Minimal value 
    * MAX - Maximal value
1. In **Parameters**, select the hyperparameters to compare.


For example, plot the metric/variant `accuracy`/`total` against the hyperparameters
`base_lr`, `dropout`, and `number_of_epochs`.

![Parallel coordinates](../img/webapp_compare_11.png)

To focus on a specific experiment, hover over its name in the graph legend.

To hide an experiment, click its name in the graph legend (click again to bring back).

### Scatter Plot 
The **Hyperparameters** tab's **Scatter Plot** comparison shows experiments' correlation between a selected 
hyperparameter and metric.

To show the value distribution:
* Select the **Plot Axes**:
   1. Under Y-axis select the metric and the metric values to use in the plot:
      * **LAST** - The final value, or the most recent value, for currently running experiments
      * **MIN** - Minimal value
      * **MAX** - Maximal value
   1. Under X-axis select the hyperparameter.

Hovering each datapoint in the resulting plot will show the experiment name and the metric and parameter value for that 
point. You can add additional metrics and hyperparameters values to the datapoint tooltip through **ADDITIONAL DATA POINT INFORMATION**.

![Comparison scatter plot](../img/webapp_compare_scatter.png)

### Plot Comparison
The **Scalars** (Graph view) and **Plots** tabs compare experiments' plots.

The **Scalars** tab displays scalar values as time series line charts. The **Plots** tab compares the last reported 
iteration sample of each metric/variant combination per compared experiment.

Line, scatter, and bar graphs are compared by overlaying each metric/variant from all compared experiments' into a single
comparative plot. 

Use **Group by** to select how to group plots:
* **Metric** - All variants for a metric appear on the same plot.
* **Metric+Variant** (default) - Every variant appears on its own plot.


![Scalar comparison](../img/webapp_compare_08.png)

Other plot types are displayed separately for each experiment.

![non-merged comparison](../img/webapp_compare_exp_plots.png)

All single value scalars are plotted into a single clustered bar chart under the "Summary" title, where each cluster 
represents a reported metric, and each bar in the cluster represents an experiment.

![Single scalar comparison](../img/webapp_compare_exp_single_scalars.png)

Hover over plots to access plot controls (see [Scalar Plot Tools](webapp_exp_track_visual.md#scalar-plot-tools)).

### Side-by-side Debug Sample Comparison
Compare debug samples at different iterations to examine how your experiments perform throughout their execution.

You can view debug samples by metric in the reported iterations. Filter the samples by metric 
by selecting a metric from the dropdown menu above the samples. The most recent iteration appears first. To navigate 
between iterations, click <img src="/docs/latest/icons/ico-circle-older.svg" alt="Left arrow" className="icon size-md space-sm" /> (older images),
<img src="/docs/latest/icons/ico-circle-newer.svg" alt="Right arrow" className="icon size-md space-sm" /> (newer images), 
or <img src="/docs/latest/icons/ico-circle-newest.svg" alt="right arrow, newest image" className="icon size-md space-sm" /> (newest images).

Click <img src="/docs/latest/icons/ico-disconnect.svg" alt="Sync selection" className="icon size-md space-sm" /> in order 
to synchronize iteration and metric selection across experiments. For example, if you select a metric for one 
experiment's debug samples, the same metric will be automatically selected for the rest of the experiments in the 
comparison.

![Debug sample comparison](../img/webapp_compare_30.png)

Open a debug sample (image, audio, or video) in the viewer or player, by clicking the thumbnail.

![Debug Sample viewer](../img/webapp_tracking_44.png)

To move to the same sample in another iteration, click <img src="/docs/latest/icons/ico-previous.svg" alt="Left arrow" className="icon size-md space-sm" />
(previous), <img src="/docs/latest/icons/ico-next.svg" alt="Right arrow" className="icon size-md space-sm" /> (next), or move the slider.
