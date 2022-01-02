---
title: Tracking Experiments and Visualizing Results
---

While an experiment is running, and any time after it finishes, track it and visualize the results in the **ClearML Web UI**,
including:

* [Execution details](#execution-details) - Code, the base Docker image used for **[ClearML Agent](../clearml_agent.md)**, output destination for artifacts, and the logging level.
* [Configuration](#configuration) - Hyperparameters, user properties, and configuration objects.
* [Artifacts](#artifacts) - Input model, output model, model snapshot locations, other artifacts.
* [General information](#general-information) - Information about the experiment, for example: the experiment start, create, and last update times and dates, user creating the experiment, and its description.
* [Console](#console) - stdout, stderr, output to the console from libraries, and **ClearML** explicit reporting.
* [Scalars](#scalars) - Metric plots.
* [Plots](#plots) - Other plots and data, for example: Matplotlib, Plotly, and **ClearML** explicit reporting.
* [Debug samples](#debug-samples) - Images, audio, video, and HTML.

## Viewing Modes

The **ClearML Web UI** provides two viewing modes for experiment details:

* The info panel

* Full screen details mode.

Both modes contain all experiment details. When either view is open, switch to the other mode by clicking <img src="/docs/latest/icons/ico-info-min.svg" alt="Table/Full screen view" className="icon size-md space-sm" />
(**View in experiments table / full screen**), or clicking <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Bars menu" className="icon size-sm space-sm" /> (**menu**) > **View in experiments
table / full screen**.


### Info Panel

The info panel keeps the experiment table in view so that [experiment actions](webapp_exp_table.md#experiment-actions)
can be performed from the table (as well as the menu in the info panel).

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Info panel](../img/webapp_tracking_40.png)

</div>
</details>

### Full Screen Details View

The full screen details view allows for easier viewing and working with experiment tracking and results. The experiments
table is not visible when the full screen details view is open. Perform experiment actions from the menu.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Full screen view](../img/webapp_tracking_33.png)

</div>
</details>


## Execution Details
In the EXECUTION tab of an experiment's detail page, there are records of:
* Source code
* **ClearML Agent** configuration
* Output details
* Uncommitted changes
* Installed Python packages


### Source Code, ClearML Agent Configuration, and Output Details

The source code details of the EXECUTION tab of an experiment include:
* The experiment's repository
* Commit ID
* Script path
* Working directory

Additionally, there is information about the **ClearML Agent** configuration.  The **ClearML Agent** base image is a pre-configured Docker
that **ClearML Agent** will use to remotely execute this experiment (see [Building Docker containers](../clearml_agent.md#building-docker-containers)).

The output details include:
* The output destination used for storing model checkpoints (snapshots) and artifacts (see also, [default_output_uri](../configs/clearml_conf#config_default_output_uri)
  in the configuration file, and [output_uri](../references/sdk/task.md#taskinit)
  in `Task.init` parameters).

* The logging level for the experiment, which uses the standard Python [logging levels](https://docs.python.org/3/howto/logging.html#logging-levels).


<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Execution details section](../img/webapp_tracking_18.png)

</div>
</details>


### Uncommitted Changes

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Uncommitted changes section](../img/webapp_tracking_19.png)

</div>
</details>


### Installed Python packages and Their Versions
<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Installed packages section](../img/webapp_tracking_20.png)

</div>
</details>

## Configuration

All parameters and configuration objects appear in the **CONFIGURATION** tab.


### Hyperparameters

:::important
In older versions of **ClearML Server**, the **CONFIGURATION** tab was named **HYPER PARAMETERS**, and it contained all parameters. The renamed tab contains a **HYPER PARAMETER** section, and subsections for hyperparameter groups.
:::

Hyperparameters are grouped by their type and appear in **CONFIGURATION** **>** **HYPER PARAMETERS**.

#### Command Line Arguments

The **Args** parameter group shows automatically logged `argparse` arguments, and all older experiments parameters, except TensorFlow Definitions. Hover over a parameter, and the type, description, and default value appear, if they were provided.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Command line arguments configuration group](../img/webapp_tracking_22.png)

</div>
</details>


#### Environment Variables

If the `CLEARML_LOG_ENVIRONMENT` variable was set, the **Environment** group will show environment variables (see [this FAQ](../faq#track-env-vars)).

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Environment variables configuration group](../img/webapp_tracking_23.png)

</div>
</details>


#### Custom Parameter Groups

Custom parameter groups show parameter dictionaries if the parameters were connected to the Task, using the `Task.connect` method,
with a `name` argument provided.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Custom parameters group](../img/webapp_tracking_25.png)

</div>
</details>

#### TensorFlow Definitions

The **TF_DEFINE** parameter group shows automatic TensorFlow logging.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![TF_DEFINE parameter group](../img/webapp_tracking_26.png)

</div>
</details>

Once an experiment is run and stored in **ClearML Server**, any of these hyperparameters can be [modified](webapp_exp_tuning.md#modifying-experiments).

### User Properties

User properties allow to store any descriptive information in a key-value pair format. They are editable in any experiment,
except experiments whose status is *Published* (read-only).

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![User properties section](../img/webapp_tracking_21.png)

</div>
</details>


### Configuration Objects

**ClearML** tracks experiment (Task) model configuration objects, which appear in **Configuration Objects** **>** **General**.
These objects include those that are automatically tracked, and those connected to a Task in code (see [Task.connect_configuration](../references/sdk/task.md#connect_configuration)).
**ClearML** supports providing a name for a Task model configuration object (see the [name](../references/sdk/task.md#connect_configuration)
parameter in `Task.connect_configuration`).

:::important
In older versions of **ClearML Server**, the Task model configuration appeared in the **ARTIFACTS** tab, **MODEL CONFIGURATION** section. Task model configurations now appear in the **Configuration Objects** section, in the **CONFIGURATION** tab.
:::

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot - Configuration objects </summary>
<div className="cml-expansion-panel-content">

![Configuration objects](../img/webapp_tracking_24.png)

</div>
</details>
<br/>

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot - Custom configuration object</summary>
<div className="cml-expansion-panel-content">

![Custom configuration objects](../img/webapp_tracking_28.png)

</div>
</details>

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


<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Models in Artifacts tab](../img/webapp_exp_artifacts_01.png)

</div>
</details>


### Other Artifacts

**To retrieve another artifact:**

1. In the **ARTIFACTS** tab **>** **DATA AUDIT** or **OTHER** **>** Select an artifact **>** Either:

    * Download the artifact <img src="/docs/latest/icons/ico-download.svg" className="icon size-md space-sm" />, if it is stored in remote storage.
    * Copy its location to the clipboard <img src="/docs/latest/icons/ico-clipboard.svg" alt="Copy Clipboard" className="icon size-md space-sm" />,
      if it is in a local file.

#### Data Audit

Artifacts which are uploaded and dynamically tracked by **ClearML** appear in the **DATA AUDIT** section. They include the file path, file size, hash, and metadata stored with the artifact.


<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Data audit section](../img/webapp_tracking_29.png)

</div>
</details>

#### Other

Other artifacts, which are uploaded but not dynamically tracked after the upload, appear in the **OTHER** section. They include the file path, file size, and hash.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Other artifacts section](../img/webapp_tracking_30.png)

</div>
</details>




## General Information

General experiment details appear in the **INFO** tab. This includes information describing the stored experiment:
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
    

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Info tab](../img/webapp_tracking_31.png)

</div>
</details>




## Experiment Results




### Console

The complete experiment log containing everything printed to stdout and stderr appears in the **CONSOLE** tab. The full log
is downloadable. To view the end of the log, click **Jump to end**.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Console tab](../img/webapp_tracking_32.png)

</div>
</details>



### Scalars

All scalars that **ClearML** automatically logs, as well as those explicitly reported in code, appear in **RESULTS** **>** **SCALARS**.

#### Scalar Plot Tools

Use the scalar tools to improve analysis of scalar metrics. In the info panel, click <img src="/docs/latest/icons/ico-settings.svg" className="icon size-md space-sm" /> to use the tools. In the full screen details view, the tools
are on the left side of the window. The tools include:
* **Group by** - Select one of the following:
  * **Metric** - All variants for a metric on the same plot

    <details className="cml-expansion-panel screenshot">
    <summary className="cml-expansion-panel-summary">View a screenshot</summary>
    <div className="cml-expansion-panel-content">

    ![Plots grouped by metric](../img/webapp_tracking_33.png)

    </div>
    </details>
    <br/>
      
  * **None** - Group by metric and variant (individual metric-variant plots).

    <details className="cml-expansion-panel screenshot">
    <summary className="cml-expansion-panel-summary">View a screenshot</summary>
    <div className="cml-expansion-panel-content">

    ![Plots groups my metric and variant](../img/webapp_tracking_34.png)

    </div>
    </details>

* Show / hide plots - Click **HIDE ALL**, and then click <img src="/docs/latest/icons/ico-show.svg" alt="Eye Show All" className="icon size-md space-sm" />
  on those you want to see.
* **Horizontal axis** modes (scalars, only) - Select one of the following:
  * **ITERATIONS**
  * **RELATIVE** - Time since experiment began
  * **WALL** - Local clock time
* Curve smoothing (scalars, only) - In **Smoothing** **>** Move the slider or type a smoothing factor between **0** and **0.999**.

See additional [plot controls](#plot-controls) below.

### Plots
Non-time-series plots appear in **RESULTS** **>** **PLOTS**. These include data reported by libraries, visualization 
tools, and **ClearML** explicit reporting. These may include 2D and 3D plots, tables (Pandas and CSV files), and Plotly plots. 
Individual plots can be shown / hidden or filtered by title.

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot</summary>
<div className="cml-expansion-panel-content">

![Plots tab](../img/webapp_tracking_35.png)

</div>
</details>


#### Plot Controls

The table below lists the plot controls which may be available for any plot (in the **SCALARS** and **PLOTS** tabs). 
These controls allow you to better analyze the results. Hover over a plot, and the controls appear.

|Icon|Description|
|---|---|
| <img src="/docs/latest/icons/ico-download-pic.svg" alt="Download PNG icon" className="icon size-sm space-sm" /> | Download plots as PNG files. |
| <img src="/docs/latest/icons/ico-pan.svg" alt="Pan icon" className="icon size-sm space-sm" /> | Pan around plot. Click <img src="/docs/latest/icons/ico-pan.svg" alt="Pan icon" className="icon size-sm space-sm" />, click the plot, and then drag. |
| <img src="/docs/latest/icons/ico-dotted-box.svg" alt="Dotted box icon" className="icon size-sm space-sm" /> | To examine an area, draw a dotted box around it. Click <img src="/docs/latest/icons/ico-dotted-box.svg" alt="Dotted box icon" className="icon size-sm space-sm" /> and then drag. |
| <img src="/docs/latest/icons/ico-dotted-lasso.svg" alt="Dotted lasso icon" className="icon size-sm space-sm" /> | To examine an area, draw a dotted lasso around it. Click <img src="/docs/latest/icons/ico-dotted-lasso.svg" alt="Dotted lasso icon" className="icon size-sm space-sm" /> and then drag. |
| <img src="/docs/latest/icons/ico-zoom.svg" alt="Zoom icon" className="icon size-sm space-sm" /> | Zoom into a section of a plot. Zoom in - Click <img src="/docs/latest/icons/ico-zoom.svg" alt="Zoom icon" className="icon size-sm space-sm" /> and drag over a section of the plot. Reset to original scale - Click <img src="/docs/latest/icons/ico-reset-autoscale.svg" alt="Reset autoscale icon" className="icon size-sm space-sm" /> . |
| <img src="/docs/latest/icons/ico-zoom-in-square.svg" alt="Zoom-in icon" className="icon size-sm space-sm" /> | Zoom in. |
| <img src="/docs/latest/icons/ico-zoom-out-square.svg" alt="Zoom-out icon" className="icon size-sm space-sm" /> | Zoom out. |
| <img src="/docs/latest/icons/ico-reset-autoscale.svg" alt="Reset autoscale icon" className="icon size-sm space-sm" /> | Reset to autoscale after zooming ( <img src="/docs/latest/icons/ico-zoom.svg" alt="Zoom icon" className="icon size-sm space-sm" />, <img src="/docs/latest/icons/ico-zoom-in-square.svg" alt="Zoom-in icon" className="icon size-sm space-sm" />, or <img src="/docs/latest/icons/ico-zoom-out-square.svg" alt="Zoom-out icon" className="icon size-sm space-sm" />). |
| <img src="/docs/latest/icons/ico-reset-axes.svg" alt="Reset axes icon" className="icon size-sm space-sm" /> | Reset axes after a zoom. |
| <img src="/docs/latest/icons/ico-spike-lines.svg" alt="Spike lines icon" className="icon size-sm space-sm" /> | Show / hide spike lines. |
| <img src="/docs/latest/icons/ico-show-closest.svg" alt="Show closest icon" className="icon size-sm space-sm" /> | Show the closest data point on hover, including horizontal and vertical axes values. Click <img src="/docs/latest/icons/ico-show-closest.svg" alt="Show closest icon" className="icon size-sm space-sm" /> and then hover over a series on the plot. |
| <img src="/docs/latest/icons/ico-compare-data.svg" alt="Compare data icon" className="icon size-sm space-sm" /> | Compare data on hover. Click <img src="/docs/latest/icons/ico-compare-data.svg" alt="Compare data icon" className="icon size-sm space-sm" /> and then hover over the plot. |
| <img src="/docs/latest/icons/ico-logarithmic-view.svg" alt="Logarithmic view icon" className="icon size-sm space-sm" /> | Switch to logarithmic view. |
| <img src="/docs/latest/icons/ico-ico-graph-legend.svg" alt="Graph legend icon" className="icon size-sm space-sm" /> | Hide / show the legend. |
| <img src="/docs/latest/icons/ico-download-json.svg" alt="Download JSON icon" className="icon size-sm space-sm" /> | To get metric data for further analysis, download plot data to JSON file. |
| <img src="/docs/latest/icons/ico-maximize.svg" alt="Maximize plot icon" className="icon size-sm space-sm" /> | Expand plot to entire window. |

#### 3D Plot Controls 
|Icon|Description|
|---|---|
| <img src="/docs/latest/icons/ico-orbital-rotation.svg" alt="Orbital rotation mode icon" className="icon size-sm space-sm" />| Switch to orbital rotation mode - rotate the plot around its middle point. |
| <img src="/docs/latest/icons/ico-turntable-rotation.svg" alt="Turntable rotation mode icon" className="icon size-sm space-sm" />| Switch to turntable rotation mode - rotate the plot around its middle point while constraining one axis |
| <img src="/docs/latest/icons/ico-reset-axes.svg" alt="reset axes icon" className="icon size-sm space-sm" />| Reset axes to default position. |


### Debug Samples

View debug samples by metric at any iteration. The most recent iteration appears first. Use the viewer / player to inspect images, audio, video samples and do any of the following:

* Move to the same sample in a different iteration (move the iteration slider).
* Show the next or previous iteration's sample.
* Download the file <img src="/docs/latest/icons/ico-download.svg" className="icon size-md space-sm" />.
* Zoom.
* View the sample's iteration number, width, height, and coordinates.


<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot - Debug samples</summary>
<div className="cml-expansion-panel-content">

![Debug Samples tab](../img/webapp_tracking_43.png)

</div>
</details>

<br/>

<details className="cml-expansion-panel screenshot">
<summary className="cml-expansion-panel-summary">View a screenshot - Viewer </summary>
<div className="cml-expansion-panel-content">

![Debug Samples image viewer](../img/webapp_tracking_44.png)

</div>
</details>
<br/>

**To view debug samples:**

1. Click the **DEBUG SAMPLES** tab. The most recent iteration appears at the top.
1. Locate debug samples by doing the following:

    * Filter by metric. In the **Metric** list, choose a metric.
    * Show other iterations. Click <img src="/docs/latest/icons/ico-circle-older.svg" className="icon size-md space-sm" /> (Older images), <img src="/docs/latest/icons/ico-circle-newer.svg" className="icon size-md space-sm" /> (New images), or <img src="/docs/latest/icons/ico-circle-newest.svg" className="icon size-md space-sm" /> (Newest images).

**To view a debug sample in the viewer / player:**

1. Click the debug sample click the thumbnail.

1. Do any of the following:

    * Move to the same sample in another iteration - Move the slider, or click **<** (previous) or **>** (next).
    * Download the file - Click <img src="/docs/latest/icons/ico-download.svg" className="icon size-md space-sm" />.
    * Zoom
    * For images, locate a position on the sample - Hover over the sample and the X, Y coordinates appear in the legend below the sample.


## Tagging Experiments

Tags are user-defined, color-coded labels that can be added to experiments (and models), allowing to easily identify and
group experiments. Tags can show any text. For example, add tags for the type of remote machine experiments were executed
on, label versions of experiments, or apply team names to organize experimentation.

* To add tags and change tag colors:
    1. Click the experiment **>** Hover over the tag area **>** **+ADD TAG** or <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Bars menu" className="icon size-sm space-sm" /> (menu)
    1. Do one of the following:
        * Add a new tag - Type the new tag name **>** **(Create New)**.
        * Add an existing tag - Click a tag.
        * Change a tag's colors - Click **Tag Colors** **>** Click the tag icon **>** **Background** or **Foreground** **>** Pick a color **>** **OK** **>** **CLOSE**.
* To remove a tag - Hover over the tag **>** **X**.




## Locating the Experiment (Task) ID

* In the info panel, in the top area, to the right of the Task name, click **ID**. The Task ID appears.
