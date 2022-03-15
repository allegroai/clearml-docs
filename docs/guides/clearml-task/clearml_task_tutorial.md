---
title: ClearML Task Tutorial
---

In this tutorial, you will use `clearml-task` to execute [a script](https://github.com/allegroai/events/blob/master/webinar-0620/keras_mnist.py) 
on a remote or local machine, from a remote repository and your local machine. 

### Prerequisites

- `clearml` Python package installed 

- `clearml-agent` running on at least one machine (to execute the experiment), configured to listen to default queue 

### Executing Code from a Remote Repository 

``` bash
clearml-task --project keras_examples --name remote_test --repo https://github.com/allegroai/events.git --branch master --script /webinar-0620/keras_mnist.py --args batch_size=64 epochs=1 --queue default
```

This sets the following arguments: 

* `--project keras_examples --name remote_test` - The project and experiment names
* `--repo https://github.com/allegroai/events.git` - The repository's URL. By default, `clearml-task` uses the latest 
  commit from the master branch
* `--branch master` - The repository branch 
* `--script /webinar-0620/keras_mnist.py` - The script to be executed
* `--args batch_size=64 epochs=1` - Arguments passed to the script. This uses the `argparse` object to get CLI parameters
* `--queue default` - Selected queue to send the experiment to

:::note Adding Requirements
`clearml-task` automatically finds the requirements.txt file in remote repositories. 
If a remote repo does not have such a file, make sure to either add one with all the required Python packages, 
or add the `--packages "<package_name>"` option to the command (for example: `--packages "tqdm>=2.1" "scikit-learn"`).
::: 

Now `clearml-task` does all the heavy-lifting!
1. It creates a new Task on the [ClearML Server](../../deploying_clearml/clearml_server.md).
1. `clearml-task` enqueues the task in the selected execution queue, where a [ClearML Agent](../../clearml_agent.md) 
   assigned to that queue executes the task.  
     
Your output should look something like this:

```console
New task created id=2f96ee95b05d4693b360d0fcbb26b727
Task id=2f96ee95b05d4693b360d0fcbb26b727 sent for execution on queue default
Execution log at: https://app.clear.ml/projects/552d5399112d47029c146d5248570295/experiments/2f96ee95b05d4693b360d0fcbb26b727/output/log
```


### Executing a Local Script

For this example, use a local version of [this script](https://github.com/allegroai/events/blob/master/webinar-0620/keras_mnist.py).
1. Clone the [allegroai/events](https://github.com/allegroai/events) repository 
1. Go to the root folder of the cloned repository 
1. Run the following command:

```bash
clearml-task --project keras --name local_test --script webinar-0620/keras_mnist.py --branch master --requirements webinar-0620/requirements.txt --args epochs=1 --queue default
```  

This sets the following arguments:
* `--project keras --name local_test` - The project and experiment names 
* `--script /webinar-0620/keras_mnist.py` - The local script to be executed
* `-requirements webinar-0620/requirements.txt` - The local python package requirements file
* `--args batch_size=64 epochs=1` - Arguments passed to the script. This uses the argparse object to capture CLI parameters
* `--queue default` - Selected queue to send the experiment to

`clearml-task` creates a task according to the input parameters, and sends the task to the `default` queue for execution.