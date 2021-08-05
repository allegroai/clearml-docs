---
title: ClearML Task
---

ClearML Task is ClearML's Zero Code Integration Module. Using only the command line and **zero** additional lines of code, 
you can easily track your work and integrate ClearML with your existing code.

`clearml-task` automatically integrates ClearML into any script or **any** python repository. `clearml-task` has the option 
to send the Task to a queue, where a **ClearML Agent** listening to the queue will fetch the Task it and executes it on a 
remote or local machine. It's even possible to provide command line arguments and provide Python module dependencies and requirements.txt file! 

## How Does ClearML Task Work?

1. Execute `clearml-task`, pointing it to your script or repository, and optionally an execution queue. 
1. `clearml-task` does its magic! It creates a new experiment on the [ClearML Server](../deploying_clearml/clearml_server.md), 
   and, if a queue was specified, it sends the experiment to the queue to be fetched and executed by a **ClearML Agent**.
1. The command line will provide you with a link to your Task's page in the ClearML web UI, 
   where you will be able to view the Task's details. 
   
## Features and Options
### Docker
Specify a docker container to run the code in by with the `--docker <docker_image>` flag.
The ClearML Agent will pull it from dockerhub or a docker artifactory automatically.

### Package Dependencies
If the local script requires packages to be installed installed or the remote repository doesn't have a requirements.txt file,
specify manually the required python packages using<br/>
`--packages "<package_name>"`, for example `--packages "keras" "tensorflow>2.2"`.

### Queue
Tasks are passed to ClearML Agents via [Queues](../fundamentals/agents_and_queues.md). Specify a queue to enqueue the Task to.
If a queue isn't chosen in the `clearml-task` command, the Task will not be executed; it will be left in draft mode,
and can be enqueued at a later point. 

### Branch and Working Directory
A specific branch and commit ID, other than latest commit in master, to be executed can be specified by passing
`--branch <branch_name> --commit <commit_id>` flags.
If unspecified, `clearml-task` will use the latest commit from the master branch.

## Tutorial
Learn how to use the `clearml-task` feature [here](../guides/clearml-task/clearml_task_tutorial.md).

