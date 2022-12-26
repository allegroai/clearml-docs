---
title: Version 1.5
---

### ClearML Agent 1.5.1

**New Features and Improvements**
* Upgrade requirements for `attrs`, `jsonschema`, `pyparsing`, `six`, and `pyjwt` [ClearML Agent GitHub issue #129](https://github.com/allegroai/clearml-agent/issues/129)
* Add default output URI selection to `clearml-agent init`
* Add `agent.disable_task_docker_override` configuration option to disable docker override specified in executing tasks
* Add `CLEARML_AGENT_FORCE_SYSTEM_SITE_PACKAGES` env var (default `true`) to allow overriding default `system_site_packages: true` 
behavior when running tasks in containers (docker mode and k8s-glue)

**Bug Fixes**
* Fix using deprecated types validator argument raises an error (deprecated even before `jsonschema` 3.0.0 and unsupported 
since 4.0.0)
* Fix pip support allowing multiple pip version constraints (by default, one for < Python 3.10 and one for >= Python 3.10)

### ClearML Agent 1.5.0

**New Features and Improvements**
* Add option to crash agent on exception using `agent.crash_on_exception` configuration setting [ClearML Agent GitHub issue #122](https://github.com/allegroai/clearml-agent/issues/122)
* Improve venv cache disabled message
* Upgrade packages for better Python 3.10 support
* Remove future package dependency (Python 2 is not supported for `clearml-agent`)
* Change default pip version used to `pip<21` for better Python 3.10 support
* Add support for operator `!=` in package version (mostly for better PyTorch resolving)
* Add support for PyTorch new `extra_index_url` repo (find the correct index url based on the cuda version, and let pip
do the rest)
* Make venv caching the default behavior
* Add support for `CLEARML_AGENT_DOCKER_ARGS_HIDE_ENV` environment variable (see `agent.hide_docker_command_env_vars` 
config option)
* Ping executing tasks to make sure the server does not consider them stale (set using the `agent.task_ping_interval_sec` 
configuration option, defaults to every 120 seconds)

**Bug Fixes**
* Fix docker extra arguments showing up in configuration printout
* Fix an issue with running on Python 3.10 / 3.11
* Fix cached git token prevents cloning repository (using `agent.enable_git_ask_pass` forcing the agent to use `GIT_ASKPASS` 
for user/password when cloning/fetching repositories)
* Fix setting `CLEARML_API_DEFAULT_REQ_METHOD` raises an error
* Fix `get_task_session()` may cause an old copy of the `APIClient` to be used containing a reference to the previous session
* K8s Glue
  * Fix `agent.system_site_packages` is not turned on by default in k8s glue
  * Make sure git_user/pass is passed to the task pod
  * Remove support for `kubectl run`

### ClearML SDK 1.5.0

**New Features and Improvements**
* Add support for single value metric reporting ClearML GitHub issue [ClearML GitHub issue #400](https://github.com/allegroai/clearml/issues/400)
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
