---
title: Version 1.0
---

### ClearML Serving 1.0.0

:::warning Backwards Compatibility
This release is not backwards compatible
:::

**Breaking Changes**
* `preprocess` and `postprocess` class functions get 3 arguments
* Add support for per-request state storage, passing information between the pre/post processing functions

**Features & Bug Fixes**

* Optimize serving latency while collecting statistics
* Fix metric statistics collecting auto-refresh issue
* Fix live update of model preprocessing code
* Add `pandas` to the default serving container
* Add per endpoint/variable statistics collection control
* Add `CLEARML_EXTRA_PYTHON_PACKAGES` for easier additional python package support (serving inference container)
* Upgrade Nvidia Triton base container image to 22.04 (requires Nvidia drivers 510+)
* Add Kubernetes Helm chart


### ClearML 1.0.5

**Features**

- Add Click support [ClearML GitHub issue #386](https://github.com/allegroai/clearml/issues/386)
- Add progress bar to SHA2 generation [ClearML GitHub issue #396](https://github.com/allegroai/clearml/issues/396)
- Add prefix to Task reported runtime info: `cpu_cores`, `gpu_driver_version` and `gpu_driver_cuda_version`
- Add support for `Logger.report_text()` explicit log-level reporting
- Add `return_full_path` argument to `StorageManager.list()`
- Support `Task.get_tasks()` passing multiple project names
- Add `TaskScheduler`
- Add `task_filter` argument to `Objective.get_top_tasks()`, allow `name` as a `task_filter` field
- Add `--output-uri` command-line option to `clearml-task`
- Add `requirements_file` argument to `Task.force_requirements_env_freeze()` to allow specifying a local requirements file
- Add support for `list` type argument in `Task.connect_configuration()` (previously only `dict` type was supported)
- Rename `TrainsTuner` to `ClearmlTuner`
- Update documentation links

**Bug Fixes**

- Fix Pandas with multi-index [ClearML GitHub issue #399](https://github.com/allegroai/clearml/issues/399)
- Fix check permissions fail in `HTTPDriver` [ClearML GitHub issue #394](https://github.com/allegroai/clearml/issues/394)
- Fix Dataset not setting system tag on existing `data_processing` Tasks
- Fix disable redundant resource monitoring in pipeline controller
- Fix `ClearMLJob` when both `project` and `target_project` are specified
- Fix `ClearMLJob` docker container info is not cached
- Fix no print logging after Python logging handlers are cleared
- Fix `PipelineController` callback returning `False`
- Fix internal `logging.Logger` can't be pickled (only applicable to Python 3.6 or lower)
- Wait for reported events to flush to ensure `Task.flush()` with `wait_for_uploads=True` awaits background processes


### ClearML 1.0.4

**Features**

- Add Google Colab notebook tutorial [ClearML GitHub PR 368](https://github.com/allegroai/clearml/issues/368) [ClearML GitHub PR 374](https://github.com/allegroai/clearml/issues/374)
- Add support for GIF images in Tensorboard [ClearML GitHub issue 372](https://github.com/allegroai/clearml/issues/372)
- Add a tensorboardX example for `add_video` (creates GIFs in tensorboard) [ClearML GitHub PR 372](https://github.com/allegroai/clearml/issues/372) 
- Add auto scaler customizable boot bash script
- Add `Task.ignore_requirements`
- Deprecate `Logger.tensorboard_single_series_per_graph()` as it is now controlled from the UI 🙂 

**Bug Fixes**

- Fix `default_output_uri` for Dataset creation [ClearML GitHub issue 371](https://github.com/allegroai/clearml/issues/371)
- Fix `clearml-task` failing without a docker script [ClearML GitHub issue 378](https://github.com/allegroai/clearml/issues/378)
- Fix Pytorch DDP sub-process spawn multi-process
- Fix `Task.execute_remotely()` on created Task (not initialized Task)
- Fix auto scaler custom bash script should be called last before starting agent
- Fix auto scaler spins too many instances at once then kills the idle ones (spin time is longer than poll time)
- Fix multi-process spawn context using `ProcessFork` kills sub-process before parent process ends

### ClearML 1.0.3

**Features**

- Use default `boto` credential chain if no keys are provided in the configuration file or environment variables [ClearML GitHub PR 342](https://github.com/allegroai/clearml/issues/342)
- Support `DummyModel` configuration [Slack Channel](https://clearml.slack.com/archives/CTK20V944/p1621469235085400)
- Add `report_matplotlib_figure(..., report_interactive=False)` allowing to upload a matplotlib as a non-interactive (high quality png) plot
- Add `Logger.matplotlib_force_report_non_interactive()`
- Remove matplotlib axis range (`plotly.js` auto-range can adjust it in real-time)
- Add object-storage support in cleanup-service
- Add `dataset_tags` argument to `Dataset.create()`
- Expose `docker_args` and `docker_bash_setup_script` in `clearml-task` CLI
- Add logging for Nvidia driver and Cuda version
- Add optional ignored packages in script requirements (currently used for `pywin32`)
- Update examples
  * Increase channel result to support max of 1K channels for finding slack channel and use cursor in Slack Alerts monitoring service
  * Add `csv` data sample to `data_samples`
  * Remove deprecated examples

**Bug Fixes**

- Fix Hydra should not store the full resolved OmegaConf [ClearML GitHub issue 327](https://github.com/allegroai/clearml/issues/327)
- Fix direct import of keras save/load model functions [ClearML GitHub issue 355](https://github.com/allegroai/clearml/issues/355)
- Fix run as module [ClearML GitHub issue 359](https://github.com/allegroai/clearml/issues/359)
- Fix Python 2.7 support [ClearML GitHub issue 366](https://github.com/allegroai/clearml/issues/366)
- Fix `Task.add_requirements()` passing `package_version` starting with `@`, `;` or `#`
- Fix import keras from TF
- Fix support for Hydra's `run_job()` change in parameter order by passing `config` and `task_function` as keyword arguments 
- Fix background upload retries with Google Storage (`gs://`)
- Fix Python 3.8 race condition in `Task.close()`
- Fix shutting down a Task immediately after creation might block
- Fix `Task.execute_remotely()` from Jupyter notebook
- Fix Jupyter Notebook inside VSCode
- Fix support for `Dataset.create()` argument `use_current_task`
- Fix `Dataset.finalize()` can hang in extreme scenario
- Protect against wrong file object type when auto-binding models
- Fix matplotlib date convertor
- Fix automation controller overrides nodes clone

### ClearML Server 1.0.2

**Bug Fixes**

- Fix Task container does not accept `null` values [Slack Channel](https://clearml.slack.com/archives/CTK20V944/p1622119047293300) [ClearML GitHub issue 365](https://github.com/allegroai/clearml/issues/365)
- Fix debug images exception in Results page
- Fix a typo in Worker Setup help popup

### ClearML Server 1.0.1

**Bug Fixes**

- Fix clearing experiment requirements causes "empty" requirements (as opposed to "no requirements")
- Fix logout fails with `endpoint not found` error [ClearML GitHub issue 349](https://github.com/allegroai/clearml/issues/349)
- Fix hamburger side menu `Manage Queues` does nothing and returns console error [Slack Channel](https://clearml.slack.com/archives/CTK20V944/p1620308724418100)
- Fix broken config dir backwards compatibility (`/opt/trains/config` should also be supported)

### ClearML 1.0.2

**Bug Fixes**

- Fix in rare scenarios process stuck on exit, again :)

### ClearML 1.0.1

**Bug Fixes**

- Fix in rare scenarios process stuck on exit

### ClearML 1.0.0

:::info Breaking Changes
Arguments order changed in `Logger.report_line_plot()`, `Logger.report_plotly()` and `Logger.report_matplotlib_figure()` - please use keywords instead of positional arguments
:::
  
**Features**

* Add OS environemt variable `CLEARML_DEFAULT_OUTPUT_URI` to override default `output_uri` for automatic models upload - [ClearML GitHub issue 328](https://github.com/allegroai/clearml/issues/328)
* Add `Task.force_requirements_env_freeze()` forcing `pip freeze` instead of package analysis - [ClearML GitHub issue 304](https://github.com/allegroai/clearml/issues/304)
* Improve pipeline support
  * Add Task parameters override in `ClearmlJob` - [ClearML GitHub issue 214](https://github.com/allegroai/clearml/issues/214)
  * Add PipelineController node skip visualization and pre/post-execution callback
* Allow enabling/disabling tensorboard auto-connect using `Task.init(auto_connect_frameworks={'tensorboard': True/False})` (default: `True`)
* Allow to continue running from previous execution iteration
* Support stopping instead of resetting in `Task.execute_remotely()` when server supports enqueueing stopped tasks
* Add Model query interface using `Model.query_models()`
* Support storing dict with `"."` in the keys using Task.connect_configuration
* Add `force` argument to `Task.mark_failed()` to allow setting Task status to `failed` regardless of Task state
* Add `docker_args` and `docker_bash_setup_script` arguments to `Task.create()`
* Change Logger plot iteration argument default to 0 (or `None`)
* Add task filtering in `Task.get_task()` using the `allow_archived` and `task_filter` arguments
* Add `Task.get_configuration_objects()` for reteriving configuration object as a blob of text in automation use-cases (instead of using `Task.connect_configuration()`)
* Improved pipeline support
  * Add pipeline step caching
  * Add Pipeline controller caching
  * Improve pipeline plot reporting
  * Add `PipelineController` into main namespace (use `from clearml import PipelineController`)
* Add jupyter notebook preview update time stamp
* Change default metric report flushing to every 5 seconds
* Improve `Task.artifacts` for safer Task multi node use cases
* Support ClearML server API v2.13
* Add Python 3.9 to the support table
* Improve documentation and examples
  * Improve documentation for clearml-data, clearml-task
  * Add `multiple_tasks_single_process` example script for multiple Tasks created in same code
  * Add `using_artifacts_example` and `execute_remotely_example` example scripts
  * Update `requirements.txt` for `KerasTuner` example

**Bug Fixes**

* Fix `\r` and `\n` in debug samples title/series - [ClearML GitHub issue 323](https://github.com/allegroai/clearml/issues/323)
* Fix Google API credentials without storage section raises exception on import - [ClearML GitHub issue 331](https://github.com/allegroai/clearml/issues/331)
* Fix Matplotlib automagic export legend not showing series names - [ClearML GitHub issue 337](https://github.com/allegroai/clearml/issues/337)
* Fix `Task.set_comment/name()` passing `None` should be equivalent to `''`
* Fix `Task.set_credentials()` uses incorrect config file when both `trains.conf` and `clearml.conf` are found
* Fix `Task.set_credetnials()` should override settings from config file
* Fix Keras h5 model storage
* Fix `Task.execute_remotely()` with sub process
* Fix Task requirements should conform to strings
* Fix reporting after task closing
* Fix remove deprecation warning with matplotlib 3.1
* Fix dataset create single root plot
* Fix `Model.task` should return task ID
* Fix code hangs when leaving process
* Fix flushing on CR timeout (default 10sec)
* Wait for subprocess when terminating
* Improve flush behaviour on `KeyboardInterrupt` exception 
* Wait for subprocesses to flush when terminating
* Fix `Task.set_credentials()` with `store_conf_file=True`

### ClearML Agent 1.0.0

**Features**

* Add conda and pip environment debug prints (using `--debug`)
* Add support for PyJWT v2
* Change the default conda channel order, so it pulls the correct `pytorch` package
* Improve k8s glue support
  * Support k8s glue container env vars merging
  * Add number of pods limit to k8s glue using the `max_pods_limit` argument (use `--max-pods` switch in the k8s glue example)
  * Add k8s glue default `restartPolicy=Never` to template to prevent pods from restarting
* Add `--stop` switch support for dynamic gpus
* Verify `docker` command exists when running in docker mode
* Add support for terminating dockers on `sig_term` in dynamic mode
* Add stopping message on Task process termination
* Add `agent.docker_install_opencv_libs` configuration option to enable automatic opencv libs install for faster docker spin-up (default: `true`, see [here](https://github.com/allegroai/clearml-agent/blob/4f18bb7ea0600db6ee63ecb5ad0ea8d048a272ca/docs/clearml.conf#L139))
* Add support for new container base setup script feature
* Bump virtualenv dependency version (support `v>=16,<21`)
* Add support for dynamic gpus opportunistic scheduling (with min/max gpus per queue)
* Deprecate `venv_update` in configuration (replaced by the more robust `venvs_cache`)
* Add Python 3.9 to the support table

**Bug Fixes**

* Fix agent can return non-zero error code and pods will end up restarting forever - [clearml-agent GitHub Issue 56](https://github.com/allegroai/clearml-agent/issues/56)
* Fix poetry support - [clearml-agent GitHub Issue 57](https://github.com/allegroai/clearml-agent/issues/57)
* Fix cuda version from driver does not return minor version
* Fix requirements local path replace back when using cache
* Fix k8s glue
  * Fix broken k8s glue docker args parsing
  * Fix empty env prevents override when merging template
* Fix venv cache crash on bad symbolic links
* Fix no docker arguments provided

### ClearML Server 1.0.0

**Features**

* Add Multi-level project hierarchy - Projects can now contain sub-projects
* Add markdown editor for project overview
* Add support for multiple models per experiment
* Add Context menu batch operations - [ClearML GitHub issue 286](https://github.com/allegroai/clearml/issues/286)
* Add global search regex support - [ClearML GitHub issue 81](https://github.com/allegroai/clearml/issues/81#issuecomment-735003956)
* Add support for extended container (docker) configuration and init script
* Add special character support ("." (dot) and "$") in Hyper Paramters
* Add new context menu icons
* Add deleting experiments and models through UI - ClearML GitHub issues [53](https://github.com/allegroai/clearml-server/issues/53), [61](https://github.com/allegroai/clearml-server/issues/61) and [81](https://github.com/allegroai/clearml/issues/81#issuecomment-706907718)
* Improve Project deletion: deletes project's experiments and models.
* Add experiment description access from info title
* Improve experiment table columns 
  * Add filter by user
  * Add filters time columns
  * Add filters for custom columns (metrics and hyper parameters)
  * Add secondary nested sorting
* Add worker<->queue clickable reference in workers and queues tables
* Add presenting all metric debug samples concurrently
* Add Full project name display in project cards - [ClearML GitHub issue 81](https://github.com/allegroai/clearml/issues/81#issuecomment-823303842)
* Add option for continuing aborted tasks

**Bug Fixes**

* Fix UI storage credentials input missing for HTML artifacts
* Fix sorting custom metric columns sort treats empty fields as zeroes
* Fix UI experiments table redundant rendering on auto refresh
* Fix missing URL encoding for hyper parameters key names
* Fix UI experiment section edit opens outside viewable screen
* Fix UI missing default selection of artifacts in full screen view
* Fix UI variant name not shown in plots
* Fix UI missing tooltip for truncated column headers
* Fix UI custom columns choice does not persist per project - [ClearML GitHub issue 314](https://github.com/allegroai/clearml/issues/314)
* Fix API plot_str not returned for compressed plots
* Fix UI plots color picker consistency
* Fix API ```Tasks.reset``` marking parent id as  'deleted' in its children
* Fix UI missing queue selection on queue delete
* Fix UI debug image history slider not shown when there's only a single iteration
* Fix UI X-axis labels are being cut in plots - [ClearML GitHub issue 264](https://github.com/allegroai/clearml/issues/264)
* Fix UI scalar color choice dialog toggles between screen positions every time you open it
* Fix UI hovering on legend clears parallel coordinates graph filters - [ClearML GitHub issue 259](https://github.com/allegroai/clearml/issues/259)
* Fix UI experiment comparison 'hide identical fields' button disable doesn't work
* Fix UI auto refresh removes model ID in model panel
* Fix UI debug samples download image opens new tab instead of downloading
* Fix UI experiment/model tables: Right most column is not fixed to right edge of screen
* Fix UI 'Add experiment' modal in compare scalar comparison intertwines with comparison display
* Fix UI experiment configurations showing redundant "General" section
