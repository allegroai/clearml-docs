---
title: Tracking Experiments and Visualizing Results
---

While an experiment is running, and any time after it finishes, track it and visualize the results in the ClearML Web UI,
including:

* [Execution details](#execution) - Code, the base Docker image used for [ClearML Agent](../clearml_agent.md), output destination for artifacts, and the logging level.
* [Configuration](#configuration) - Hyperparameters, user properties, and configuration objects.
* [Artifacts](#artifacts) - Input model, output model, model snapshot locations, other artifacts.
* [General information](#general-information) - Information about the experiment, for example: the experiment start, create, and last update times and dates, user creating the experiment, and its description.
* [Console](#console) - stdout, stderr, output to the console from libraries, and ClearML explicit reporting.
* [Scalars](#scalars) - Metric plots.
* [Plots](#plots) - Other plots and data, for example: Matplotlib, Plotly, and ClearML explicit reporting.
* [Debug samples](#debug-samples) - Images, audio, video, and HTML.

## Viewing Modes

The ClearML Web UI provides two viewing modes for experiment details:

* The info panel

* Full screen details mode.

Both modes contain all experiment details. When either view is open, switch to the other mode by clicking <img src="/docs/latest/icons/ico-info-min.svg" alt="Table/Full screen view" className="icon size-md space-sm" />
(**View in experiments table / full screen**), or clicking <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Bars menu" className="icon size-sm space-sm" /> (**menu**) > **View in experiments
table / full screen**.


### Info Panel

The info panel keeps the experiment table in view so that [experiment actions](webapp_exp_table.md#experiment-actions)
can be performed from the table (as well as the menu in the info panel).

![Info panel](../img/webapp_tracking_40.png)

Click <img src="/docs/latest/icons/ico-compact-view.svg" alt="Compressed view" className="icon size-md space-sm" /> to 
hide details in the experiment table, so only the experiment names and statuses are displayed

![Compressed info panel](../img/webapp_tracking_41.png)

### Full Screen Details View

The full screen details view allows for easier viewing and working with experiment tracking and results. The experiments
table is not visible when the full screen details view is open. Perform experiment actions from the menu.

![Full screen view](../img/webapp_tracking_33.png)


## Execution 
An experiment's **EXECUTION** tab of lists the following:
* Source code
* Uncommitted changes
* Installed Python packages
* Container details
* Output details

In full-screen mode, the source code and output details are grouped in the **DETAILS** section.

### Source Code

The Source Code section of an experiment's **EXECUTION** tab includes:
* The experiment's repository
* Commit ID
* Script path
* Working directory
* Binary (Python executable)

![Source code section](../img/webapp_exp_source_code.png)

### Uncommitted Changes

ClearML displays the git diff of the experiment in the Uncommitted Changes section. 

![Uncommitted changes section](../img/webapp_exp_uncommitted_changes.png)

### Installed Packages

The Installed Packages section lists the experiment's installed Python packages and their versions.

![Installed packages section](../img/webapp_exp_installed_packages.png)

When a ClearML agent executing an experiment ends up using a different set of python packages than was originally 
specified, both the original specification (`original pip` or `original conda`), and the packages the agent ended up 
using to set up an environment (`pip` or `conda`) are available. Select which requirements to view in the dropdown menu.  

![Packages used by agent](../img/webapp_exp_installed_packages_2.png.png)

### Container
The Container section list the following information:
* Image - a pre-configured Docker that ClearML Agent will use to remotely execute this experiment (see [Building Docker containers](../clearml_agent/clearml_agent_docker.md))
* Arguments - add Docker arguments
* Setup shell script - a bash script to be executed inside the Docker before setting up the experiment's environment


![Container section](../img/webapp_exp_container.png)

### Output
The Output details include:
* The output destination used for storing model checkpoints (snapshots) and artifacts (see also, [default_output_uri](../configs/clearml_conf.md#config_default_output_uri)
  in the configuration file, and `output_uri` in [`Task.init`](../references/sdk/task.md#taskinit) parameters).

![Execution details section](../img/webapp_exp_output.png)

## Configuration

All parameters and configuration objects appear in the **CONFIGURATION** tab.


### Hyperparameters

Hyperparameters are grouped by their type and appear in **CONFIGURATION** **>** **HYPERPARAMETERS**. Once an experiment 
is run and stored in ClearML Server, any of these hyperparameters can be [modified](webapp_exp_tuning.md#modifying-experiments).

#### Command Line Arguments

The **Args** group shows automatically logged argument parser parameters (e.g. `argparse`, `click`, `hydra`). 
Hover over <img src="/docs/latest/icons/ico-description.svg" alt="Description" className="icon size-md space-sm" /> (menu) on a 
parameter's line, and the type, description, and default value appear, if they were provided.

![Command line arguments configuration group](../img/webapp_tracking_22.png)

#### Environment Variables

If the `CLEARML_LOG_ENVIRONMENT` variable was set, the **Environment** group will show environment variables (see [this FAQ](../faq.md#track-env-vars)).

![Environment variables configuration group](../img/webapp_tracking_23.png)

#### Custom Parameter Groups

Custom parameter groups show parameter dictionaries if the parameters were connected to the Task, using 
[`Task.connect()`](../references/sdk/task.md#connect) with a `name` argument provided. `General` is the default section
if a name is not provided.

![Custom parameters group](../img/webapp_tracking_25.png)

#### TensorFlow Definitions

The **TF_DEFINE** parameter group shows automatic TensorFlow logging.

![TF_DEFINE parameter group](../img/webapp_tracking_26.png)

### User Properties

User properties allow to store any descriptive information in a key-value pair format. They are editable in any experiment,
except experiments whose status is *Published* (read-only).

![User properties section](../img/webapp_tracking_21.png)

### Configuration Objects

ClearML tracks experiment (Task) model configuration objects, which appear in **Configuration Objects** **>** **General**.
These objects include those that are automatically tracked, and those connected to a Task in code (see [`Task.connect_configuration`](../references/sdk/task.md#connect_configuration)).

![Configuration objects](../img/webapp_tracking_24.png)

ClearML supports providing a name for a Task model configuration object (see the `name`
parameter in [`Task.connect_configuration`](../references/sdk/task.md#connect_configuration)).

![Custom configuration objects](../img/webapp_tracking_28.png)


## Artifacts

Artifacts tracked in an experiment appear in the **ARTIFACTS** tab, and include models and other artifacts.

Artifacts location is stored in the `FILE PATH` field.
The UI provides locally stored artifacts with a 'copy to clipboard' action (<img src="/docs/latest/icons/ico-clipboard.svg" alt="Clipboard" className="icon size-sm space-sm" />) 
to facilitate local storage access (since web applications are prohibited from accessing the local disk for security reasons).
The UI provides Network hosted (e.g. https://, s3:// etc. URIs) artifacts with a download action (<img src="/docs/latest/icons/ico-download-json.svg" alt="Download" className="icon size-sm space-sm" />) 
to retrieve these files.

### Models

The input and output models appear in the **ARTIFACTS** tab. Models are associated with the experiment, but to see further model details,
including design, label enumeration, and general information, go to the **MODELS** tab, by clicking the model name, which is a hyperlink to those details.

**To retrieve a model:**

1. In the **ARTIFACTS** tab **>** **MODELS** **>** **Input Model** or **Output Model**, click the model name hyperlink.
1. In the model details **>** **GENERAL** tab **>** **MODEL URL**, either:

    * Download the model<img src="/docs/latest/icons/ico-download.svg" className="icon size-md space-sm" />, if it is stored in remote storage.
    * Copy its location to the clipboard <img src="/docs/latest/icons/ico-clipboard.svg" alt="Copy Clipboard" className="icon size-md space-sm" />,
      if it is in a local file.


![Models in Artifacts tab](../img/webapp_exp_artifacts_01.png)

### Other Artifacts

Other artifacts, which are uploaded but not dynamically tracked after the upload, appear in the **OTHER** section. 
They include the file path, file size, and hash.

**To retrieve Other artifacts:**

In the **ARTIFACTS** tab **>** **OTHER** **>** Select an artifact **>** Either:
* Download the artifact <img src="/docs/latest/icons/ico-download.svg" className="icon size-md space-sm" />, if it is stored in remote storage.
* Copy its location to the clipboard <img src="/docs/latest/icons/ico-clipboard.svg" alt="Copy Clipboard" className="icon size-md space-sm" />,
      if it is in a local file.

![Other artifacts section](../img/webapp_tracking_30.png)

## General Information

General experiment details appear in the **INFO** tab. This includes information describing the stored experiment:
* Experiment description (editable, hover over the description box and click **Edit**)
* The parent experiment
* Project name
* Creation, start, and last update dates and times
* User who created the experiment
* Experiment state (status)
* Whether the experiment is archived
* Runtime properties - Information about the machine running the experiment, including:
  * Operating system
  * CUDA driver version
  * Number of CPU cores
  * Number of GPUs
  * CPU / GPU type
  * Memory size
  * Host name 
  * Processor
  * Python version
* Experiment Progress    
    
![Info tab](../img/webapp_tracking_31.png)

## Experiment Results

:::tip Embedding ClearML Visualization
You can embed experiment plots and debug samples into ClearML [Reports](webapp_reports.md). These visualizations are 
updated live as the experiment(s) updates. The Enterprise Plan and Hosted Service support embedding resources in external 
tools (e.g. Notion). See [Plot Controls](#plot-controls).  
:::

### Console

The complete experiment log containing everything printed to stdout and stderr appears in the **CONSOLE** tab. The full log
is downloadable. To view the end of the log, click **Jump to end**.

<Collapsible type="screenshot" title="View a screenshot">

![Console tab](../img/webapp_tracking_32.png)

</Collapsible>



### Scalars

All scalars that ClearML automatically logs, as well as those explicitly reported in code, appear in
**SCALARS**. 

Scalar series are presented in a line chart. To see the series for a metric in high resolution, 
view it in full screen mode by hovering over the graph and clicking <img src="/docs/latest/icons/ico-maximize.svg" alt="Maximize plot icon" className="icon size-sm space-sm" />.

:::info Full Screen Refresh
Scalar graphs in full screen mode do not auto-refresh. Click <img src="/docs/latest/icons/ico-reset.svg" alt="Refresh" className="icon lt size-md space-sm medium-zoom-image" /> 
to update the graph. 
:::

Reported single value scalars are aggregated into a table plot displaying scalar names and values (see [`Logger.report_single_value`](../references/sdk/logger.md#report_single_value)). 


#### Scalar Plot Tools

Use the scalar tools to improve analysis of scalar metrics. In the info panel, click <img src="/docs/latest/icons/ico-settings.svg" alt="Settings gear" className="icon size-md space-sm" /> to use the tools. In the full screen details view, the tools
are on the left side of the window. The tools include:
* **Group by** - Select one of the following:
  * **Metric** - All variants for a metric on the same plot

    <Collapsible type="screenshot" title="View a screenshot">

    ![Plots grouped by metric](../img/webapp_tracking_33.png)

    </Collapsible>
      
  * **None** - Group by metric and variant (individual metric-variant plots).

    <Collapsible type="screenshot" title="View a screenshot">

    ![Plots groups my metric and variant](../img/webapp_tracking_34.png)

    </Collapsible>

* Horizontal axis - Select the x-axis units:
  * Iterations
  * Time from start - Time since experiment began
  * Wall time - Local clock time
* Curve smoothing - Choose which smoothing algorithm to use from the dropdown menu: Exponential moving average, Gaussian, 
  or Running Average. Use the slider to configure the smoothing factor or specify a value manually. 
* Show / hide plots - Click **HIDE ALL**, and then click <img src="/docs/latest/icons/ico-show.svg" alt="Eye Show All" className="icon size-md space-sm" />
  on those you want to see.

To embed scalar plots in your [Reports](webapp_reports.md), hover over a plot and click <img src="/docs/latest/icons/ico-plotly-embed-code.svg" alt="Embed code" className="icon size-md space-sm" />, 
which will copy to clipboard the embed code to put in your Reports. In contrast to static screenshots, embedded resources 
are retrieved when the report is displayed allowing your reports to show the latest up-to-date data.

See additional [plot controls](#plot-controls) below.

### Plots
Non-time-series plots appear in **PLOTS**. These include data generated by libraries, visualization tools, and 
explicitly reported using the ClearML Logger. These may include 2D and 3D plots, tables (Pandas and CSV files), and 
Plotly plots. Individual plots can be shown / hidden or filtered by title.

![Plots tab](../img/webapp_tracking_35.png)

For each metric, the latest reported plot is displayed.

When viewing a plot in full screen (<img src="/docs/latest/icons/ico-maximize.svg" alt="Maximize plot icon" className="icon size-sm space-sm" />), 
older iterations are available through the iteration slider (or using the up/down arrow keyboard shortcut). Go to the 
previous/next plot in the current iteration using the <img src="/docs/latest/icons/ico-previous.svg" alt="Previous" className="icon size-sm space-sm" /> / <img src="/docs/latest/icons/ico-next.svg" alt="Next" className="icon size-sm space-sm" /> 
buttons (or using the left/right arrow keyboard shortcut).


![Plots maximize tab](../img/webapp_tracking_35a.png)

#### Plot Controls

The table below lists the plot controls which may be available for any plot (in the **SCALARS** and **PLOTS** tabs). 
These controls allow you to better analyze the results. Hover over a plot, and the controls appear.

|Icon|Description|
|---|---|
| <img src="/docs/latest/icons/ico-download-pic.svg" alt="Download PNG icon" className="icon size-sm space-sm" /> | Download plots as PNG files. |
| <img src="/docs/latest/icons/ico-pan.svg" alt="Pan icon" className="icon size-sm space-sm" /> | Pan around plot. Click <img src="/docs/latest/icons/ico-pan.svg" alt="Pan icon" className="icon size-sm space-sm" />, click the plot, and then drag. |
| <img src="/docs/latest/icons/ico-dotted-box.svg" alt="Dotted box icon" className="icon size-sm space-sm" /> | To examine an area, draw a dotted box around it. Click <img src="/docs/latest/icons/ico-dotted-box.svg" alt="Dotted box icon" className="icon size-sm space-sm" /> and then drag. |
| <img src="/docs/latest/icons/ico-dotted-lasso.svg" alt="Dotted lasso icon" className="icon size-sm space-sm" /> | To examine an area, draw a dotted lasso around it. Click <img src="/docs/latest/icons/ico-dotted-lasso.svg" alt="Dotted lasso icon" className="icon size-sm space-sm" /> and then drag. |
| <img src="/docs/latest/icons/ico-zoom.svg" alt="Zoom icon" className="icon size-sm space-sm" /> | Zoom into a section of a plot. Zoom in - Click <img src="/docs/latest/icons/ico-zoom.svg" alt="Zoom icon" className="icon size-sm space-sm" /> and drag over a section of the plot. Reset to original scale - Click <img src="/docs/latest/icons/ico-reset-autoscale.svg" alt="Reset autoscale icon" className="icon size-sm space-sm" />. |
| <img src="/docs/latest/icons/ico-zoom-in-square.svg" alt="Zoom-in icon" className="icon size-sm space-sm" /> | Zoom in. |
| <img src="/docs/latest/icons/ico-zoom-out-square.svg" alt="Zoom-out icon" className="icon size-sm space-sm" /> | Zoom out. |
| <img src="/docs/latest/icons/ico-reset-autoscale.svg" alt="Reset autoscale icon" className="icon size-sm space-sm" /> | Reset to autoscale after zooming (<img src="/docs/latest/icons/ico-zoom.svg" alt="Zoom icon" className="icon size-sm space-sm" />, <img src="/docs/latest/icons/ico-zoom-in-square.svg" alt="Zoom-in icon" className="icon size-sm space-sm" />, or <img src="/docs/latest/icons/ico-zoom-out-square.svg" alt="Zoom-out icon" className="icon size-sm space-sm" />). |
| <img src="/docs/latest/icons/ico-reset-axes.svg" alt="Reset axes icon" className="icon size-sm space-sm" /> | Reset axes after a zoom. |
| <img src="/docs/latest/icons/ico-spike-lines.svg" alt="Spike lines icon" className="icon size-sm space-sm" /> | Show / hide spike lines. |
| <img src="/docs/latest/icons/ico-show-closest.svg" alt="Show closest icon" className="icon size-sm space-sm" /> <br/> <img src="/docs/latest/icons/ico-compare-data.svg" alt="Compare data icon" className="icon size-sm space-sm" /> <br/> <img src="/docs/latest/icons/ico-x-unified.svg" alt="X-united mode" className="icon size-sm space-sm" />| Set data hover mode:<ul><li><img src="/docs/latest/icons/ico-show-closest.svg" alt="Show closest icon" className="icon size-sm space-sm" /> Closest - Show the (X, Y) data point closest to the cursor, including horizontal and vertical axes values</li><li> <img src="/docs/latest/icons/ico-compare-data.svg" alt="Compare data icon" className="icon size-sm space-sm" /> X - Show labels for points with the same x value as the cursor  </li><li> <img src="/docs/latest/icons/ico-x-unified.svg" alt="X-united mode" className="icon size-sm space-sm"/> X unified - Show a single label for the points with the same x value as the cursor</li></ul> |
| <img src="/docs/latest/icons/ico-logarithmic-view.svg" alt="Logarithmic view icon" className="icon size-sm space-sm" /> | Switch to logarithmic view. |
| <img src="/docs/latest/icons/ico-graph-legend.svg" alt="Graph legend icon" className="icon size-sm space-sm" /> | Hide / show the legend. |
| <img src="/docs/latest/icons/ico-reset_1.svg" alt="Plot layout setting" className="icon size-sm space-sm" />| Switch between original and auto-fitted plot dimensions. The original layout is the plot's user-defined dimensions. |
| <img src="/docs/latest/icons/ico-download-json-plot.svg" alt="Download JSON icon" className="icon size-sm space-sm" /> | Download plot data as a JSON file. |
| <img src="/docs/latest/icons/ico-download-csv.svg" alt="Download CSV icon" className="icon size-sm space-sm" /> | Download **table** plot data as a CSV file. |
| <img src="/docs/latest/icons/ico-maximize.svg" alt="Maximize plot icon" className="icon size-sm space-sm" /> | Expand plot to entire window. When used with scalar graphs, full screen mode displays plots with all data points, as opposed to an averaged plot |
| <img src="/docs/latest/icons/ico-reset.svg" alt="Refresh" className="icon size-sm space-sm" /> | Refresh scalar graphs in full screen mode to update it.  | 
| <img src="/docs/latest/icons/ico-plotly-embed-code.svg" alt="Embed code" className="icon size-sm space-sm" /> | Copy to clipboard the resource embed code. This opens the following options: <ul><li>**Embed in External tool** (available in the ClearML Enterprise plan and Hosted Service) - Copy code to add to external tools (e.g. Notion). </li><li>**Embed in ClearML report** - Copy code to add to a [report](webapp_reports.md)</li></ul> In contrast to static screenshots, embedded resources are retrieved when the tool/report is displayed allowing your tools/reports to show the latest up-to-date data. |

 

#### 3D Plot Controls 
|Icon|Description|
|---|---|
| <img src="/docs/latest/icons/ico-orbital-rotation.svg" alt="Orbital rotation mode icon" className="icon size-sm space-sm" />| Switch to orbital rotation mode - rotate the plot around its middle point. |
| <img src="/docs/latest/icons/ico-turntable-rotation.svg" alt="Turntable rotation mode icon" className="icon size-sm space-sm" />| Switch to turntable rotation mode - rotate the plot around its middle point while constraining one axis |
| <img src="/docs/latest/icons/ico-reset-axes.svg" alt="reset axes icon" className="icon size-sm space-sm" />| Reset axes to default position. |


### Debug Samples

Experiment outputs such as images, audio, and videos appear in **DEBUG SAMPLES**. These include data generated by 
libraries and visualization tools, and explicitly reported using the [ClearML Logger](../fundamentals/logger.md). 

You can view debug samples by metric in the reported iterations. Filter the samples by metric by selecting a metric from the 
dropdown menu above the samples. The most recent iteration appears first.

![Debug Samples tab](../img/webapp_tracking_43.png)

For each metric, the latest reported debug sample is displayed.

Click a sample to view it in full screen. If the sample is video or audio, the full screen mode includes a player. 

When viewing a sample in full screen, older iterations are available through the iteration slider (or using the up/down 
arrow keyboard shortcut). Go to the previous/next sample in the current iteration using the <img src="/docs/latest/icons/ico-previous.svg" alt="Previous" className="icon size-sm space-sm" /> / <img src="/docs/latest/icons/ico-next.svg" alt="Next" className="icon size-sm space-sm" /> 
buttons (or using the left/right arrow keyboard shortcut).


![Debug Samples image viewer](../img/webapp_tracking_44.png)

## Tagging Experiments

<div class="vid" >
<iframe style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '100%', height: '100%'}} 
        src="https://www.youtube.com/embed/uqik38jlBsQ?si=joU-KOPpUNLbn6Ws" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
</iframe>
</div>

<br/>

Tags are user-defined, color-coded labels that can be added to experiments (and pipelines, datasets, and models), 
allowing to easily identify and group experiments. Tags can help in organizing, querying, and automating experiments.
For example, tag experiments by the machine type used to execute them, label versions, team names, or any other
category.

You can use tags to filter your experiments in your experiment table (see [Filtering Columns](webapp_exp_table.md#filtering-columns))
or when querying experiments in your code (see [Tag Filters](../clearml_sdk/task_sdk.md#tag-filters)). You can trigger 
experiment execution according to their tags (see [TriggerScheduler](../references/sdk/trigger.md)) or automatically
deploy models according to their tags (see [ClearML Serving](../clearml_serving/clearml_serving_tutorial.md#automatic-model-deployment)).

**To add tags:**
1. Click the experiment **>** Hover over the tag area **>** **+ADD TAG** or <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Bars menu" className="icon size-sm space-sm" /> (menu)
1. Do one of the following:
    * Add a new tag - Type the new tag name **>** **(Create New)**.
    * Add an existing tag - Click a tag.
    * Customize a tag's colors - Click **Tag Colors** **>** Click the tag icon **>** **Background** or **Foreground** **>** Pick a color **>** **OK** **>** **CLOSE**.

**To remove a tag** - Hover over the tag and click **X**.




## Locating the Experiment (Task) ID

The task ID appears in the experiment page's header. 
