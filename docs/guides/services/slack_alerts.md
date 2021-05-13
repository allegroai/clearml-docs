---
title: Monitoring Service Posting Slack Alerts
---

The Slack alerts example runs as a **ClearML** service, which monitors the completion and failure of Tasks, and posts alert 
messages on a specified Slack channel. In the example, we configure the Slack details when creating a Slack bot, and set 
parameters for monitoring. The Task name is `Slack Alerts`, and it is associated with the project `Monitoring`. 

`Slack Alerts` executes in [ClearML services mode](../../clearml_agent.md#services-mode) and is configurable. It is pre-loaded 
in **ClearML Server** and its status is *Draft* (editable). Set the parameter values in the **ClearML Web UI**, and then 
enqueue the Task to the `services` queue. Or, run the script [slack_alerts.py](https://github.com/allegroai/clearml/blob/master/examples/services/monitoring/slack_alerts.py), 
with options to run locally, or enqueue the Task to the `services` queue. 

## Prerequisites

* **ClearML Agent** is [installed and configured](../../clearml_agent.md#installation).
* **ClearML Agent** is launched in [services mode](../../clearml_agent.md#services-mode).

## Creating a Slack Bot

Before configuring and running the Slack alert service, create a new Slack Bot (**ClearML Bot**). 

:::important
The Slack API token and channel you create are required to configure the Slack alert service.
:::

1. Login to your Slack account.
1. Go to [https://api.slack.com/apps/new](https://api.slack.com/apps/new).
1. In **App Name**, enter an app name; for example, "ClearML Bot".
1. In **Development Slack Workspace**, select a workspace.
1. Click **Create App**.
1. In **Basic Information**, under **Display Information**, complete the following:
    - In **Short description**, enter "Allegro Train Bot".
    - In **Background color**, enter "#202432".
1. Click **Save Changes**.
1. In **OAuth & Permissions**, under **Scopes**, click **Add an OAuth Scope**, and then select the following permissions 
   on the list:
    * **channels:join**
    * **channels:read**
    * **chat:write**
1. In **OAuth Tokens & Redirect URLs**:
    1. Click **Install App to Workspace**
    1. In the confirmation dialog, click **Allow**.
    1. Click **Copy** to copy the **Bot User OAuth Access Token**.

## Running the service
There are two options to run the Slack alerts service:
* [Using the ClearML Web UI](#running-using-the-clearml-web-ui)
* [Using the script](#running-using-the-script)

### Running using the ClearML Web UI

#### Step 1. Configuring the service

1. In the **ClearML Web UI** **Projects** page, click the **Monitoring** project **>** click the **Slack Alerts** Task.
1. In the info panel, click the **CONFIGURATION** tab.
1. In the **GENERAL** section, hover over the parameter area **>** **EDIT**.
1. Configure the service parameters:

    * **channel** - The name of the Slack channel (MANDATORY).
    * **include_completed_experiments** - (bool) Whether to include completed experiments:
        * **True** - Include
        * **False** - Do not include (default)
    * **include_manual_experiments** - Whether to include experiments that are running locally:
        * **True** - Monitor local experiments, and remote experiments executed by **ClearML Agent** (default).
        * **False** - Remote experiments, only.
    * **local** - Run the monitor locally, instead of as a service. The default is **False**.
    * **message_prefix** - A message prefix. For example, to alert all channel members use: "Hey <!here>,"
    * **min_num_iterations** - The minimum number of iterations of failed/completed experiment to alert. The default is **0**, indicating all alerts.
    * **project** - The name (or partial name) of the project to monitor, use empty for all projects.
    * **refresh_rate** - How often to run the monitoring service (seconds). The default value is **10.0**.
    * **service_queue** - The queue that clearml-agent is listening to for Tasks to execute as a service. The default is 
      **services**.
    * **slack_api** - The Slack API key. The default value can be set in the environment variable, `SLACK_API_TOKEN`  (MANDATORY).

#### Step 2. Enqueuing the service

* Right click the **Monitoring** Task **>** **Enqueue** **>** Select **services** **>** **ENQUEUE**.

### Running using the script

The [slack_alerts.py](https://github.com/allegroai/clearml/blob/master/examples/services/monitoring/slack_alerts.py) 
allows to configure the monitoring service, and then either:

* Run locally
* Run in **ClearML Agent** services mode

**To run the monitoring service locally:**

    python slack_alerts.py --channel <Slack-channel-name> --slack-api <Slack-API-token> --local True [...]
    
   where,
    
   * `channel` - The Slack channel where alerts will be posted.
   * `slack_api` - Slack API key.
   * `local` - Run the monitoring service only locally. If `True`, then run locally. If `False`, then run locally and 
     enqueue the Task to run in **ClearML Agent** services mode.
    
`slack_alerts.py` supports the following additional command line options:

* ``message_prefix`` - The default value is an empty string.
* ``min_num_iterations`` - Minimum number of iterations of failed / completed experiment to alert. Use this option to eliminate debug sessions that fail quickly. The default value is <code>0</code> (alerts for experiments).
* ``include_manual_experiments`` - Include experiments running manually (i.e. not by clearml-agent). The default value is 
  ``False``.
* ``include_completed_experiments`` - If `False`, then include send alerts for 
  failed Tasks, only. If ``True``, then send alert for completed and failed Tasks. The default value is ``False``.
* ``refresh_rate`` - How often to check the experiments, in seconds. The default value is ``10`` (seconds).
* ``service_queue`` - The queue to use when running as a service. The default value is ``services``.
*  ``local`` - If ``True``, run locally only instead of as a service. If ``False``, then automatically enqueue the Task 
   to run in **ClearML Agent** services mode. The default value is ``False``.
    
## Additional information about slack_alerts.py

In `slack_alerts.py`, the class `SlackMonitor` inherits from the `Monitor` class in `clearml.automation.monitor`. 
`SlackMonitor` overrides the following `Monitor` class methods:

* `get_query_parameters` - Get the query parameters for Task monitoring.
* `process_task` - Get the information for a Task, post a Slack message, and output to console.
    * Allows skipping failed Tasks, if a Task ran for few iterations. Calls [Task.get_last_iteration](../../references/sdk/task.md#get_last_iteration) 
      to get the number of iterations.
    * Builds the Slack message which includes the most recent output to the console (retrieved by calling [Task.get_reported_console_output](../../references/sdk/task.md#get_reported_console_output)), 
      and the URL of the Task's output log in the **ClearML Web UI** (retrieved by calling [Task.get_output_log_web_page](../../references/sdk/task.md#get_output_log_web_page).

The example provides the option to run locally or execute remotely by calling the [Task.execute_remotely](../../references/sdk/task.md#execute_remotely) 
method.

To interface to Slack, the example uses `slack.WebClient` and `slack.errors.SlackApiError`.