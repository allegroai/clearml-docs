---
title: Version 1.1
---
### ClearML Agent 1.1.0

:::info Breaking Changes
ClearML Agent will no longer try to use the demo server by default (change this by setting the `CLEARML_NO_DEFAULT_SERVER=0` environment variable)

ClearML k8s glue default pod label was changed to `CLEARML=agent` (instead of `TRAINS=agent`)
:::

  
**Features**

- Add poetry cache into docker mapping [ClearML Agent GitHub issue #74](https://github.com/allegroai/clearml-agent/issues/74)
- Allow rewriting SSH URLs (see [here](https://github.com/allegroai/clearml-agent/commit/9456e493ac6d6495310ee084db906f9cdca8218c)), refers to [ClearML Agent GitHub PR #72](https://github.com/allegroai/clearml-agent/pull/72), [ClearML Agent GitHub issue #42](https://github.com/allegroai/clearml-agent/issues/42)
- Add docker environment arguments log masking support, customizable using the `agent.hide_docker_command_env_vars` configuration value (see [here](https://github.com/allegroai/clearml-agent/blob/db57441c5dda43d8e38f01d7f52f047913e95ba5/docs/clearml.conf#L172)) [ClearML Agent GitHub issue #67](https://github.com/allegroai/clearml-agent/issues/67)
- Add support for naming docker containers using the `agent.docker_container_name_format` configuration option to set a name format (disabled by default) [ClearML issue #412](https://github.com/allegroai/clearml/issues/412)
- k8s glue
  - Remove queue name from pod name, add queue name and ID to pod labels [ClearML Agent GitHub issue #64](https://github.com/allegroai/clearml-agent/issues/64)
  - Update task `status_message` for non-responsive or hanging pods
  - Support the `agent.docker_force_pull` configuration option for scheduled pods
  - Add docker example for running the k8s glue as a pod in a k8s cluster
- Add `agent.ignore_requested_python_version` configuration option to ignore any requested python version (default false, see [here](https://github.com/allegroai/clearml-agent/blob/db57441c5dda43d8e38f01d7f52f047913e95ba5/docs/clearml.conf#L45))
- Add `agent.docker_internal_mounts` configuration option to control containers internal mounts (non-root containers, see [here](https://github.com/allegroai/clearml-agent/blob/db57441c5dda43d8e38f01d7f52f047913e95ba5/docs/clearml.conf#L184))
- Add support for `-r requirements.txt` in the Installed Packages section
- Add support for `CLEARML_AGENT_INITIAL_CONNECT_RETRY_OVERRIDE` environment variable to override initial server connection behavior (defaults to true, allows boolean value or an explicit number specifying the number of connect retries)
- Add support for `CLEARML_AGENT_DISABLE_SSH_MOUNT` environment variable allowing to disable the auto `.ssh` mount into the docker
- Add support for `CLEARML_AGENT_SKIP_PIP_VENV_INSTALL` environment variable to skip Python virtual env installation on execute and allow providing a custom venv binary
- Add support for `CLEARML_AGENT_VENV_CACHE_PATH` environment variable to allow overriding venv cache folder configuration
- Add support for `CLEARML_AGENT_EXTRA_DOCKER_ARGS` environment variable to allow overriding extra docker args configuration
- Add support for environment variables containing bash-style string lists using shlex
- Add printout when using ClearML key/secret from environment variables
- Increase worker keep-alive timeout to 10 minutes instead of 1 minute
- Update documentation

**Bug Fixes**

- Fix auto mount `SSH_AUTH_SOCK` into docker [ClearML Agent GitHub issue #45](https://github.com/allegroai/clearml-agent/issues/45)
- Fix package manager configuration documentation [ClearML Agent GitHub issue #78](https://github.com/allegroai/clearml-agent/issues/78)
- Fix support for spaces in docker arguments [ClearML GitHub issue #358](https://github.com/allegroai/clearml/issues/358)
- Fix standalone script with pre-exiting conda venv
- Fix PyYAML v5.4, v5.4.1 versions not supported
- Fix parsing VCS links starting with `git+git@` (notice `git+git://` was already supported)
- Fix Python package with `git+git://` links or `git+ssh://` conversion
- Fix `--services-mode` if the execute agent fails when starting to run with error code 0
- Fix `--stop` with dynamic gpus
- Fix support for unicode standalone scripts, changing default `ascii` encoding to `UTF-8`
- Fix venv cache cannot reinstall package from git with http credentials
- Fix `PYTHONIOENCODING` environment variable is overwritten when already defined
- k8s glue
  - Fix support for multiple k8s glue instances with pod limits
  - Fix task container handling fails parsing docker image
  - Fix task container is not set when using default image/arguments
  - Fix task container image arguments are used when no image is specified
  - Fix task container arguments not supported in when template is not provided
  - Fix `agent.extra_docker_bash_script` not applied correctly
  - Fix task runtime properties are removed when re-enqueuing task
  - Fix error is not thrown when failing to push task to queue

### ClearML Server 1.1.1

**Bug Fixes**

- Fix experiment plots override reported color-scale [ClearML GitHub issue #373](https://github.com/allegroai/clearml/issues/373), [Slack Channel](https://clearml.slack.com/archives/CTK20V944/p1627310354415200)
- Fix file server `GET` response for gzipped data-files contains `Content-Encoding: gz` header, causing clients to automatically decompress the file [ClearML GitHub issue #411](https://github.com/allegroai/clearml/issues/411)
- Fix server error when running with non-migrated v0.16 ElasticSearch data [Slack Channel](https://clearml.slack.com/archives)/CTK20V944/p1627911579075600

### ClearML Server 1.1.0 

**New Features and Improvements**

- Add metric snapshot plot to project overview UI - Show an aggregated view of all project experiments value for a leading metric
- Add logical `AND` option to UI experiment table tag filter
- Add Task runtime properties to experiment INFO UI tab 
- Add full screen view for any experiment result plot
- Add extended version information to UI profile page
- Stop using special characters in secrets
- Allow setting status_message in `tasks.update`
- Improve UI table view configuration persistence - User table-view configuration is saved per project:
    - Visible columns 
    - Column order
    - Column width
    - Active sort
    - Active filters

**Bug Fixes**

- Fix experiment details UI failure opening hyperparameter sections beginning with `#` [ClearML Server GitHub issue #79](https://github.com/allegroai/clearml-server/issues/79)
- Fix performance issues with UI comparison of  large experiments [Slack Channel](https://clearml.slack.com/archives/CTK20V944/p1621698235159800)
- Fix filtering on hyperparameters [ClearML GitHub issue #385](https://github.com/allegroai/clearml/issues/385) [Slack Channel](https://clearml.slack.com/archives/CTK20V944/p1626600582284700)
- Fix profile page user options toggle control area of effect
- Fix browser resizing affecting plot zoom
- Fix UI dataview filter resetting version on filter addition
- Fix UI project overview:
  - Fix links in project overview not working  
  - Allow editing empty overview for legacy projects
- Fix Table plots using fraction of available space 
- Fix scalars color assignment broken by `.` in scalar name
- Fix tasks cannot be moved between queues
- Fix UI Docker argument input - Force arguments in designated field
- Fix extraneous "tag" string prefixing Commit ID in Task execution information UI
- Fix missing 'no value' option in hyperparameters table filters
- Fix queued task is not dequeued on `tasks.stop`
- General aesthetic fixes:
    - Fix input title alignment in UI clone experiment window
    - Fix UI empty experiment table message alignment
    - Fix UI table filter menu proportions
    - Fix debug sample dropdown menu coloring
    - Fix dashboard card alignment
    - Fix redundant separator in plot control when maximized