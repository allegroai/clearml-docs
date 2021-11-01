---
title: Overview
---

The **ClearML Web UI** is the graphical user interface for the **ClearML** platform, which includes:
* Experiment management
* Browsing
* Resource utilization monitoring
* Profile management
* Direct access to the **ClearML** community (Slack Channel, Youtube, and GitHub).

![image](../img/webapp_screenshots.gif)


The ClearML Web UI is composed of the following pages:
* The [Home](webapp_home.md) Page <img src="/docs/latest/icons/ico-homepage.svg" alt="Homepage" className="icon size-md" /> - 
  The dashboard for recent activity and quick access to experiments and projects.
* The Projects Page <img src="/docs/latest/icons/ico-projects.svg" alt="Projects page" className="icon size-md" /> - The main experimentation page. 
  It is a main projects page where specific projects can be opened.

  Each project page contains customizable [experiments](webapp_exp_table.md) and [models](webapp_model_table.md) tables
  with the following options:
    * [Track experiments and visualize results](webapp_exp_track_visual.md)
    * [Reproduce experiments](webapp_exp_reproducing.md)
    * [Tune experiments](webapp_exp_tuning.md)
    * [Compare experiments](webapp_exp_comparing.md)
    * [Share experiments and their models](webapp_exp_sharing.md) with users of other hosted service workspaces
    * [Archive experiments and models](webapp_archiving.md)
    * [View](webapp_model_viewing.md) and [modify](webapp_model_modifying.md) models

* The [Workers and Queues](webapp_workers_queues.md) Page <img src="/docs/latest/icons/ico-workers.svg" alt="Workers & Queues page" className="icon size-md" /> - 
  The resource monitoring and queues management page.
  
* The [Settings Page](webapp_profile.md) <img src="/docs/latest/icons/ico-settings.svg" alt="Settings page" className="icon size-md" /> - 
  Manage a **ClearML** user account:
  * Set WebApp preferences
  * Create **ClearML** credentials
  * Provide Cloud Storage Access credentials for the **ClearML Web UI**
  * If using the **ClearML Hosted Service**, invite users and switch workspaces
  * If using the **Enterprise Server**, manage resource permissions
  * View usage stats
  
  To navigate to the Settings page, click the <img src="/docs/latest/icons/ico-me.svg" alt="Profile button" className="icon size-lg space-sm" /> 
  button in the top right corner of the web UI screen, then click **Settings**.

## WebApp Menus 

Click the help menu button <img src="/docs/latest/icons/ico-help-outlined.svg" alt="Help menu" className="icon size-lg space-sm" /> 
   in the top right corner of the web UI screen to access the following resources: 
* **ClearML Documentation**
* **Pro Tips** - Usage tips for using the WebApp
* **ClearML Python Package setup** - Instruction to get started with the `clearml` Python package
* **ClearML Apps Introduction** - A short description of ClearML's UI applications
* **Contact Us** - Click to be directed to ClearML's contact details, and a contact form. 

Click the profile menu button <img src="/docs/latest/icons/ico-me.svg" alt="Profile button" className="icon size-lg space-sm" /> 
  in the top right corner of the web UI screen to access the following: 
* **Settings** - Navigate to ClearML's [Settings](webapp_profile.md) page
* **Invite a User** to your workspace (supported in hosted service). Click **Invite a User** > input user's 
email > click **ADD** > page will redirect to the [**User Management**](webapp_profile.md#user-management) section of 
  the **Settings** page 
* **Switch to Workspace** - ClearML Hosted Service users can be members of multiple workspaces. These workspaces are listed here. 
  Click a workspace to switch to.
* **Logout** of the workspace 

## Community 

In addition, from the **ClearML Web UI**, use these buttons to access the **ClearML** community:

* The **ClearML** <img src="/docs/latest/icons/ico-slack-c.svg" alt="Slack Channel" className="icon size-md" /> Slack channel. Ask questions about **ClearML**.
* The **ClearML** <img src="/docs/latest/icons/ico-youtube.svg" alt="YouTube" className="icon size-md" /> YouTube Channel. View our tutorials, presentations, and discussions.
* The **ClearML** <img src="/docs/latest/icons/ico-github.svg" alt="GitHub" className="icon size-md" /> GitHub repository.



For more information, see the [Community page](../community.md).
