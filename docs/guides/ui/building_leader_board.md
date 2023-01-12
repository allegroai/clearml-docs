---
title: Tracking Leaderboards
---

In this tutorial, we will set up a tracking leaderboard. A tracking leaderboard allows easy monitoring of experiments 
using a customized [experiments table](../../webapp/webapp_exp_table.md) with auto refresh for continual updates.

The tracking leaderboard can be customized to include columns with information about:
* Experiment status
* Elapsed time since the experiment started and last updated
* Most recent iteration
* Metrics
* Hyperparameters
* And more. 

Bookmark the leaderboard in the browser to reuse and share the leaderboard URL with other users.

For this tutorial, use one of the following as a project:

* Recommended: One of your projects with more than one experiment. 
* Clone the [clearml](https://github.com/allegroai/clearml) repository and execute some of the example scripts.

## Step 1: Select a Project

The leaderboard will track experiments in one or all projects. 

Begin by opening the **ClearML Web UI** and selecting a project, by doing one of the following:
* On the Dashboard, click a project card or **VIEW ALL**.
* On the Projects page, click a project card or the **All projects** card.

## Step 2: Filter the Experiments

The experiments table allows filtering experiments by experiment name, type, and status.

**Apply any combination of the following filters:**

* Name - Use the search bar to find experiments containing any search term.
* Type - Click the **TYPE** column's filter and then on the list select any of the following:
    * **Training**
    * **Testing**
    * **Controller**
    * **Data Processing**
    * And others, depending on the types of tasks in the project 
* Status - Click the **STATUS** column's filter and then on the list select any of the following:

    * **Draft** - The experiment is not running.
    * **Pending** - The experiment is in a queue waiting to be run by a worker.
    * **Running** - The experiment is currently running by a worker.
    * **Completed** - The experiment ran and terminated successfully.
    * **Failed** - The experiment ran and terminated with an error.
    * **Aborted** - The experiment ran and was manually or programmatically terminated.
    * **Published** - The experiment is not running, it is preserved as read-only.

## Step 3: Hide the Defaults Column

Customize the columns on the tracking leaderboard by hiding any of the default columns shown below.

**To select the defaults, do the following:**

1. Click settings. 
1. Select / clear any combination of the default columns from the following:

    * **TYPE** - The type of experiment: training, testing, or other, depending on the types of experiments in the project.
    * **NAME** - The name of the experiment.
    * **STATUS** - The status of the experiment.
    * **PROJECT** - The project name.
    * **USER** - The user creating or running the experiment.
    * **STARTED** - The elapsed time since the experiment started running.
    * **UPDATED** - The elapsed time since the experiment update.
    * **ITERATION** - The last iteration of the experiment. For experiments with a status of Running, this is the most recent iteration. For Completed, Aborted, and Failed experiments, this is the final iteration.

## Step 4: Show Metrics or Hyperparameters

The leaderboard can contain any combination of metrics and hyperparameters. For each metric, choose whether to view the last (most 
recent), minimum, and / or maximum values.

**To select metrics or hyperparameters:**

1. Click settings. 
1. For metrics, click **+ METRIC**, expand a metric category, and then select the metric checkboxes of those to show in 
   the leaderboard, and select the metric values (min / max / last).
1. For hyperparameters, click **+ HYPERPARAMETERS**, and then select the hyperparameter checkboxes of those to show in the leaderboard.

## Step 5: Enable Auto Refresh

Auto refresh allows monitoring the progress of experiments in real time. It is enabled by default. 

**To enable / disable auto refresh:**

* Hover over refresh and then check / uncheck the **Auto Refresh** checkbox.

## Step 6: Save the Tracking Leaderboard

The URL for **ClearML Web UI** now contains parameters and values for the customized leaderboard. Bookmark it to be able 
to return to the leaderboard and monitor the experiments.

:::important 
Share the leaderboard with another user by copying and sharing the URL.
:::