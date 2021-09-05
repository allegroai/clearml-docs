---
title: Cleanup Service
---

The cleanup service deletes: 
* Archived Tasks and their associated model checkpoints (snapshots)
* Other artifacts 
* Debug samples 

The cleanup service can be configured with parameters specifying which Archived Tasks to delete and when to delete them. 
Its Task name is `Cleanup Service` and it is associated with the project `DevOps`. 

`Cleanup Service` can be configured in the **ClearML Web UI**, and then the Task can be enqueued for execution in the 
 [ClearML services mode](../../clearml_agent.md#services-mode). 
It is pre-loaded in **ClearML Server** and its status is *Draft* (editable). Or, run the script [cleanup_service.py](https://github.com/allegroai/clearml/blob/master/examples/services/cleanup/cleanup_service.py), 
with options to run locally or as a service. 

## Prerequisites

* **ClearML Agent** is [installed and configured](../../clearml_agent.md#installation).
* **ClearML Agent** is launched in [services mode](../../clearml_agent.md#services-mode).

## Running the Cleanup Service

### Running Using the ClearML Web UI

#### Step 1. Configuring the Cleanup Service

1. In the **ClearML Web UI** **Projects** page, click the **DevOps** project **>** click the **Cleanup Service** Task.
1. In the info panel, click the **CONFIGURATION** tab.
1. In the **GENERAL** section, hover over the parameter area **>** **EDIT**.
1. Configure the service parameters:
    * **cleanup_period_in_days** - Repeat the cleanup service at this interval, in days. The default value is **1.0** (run once a day).
    * **delete_threshold_days** - Tasks older than this number of days will be deleted. The default value is **30** days.
    * **force_delete**
        * **True** - Delete all Tasks older than **delete_threshold_days**.
        * **False** - Delete only status **created** (*Draft*) Tasks. The default value is **False**.
    * **run_as_service**
        * **True** - Run the cleanup as a service (it repeats regularly).
        * **False** - Run the Task once locally. The default value **False**.

#### Step 2. Enqueuing the cleanup service

* Right click the **Cleanup Service** Task **>** **Enqueue** **>** In the queue list, select **services** **>** **ENQUEUE**.

### Running Using the Script

The [cleanup_service.py](https://github.com/allegroai/clearml/blob/master/examples/services/cleanup/cleanup_service.py) allows 
to enqueue the cleanup service to run in **ClearML Agent** services mode, because the `run_as_service` parameter is set to `True`.

    python cleanup_service.py
    
## The Cleanup Service Code

[cleanup_service.py](https://github.com/allegroai/clearml/blob/master/examples/services/cleanup/cleanup_service.py) creates 
a **ClearML** API client session to delete the Tasks. It creates an `APIClient` object that establishes a session with the 
**ClearML** backend (**ClearML Server**), and accomplishes the cleanup by calling:

* `Tasks.get_all` to get a list of Tasks to delete, providing the following parameters:

    * `system_tags` - Get only Tasks tagged as `archived`.
    * `only_fields` - Get only the Task `id`. Only the Task `id` is needed to delete Tasks and its output.
    * `order_by` - Order the list of Tasks returned by last activity timestamp, in descending order (most recent first).
    * `page_size` - Set the number of Tasks returned in each page (the last page may contain fewer results).
    * `page` - Set the number of the page in the resulting list of Tasks to return.
    * `status_changed` - Get Tasks whose last status change is older than then delete threshold (in seconds).

* `Tasks.delete` - Delete a Task, optionally forcing the deletion of a Task, even if its status is not *Draft*.  