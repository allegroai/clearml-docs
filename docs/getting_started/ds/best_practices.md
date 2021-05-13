---
title: Best Practices
---

This section talks about what made us design ClearML the way we did and how does it reflect on ML \ DL workflows.
While ClearML was designed to fit into any workflow, we do feel that working as we describe below brings a lot of advantages from organizing one's workflow
and furthermore, preparing it to scale in the long term.

:::important
The below is only our opinion. ClearML was designed to fit into any workflow whether it conforms to our way or not!
:::

## Develop Locally

**Work on a machine that is easily managable!** 

During early stages of model development, while code is still being modified heavily, this is the usual setup we'd expect to see used by data scientists:

  - A local development machine, usually a laptop (and usually using only CPU) with a fraction of the dataset for faster iterations - this is used for writing the training pipeline code, ensuring it knows to parse the data
 and there are no glaring bugs. 
  - A workstation with a GPU, usually with a limited amount of memory for small batch-sizes. This is used to train the model and ensure the model we chose makes sense and that the training
  procedure works. Can be used to provide initial models for testing. 

The abovementioned setups might be folded into each other and that's great! If you have a GPU machine for each researcher that's awesome! 
The goal of this phase is to get a code, dataset and environment set-up so we can start digging to find the best model!

-  [ClearML SDK](../../clearml_sdk.md) should be integrated into your code (Check out our [getting started](ds_first_steps.md)). 
  This helps visualizing the results and track progress.
- [ClearML Agent](../../clearml_agent.md) helps moving your work to other machines without the hassle of rebuilding the environment every time, 
  while also creating an easy queue interface that easily allows you to just drop your experiments to be executed one by one
  (Great for ensuring that the GPUs are churning during the weekend).
- [ClearML Session](../../apps/clearml_session.md) helps with developing on remote machines, just like you'd develop on you local laptop!

## Train Remotely

In this phase, we scale our training efforts, and try to come up with the best code \ parameter \ data combination that 
yields the best performing model for our task!

  - The real training (usually) should **not** be executed on your development machine.
  - Training sessions should be launched and monitored from a web UI.
  - You should continue coding while experiments are being executed without interrupting them.
  - Stop optimizing your code because your machine struggles, and run it on a beefier machine (cloud \ on-prem).

Visulization and comparisons dashboards keep your sanity at bay! In this stage we usually have a docker container with all the binaries 
that we need. 
- [ClearML SDK](../../clearml_sdk.md) ensures that all the metrics, parameters and Models are automatically logged and can later be 
  accessed, [compared](../../webapp/webapp_exp_comparing.md) and [tracked](../../webapp/webapp_exp_track_visual.md).
- [ClearML Agent](../../clearml_agent.md) does the heavy lifting. It reproduces the execution environment, clones your code 
  , apply code patches, manage parameters (Including overriding them on the fly), execute the code and queue multiple tasks
  It can even [build](../../clearml_agent.md#buildingdockercontainers) the docker container for you!
-[ClearML Pipelines](../../fundamentals/pipelines.md) ensures that steps run in the same order, 
  programatically chaining tasks together, while giving an overview of the execution pipeline's status.<br/>

**Your entire environment should magically be able to run on any machine, without you working hard.** 

## Track EVERYTHING

We believe that you should track everything! From obscure parameters to weird metrics, it's impossible to know what will end up
improving our results later on!

- Make sure experiments are reproducible! ClearML logs  code, parameters, environment in a single, easily searchable place. 
- Development is not linear. Configuration \ Parameters should not be stored in your git
  they are temporary, and we constantly change them. But we still need to log them because who knows one day...
- Uncommitted changes to your code should be stored for later forensics in case that magic number actually saved the day. Not every line change should be committed.
- Mark potentially good experiments, make them the new baseline for comparison.

## Visibility Matters

While it's possible to track experiments with one tool, and pipeline them with another, we believe that having 
everything under the same roof benefits you great! It's