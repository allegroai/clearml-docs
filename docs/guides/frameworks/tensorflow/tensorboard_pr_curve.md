---
title: TensorBoard PR Curve
---

The [tensorboard_pr_curve.py](https://github.com/allegroai/clearml/blob/master/examples/frameworks/tensorflow/tensorboard_pr_curve.py) 
example demonstrates the integration of **ClearML** into code that uses TensorFlow and TensorBoard. 

The example script does the following:
* Creates three classes, R, G, and B, and generates colors within the RGB space from normal distributions. The true 
  label of each random color is associated with the normal distribution that generated it.
* Computes the probability that each color belongs to the class, using three other normal distributions.
* Generate PR curves using those probabilities. 
* Creates a summary per class using [tensorboard.plugins.pr_curve.summary](https://github.com/tensorflow/tensorboard/blob/master/tensorboard/plugins/pr_curve/summary.py), 
* Automatically logs the TensorBoard output, TensorFlow Definitions, and output to the console, using **ClearML**.
* When the script runs, Creates an experiment named `tensorboard pr_curve`, which is associated with the `examples` project.

## Plots

In the **ClearML Web UI**, the PR Curve summaries appear in the experiment's page under **RESULTS** **>** **PLOTS**.

* Blue PR curves
    ![image](../../../img/examples_tensorboard_pr_curve_01.png)
* Green PR curves
    ![image](../../../img/examples_tensorboard_pr_curve_02.png)
* Red PR curves
    ![image](../../../img/examples_tensorboard_pr_curve_03.png)

## Hyperparameters

**ClearML** automatically logs TensorFlow Definitions. They appear in **CONFIGURATIONS** **>** **HYPER PARAMETERS** **>** **TF_DEFINE**.

![image](../../../img/examples_tensorboard_pr_curve_04.png)

## Console

All other console output appears in **RESULTS** **>** **CONSOLE**.

![image](../../../img/examples_tensorboard_pr_curve_05.png)
