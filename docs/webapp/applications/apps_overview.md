---
title: Overview
---

:::info Pro Plan Offering
ClearML Applications are available under the ClearML Pro plan
:::

Use ClearML's GUI Applications to manage ML workloads and automatically run your recurring workflows without any coding. 

![Apps page](../../img/apps_overview_page.png)

Configure and launch app instances, then track their execution from the app dashboard.

ClearML provides the following applications:
* General: Applications for automating and optimizing workflows, and monitoring project performance.
  * [**Hyperparameter Optimization**](apps_hpo.md) - Find the parameter values that yield the best performing models
  * **Nvidia Clara** - Train models using Nvidia's Clara framework
  * [**Project Dashboard**](apps_dashboard.md) - High-level project monitoring with Slack alerts
  * [**Task Scheduler**](apps_task_scheduler.md) - Schedule tasks for one-shot and/or periodic execution at specified times (available under ClearML Enterprise Plan)
  * [**Trigger Manager**](apps_trigger_manager.md) - Define tasks to be run when predefined events occur (available under ClearML Enterprise Plan)
* AI Dev: Applications for deploying AI development environments on remote machines. 
  * [**Jupyter Lab**](apps_jupyter_lab.md) - Launch a Jupyter Lab session on a remote machine (available under ClearML Enterprise Plan)
  * [**VS Code**](apps_vscode.md) - Launch a VS Code session on a remote machine (available under ClearML Enterprise Plan)
* UI Dev: Applications for deploying user interfaces for models.
  * [**Gradio Launcher**](apps_gradio.md) - Create visual web interfaces for your models with Gradio (available under ClearML Enterprise Plan)
  * [**Streamlit Launcher**](apps_streamlit.md) - Create visual web interfaces for your models with Streamlit (available under ClearML Enterprise Plan)
* Deploy: Applications for deploying machine learning models as scalable, secure services.
  * [**Embedding Model Deployment**](apps_embed_model_deployment.md) Deploy embedding models as networking services over a secure endpoint (available under ClearML Enterprise Plan)
  * [**Model Deployment**](apps_model_deployment.md) - Deploy LLM models as networking services over a secure endpoint (available under ClearML Enterprise Plan)

:::info Autoscalers
Autoscaling ([AWS Autoscaler](apps_aws_autoscaler.md) and [GCP Autoscaler](apps_gcp_autoscaler.md))
was previously available through the Applications page. The autoscaler functionality has been moved to the [Orchestration page](https://app.clear.ml/workers-and-queues/autoscalers) 
in the WebApp. 
:::

## App Pages Layout
Each application's page is split into two sections:
* App Instance List - Launch new app instances and view previously launched instances. Click on an instance to view its 
  dashboard. Hover over it to access the [app instance actions](#app-instance-actions).
* App Instance Dashboard - The main section of the app page: displays the selected app instance's status and results.

![App format](../../img/apps_format_overview.png)

## Launching an App Instance

1. Choose the desired app
1. Click `Launch New` <img src="/docs/latest/icons/ico-add.svg" alt="Add new" className="icon size-md space-sm" /> to open the app's configuration form
1. Fill in the configuration details
1. **Launch**

:::tip Configuration shortcuts
You can also launch an app instance with the configuration of a previously launched instance:
* Cloning a previously launched app instance will open the instance launch form with the original instance's configuration 
  prefilled.
* Importing an app configuration file. You can export an existing app instance's configuration as a JSON file when 
  viewing its configuration.

The prefilled instance launch form can be edited before starting the new app instance. 
:::
  
## App Instance Actions
Access app instance actions, by right-clicking an instance, or through the menu button <img src="/docs/latest/icons/ico-dots-v-menu.svg" alt="Dot menu" className="icon size-md space-sm" /> (available on hover).

![App context menu](../../img/app_context_menu.png)

* **Rename** - Rename the instance 
* **Configuration** - View an instance's configuration 
* **Export Configuration** - Export the app instance configuration as a JSON file, which you can later import to create 
  a new instance with the same configuration   
* **Stop** - Shutdown the instance
* **Clone** - Launch a new instance with same configuration prefilled
* **Delete** - Delete the instance

## Instance List Actions 

Access the instance list actions by clicking the action menu (<img src="/docs/latest/icons/ico-dots-v-menu.svg" alt="Dot menu" className="icon size-md space-sm" />) 
on the instance list header:

![Instance list actions](../../img/apps_instance_list_actions.png)

* **Import Configuration** - Import an app instance's configuration file. This opens the app instance launch form
  prefilled according to the imported file. You can modify the configuration before launching the instance.  

* **Clear Completed** - Delete all app instances that have completed their execution. This action only 
deletes instances in the current instance list view (i.e. My instances / All).

