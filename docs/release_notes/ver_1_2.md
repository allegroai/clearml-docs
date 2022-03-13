---
title: Version 1.2
---

### ClearML SDK 1.2.1

**Bug Fixes**

- Fix HTTP download fails constructing URL [ClearML GitHub issue #593](https://github.com/allegroai/clearml/issues/593)

### ClearML SDK 1.2.0

**Features**

- Add fastai v2 support [ClearML GitHub PR #571](https://github.com/allegroai/clearml/pull/571)
- Add catboost support  [ClearML GitHub PR #542](https://github.com/allegroai/clearml/pull/542)
- Add Python Fire support [ClearML GitHub PR #550](https://github.com/allegroai/clearml/pull/550)
- Add new Azure Storage driver support [ClearML GitHub PR #548](https://github.com/allegroai/clearml/pull/548)
- Add requirements file support in Task.add_requirements [ClearML GitHub PR #575](https://github.com/allegroai/clearml/pull/575)
- Allow overriding `auto_delete_file` in `Task.update_output_model()` [ClearML GitHub issue #554](https://github.com/allegroai/clearml/issues/554)
- Support `artifact_object` empty string
- Add `skip_zero_size_check` to `StorageManager.download_folder()`
- Add support for extra HTTP retry codes (see [here](https://github.com/allegroai/clearml/blob/2c916181b90c784fe0bd267cd67ea915e53e36e4/clearml/backend_api/config/default/api.conf#L29) or use `CLEARML_API_EXTRA_RETRY_CODES`)
- Add `Task.get_parameters()` cast back to original type
- Add callback support to `Task.delete()`
- Add autoscaler CPU-only support
- Add AWS autoscaler IAM instance profile support
- Update examples
  - Edit HTML reporting examples [ClearML GitHub PR #546](https://github.com/allegroai/clearml/pull/546)
  - Add model reporting examples [ClearML GitHub PR #553](https://github.com/allegroai/clearml/pull/553)

**Bug Fixes**

- Fix `nargs="?"` without type does not properly cast the default value [ClearML GitHub issue #531](https://github.com/allegroai/clearml/issues/531)
- Fix using invalid configurations [ClearML GitHub issue #544](https://github.com/allegroai/clearml/issues/544)
- Fix extra_layout not passed to report_matrix [ClearML GitHub issue #559](https://github.com/allegroai/clearml/issues/559)
- Fix group arguments in click [ClearML GitHub PR #561](https://github.com/allegroai/clearml/pull/561)
- Fix no warning when failing to patch argparse [ClearML GitHub PR #576](https://github.com/allegroai/clearml/pull/576)
- Fix crash in Dataset.upload() when there is nothing to upload [ClearML GitHub PR #579](https://github.com/allegroai/clearml/pull/579)
- Fix requirements, refactor and reformat examples [ClearML GitHub PR #567](https://github.com/allegroai/clearml/pull/567), [#573](https://github.com/allegroai/clearml/pull/573), [#582](https://github.com/allegroai/clearml/pull/582)
- Auto-scaler
  - Change confusing log message
  - Fix AWS tags support
  - Fix instance startup script fails on any command (should only fail on the agent failing to launch)
  - Fix spin down stuck machine, ignore unknown stale workers
- Fix pandas object passed as `Task.upload_artifact()` preview object
- Fix incorrect timeout used for stale workers
- Fix `clearml-task` calls `Task.init()` in the wrong place when a single local file is used
- Fix ArgumentParser `SUPPRESS` as default should be resolved at remote execution in the same way (i.e. empty string equals `SUPPRESS`)
- Upgrade six version (in case `pathlib2>2.3.7` is installed)
- Fix connected object base class members are not used
- Fix `clearml-init` changing web host after pasting full credentials
- Fix fileserver upload does not support path in URL
- Fix crash on semaphore acquire error
- Fix docs and docstrings [ClearML GitHub PR #558](https://github.com/allegroai/clearml/pull/558), [#560](https://github.com/allegroai/clearml/pull/560)


### ClearML Server 1.2.0

**New Features and Improvements**
* Add functionality to "Abort all children" UI action for controller and optimizer tasks
* Add parameter search to task configuration UI section [ClearML GitHub issue #467](https://github.com/allegroai/clearml/issues/467)
* Add tag exclusion filters in UI experiment and model tables
* Add "Clear Filters" functionality button to UI table filters
* Improve full screen scalar graph to display all data points
* Add UI experiment table option for mass selection of out-of-screen items
* Improve experiment comparison UI: 
    * New experiment addition modal with table filtering and sorting 
    * Fix scalar selection being reset upon comparison contents change
    * Add Task ID suffix to debug samples with same-name experiments
    * Add task ID suffix to experiment name for same-experiment-name series in scalar experiment comparison
* New Settings pages
    * User profile
    * Webapp configuration
    * Workspace settings
* Add "Updated" column to models table 
* Add refresh button to full screen scalar display
* Improve display of float values in UI experiment and model tables. Tables will display rounded up float values 
  according to space allotted to a column. View precise value by hovering over value. 
* Add capability to edit username in UI profile page
* Add build number to version information in UI Settings page

**Bug Fixes**

* Fix UI debug sample viewer ignoring metric filter on auto-refresh [ClearML GitHub issue #512](https://github.com/allegroai/clearml/issues/512)
* Fix "Wall time" x-axis option in UI plots slowing down web app [ClearML GitHub issue #441](https://github.com/allegroai/clearml/issues/441)
* Fix UI table plot titles don't display their iteration number [ClearML GitHub issue #474](https://github.com/allegroai/clearml/issues/474)
* Fix auto-refresh resets vertical scroll in UI debug samples [ClearML GitHub issue #474](https://github.com/allegroai/clearml/issues/474)
* Fix manually run experiments cannot be edited in UI after being reset  [ClearML GitHub issue #449](https://github.com/allegroai/clearml/issues/449) 
* Fix UI Workers & Queues and Experiment Table pages display mismatching experiment runtime values [ClearML Server GitHub issue #100](https://github.com/allegroai/clearml-server/issues/100)
* Fix UI plots sometimes disappear after task execution completion
* Fix UI experiment plots don't display some plots on a http server
* Fix failure to add Azure credentials through UI Settings page by new users 
* Fix UI experiment table failing to clear selection of off-screen experiments 
* Fix UI experiment table column resizing malfunctioning
* Fix UI table filters being reset after page is refreshed
* Fix failure to create a sub-project on-the-fly when cloning an experiment through the UI
* Fix UI project overview editing enabled when project is public
* Fix model deletion from UI "All Experiments" page navigates to model project's experiment table
* Fix missing "Project" custom column in "All Experiments" views of non-root projects
* Fix UI project cards' task enumeration summaries displaying negative number 
* Fix experiment bar graph colors cannot be changed sometimes
* Fix fail to filter experiments on tags beginning with "-" 
* Fix tag list order in UI experiment table filter after tag selection
* Fix long hyperparameter names are obscured in UI comparison screen
* Fix add tag context menu operation fails when experiment selection includes a system example
* Fix size of low value points in UI metric snapshot plot
* Fix long queue names obscures copy button in UI queue list and Worker & Queue page plot titles 
* Fix UI breadcrumb menus missing values
* Fix UI scalar plot titles are unreadable
* Fix UI buttons not working after closing "Add Experiment" modal in UI experiment comparison page
* Fix underscores disappear while editing UI text blocks on Chromium
* Fix UI Workers & Queues page's queue panel does not display experiment information
* Fix long queue names obscure copy button in UI queue list
* Fix UI debug image viewer momentarily displays previously viewed image
* Fix "Load More" button in UI experiment table presents duplicates of already displayed experiments
