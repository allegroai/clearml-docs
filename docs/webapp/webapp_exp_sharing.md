---
title: Sharing Experiments and Models
---

:::info Hosted Service Feature
This is a ClearML Hosted Service feature only.
:::

**ClearML Hosted Service** users can share experiments with users in other workspaces. Sharing an experiment also shares 
all its contents including models, artifacts, and results.

**To share an experiment and its model(s):**

1. Click **Share** in one of these ways:

    * In the [experiment table](webapp_exp_table.md), right-click the experiment **>** **Share**
    * In the experiment info panel or full screen details view, click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> 
      (menu) **>** **Share**. 
   
1. Click **Create link**.

1. Copy the hyperlink and send it to a **ClearML Hosted Service** user of another workspace. Any user with this link will have 
read-only access to the experiment and all its contents.

:::note
When a user opens the hyperlink for a shared experiment in their browser, only that experiment appears in the experiment table. 
:::

## Making Shared Experiment Private

**To make a shared experiment private again:**

1. Click **Share** in one of these ways:

    * The experiment table - Right-click the experiment **>** **Share**
    * The experiment info panel or full screen details view **>** <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> 
      (menu) **>** **Share**. 

1. Click **Remove link**.

Another option is to archive the experiment, which makes the experiment private. 