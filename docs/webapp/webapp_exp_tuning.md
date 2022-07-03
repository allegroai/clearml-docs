---
title: Tuning Experiments
---

Tune experiments and edit an experiment's execution details, then execute the tuned experiments on local or remote machines.

## To Tune an Experiment and Execute it Remotely:

1. Locate the experiment. Open the experiment's Project page from the Dashboard or the main Projects page.

    * On the Dashboard,
      * Click on an experiment from RECENT EXPERIMENTS
      * In RECENT PROJECTS **>** click on a project card **>** click experiment
      * In RECENT PROJECTS **>** click **VIEW ALL** **>** click the project card **>** click experiment
    * On the Projects page, click project card, or the **All projects** card **>** click experiment

1. Clone the experiment. In the experiments table:

    1. Click **Clone**, and a **Clone experiment** box will pop up.
    1. In the **Project** textbox, select or create a project. To search for another project, start typing the project name.
       To create a new project, type new experiment name and click **Create New**.
    1. Enter an optional description.
    1. Click **CLONE**.

    The cloned experiment's status is now *Draft*.

1. Edit the experiment. See [modifying experiments](#modifying-experiments).

1. Enqueue the experiment for execution. Right click the experiment **>** **Enqueue** **>** Select a queue **>**
   **ENQUEUE**.

    The experiment's status becomes *Pending*. When the worker assigned to the queue fetches the Task (experiment), the
   status becomes *Running*. The experiment can now be tracked and its results visualized.

## Modifying Experiments

Experiments whose status is *Draft* are editable (see the [user properties](#user-properties) exception). In the **ClearML
Web UI**, edit any of the following

* [Source code](#source-code)
* [Output destination for artifacts](#output-destination)
* [Base Docker image](#base-docker-image)
* [Log level](#log-level)
* [Hyperparameters](#hyperparameters) - Parameters, TensorFlow Definitions, command line options, environment variables, and user-defined properties

:::note
User parameters are editable in any experiment, except experiments whose status is *Published* (read-only).
:::

* [Configuration objects](#configuration-objects) - Task model description
* [Initial weight input model](#initial-weights-input-model)
* [Output destination for artifacts storage](#output-destination)

### Execution Details



#### Source Code

Select source code by changing any of the following:

* Repository, commit (select by ID, tag name, or choose the last commit in the branch), script, and /or working directory.
* Installed Python packages and / or versions - Edit or clear (remove) them all.
* Uncommitted changes - Edit or clear (remove) them all.

**To select different source code:**

* In the **EXECUTION** tab, hover over a section **>** **EDIT** or (**DISCARD DIFFS** for **UNCOMMITTED CHANGES**) **>**
  edit **>** **SAVE**.



#### Base Docker Image
Select a pre-configured Docker that **ClearML Agent** will use to remotely execute this experiment (see [Building Docker containers](../clearml_agent.md#exporting-a-task-into-a-standalone-docker-container)).

**To add, change, or delete a base Docker image:**

* In **EXECUTION** **>** **AGENT CONFIGURATION** **>** **BASE DOCKER IMAGE** **>** hover **>** **EDIT** **>**
  Enter the base Docker image.



#### Output Destination

Set an output destination for model checkpoints (snapshots) and other artifacts. Examples of supported types of destinations
and formats for specifying locations include:

* A shared folder: `/mnt/share/folder`
* S3: `s3://bucket/folder`
* Google Cloud Storage: `gs://bucket-name/folder`
* Azure Storage: `azure://company.blob.core.windows.net/folder/`

**To add, change, or delete an artifact output destination:**

* In **EXECUTION** **>** **OUTPUT** > **DESTINATION** **>** hover **>** **EDIT** **>** edit **>** **SAVE**.


:::note Set Output Destination for Artifacts
Also set the output destination for artifacts in code (see the `output_uri` parameter of the
[`Task.init`](../references/sdk/task.md#taskinit)
method), and in the ClearML configuration file 
for all experiments (see [`default_output_uri`](../configs/clearml_conf.md#config_default_output_uri)
on the ClearML Configuration Reference page).
:::

#### Log Level

Set a logging level for the experiment (see the standard Python [logging levels](https://docs.python.org/3/howto/logging.html#logging-levels)).

**To add, change, or delete a log level:**

* In **EXECUTION** **>** **OUTPUT** **>** **LOG LEVEL** **>** hover **>** **EDIT** **>** Enter the log level.

### Configuration



#### Hyperparameters

Add, change, or delete hyperparameters, which are organized in the **ClearML Web UI** in the following sections:

* **Args** - Command line arguments and all older experiments parameters, except TensorFlow definitions (logged from code,
  `argparse` argument automatic logging).

* **TF_DEFINE** - TensorFlow definitions (from code, TF_DEFINEs automatic logging).

* **General** - Parameter dictionaries (from code, connected to the Task by calling the [Task.connect](../references/sdk/task.md#connect)
  method).

* Environment variables - Tracked if the `CLEARML_LOG_ENVIRONMENT` environment variable was set (see this [FAQ](../faq.md#track-env-vars)).

* Custom named parameter groups (see the `name` parameter in [Task.connect](../references/sdk/task.md#connect)).

**To add, change, or delete hyperparameters:**

* In the **CONFIGURATION** tab **>** **HYPER PARAMETERS** > **General** **>** hover **>** **EDIT** **>** add, change,
  or delete keys and /or values **>** **SAVE**.



#### User Properties

User properties allow storing any descriptive information in key-value pair format. They are editable in any experiment,
except experiments whose status is *Published* (read-only).

**To add, change, or delete user properties:**

* In **CONFIGURATION** **>** **USER PROPERTIES** > **Properties** **>** hover **>** **EDIT** **>** add, change, or delete
  keys and /or values **>** **SAVE**.



#### Configuration Objects

**To add, change, or delete the Task model configurations:**

* In **CONFIGURATION** **>** **CONFIGURATION OBJECTS** **>** **GENERAL** **>** hover **>** **EDIT** or **CLEAR** (if the
  configuration is not empty).

### Artifacts

### Initial Weights Input Model

Edit model configuration and label enumeration, choose a different initial input weight model for the same project or any
other project, or remove the model.

:::note
The models are editable in the **MODELS** tab, not the **EXPERIMENTS** tab. Clicking the model name hyperlink shows the
model in the **MODELS** tab.
:::

**To select a different model:**

1. In **ARTIFACTS** **>** **Input Model** **>** Hover and click **EDIT**.
1. If a model is associated with the experiment, click <img src="/docs/latest/icons/ico-edit.svg" alt="Edit Pencil" className="icon size-md" />.
1. In the **SELECT MODEL** dialog, select a model from the current project or any other project.

**To edit a model's configuration or label enumeration:**

1. Click the model name hyperlink. The model details appear in the **MODELS** tab.
1. Edit the model configuration or label enumeration.

    * Model configuration - In the **NETWORK** tab **>** Hover and click **EDIT**. **>** CLick **EDIT** or **CLEAR** (to
      remove the configuration).

       Users can also search for the configuration (hover over the configuration textbox, the search box appears) and copy the
      configuration to the clipboard (hover and click <img src="/docs/latest/icons/ico-clipboard.svg" alt="Copy Clipboard" className="icon size-md" />).

    * Label enumeration - In the **LABELS** tab **>** Hover and click **EDIT** **>** Add, change, or delete label
      enumeration key-value pairs.

**To remove a model from an experiment:**

* Hover and click **EDIT** **>** Click <img src="/docs/latest/icons/ico-trash.svg" alt="Trash" className="icon size-md" />
