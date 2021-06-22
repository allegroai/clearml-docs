---
title: ClearML Session
---

Machine Learning and Deep Learning development is sometimes more challenging than traditional software development. If 
you are working on an average laptop or computer, and you have a sizeable dataset that requires significant computation, 
your local machine may not be able to provide you with the resources for an effective workflow.

If you can run and debug your code  on your own machine, congrats you are lucky! Continue doing that, then clone your code 
in the UI and send it for long-term training on a remote machine.

**If you are not that lucky**, this section is for you :)

## What does Clearml Session do?
`clearml-session` is a feature that allows to launch a session of Jupyterlab and VS Code, and to execute code on a remote 
machine that better meets resource needs. With this feature, local links are provided, which can be used to access 
JupyterLab and VSCode on a remote machine over a secure and encrypted SSH connection.

![image](../img/clearml_session_jupyter.png)

## How it Works

ClearML allows to leverage a resource (e.g. GPU or CPU machine) by utilizing the [ClearML Agent](../clearml_agent).
A ClearML Agent will be executed on target machine, and ClearML Session will instruct it to execute the Jupyter \ VSCode server to develop remotely.
After entering a `clearml-session` command with all 
specifications: 

   1. `clearml-session` creates a new [Task](../fundamentals/task.md) that is responsible for setting up the SSH and 
      JupyterLab / VSCode environment, according to your specifications, on the host machine. 
   
   1. The Task is enqueued to the queue ClearML Agent listens to and then executed by it. It will download the appropriate server and execute it.  
   
   1. Once the Agent finishes the initial setup of the interactive Task, the local `cleaml-session` connects to the host 
   machine via SSH, and tunnels both SSH and JupyterLab over the SSH connection. If a specific Docker was specified, the 
   JupyterLab environment will run inside the Docker. 
   
   1. The CLI outputs access links to the remote JupyterLab and VSCode sessions:  

    ```console
    Interactive session is running:
    SSH: ssh root@localhost -p 8022 [password: c5d19b3c0fa9784ba4f6aeb568c1e036a4fc2a4bc7f9bfc54a2c198d64ceb9c8]
    Jupyter Lab URL: http://localhost:8878/?token=ff7e5e8b9e5493a01b1a72530d18181320630b95f442b419
    VSCode server available at http://localhost:8898/
    ```

   Notice the links are to 'localhost' since all communication to the remote server itself is done over secure SSH connection.
   
   1. Now start working on the code as if you're running on the target machine itself!

## Features 
### Running in Docker
To run a session inside a Docker container, use the `--docker` flag and enter the docker image to use in the interactive 
session.

### Passing requirements
`clearml-session` can download required Python packages. 
A `requirement.txt` file can be attached to the command using `--requirements </file/location.txt>`.
Alternatively, packages can be manually specified, using `--packages "<package_name>"` 
(for example `--packages "keras" "clearml"`) and they'll be automatically installed.

### Accessing git repository
To access a git repository remotely, add a `--git-credentials` flag and set it to `True`, so the local .git-credentials 
file is sent to the interactive session. This is helpful if working on private git repositories, and it allows for seamless 
cloning and tracking of git references, including untracked changes. 

### Re-launching and shutting down sessions 
If a `clearml-session` was launched locally and is still running on a remote machine, users can easily reconnect to it.
To reconnect to a previous session, execute `clearml-session` with no additional flags, and the option of reconnecting 
to an existing session will show up: 

```console
Connect to active session id=c7302b564aa945408aaa40ac5c69399c [Y]/n?`
```

If multiple sessions were launched from a local machine and are still active, choose the session to reconnect to:

```console
Active sessions:
0*] 2021-05-09 12:24:11 id=ed48fb83ad76430686b1abdbaa6eb1dd
1] 2021-05-09 12:06:48 id=009eb34abde74182a8be82f62af032ea
Connect to session [0-1] or 'N' to skip
```

To shut down a remote session, which will free the `clearml-agent` and close the CLI, enter "Shutdown". If a session 
is shutdown, there is no option to reconnect to it. 

### Connecting to existing session
If a `clearml-session` is running remotely, it's possible to continue working on the session from any machine. Starting a 
session initializes a Task with a unique ID in the ClearML Server. To connect to an existing session: 
1. Go to the ClearML UI, find the interactive session Task (by default it's in project "DevOps").
1. Click on the ID button to the right of the Task name, and copy the unique ID.
1. Enter the following command: `clearml-session --attach <session_id>`.
1. Click on the JupyterLab / VSCode link that is outputted, or connect directly to the SSH session


### Starting a debugging session 
Previously executed experiments in the ClearML system can be debugged on a remote interactive session. 
Input into `clearml-session` the ID of a Task to debug, then `clearml-session` clones the experiment's git repository and 
replicates the environment on a remote machine. Then the code can be interactively executed and debugged on JupyterLab / VSCode. 

:::note
The Task must be connected to a git repository, since currently single script debugging is not supported.
:::

1. In the **ClearML web UI**, find the experiment (Task) that needs debugging.
1. Click on the ID button next to the Task name, and copy the unique ID.
1. Enter the following command: `clearml-session --debugging-session <experiment_id_here>`
1. Click on the JupyterLab / VSCode link, or connect directly to the SSH session.
1. In JupyterLab / VSCode, access the experiment's repository in the `environment/task_repository` folder. 



--public-ip [true/false]
                        If True register the public IP of the remote machine.
                        Set if running on the cloud. Default: false (use for
                        local / on-premises)
  --vscode-server [true/false]
                        Install vscode server (code-server) on interactive
                        session (default: true)
  --jupyter-lab [true/false]
                        Install Jupyter-Lab on interactive session (default:
                        true)
  --user-folder USER_FOLDER
                        Advanced: Set the remote base folder (default: ~/)
  --requirements REQUIREMENTS
                        Specify requirements.txt file to install when setting
                        the interactive session. Requirements file is read and
                        stored in `packages` section as default for the next
                        sessions. Can be overridden by calling `--packages`
  --init-script [INIT_SCRIPT]
                        Specify BASH init script file to be executed when
                        setting the interactive session. Script content is
                        read and stored as default script for the next
                        sessions. To clear the init-script do not pass a file
  --config-file CONFIG_FILE
                        Advanced: Change the configuration file used to store
                        the previous state (default: ~/.clearml_session.json)
  --remote-gateway [REMOTE_GATEWAY]
                        Advanced: Specify gateway ip/address to be passed to
                        interactive session (for use with k8s ingestion / ELB)
  --base-task-id BASE_TASK_ID
                        Advanced: Set the base task ID for the interactive
                        session. (default: previously used Task). Use `none`
                        for the default interactive session
  --disable-keepalive   Advanced: If set, disable the transparent proxy always
                        keeping the sockets alive. Default: false, use
                        transparent socket mitigating connection drops.
  --queue-excluded-tag [QUEUE_EXCLUDED_TAG [QUEUE_EXCLUDED_TAG ...]]
                        Advanced: Excluded queues with this specific tag from
                        the selection
  --queue-include-tag [QUEUE_INCLUDE_TAG [QUEUE_INCLUDE_TAG ...]]
                        Advanced: Only include queues with this specific tag
                        from the selection
  --skip-docker-network
                        Advanced: If set, `--network host` is **not** passed
                        to docker (assumes k8s network ingestion) (default:
                        false)
  --password PASSWORD   Advanced: Select ssh password for the interactive
                        session (default: `randomly-generated` or previously
                        used one)
  --username USERNAME   Advanced: Select ssh username for the interactive
                        session (default: `root` or previously used one)
