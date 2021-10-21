---
title: Remote Jupyter Tutorial
---

In this tutorial we will learn how to launch a remote interactive session on Jupyter Notebook using `clearml-session`.
We will be using two machines. A local one, where we will be using an interactive session of Jupyter, and a remote machine, 
where a `clearml-agent` will run and spin an instance of the remote session. 

## Prerequisites

* `clearml-session` package installed (`pip install clearml-session`)
* At least one `clearml-agent` running on a **remote** host. See [installation details](../../clearml_agent.md#installation).
  Configure the `clearml-agent` to listen to the `default` queue (`clearml-agent daemon --queue default`)
* An SSH client installed on machine being used. To verify, open terminal, execute `ssh`, and if no error is received,
    it should be good to go.
  

## Steps

### Step 1: Launch `clearml-session`

Execute the `clearml-session` command with the following command line options:

```bash
clearml-session --docker nvidia/cuda:10.1-cudnn7-runtime-ubuntu18.04 --packages "clearml" "tensorflow>=2.2" "keras" --queue default
```
   
* Enter a docker image `--docker nvidia/cuda:10.1-cudnn7-runtime-ubuntu18.04` 
    
* Enter required python packages `--packages "clearml" "tensorflow>=2.2" "keras"`
      
* Specify the resource queue `--queue default`. 

:::note
There is an option to enter a project name using `--project <name>`. If no project is input, the default project 
name is "DevOps"
:::
   
After launching the command, the `clearml-agent` listening to the `default` queue spins a remote Jupyter environment with 
the specifications. It will automatically connect to the docker on the remote machine. 
   
The terminal should return output with the session's configuration details, which should look something like this:
    
```console
Interactive session config:
  {
       "base_task_id": null,
       "git_credentials": false,
       "jupyter_lab": true,
       "password": "0879348ae41fb944004ff89b9103f09592ec799f39ae34e5b71afb46976d5c83",
       "queue": "default",
       "vscode_server": true
  }
```

### Step 2: Launch Interactive Session 

When the CLI asks whether to `Launch interactive session [Y]/n?`, press 'Y' or 'Enter'.  

The terminal should output information regarding the status of the environment-building process, which should look 
something like this:
   
```console 
Creating new session
New session created [id=35c0af81ae6541589dbae1efb747f388]
Waiting for remote machine allocation [id=35c0af81ae6541589dbae1efb747f388]
.Status [queued]
...Status [in_progress]
Remote machine allocated
Setting remote environment [Task id=35c0af81ae6541589dbae1efb747f388]
Setup process details: https://app.community.clear.ml/projects/60893b87b0b642679fde00db96e90359/experiments/35c0af81ae6541589dbae1efb747f388/output/log
Waiting for environment setup to complete [usually about 20-30 seconds]
```

### Step 3: Connect to Remote Notebook

Then the CLI will output a link to the ready environment:

```console
Interactive session is running:
SSH: ssh root@localhost -p 8022 [password: c5d19b3c0fa9784ba4f6aeb568c1e036a4fc2a4bc7f9bfc54a2c198d64ceb9c8]
Jupyter Lab URL: http://localhost:8878/?token=ff7e5e8b9e5493a01b1a72530d18181320630b95f442b419
VSCode server available at http://localhost:8898/
```

Click on the JupyterLab link, which will open the remote session
   
Now, let's execute some code in the remote session!

### Step 4: Execute Code

1. Open up a new Notebook.

1. In the first cell of the notebook, clone the [ClearML Repo](https://github.com/allegroai/clearml). 

        !git clone https://github.com/allegroai/clearml.git

1. In the second cell of the notebook, we are going to run this [script](https://github.com/allegroai/clearml/blob/master/examples/frameworks/keras/keras_tensorboard.py) 
   from the repository that we cloned.
   
        %run clearml/examples/frameworks/keras/keras_tensorboard.py

   Look in the script, and notice that it makes use of ClearML, Keras, and TensorFlow, but we don't need to install these 
   packages in Jupyter, because we specified them in the `--packages` flag of `clearml-session`. 
   
### Step 5: Shut Down Remote Session

To shut down the remote session, which will free the `clearml-agent` and close the CLI, enter "Shutdown".
   
```console
Connection is up and running
Enter "r" (or "reconnect") to reconnect the session (for example after suspend)
Ctrl-C (or "quit") to abort (remote session remains active)
or "Shutdown" to shutdown remote interactive session
```
