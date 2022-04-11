---
title: First Steps
---


## Install ClearML


First, [sign up for free](https://app.clear.ml)

Install the `clearml` python package:
```bash
pip install clearml
```

## Connect ClearML SDK to the Server 
1. Execute the following command to run the ClearML setup wizard:

   ```bash
   clearml-init
   ```

   If the setup wizard's response indicates that a configuration file already exists, follow the instructions in 
   [here](../../deploying_clearml/clearml_config_for_clearml_server.md#add-clearml-to-a-configuration-file). The wizard 
   does not edit or overwrite existing configuration files.

1. The setup wizard prompts for ClearML credentials.

   ```console
   Please create new clearml credentials through the settings page in your `clearml-server` web app, 
   or create a free account at https://app.clear.ml/settings/webapp-configuration
    
   In the settings > workspace  page, press "Create new credentials", then press "Copy to clipboard".
   Paste copied configuration here: 
   ```
      
1. Get ClearML credentials. Open the ClearML Web UI in a browser. On the [**SETTINGS > WORKSPACE**](https://app.clear.ml/settings/workspace-configuration) 
   page, click **Create new credentials** **>** **Copy to clipboard**.
    
1. At the command prompt `Paste copied configuration here:`, copy and paste the ClearML credentials.
   The setup wizard confirms the credentials. 
   ```console
   Detected credentials key="********************" secret="*******"
   ```
   
1. Enter the ClearML Server web server URL, or press **Enter** to accept the default which is detected from the 
   credentials.
   
   ```console 
   WEB Host configured to: [https://app.<your-domain>] 
   ```
    
1. Enter the ClearML Server API server URL, or press **Enter** to accept the default value which is based on the previous response:
   ```console 
   API Host configured to: [https://api.<your-domain>] 
   ```
   
1. Enter the ClearML Server file server URL, or press **Enter** to accept the default value which is based on the previous response:
   ```console
   File Store Host configured to: [files.<your-domain>] 
   ``` 
   
   The wizard responds with a configuration and directs to the ClearML Server.
   ```console 
   CLEARML Hosts configuration:
   Web App: https://app.<your-domain>
   API: https://api.<your-domain>
   File Store: https://files.<your-domain>
            
   Verifying credentials ...
   Credentials verified!
    
   New configuration stored in /home/<username>/clearml.conf
   CLEARML setup completed successfully.
   ```
   
Now you can integrate ClearML into your code!

## Auto-log Experiment

In ClearML, experiments are organized as [Tasks](../../fundamentals/task.md).

ClearML will automatically log your experiment and code, including outputs and parameters from popular ML frameworks,
once you integrate the ClearML [SDK](../../clearml_sdk.md) with your code. To control what ClearML automatically logs, see this [FAQ](../../faq.md#controlling_logging).

At the beginning of your code, import the `clearml` package:

```python
from clearml import Task
```

:::note Full Automatic Logging
To ensure full automatic logging, it is recommended to import the `clearml` package at the top of your entry script.
:::

Then initialize the Task object in your `main()` function, or the beginning of the script.

```python
task = Task.init(project_name='great project', task_name='best experiment')
```

Task name is not unique, it's possible to have multiple experiments with the same name.
If the project does not already exist, a new one will be created automatically.

The console should return the following output:

```
ClearML Task: created new task id=1ca59ef1f86d44bd81cb517d529d9e5a
2021-07-25 13:59:09
ClearML results page: https://app.clear.ml/projects/4043a1657f374e9298649c6ba72ad233/experiments/1ca59ef1f86d44bd81cb517d529d9e5a/output/log
2021-07-25 13:59:16
```

**That’s it!** You are done integrating ClearML with your code :)

Now, [command-line arguments](../../fundamentals/hyperparameters.md#command-line-parsing), [console output](../../fundamentals/logger.md#types-of-logged-results) as well as Tensorboard and Matplotlib will automatically be logged in the UI under the created Task.
<br/>

Sit back, relax, and watch your models converge :) or continue to see what else can be done with ClearML [here](ds_second_steps.md).

## Youtube Playlist

Or watch the Youtube Getting Started Playlist on our Youtube Channel!

[![Watch the video](https://img.youtube.com/vi/bjWwZAzDxTY/hqdefault.jpg)](https://www.youtube.com/watch?v=bjWwZAzDxTY&list=PLMdIlCuMqSTnoC45ME5_JnsJX0zWqDdlO&index=2)
