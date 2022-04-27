---
title: Best Practices
---

This section talks about what made us design ClearML the way we did and how it reflects on ML / DL workflows.
While ClearML was designed to fit into any workflow, we do feel that working as we describe below brings a lot of advantages from organizing one's workflow
and furthermore, preparing it to scale in the long term.

:::important
The below is only our opinion. ClearML was designed to fit into any workflow whether it conforms to our way or not!
:::

## Develop Locally

**Work on a machine that is easily manageable!** 

During early stages of model development, while code is still being modified heavily, this is the usual setup we'd expect to see used by data scientists:

  - A local development machine, usually a laptop (and usually using only CPU) with a fraction of the dataset for faster 
    iterations - Use a local machine for writing, training, and debugging pipeline code. 
  - A workstation with a GPU, usually with a limited amount of memory for small batch-sizes - Use this workstation to train 
    the model and ensure that you choose a model that makes sense, and the training procedure works. Can be used to provide initial models for testing. 

The abovementioned setups might be folded into each other and that's great! If you have a GPU machine for each researcher, that's awesome! 
The goal of this phase is to get a code, dataset and environment setup, so we can start digging to find the best model!

-  [ClearML SDK](../../clearml_sdk.md) should be integrated into your code (check out our [getting started](ds_first_steps.md)). 
  This helps visualizing the results and tracking progress.
- [ClearML Agent](../../clearml_agent.md) helps moving your work to other machines without the hassle of rebuilding the environment every time, 
  while also creating an easy queue interface that easily allows you to just drop your experiments to be executed one by one
  (great for ensuring that the GPUs are churning during the weekend).
- [ClearML Session](../../apps/clearml_session.md) helps with developing on remote machines, just like you'd develop on you local laptop!

## Train Remotely

In this phase, we scale our training efforts, and try to come up with the best code / parameter / data combination that 
yields the best performing model for our task!

  - The real training (usually) should **not** be executed on your development machine.
  - Training sessions should be launched and monitored from a web UI.
  - You should continue coding while experiments are being executed without interrupting them.
  - Stop optimizing your code because your machine struggles, and run it on a beefier machine (cloud / on-prem).

Visualization and comparisons dashboards keep your sanity at bay! In this stage we usually have a docker container with all the binaries 
that we need. 
- [ClearML SDK](../../clearml_sdk.md) ensures that all the metrics, parameters and Models are automatically logged and can later be 
  accessed, [compared](../../webapp/webapp_exp_comparing.md) and [tracked](../../webapp/webapp_exp_track_visual.md).
- [ClearML Agent](../../clearml_agent.md) does the heavy lifting. It reproduces the execution environment, clones your code, 
  applies code patches, manages parameters (Including overriding them on the fly), executes the code and queues multiple tasks
  It can even [build](../../clearml_agent.md#exporting-a-task-into-a-standalone-docker-container) the docker container for you!  
- [ClearML Pipelines](../../pipelines/pipelines.md) ensure that steps run in the same order, 
  programmatically chaining tasks together, while giving an overview of the execution pipeline's status.

**Your entire environment should magically be able to run on any machine, without you working hard.** 

## Track EVERYTHING

We believe that you should track everything! From obscure parameters to weird metrics, it's impossible to know what will end up
improving our results later on!

- Make sure experiments are reproducible! ClearML logs code, parameters, environment in a single, easily searchable place. 
- Development is not linear. Configuration / Parameters should not be stored in your git, as
  they are temporary and constantly changing. They still need to be logged because who knows, one day...
- Uncommitted changes to your code should be stored for later forensics in case that magic number actually saved the day. Not every line change should be committed.
- Mark potentially good experiments, make them the new baseline for comparison.

## Visibility Matters

While it's possible to track experiments with one tool, and pipeline them with another, we believe that having 
everything under the same roof has its benefits! 

Being able to track experiment progress and compare experiments, and based on that send experiments to execution on remote
machines (that also build the environment themselves) has tremendous benefits in terms of visibility and ease of integration.

Being able to have visibility in your pipeline, while using experiments already defined in the platform 
enables users to have a clearer picture of the pipeline's status 
and makes it easier to start using pipelines earlier in the process by simplifying chaining tasks.

Managing datasets with the same tools and APIs that manage the experiments also lowers the barrier of entry into 
experiment and data provenance.
