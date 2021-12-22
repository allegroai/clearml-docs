---
title: ClearML Agent on Google Colab
---

[Google Colab](https://colab.research.google.com) is a common development environment for data scientists. It offers a convenient IDE as well as
compute provided by google.

Users can transform a Google Colab instance into an available resource in ClearML using [ClearML Agent](../../clearml_agent.md).

In this tutorial, we will go over how to create a ClearML worker node in a Google Colab notebook. Once the worker is up 
and running, users can send Tasks to be executed on the Google Colab's HW.

## Prerequisites
* Be signed up for ClearML (Or have a server deployed).
* Have a Google account to access Google Colab


## Steps 
1. Open up [this Google Colab notebook](https://colab.research.google.com/github/pollfly/clearml/blob/master/examples/clearml_agent/clearml_colab_agent.ipynb).

1. Run the first cell, which installs all the necessary packages:
    ```
    !pip install git+https://github.com/allegroai/clearml
    !pip install clearml-agent
    ```
1. Run the second cell, which exports this environment variable:
   ```
   ! export MPLBACKEND=TkAg
   ```
   This environment variable makes Matplotlib work in headless mode, so it won't output graphs to the screen.
   
1. Create new credentials.   
   Go to your **profile** in the [ClearML WebApp](https://app.community.clear.ml). Under the **WORKSPACES** section, 
   go to **App Credentials**, click **+ Create new credentials**, and copy the information that pops up. 
   
1. Set the credentials.  
   In the third cell, enter your own credentials:
   ```python
   from clearml import Task
   
   Task.set_credentials(api_host="https://api.community.clear.ml", 
                        web_host="https://app.community.clear.ml", 
                        files_host="https://files.community.clear.ml", 
                        key='6ZHX9UQMYL874A1NE8', 
                        secret='=2h6#%@Y&m*tC!VLEXq&JI7QhZPKuJfbaYD4!uUk(t7=9ENv'
   )
   ```
   
   
1. In the fourth cell, launch a `clearml-agent` that will listen to the `default` queue:
   ```
   !clearml-agent daemon --queue default
   ```
   
   For additional options for running `clearml-agent`, see the [clearml-agent reference](../../references/clearml_agent_ref.md).  
   
   After cell 4 is executed, the worker should now appear in the [**Workers & Queues**](../../webapp/webapp_workers_queues.md) 
   page of your server. Clone experiments and enqueue them to your hearts content! The `clearml-agent` will fetch 
   experiments and execute them using the Google Colab hardware.
   

