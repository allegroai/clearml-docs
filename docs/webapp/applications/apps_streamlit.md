---
title: Streamlit Launcher
---

:::info Enterprise Feature
The Streamlit Launcher App is available under the ClearML Enterprise plan.
:::

[Streamlit](https://streamlit.io/) is a framework for creating visual web interfaces for your models. The ClearML Streamlit 
launcher application spins up a Streamlit execution environment and serves your Streamlit app on a machine of your choice. 
Once you start a Streamlit launcher instance, you will be provided with an [externally accessible link](#traffic_router) to your Streamlit app, 
where you can make use of your models.

The Streamlit launcher monitors the Streamlit app activity and shuts down if it is inactive for a specified maximum idle 
time.

<a id="traffic_router"/>

:::important Task Traffic Router
The Streamlit Launcher relies on the ClearML Traffic Router which facilitates user authentication, and redirects requests 
to the IP/port served by the Streamlit app. 
:::

Once you start a Streamlit launcher instance, you can view the following information in its dashboard:

* Streamlit App status indicator
  * <img src="/docs/latest/icons/ico-streamlit-active.svg" alt="Active server" className="icon size-md space-sm" /> - App is running and is actively in use
  * <img src="/docs/latest/icons/ico-streamlit-loading.svg" alt="Loading server" className="icon size-md space-sm" /> - App is setting up 
  * <img src="/docs/latest/icons/ico-streamlit-idle.svg" alt="Idle server" className="icon size-md space-sm" /> - App is idle
  * <img src="/docs/latest/icons/ico-streamlit-stopped.svg" alt="Stopped server" className="icon size-md space-sm" /> - App is stopped 
* Idle time 
* Streamlit App - Externally accessible link to your Streamlit app. You can send this link to your colleagues, so they can 
  access the app. Click <img src="/docs/latest/icons/ico-copy-to-clipboard.svg" alt="Copy" className="icon size-sm space-sm" />
  to copy link
* Streamlit Git repo - Repository that holds the Streamlit app script
* Live preview of the Streamlit app
* Console Log  The console log shows the launcher instance's activity, including server setup progress, server status 
  changes

## Streamlit Launcher Instance Configuration

* **Streamlit Instance Name** - Name for the Streamlit launcher instance. This will appear in the instance list
* **Project name** - Project where your Streamlit launcher app instance task will be stored
* **Task name** - Name of task for your Streamlit launcher app instance
* **Git Repository** - Git repository containing the Streamlit script 
* **Git Branch** - Git branch containing the Streamlit script
* **Streamlit Script Name** - Name of Streamlit script to be executed
* **Queue** - The [ClearML Queue](../../fundamentals/agents_and_queues.md#what-is-a-queue) to which the Streamlit launcher 
  app instance task will be enqueued (make sure an agent is assigned to that queue)
* **Docker Image** - Docker image the ClearML Agent will use for running the Streamlit app
* **Idle Time Limit** (Hours) - Maximum idle time (Period in which no requests are received by the Streamlit app) after 
  which the Streamlit app and the launcher instance will shut down.