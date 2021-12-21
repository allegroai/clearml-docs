---
title: ClearML Task
---

ClearML Task is ClearML's Zero Code Integration Module. Using only the command line and **zero** additional lines of code, 
you can easily track your work and integrate ClearML with your existing code.

`clearml-task` automatically integrates ClearML into any script or **any** python repository. `clearml-task` has the option 
to send the task to a queue, where a **ClearML Agent** listening to the queue will fetch the task and execute it on a 
remote or local machine. It's even possible to provide command line arguments and provide Python module dependencies and requirements.txt file! 

## How Does ClearML Task Work?

1. Execute `clearml-task`, pointing it to your script or repository, and optionally an execution queue. 
1. `clearml-task` does its magic! It creates a new experiment on the [ClearML Server](../deploying_clearml/clearml_server.md), 
   and, if a queue was specified, it sends the experiment to the queue to be fetched and executed by a **ClearML Agent**.
1. The command line will provide you with a link to your task's page in the ClearML web UI, 
   where you will be able to view the task's details. 
   
## Features and Options
### Docker
Specify a docker container to run the code in by with the `--docker <docker_image>` flag.
The ClearML Agent will pull it from dockerhub or a docker artifactory automatically.

### Package Dependencies
If the local script requires packages to be installed, or the remote repository doesn't have a requirements.txt file,
specify manually the required python packages using `--packages "<package_name>"`, for example `--packages "keras" "tensorflow>2.2"`.

### Queue
Tasks are passed to ClearML Agents via [Queues](../fundamentals/agents_and_queues.md). Specify a queue to enqueue the task to.
If a queue isn't chosen in the `clearml-task` command, the task will not be executed; it will be left in draft mode,
and can be enqueued at a later point. 

### Branch and Working Directory
To specify a specific branch and commit ID to be executed, pass
`--branch <branch_name> --commit <commit_id>` flags.
If unspecified, `clearml-task` will use the latest commit from the master branch.

### Command Line Options

<div className="tbl-cmd">

|Name | Description| Optional |
|---|----|---|
| `--version` | Display the `clearml-task` utility version | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--project`| Set the project name for the task (Required, unless using `--base-task-id`) | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `--name` | Select a name for the remote task | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `--repo` | URL of remote repository. Example: `--repo https://github.com/allegroai/clearml.git` | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--branch` | Select specific repository branch / tag. By default, latest commit from the master branch | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--commit` | Select specific commit ID to use. By default, latest commit, or local commit ID when using local repository | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--folder` | Remotely execute the code in a local folder. Notice! It assumes a git repository already exists. Current state of the repo (commit ID and uncommitted changes) is logged and will be replicated on the remote machine | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> | 
| `--script` | Entry point script for the remote execution. When used in tandem with `--repo`, the script should be a relative path inside the repository. For example: `--script source/train.py`. When used with `--folder`, it supports a direct path to a file inside the local repository itself, for example: `--script ~/project/source/train.py` | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `--cwd` | Working directory to launch the script from. Relative to repo root or local `--folder` | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--args` | Arguments to pass to the remote task, list of `<argument>=<value>` strings. Currently only argparse arguments are supported. Example: `--args lr=0.003 batch_size=64` | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--queue` | Select task's execution queue. If not provided, a task will be created but it will not be launched | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--requirements` | Specify `requirements.txt` file to install when setting the session. By default, the` requirements.txt` from the repository will be used |  <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--packages` | Manually specify a list of required packages. Example: `--packages "tqdm>=2.1" "scikit-learn"` | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--docker` | Select the docker image to use in the remote task | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--docker_args` | Add docker arguments, pass a single string | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--docker_bash_setup_script` | Add bash script to be executed inside the docker before setting up the task's environment | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--output-uri` | Set the task `output_uri`, upload destination for task models and artifacts (Optional) | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--task-type` | Set the task type. Optional values: training, testing, inference, data_processing, application, monitor, controller, optimizer, service, qc, custom | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--skip-task-init` | If set, `Task.init()` call is not added to the entry point, and is assumed to be called within the script. Default: Add `Task.init()` call to entry point script | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |
| `--base-task-id` | Use a pre-existing task in the system, instead of a local repo / script. Essentially clones an existing task and overrides arguments / requirements | <img src="/docs/latest/icons/ico-optional-yes.svg" alt="Yes" className="icon size-md center-md" /> |

</div>

## Tutorial
Learn how to use the `clearml-task` feature [here](../guides/clearml-task/clearml_task_tutorial.md).
