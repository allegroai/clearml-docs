---
title: Version 1.9
---

### ClearML SDK 1.9.1

**New Features and Improvements**
* Add signature version to `boto3` configuration [ClearML GitHub issue #883](https://github.com/allegroai/clearml/issues/883)
* Allow requesting custom token expiration using the `api.auth.req_token_expiration_sec` configuration setting
* Add Python 3.11 support

**Bug Fixes**
* Fix `UniformParameterRange.to_list` throws error when step size is not defined [ClearML GitHub issue #858](https://github.com/allegroai/clearml/issues/858)
* Fix `StorageManager.list()` does not return size metadata [ClearML GitHub issue #865](https://github.com/allegroai/clearml/issues/865)
* Fix storage with path substitutions [ClearML GitHub issue #825](https://github.com/allegroai/clearml/issues/825)
* Fix extras in ClearML installation prevents clearml from being included in requirements [ClearML GitHub issue #867](https://github.com/allegroai/clearml/issues/867)
* Fix metadata set on an uploaded model object is not accessible [ClearML GitHub issue #890](https://github.com/allegroai/clearml/issues/890)
* Fix Azure storage upload not working [ClearML GitHub issue #868](https://github.com/allegroai/clearml/issues/868)
* Fix `task.connect` list of dicts parsed incorrectly in remote
* Fix casting `None` to `int` fails uploads and permission checks
* Fix numpy 1.24 support
* Fix `clearml-data` previews are saved on file server even when `output_uri` is specified
* Fix connecting a dictionary to task sometimes raises an exception 
* Fix authentication headers are not set on substituted fileserver URLs
* Fix `Task.get_project_id()` cannot find hidden projects
* Fix TriggerScheduler docstrings [ClearML GitHub issue #881](https://github.com/allegroai/clearml/issues/881)


### ClearML Server 1.9.2

**Bug Fixes**
* Fix "Unable to load image" error in UI experiment debug samples after entering storage credentials [ClearML Web GitHub issue #46](https://github.com/allegroai/clearml-web/issues/46)
* Fix incorrect default project name displayed in UI "Clone Experiment" modal [ClearML Server GitHub issue #171](https://github.com/allegroai/clearml-server/issues/171) 
* Fix UI experiment debug sample viewer iteration slider not working
* Fix UI experiment console log jumps backwards unnecessarily on refresh
* Fix UI published report is not expandable
* Fix UI published report's description is not editable
* Fix UI experiment-reset popup displays incorrect experiment count 

### ClearML Server 1.9.1

**New Features and Improvements**
* Add collapsible description panel for UI reports 
* Add in-app markdown guide for UI reports

**Bug Fixes**
* Fix can't generate new pipeline runs from UI [ClearML Server GitHub issue #169](https://github.com/allegroai/clearml-server/issues/169)
* Fix plot legend texts overlap in UI reports
* Fix UI embedded plot colors are sometimes obscure
* Fix `ctrl z` doesn't undo codeblocks in UI reports
* Fix "Getting Started" popup wrongfully showing when enqueuing tasks

### ClearML SDK 1.9.0 

**New Features and Improvements**
* Add `r` prefix to `re.match()` strings [ClearML GitHub issue #834](https://github.com/allegroai/clearml/issues/834)
* Add `path_substitution` to `clearml.conf` example file [ClearML GitHub PR #842](https://github.com/allegroai/clearml/pull/842)
* Clarify `deferred_init` usage in `Task.init()` [ClearML GitHub issue #855](https://github.com/allegroai/clearml/issues/855)
* Add pipeline decorator argument to control docker image [ClearML GitHub issue #856](https://github.com/allegroai/clearml/issues/856)
* Add `StorageManager.set_report_upload_chunk_size()` and `StorageManager.set_report_download_chunk_size()` to set chunk 
size for upload and download
* Add `allow_archived` argument in `Task.get_tasks()`
* Support querying model metadata in `Model.query_models()`
* Add `Dataset.set_metadata()` and `Dataset.get_metadata()`
* Add `delete_from_storage` (default `True`) to `Task.delete_artifacts()`

**Bug Fixes**
* Fix jsonargparse and pytorch lightning integration broken for remote execution [ClearML GitHub issue #403](https://github.com/allegroai/clearml/issues/403)
* Fix error when using `TaskScheduler` with `limit_execution_time` [ClearML GitHub issue #648](https://github.com/allegroai/clearml/issues/648)
* Fix dataset not synced if the changes are only modified files [ClearML GitHub issue #822](https://github.com/allegroai/clearml/issues/822)
* Fix `StorageHelper.delete()` does not respect path substitutions [ClearML GitHub issue #825](https://github.com/allegroai/clearml/issues/825)
* Fix can't write more than 2 GB to a file
* Fix `StorageManager.get_file_size_bytes()` returns `ClientError` instead of `None` for invalid S3 links
* Fix Dataset lineage view is broken with multiple dataset dependencies
* Fix `tensorflow_macos` support
* Fix crash when calling `task.flush(wait_for_uploads=True)` while executing remotely
* Fix `None` values get casted to empty strings when connecting a dictionary

### ClearML Server 1.9.0

**New Features and Improvements**
* New ClearML Reports UI: Create and share rich MarkDown documents supporting embeddable online content [ClearML GitHub issue #839](https://github.com/allegroai/clearml/issues/839)
* Add user option to not show example content in the UI [ClearML GitHub issue #774](https://github.com/allegroai/clearml/issues/774)
* Add tag filter to UI Pipeline, Dataset, and Hyper-Dataset pages
* Extend UI experiment comparison up to 100 experiments
* Allow project default output destination S3 URLs to include dots (`.`) and hyphens (`-`)

**Bug Fixes**
* Fix long experiment names break UI experiment comparison scalar plot display [ClearML GitHub issue #166](https://github.com/allegroai/clearml-server/issues/166)
* Fix plot legend definitions set by SDK don't override UI default settings
* Fix comparing experiments with read-only components causes error 
* Fix UI model link doesn't preserve double spaces, breaking the URI
* Fix tasks/models/datasets can't be moved to UI root project
* Fix UI tag color list doesn't display tags 
* Fix UI dashboard search returns results from team’s work when "My Work" filter is enabled
* Fix UI experiment console does not display complete text when large text is reported
