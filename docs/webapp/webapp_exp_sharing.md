---
title: Sharing Experiments and Models
---

:::important
This is a ClearML Hosted Service feature only.
:::

**ClearML Hosted Service** users can share experiments with users of another workspace. Sharing an experiment shares its 
models, as well. Shared experiments are read-only, and they can be made private by [archiving](webapp_archiving.md) 
them.

:::note
When a user opens the hyperlink for a shared experiment in their browser, only that experiment appears in the experiment table. 
:::

## Sharing Experiments

Share experiments from the experiments table, the info panel menu, and/or the full screen details menu.

**To share an experiment and its model:**

1. Click **Share** in one of these ways:

    * The experiment table - Right-click the experiment **>** **Share**
    * The info panel or full screen details view - Click the experiment **>** <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> 
      (menu) **>** **Share**. 
   
1. Click **Create link**.

1. Copy the hyperlink and send it to a **ClearML Hosted Service** user of another workspace.

## Making Shared Experiment Private

**To make a shared experiment private again:**

1. Make private from the experiment table, info panel, or full screen details view (see "Sharing experiments" above).

1. Click **Share**.

1. Click **Remove link**.

Another option is to [archive](webapp_archiving.md) the experiment. When archiving the experiment, it automatically becomes private. 