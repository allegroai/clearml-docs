---
title: Version 1.8
---

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