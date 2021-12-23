---
title: ClearML Task Tutorial
---

In this tutorial, you will use `clearml-task` to execute this [script](https://github.com/allegroai/events/blob/master/webinar-0620/keras_mnist.py) 
on a remote or local machine, from the remote repository and from a local script. 

### Prerequisites

- `clearml` Python package installed 

- `clearml-agent` running on at least one machine (to execute the experiment) and assigned to listen to default queue 

- [allegroai/events](https://github.com/allegroai/events) repository cloned (for local script execution)

### Executing Code from a Remote Repository 

``` bash
clearml-task --project keras_examples --name remote_test --repo https://github.com/allegroai/events.git --script /webinar-0620/keras_mnist.py --args batch_size=64 epochs=1 --queue default
```

Provide `clearml-task` with the following arguments: 

1.  `--project keras_examples --name remote_test` - The project and experiment name.
   If the project entered doesn't exist, a new project will be created with the selected name.
   
1. `--repo https://github.com/allegroai/events.git` - The chosen repository's URL.
    By default, `clearml-task` will use the latest commit from the master branch. 
   
1. `--script /webinar-0620/keras_mnist.py` - The script to be executed.

1. `--args batch_size=64 epochs=1` - Arguments passed to the script.  
   This uses the `argparse` object to get CLI parameters.

1. `--queue default` - Selected queue to send the experiment to. 


Now `clearml-task` does the rest of the heavy-lifting! 

   * It creates a new Task on the [ClearML Server](../../deploying_clearml/clearml_server.md). 
   
   * Then, the Task is enqueued in the selected execution queue, where it will be executed by an available 
   `clearml-agent` assigned to that queue.  
     
Your output should look something like this: 
```console
New task created id=2f96ee95b05d4693b360d0fcbb26b727
Task id=2f96ee95b05d4693b360d0fcbb26b727 sent for execution on queue default
Execution log at: https://app.community.clear.ml/projects/552d5399112d47029c146d5248570295/experiments/2f96ee95b05d4693b360d0fcbb26b727/output/log
```

:::note Adding Requirements
`clearml-task` automatically finds the requirements.txt file in remote repositories. 
If a remote repo does not have such a file, make sure to either add one with all the required Python packages, 
or add the `--packages "<package_name>"` flag to the command (for example: `--packages "tqdm>=2.1" "scikit-learn"`).
::: 
<br />


### Executing a Local Script
Using `clearml-task` to execute a local script is very similar to using it with a remote repo.

For this example, we will be using a local version of this [script](https://github.com/allegroai/events/blob/master/webinar-0620/keras_mnist.py).
1. Go to the root folder of the cloned [allegroai/events](https://github.com/allegroai/events) repository 
1. Run `clearml-task` by executing:

``` bash
clearml-task --project keras --name local_test --script webinar-0620/keras_mnist.py --requirements webinar-0620/requirements.txt --args epochs=1 --queue default
```  

Notice that the command is almost identical to executing code from a git repository. The only differences are: 
* `--script webinar-0620/keras_mnist.py` - Pointing `clearml-task` to a local script. 
* `--requirements webinar-0620/requirements.txt` - Manually specifying a *requirements.txt* file. 

After executing `clearml-task`, a Task will be created according to the parameters entered. The Task will
be sent to a queue for execution. 
