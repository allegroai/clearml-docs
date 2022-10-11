---
title: Version 1.4
---

### ClearML Agent 1.4.1

**New Features and Improvements**
* Add warning if venv cache is disabled
* Add `agent.disable_ssh_mount` configuration option (same as the `CLEARML_AGENT_DISABLE_SSH_MOUNT` environment variable)

**Bug Fixes**
* Fix docker command for monitoring child agents
* Fix `--gpus all` not reporting GPU stats on worker machine

### ClearML Agent 1.4.0

**New Features and Improvements**
* Add support for MIG devices (use `0:1` for GPU 0 slice 1, or use 0.1)
* Add `agent.enable_git_ask_pass` to improve passing user/pass to git commands
* Add docker `ssh_ro_folder` (default `/.ssh`) and changed docker `ssh_folder `(default: `~/.ssh`)
* Allow overriding pytorch lookup page (See `torch_page`, `torch_nightly_page` and `torch_url_template_prefix` under the 
  `agent.package_manager` configuration settings)
* Add support for abort callback registration
* K8s glue
  * Add `CLEARML_K8S_GLUE_START_AGENT_SCRIPT_PATH` environment variable to allow customizing the agent startup script location
  * Add debug environment variable `CLEARML_AGENT_DEBUG_INFO`
  * Add `CLEARML_AGENT_CHILD_AGENTS_COUNT_CMD` environment variable to allow overriding child agent count command in k8s
  * Refactor template handling
**Bug Fixes**
* Fix Python 3.10+ support
* Fix `use_credentials_chain` is missing in config file example
* Fix Git PAT messages
* Fix home folder in `clearml.conf` to ~ (instead of `/root`)
* Fix docker mode uses `~/.clearml/venvs-builds` as default for easier user-mode containers
* Fix package `@ file://` with quoted (URL style) links should not be ignored
* Fix name not escaped as regex (all services "get_all" use regex for name)
* Fix second .ssh temp mount fails if container changes the files inside
* Fix GCP load balancer does not forward GET request body (allow changing default request action to `PUT/POST/GET`. See 
  `api.http.default_method` or `CLEARML_API_DEFAULT_REQ_METHOD`)
* K8s glue
  * Fix resolving k8s pending queue may cause a queue with a UUID name to be created
  * Fix template namespace should override default namespace
  * Fix `extra_bash_init_cmd` location in initial bash script
  * Fix debug mode
