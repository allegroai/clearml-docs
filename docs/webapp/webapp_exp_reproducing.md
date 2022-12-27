---
title: Reproducing Experiments
---

Reproduce experiments on local or remote machines, in one of the following ways: 
* **Cloning** any experiment - make an exact copy keeping the original
* **Resetting** an experiment whose status is not *Published* - this deletes the previous run's 
logs and output. 
  
After cloning or resetting, enqueue the reset or newly cloned experiment for execution by a worker. 

Experiments can also be modified and then executed remotely, see [Tuning Experiments](webapp_exp_tuning.md). 

**To reproduce an experiment:**

1. Locate the experiment. Open the Project page for the experiment from the Dashboard or the main Projects page.

    * On the Dashboard, click a recent experiment, project card, or **VIEW ALL** and then click a project card.
    * On the Projects page, click project card, or the **All projects** card.

1. Reproduce the experiment. In the experiments table, right-click and then either:

    * Clone (make an exact copy) 
    
        1. Click **Clone**, and a **Clone experiment** box will pop up.
        1. In the **Project** textbox, select or create a project:
           * To search for another project, start typing the project name.
           * To create a new project, type new experiment name and click **Create New**.
        1. Enter an optional description.
        1. Click **CLONE**.
         
    * Reset (delete logs and output from the previous run) - Click **Reset**.

    The experiment's status becomes *Draft*.

1. Enqueue the experiment for execution. Right-click the experiment **>** **Enqueue** **>** Select a queue **>** **ENQUEUE**. 

    The experiment's status becomes *Pending*. When a worker fetches the Task (experiment), the status becomes *Running*. 
   The experiment can now be tracked and its results visualized.