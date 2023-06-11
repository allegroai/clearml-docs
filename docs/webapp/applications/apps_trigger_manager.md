---
title: Trigger Manager
--- 

:::important Enterprise Feature
The Trigger Manager application is available under the ClearML Enterprise plan
:::

ClearML's Trigger Manager Application lets you define tasks to be run when predefined events occur. The Trigger Manager 
is useful for automating your workflows: trigger training a model whenever a new dataset is tagged with a specific tag, 
or running a pipeline when a new model is published.

Each trigger is configured to run a ClearML task when its specifications are met. 

The events which can activate a trigger include:
* Status change of an object (task, dataset, or model)
* Tagging of an object
* For task triggers, crossing a specified metric threshold 

The app monitors your workspace for trigger events and will launch copies of the specified task when the trigger is activated.

## Trigger Manager Instance Configuration 

* **Name** - Name for the app instance. This will appear in the instance list
* **Triggers** - Events whose occurrence will cause a task to be executed
  * Task ID - ID of a ClearML task to clone and enqueue 
  for execution when the trigger is activated. 
  * Target Project - The project where the task will be cloned to
  * Queue - The ClearML Queue to which cloned tasks are enqueued (make sure an agent is assigned to that queue)
  * Override Task Hyperparameters - Override parameters in the cloned task. Input the original task's configuration 
  parameter name (including section name e.g. Args/lr). Use UNIX shell-like syntax (splits on whitespace)
  * Trigger Type - Triggers can be activated by model, dataset, and/or task activity. Choose which object type to monitor.
    * Object selection criteria: 
      * Match Project - Monitor objects in projects that match this name only
      * Match Name - Monitor objects that match this name. Supports both string and Python regex match
      * Trigger on Any Tags - Trigger if the object is tagged with *ANY* of the specified tags (comma separated list)
      * Trigger on All Tags - Trigger if the object is tagged with *ALL* of the specified tags (comma separated list)
    * Trigger events for Datasets and Models:
      * Trigger on Publish - Activate trigger when a Dataset/Model is published
      * Trigger on Archive - Activate trigger when a Dataset/Model is archived
    * Trigger events for Tasks:
      * Trigger on Status Change - Activate trigger when a task's status changes to the selected state.
      * Trigger on scalar - Activate trigger when a task's specific metric crosses a threshold: 
        * Metric - Title of metric
        * Variant - Metric's variant (series) 
        * Condition - Activate trigger if the value goes over/under the specified threshold 
        * Threshold - The metric threshold to monitor
  * Add item - Add another trigger 
* **Polling frequency** - Time period in minutes at which the workspace is polled for trigger events 


## Dashboard 

The Trigger Manager app instance's dashboard displays its console log. The log  shows the instance’s activity: periodic 
polling, and events triggered

![Trigger dashboard](../../img/apps_trigger_manager_dashboard.png)