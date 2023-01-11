---
title: Version 1.3
---

### ClearML Agent 1.3.0
**New Features and Improvements**
* Support private repos from `requirements.txt` file [ClearML Agent GitHub PR #107](https://github.com/allegroai/clearml-agent/pull/107)
* Bump PyJWT version due to "*Key confusion through non-blocklisted public key formats*" vulnerability
* Add support for additional command line arguments in k8s glue example
* Add Python 3.10 support

**Bug Fixes**
* Fix git unsafe directory issue (disable check on cached vcs folder)
* Fix dynamic GPUs with "all" GPUs on the same worker
* Fix broken pytorch setuptools incompatibility (force setuptools < 59 if torch is below 1.11)
* Fix setuptools requirement issue by making sure that if we have "setuptools" in the original required packages, we preserve the line in the pip freeze list
* Fix optional priority packaged always compare lower case package name
* Fix potential requirement installation failure by making `pygobject` an optional package (i.e. if installation fails 
  continue the Task package environment setup)
* Fix repository URL contains credentials even when `agent.force_git_ssh_protocol: true`

### ClearML Server 1.3.1

**Bug Fixes**
* Fix scalar graph smoothing [ClearML Server GitHub issue #127](https://github.com/allegroai/clearml-server/issues/127)

### ClearML SDK 1.3.2

**New Features and Improvements**

* Add support for setting reported values for `NaN` and `Inf` [ClearML GitHub issue #604](https://github.com/allegroai/clearml/issues/604)
* Add reserved OS environments warning
* Add git credentials to colab example [ClearML GitHub PR #621](https://github.com/allegroai/clearml/pull/621)
* Add jsonargparse support [ClearML GitHub issue #403](https://github.com/allegroai/clearml/issues/403)
* Update autokeras example

**Bug Fixes**

* Fix sub-project separators are incorrectly quoted in generated URLs [ClearML GitHub PR #584](https://github.com/allegroai/clearml/pull/584)
* Revert Optuna deprecation fix [ClearML GitHub PR #613](https://github.com/allegroai/clearml/pull/613)
* Fix HPO randomly aborts running tasks before the time limit
* Fix cloud driver overwrites `agent.extra_docker_arguments`
* Fix Pipeline Controller auto-magic framework connect
* Fix unused scroll is not cleared in `Task.get_reported_plots()`

### ClearML SDK 1.3.1

**New Features and Improvements** 

* Add Python 3.10 support

**Bug Fixes**

* Update Slack SDK requirement [ClearML GitHub issue #597](https://github.com/allegroai/clearml/issues/597)
* Fix fork after `task.close()` is called [ClearML GitHub issue #605](https://github.com/allegroai/clearml/issues/605)
* Fix Azure storage upload [ClearML GitHub issue #598](https://github.com/allegroai/clearml/issues/598)
* Fix offline mode crash
* Fix task delete response not checked
* Fix pipeline controller kwargs with list
* Fix `PipelineDecorator.debug_pipeline()`
* Fix PipelineDecorator example
* Fix Python 3.10 issues
* Fix handling of legacy fileserver (files.community.clear.ml)
* Fix cloud driver may use None credentials
* Fix APIClient worker raises exception when accessing .name attribute
* Fix minimum/default API version setting


### ClearML Server 1.3.0

**New Features and Improvements**
* New UI pipelines page:
    * Pipelines statistics dashboard
    * Pipeline run history: View pipeline structure, run configuration and outputs
    * Pipeline control: Abort/Run pipelines from UI
* Add support for exporting UI table plots in CSV formats [ClearML GitHub issue #400](https://github.com/allegroai/clearml/issues/400)
* Improve UI breadcrumbs use of screen real-estate [ClearML GitHub issue #529](https://github.com/allegroai/clearml/issues/529)
* Add UI adherence to user specification of plot colors and labels [ClearML GitHub issue #518](https://github.com/allegroai/clearml/issues/518)
* Add Model metadata to UI model information (Model table and details page)
* Add multi-selection in UI experiment info-panel mode
* Add labels to workspace credentials
* Add UI Queues "Clear" action
* Add "Show/Hide" controls to UI experiments scalars tab.
* Add Previous/Next controls to UI text area search bars

**Bug Fixes**
* Fix UI plots do not display Plotly `imshow texttemplate` [ClearML GitHub issue #538](https://github.com/allegroai/clearml/issues/538)
* Fix clicking F5 clears storage credentials from UI settings page
* Fix UI plots "Wall time" horizontal axis option is not working
* Fix disappearing UI full-screen scalar plot
* Fix disappearing object names in table info-panel mode
* Fix clicking "group by" menu in UI experiment scalars page opens the incorrect menu
* Fix disappearing scalar plots in UI experiment comparison page
* Fix hidden custom UI table column is not removed from main column list
* Fix UI plot toolbar missing tools
* Fix UI table plot tools only appear when hovering over the end of the plot
* Fix resizing UI table column causes subsequent columns to thin 
* Fix "Tip of the day" window continues appearing after user-requested removal


### ClearML SDK 1.3.0

**New Features and Improvements** 

* Add new pipeline visualization support (requires ClearML Server v1.3)
* Support IAM Instance Profile in AWS auto-scaler
* Remove old server API versions support (pre-ClearML Server)
* Restructure FastAI examples

**Bug Fixes**

* Fix failed catboost bind on GPU [ClearML GitHub issue #592](https://github.com/allegroai/clearml/issues/592)
* Fix Optuna `n_jobs` deprecation warning
* Fix invalid method called on `delete()` error
