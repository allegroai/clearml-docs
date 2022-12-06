---
title: Version 1.8
---

### ClearML SDK 1.8.3

**Bug Fixes**
* Set GCS credentials to `None` if invalid service account credentials are provided [ClearML GitHub issue #840](https://github.com/allegroai/clearml/issues/840)
* Fix a sync issue when loading deferred configuration

### ClearML SDK 1.8.2

**New Features and Improvements**
* Added `VCS_ENTRY_POINT` environment variable that overrides ClearML's entrypoint auto-detection

**Bug Fixes**
* Fix all parameters returned from a pipeline are considered strings
* Fix `Task.set_parameters()` does not add parameter type when parameter exists but does not have a type

### ClearML Server 1.8.0

**New Features and Improvements**
* Support `/` delimited project names for on-the-fly nested project creation in UI operations [ClearML Server GitHub issue #151](https://github.com/allegroai/clearml-server/issues/151) 
* Add keyboard shortcut iteration navigation in full screen view of debug samples and plots
* Add "Don't show again" option for UI notification when archiving tasks [ClearML Server GitHub issue #149](https://github.com/allegroai/clearml-server/issues/149)
* Add task reset/delete modal automatically closes when no additional information is provided
* Add parent project name in UI dataset and pipeline cards
* Move UI plot legends to bottom of plot

**Bug Fixes**
* Fix task artifacts not deleted from file server when task deleted via UI [ClearML GitHub issue #801](https://github.com/allegroai/clearml/issues/801)
* Fix deleting pipeline projects via UI fails [ClearML GitHub issue #798](https://github.com/allegroai/clearml/issues/798)
* Fix multiple selection with `Shift` key in UI experiment table not working [ClearML Server GitHub issue #139](https://github.com/allegroai/clearml-server/issues/139)
* Fix disappearing user filter in UI "All Experiments" table [ClearML Web GitHub issue #33](https://github.com/allegroai/clearml-web/issues/33)
* Fix UI Dashboard missing My Work / Team Work filter
* Fix navigating to Scalars and Plots tabs in UI experiment comparison freezes browser
* Fix project stats do not exclude dataset and annotation tasks
* Fix subproject with no experiments displayed as "undefined" in parent project page 
* Fix maximizing UI combined scalar plots displays split scalar plots 
* Fix adding description to UI dataset does not work
* Fix empty "parent" field in task cloned in UI
* Fix running UI application instances can be deleted
* Fix queue option list does not open in UI enqueue modal

### ClearML SDK 1.8.1

**New Features and Improvements**
* Raise error on failed uploads [ClearML GitHub issue #810](https://github.com/allegroai/clearml/issues/819)
* Add hyperdataset examples [ClearML GitHub PR #823](https://github.com/allegroai/clearml/commit/f6b9efe54e1246adba4036c56bc6e8a0bdb99948)
* Change `report_event_flush_threshold` default to 100
* Add `ModelInfo.weights_object()` to store callback access to the actual model object being stored (valid for both 
pre/post save calls, otherwise `None`)
* Support `num_workers` in dataset operation
* Support max connections setting for Azure storage using the `sdk.azure.storage.max_connection` configuration option

**Bug Fixes**
* Fix clearml logger default level cannot be changed [ClearML GitHub issue #741](https://github.com/allegroai/clearml/issues/741)
* Fix Hydra doesn't get overridden information from ClearML [ClearML GitHub issue #751](https://github.com/allegroai/clearml/issues/751)
* Fix `StorageManager.list(“s3://..”, with_metadata=True)` doesn't work
* Fix `ModelsList.keys()` is missing
* Fix `CLEARML_DEFERRED_TASK_INIT=1` doesn't work
* Fix default API method does not work when set in configuration

### ClearML SDK 1.8.0

**New Features and Improvements**
* Add tarfile member sanitization to `extractall()`[ClearML GitHub PR #803](https://github.com/allegroai/clearml/pull/803)
* Add `Task.delete_artifacts()` with `raise_on_errors` argument [ClearML GitHub issue #805](https://github.com/allegroai/clearml/issues/805)
* Add CI/CD example [ClearML GitHub PR #815](https://github.com/allegroai/clearml/pull/815)
* Limit number of `_serialize` requests when adding list of links with `add_external_files()` [ClearML GitHub issue #813](https://github.com/allegroai/clearml/issues/813)
* Add support for connecting Enum values as parameters
* Improve Colab integration (store entire colab, not history)
* Add `clearml.browser_login` to authenticate browser online sessions such as Colab, Jupyter Notebooks etc.
* Remove `import_bind` from stack trace of import errors
* Add `sdk.development.worker.report_event_flush_threshold` configuration option to control the number of events to trigger a report
* Return stub object from `Task.init()` if no `clearml.conf` file is found
* Improve manual model uploading example
* Remove deprecated demo server

**Bug Fixes**
* Fix passing `compression=ZIP_STORED` (or 0) to `Dataset.upload()` uses `ZIP_DEFLATED` and overrides the user-supplied 
argument [ClearML GitHub PR #812](https://github.com/allegroai/clearml/pull/812)
* Fix `unique_selector` is not applied properly on batches after the first batch. Remove default selector value since 
it does not work for all event types (and we always specify it anyway)
* Fix `clearml-init` colab detection
* Fix cloning pipelines run with `start_locally()` doesn't work
* Fix if project has a default output uri there is no way to disable it in development mode (manual), allow passing 
`output_uri=False` to disable it
* Fix git remote repository detection when remote is not "origin"
* Fix reported images might not all be reported when waiting to complete the task
* Fix `Dataset.get_local_copy()` deletes the source archive if it is stored locally
* Fix too many parts will cause preview to inflate Task object beyond its 16MB limit - set a total limit of 320kbs
* Fix media preview is created instead of a table preview
* Fix `task.update_output_model()` should always upload local models to a remote server
* Fix broken pip package might mess up requirements detection