* Fixed documentation [ClearML Agent PR #117](https://github.com/allegroai/clearml-agent/pull/117)

### ClearML SDK 1.4.1 

**Bug Fixes**
* Fix Process Pool hangs at exit [ClearML GitHub issue #674](https://github.com/allegroai/clearml/issues/674)

### ClearML SDK 1.4.0

**New Features**
* Add OpenMMLab example [ClearML GitHub issue #654](https://github.com/allegroai/clearml/issues/654) 
* Add support for saving artifacts with different formats [ClearML GitHub issue #634](https://github.com/allegroai/clearml/issues/634)
* Add support for setting reported values for `NaN` and `Inf` [ClearML GitHub issue #604](https://github.com/allegroai/clearml/issues/604)
* Support more than 500 results in `Task.get_tasks()` using the `fetch_only_first_page` argument [ClearML GitHub issue #612](https://github.com/allegroai/clearml/issues/612)
* Support links in `clearml-data` [ClearML GitHub issue #585](https://github.com/allegroai/clearml/issues/585)
* Support deferred task initialization using `Task.init()` argument `deferred_init` (beta feature)
* Support resuming experiments when importing an Offline session
* Add `--import-offline-session` command line option to `clearml-task`
* Support automatically logging Tensorboard Hparams
* Add wildcard support for model auto-logging, see [`Task.init()`](../references/sdk/task.md#taskinit)
* Add support for Lightning CLI
* Support None values in `Task.connect()`
* Add `Model.project` getter/setter
* Add support for Task progress indication
* Datasets
    * Improve Dataset version table
    * Add warning to Dataset creation on current Task
* Examples and documentation
    * Add manual seaborn logging example [ClearML GitHub PR #628](https://github.com/allegroai/clearml/pull/628)
    * Change package author
    * Change pipeline example to run locally [ClearML GitHub PR #642](https://github.com/allegroai/clearml/pull/642)
    * Update Pytorch Lightning example for `pytorch-lightning>=v1.6.0` [ClearML GitHub PR #650](https://github.com/allegroai/clearml/pull/650)

**Bug Fixes**
* Fix Keras model config serialization in `PatchKerasModelIO` [ClearML GitHub issue #614](https://github.com/allegroai/clearml/issues/614)
* Fix `task.get_parameters_as_dict(cast=True)` casts `False` to `True` [ClearML GitHub PR #622](https://github.com/allegroai/clearml/pull/622)
* Fix Fire integration is not compatible with typing library [ClearML GitHub issue #610](https://github.com/allegroai/clearml/issues/610)
* Fix remote execution with `argparse` mutually exclusive groups raises "required" error even when no argument is required
* Fix Hydra tasks never fail and are only set to completed (fix handling return code)
* Fix `clearml-data` wildcard support
* Fix HPO randomly aborts running tasks before the time limit
* Fix matplotlib capture
* Fix issue with accessing images in projects containing `/`
* AutoScaler
    * Fix resource name with a prefix matching a resource type may cause the auto-scaler to avoid spinning down idle instances
    * Fix Idle workers should contain resource name and not instance type
* Fix backwards compatibility issue when using `abstractmethod`
* Matplotlib
    * Fix uploading 3D plots with matplotlib plt shows 2D plot on task results page 
    * Fix wrong Histogram plotting using when matplotlib
* Fix PyTorch `ScriptModule` autobind
* Fix PyTorch auto-magic logging torchscript models
* Fix forked process will not call `_at_exit` and flush all outstanding reports
* Fix matplotlib to plotly conversion fails on subplots (convert as image if figure has subplots)
* Fix Windows sub process might end up waiting forever for uploads to finish if subprocess is very shot lived
* Fix `StorageManager.get_local_copy()` returning None for a valid path in Windows
* Fix Jupyter notebook cannot be detected
* Fix PipelineController does not change node Task name, only pipeline step name
* Fix Task.query_tasks() specifying page size or page number

### ClearML Server 1.4.0

**New Features and Improvements**

- Allow serving with a URL path prefix [ClearML Server GitHub issue #119](https://github.com/allegroai/clearml-server/issues/119)
- Allow overriding clearml web git url on build [ClearML Server GitHub Pull Request #122](https://github.com/allegroai/clearml-server/pull/122)
- Ensure agent-services waits for API server to be ready [ClearML Server GitHub issue #113](https://github.com/allegroai/clearml-server/issues/113) 
- Add filter to UI experiment table "Project" column [ClearML GitHub issue #529](https://github.com/allegroai/clearml/issues/529)
- Add filters to UI model table custom metadata columns
- Improve UI table object selection. Add buttons and context menu actions to switch between table and info panel mode
- Add task detail header to UI experiment comparison debug image section addressed in [ClearML GitHub issue #81](https://github.com/allegroai/clearml/issues/81) ([comment](https://github.com/allegroai/clearml/issues/81#issuecomment-996841658))
- Improve series name truncation behavior in UI scalar plots [ClearML GitHub issue #562](https://github.com/allegroai/clearml/issues/562)

**Bug Fixes**

- Fix server limiting image and artifact upload size [ClearML GitHub issue #606](https://github.com/allegroai/clearml/issues/606)
- Fix server unnecessarily displays deletion error message [ClearML Server GitHub issue #112](https://github.com/allegroai/clearml-server/issues/112)
- Fix UI experiment comparison sections overly wide for many tag experiments [ClearML GitHub issue #594](https://github.com/allegroai/clearml/issues/594)
- Fix model name display in UI pipeline run info panel 
- Fix UI pipeline run info panel missing artifacts and models sections
- Fix UI pipeline run info panel displays unneeded resource utilization metrics 
- Fix UI project cards missing task summary values
- Fix pipeline tag colors can't be changed in UI pipeline page
- Fix pipeline run UI page not displaying pipeline steps [ClearML GitHub issue #618](https://github.com/allegroai/clearml/issues/618)
- Fix breadcrumb links don't navigate anywhere
- Fix horizontal scroll in UI experiment table causes column headers to jump
- Fix removing UI table column creates a blank column
- Fix internal server error (500) on `events.get_scalar_metrics_and_variants` [ClearML Server GitHub issue #120](https://github.com/allegroai/clearml-server/issues/120)

