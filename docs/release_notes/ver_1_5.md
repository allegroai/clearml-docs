---
title: Version 1.5
---

### ClearML SDK 1.5.0

**New Features and Improvements**
* Add support for single value metric reporting ClearML GitHub issue [ClearML Github issue #400](https://github.com/allegroai/clearml/issues/400)
* Add support for specifying parameter sections in `PipelineDecorator` [ClearML GitHub issue #629](https://github.com/allegroai/clearml/issues/629)
* Add support for parallel uploads and downloads (upload / download and zip / unzip of artifacts)
* Add support for specifying execution details (repository, branch, commit, packages, image) in `PipelineDecorator`
* Bump PyJWT version due to "*Key confusion through non-blocklisted public key formats*" vulnerability
* Add support for AWS Session Token (using boto3's `aws_session_token` argument)

**Bug Fixes**
* Fix `Task.get_projects()` retrieves only the first 500 results [ClearML GitHub issue #612](https://github.com/allegroai/clearml/issues/612)
* Fix failure to delete artifacts stored in Azure [ClearML GitHub issue #660](https://github.com/allegroai/clearml/issues/660)
* Fix Process Pool hangs at exit [ClearML GitHub issue #674](https://github.com/allegroai/clearml/issues/674)
* Fix number of unpacked values when syncing a dataset [ClearML GitHub issue #682](https://github.com/allegroai/clearml/issues/682)
* Fix FastAI DeprecationWarning [ClearML GitHub PR #683](https://github.com/allegroai/clearml/issues/683)
* Fix `StorageManager.download_folder()` crash
* Fix pipelines can't handle `None` return value
* Fix pre-existing pipeline raises an exception
* Fix deprecation warning in the `image_reporting` example
* Fix patches are kept binded after `Task.close()` is called
* Fix running pipeline code remotely without first running it locally (i.e. no configuration on the Task)
* Fix local task execution with empty working directory
* Fix permission check fails when using local storage folder that does not exist
* Fix pipeline `add_function_step` breaks in remote execution
* Fix wrong mimetype used for any file or folder uploaded to S3 using `StorageManager`
* Add missing default `default_cache_manager_size` in configuration files

### ClearML Server 1.5.0

**New Features and Improvements**
* Redesign UI tables info panel:
    * Redesign experiment status banner
    * Display all experiment tabs in single line
    * Move experiment action buttons to the top right
* Add UI adherence to user specified plot dimensions [ClearML GitHub issue #587](https://github.com/allegroai/clearml/issues/587)
* Add row highlight to experiment textual comparison UI [ClearML GitHub issue #581](https://github.com/allegroai/clearml/issues/581)
* Add UI "Delete" action for Pipelines
* Add UI indicator for task and pipeline progress
* Add UI API credentials label "Edit" action
* Add option to create queues on-the-fly when enqueuing tasks in UI
* Add "Number of Workers" column to UI queues table
* Add pipeline results to UI dashboard search

**Bug Fixes**
* Fix UI experiment debug samples disappearing after refresh [ClearML Server GitHub issue #136](https://github.com/allegroai/clearml-server/issues/136)
* Fix deleting tasks sometimes raises errors [ClearML GitHub issue #632](https://github.com/allegroai/clearml/issues/632)
* Fix only partial task log shown when running on ES with multiple shards
* Fix move task to trash is not thread-safe
* Fix UI Project overview metric snapshot not showing
* Fix no progress indicator when performing off-screen selection in UI experiments table
* Fix removing long pipeline tags doesn't work
* Fix UI experiment scalar comparison graph titles are cropped with no available tooltips
* Fix UI model table status column filters incorrectly when multiple statuses are selected. 
* Fix unreadable plot data causes UI to crash
* Fix UI project cards displaying incorrect task counts
* Fix hover over system tags doesn't display full tag name
* Fix `.txt` file debug sample previews are unreadable
* Fix UI table/info-panel toggle doesn't update when clicking project breadcrumbs
* Fix UI experiment debug samples leave artifacts when empty 
