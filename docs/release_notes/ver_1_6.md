---
title: Version 1.6
---

### ClearML SDK 1.6.4

**Bug Fix**
* Fix `APIClient` fails when calling `get_all` endpoints with API 2.20 (affects CLI tools such as `clearml-session`)

### ClearML SDK 1.6.3

**New Features and Improvements**
* Add option to specify an endpoint URL when creating S3 resource service [ClearML GitHub issue #673](https://github.com/allegroai/clearml/issues/673)
* Add support for providing `ExtraArgs` to boto3 when uploading files using the `sdk.aws.s3.extra_args` configuration option
* Add support for Server API 2.20
* Add `Task.get_num_enqueued_tasks()` to get the number of tasks enqueued in a specific queue
* Add support for updating model metadata using `Model.set_metadata()`, `Model.get_metadata()`, `Model.get_all_metadata()`, 
  `Model.get_all_metadata_casted()`, and `Model.set_all_metadata()`
* Add `Task.get_reported_single_value()`
* Add a retry mechanism for models and artifacts upload
* Pipelines with empty configuration takes it from code
* Add support for running pipeline steps on preemptible instances
* Datasets
  * Add description to Datasets
  * Add wild-card support in `clearml-data`

**Bug Fixes**
* Fix dataset download [ClearML GitHub issue #713](https://github.com/allegroai/clearml/issues/713)
* Fix lock is not released after dataset cache is downloaded [ClearML GitHub issue #671](https://github.com/allegroai/clearml/issues/671)
* Fix deadlock might occur when using process pool large number processes [ClearML GitHub issue #674](https://github.com/allegroai/clearml/issues/674)
* Fix 'series' not appearing on UI when using `logger.report_table()` [ClearML GitHub issue #684](https://github.com/allegroai/clearml/issues/684)
* Fix `Task.init()` docstring to include behavior when executing remotely [ClearML GitHub PR #737](https://github.com/allegroai/clearml/pull/737)
* Fix `KeyError` when running remotely and no params were passed to click [ClearML Agent GitHub issue #111](https://github.com/allegroai/clearml-agent/issues/111)
* Fix full path is stored when uploading a single artifact file
* Fix passing non-alphanumeric filename in `sdk.development.detect_with_pip_freeze`
* Fix Python 3.6 and 3.10 support
* Fix mimetype cannot be `None` when uploading to S3
* Pipelines
  * Fix pipeline DAG
  * Add support for pipelines with spot instances
  * Fix pipeline proxy object is always resolved in main pipeline logic
  * Fix pipeline steps with empty configuration should try and take it from code
  * Fix wait for jobs based on local/remote pool frequency
  * Fix `UniformIntegerParameterRange.to_list()` ignores min value
  * Fix pipeline component returning a list of length 1
* Datasets
  * Fix `Dataset.get()` does not respect `auto_create`
  * Fix getting datasets fails with new ClearML Server v1.6
  * Fix datasets can't be queried by project/name alone
  * Fix adding child dataset to older parent dataset without stats
* Fix error when connecting an input model
* Fix deadlocks, including:
  * Change thread Event/Lock to a process fork safe threading objects
  * Use file lock instead of process lock to avoid future deadlocks since python process lock is not process safe 
    (killing a process holding a lock will Not release the lock)
* Fix `StorageManager.list()` on a local Windows path
* Fix model not created in the current project
* Fix `keras_tuner_cifar` example raises DeprecationWarning and ValueError

### ClearML Server 1.6.0
**New Features and Improvements**
* New ClearML Datasets UI pages for tracking dataset versions and exploring version lineage and contents
* Add history navigation to experiments plots UI page [ClearML GitHub issues #81](https://github.com/allegroai/clearml/issues/81) & [#255](https://github.com/allegroai/clearml/issues/255): 
  * Plots page shows last reported plot for each metric/variation combination
  * Single plot view provides history navigation slider
* Add single value scalar reporting: Single value scalars are aggregated into a summary table in the experiment’s scalars 
  UI page [ClearML GitHub issues #400](https://github.com/allegroai/clearml/issues/400)
* Add "show hidden projects" control [ClearML GitHub issues #694](https://github.com/allegroai/clearml/issues/694)
* Improve UI projects page setting persistence - User's last chosen setting for recent/name sorting and team/personal 
  filter is saved [ClearML GitHub issues #353](https://github.com/allegroai/clearml/issues/353)
* Improve UI presentation for object IDs:
  * Display shortened ID next to task name 
  * Display full ID in tooltip  
  * Copy-to-clipboard on click
* Add "Clear all active filters" button to Projects and Pipelines details view
* Add notification for UI session expiration
* Add ID columns to UI object tables (experiments, models, etc.) 
* Add "Info" section to "Details" tab of UI experiment comparison
* Add "loading" indicator for HTML debug samples
* Improve UI text editor behavior: when applicable, cursor returns to most recent edit, otherwise, cursor goes to start of text
* Maintain UI viewing mode when restoring archived items

**Bug Fixes**
* Fix experiment selection with 'Shift' key in UI experiment table not working [ClearML Server GitHub issues #139](https://github.com/allegroai/clearml-server/issues/139)
* Fix UI search error message interferes with inputting search query [ClearML Server GitHub issues #138](https://github.com/allegroai/clearml-server/issues/138)
* Fix refresh breaks UI breadcrumbs ClearML Server [ClearML Server GitHub issues #142](https://github.com/allegroai/clearml-server/issues/142)
* Fix UI Workers and Queues page displays incorrect queue metrics
* Fix failure to publish models whose generating task was reset
* Fix listed models in UI pipeline run info panel doesn't link to model 
* Fix "Load more" button disappears from UI experiment page 	
* Fix breadcrumb link to parent project does not navigate to the parent's project page
* Fix spaces deleted while typing query in UI  search bars
* Fix UI plots not loading in experiments 
* Fix UI experiment debug sample full screen failing to display multiple metrics
* Fix using search in UI tables removes custom columns
* Fix experiment debug samples remain in file server after experiment deletion
* Fix UI pipeline page sorting not working 
* Fix UI scalar comparison does not display task tags
* Fix smoothed UI plots obscured by original graphs
* Fix broken task name links in UI scalar and hyperparameter comparison pages 
* Fix "My work" filter not filtering out sub-projects 
* Fix generic project link navigates to a blank page
* Fix UI experiment's model link inefficient use of screen real estate
* Fix network error causes UI models and experiments auto-refresh to stop working
* Fix Empty path menu appearing in UI breadcrumbs when there are no intermediary projects
* Fix long loading time in UI experiment comparison
* Fix slow performance of UI experiment plots and scalars in Chrome
* Fix Delete action not appearing in bottom bar of UI pipeline runs table archive
* Fix UI experiments not displaying dataset tasks created with `clearml` version lower than 1.6 
* Fix UI projects with dataset tasks created with `clearml` version lower than 1.6 display incorrect statistics 
* Fix maximizing image-plot chart in UI causes CORS error
* Fix UI experiment's "Select A Public Model" modal missing "Updated" and "Description" column data
* Fix UI experiments table's project filter displays duplicates
* Fix UI projects display incorrect statistics
* Fix clicking project with only hidden sub-projects doesn't navigate to the project's UI page
* Fix passing empty string parameter name to `Task.set_parameters` causes a 500 error
* Fix UI model page General tab's layout
* Fix using UI experiment plot navigation menu pushes WebApp's top navigation bar
* Fix example pipeline project created with "Generate Example" is empty
* Fix example pipeline created with "Generate Example" is not displayed in project dashboard when "Show hidden projects" is enabled
* Fix UI table/info-panel toggle doesn't update when switching viewing modes

### ClearML SDK 1.6.2

**Bug Fix**

* Fix format string construction sometimes causing delayed evaluation errors [ClearML GitHub issue #706](https://github.com/allegroai/clearml/issues/706)

### ClearML SDK 1.6.1

**Bug Fixes**
* Fix `Task.get_tasks()` fails when sending `search_hidden=False`
* Fix LightGBM example shows UserWarning

### ClearML SDK 1.6.0

**New Features and Improvements**
* New Hyperparameter Optimization CLI `clearml-param-search`
* Improvements to ClearML Data
  * Add support for a new ClearML Data UI in the ClearML WebApp
  * Add `clearml-data` new options set-description and rename
* Add random seed control using `Task.set_random_seed()` allowing to set a new random seed for task initialization or 
  to disable it
* Improve error messages when failing to download an artifact
* Improve error messages when testing for permissions

**Bug Fixes**
* Fix axis range settings when logging plots
* Fix `Task.get_project()` to return more than 500 entries [ClearML GitHub issue #612](https://github.com/allegroai/clearml/issues/612)
* Fix pipeline progress calculation
* Fix `StorageManager.upload_folder()` returns `None` for both successful and unsuccessful uploads
* Fix script path capturing stores a relative path and not an absolute path
* Fix HTML debug samples are saved incorrectly on S3
* Fix Hydra deprecation warning in examples
* Fix missing requirement for TensorBoardX example

**Known Issues**
* When removing an image from a Dataset, its preview image won't be removed
* Moving Datasets between projects still shows the Dataset in the old project
