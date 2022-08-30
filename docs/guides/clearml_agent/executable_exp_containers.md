---
title: Executable Experiment Containers
---

This tutorial demonstrates using [`clearml-agent`](../../clearml_agent.md)’s [`build`](../../clearml_agent/clearml_agent_build.md) 
command to package an experiment into an executable container. In this example, you will build a Docker image that, when 
run, will automatically execute the [keras_tensorboard.py](https://github.com/allegroai/clearml/blob/master/examples/frameworks/keras/keras_tensorboard.py)
script.

## Prerequisites
* [`clearml-agent`](../../clearml_agent.md#installation) installed and configured
* [`clearml`](../../getting_started/ds/ds_first_steps.md#install-clearml) installed and configured
* [clearml](https://github.com/allegroai/clearml) repo cloned (`git clone https://github.com/allegroai/clearml.git`)

## Creating the ClearML Experiment
1. Set up the experiment’s execution environment:
   
   ```console
   pip install "tensorflow>=2.0" clearml
   ```

1. Run the experiment:
   
   ```console
   python keras_tensorboard.py
   ```
   This creates a ClearML task called "Keras with TensorBoard example" in the "examples" project.

   Note the task ID in the console output when running the script above:

   ```console
   ClearML Task: created new task id=<TASK_ID>
   ```
   This ID will be used in the following section.

## Building and Launching a Containerized Task
1. Execute the following command to build the container. Input the ID of the task created above.  
   ```console
   clearml-agent build --id <TASK_ID> --docker --target new-docker --entry-point clone_task
   ```

   :::tip
   If the container will not make use of a GPU, add the `--cpu-only` flag
   :::

   This command will create a docker container, set up with the execution environment for this experiment in the 
   specified `--target` folder. When the Docker container is launched, it will clone the task specified with `id` and 
   execute the clone (as designated by the `--entry-point` parameter).

1. Run the Docker, pointing to the new container:

   ```console
   docker run new-docker
   ```

   The task will be executed inside the container. Task details can be viewed in the [ClearML Web UI](../../webapp/webapp_overview.md).

For additional ClearML Agent options, see the [ClearML Agent reference page](../../clearml_agent/clearml_agent_ref.md).
