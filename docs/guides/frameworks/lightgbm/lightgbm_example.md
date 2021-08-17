---
title: LightGBM
---

The [lightgbm_example](https://github.com/allegroai/clearml/blob/master/examples/frameworks/lightgbm/lightgbm_example.py) 
script demonstrates the integration of ClearML into code that uses LightGBM. 

The example script does the following: 
* Creates a dataset for LightGBM to train a model
* Specifies configuration which are automatically captured by ClearML
* Saves model which ClearML automatically captures
* Creates an experiment named `LightGBM`, which is associated with the `examples` project.

## Scalars

In the ClearML Web UI, the scalars plot for $$$$$$$$$$$$ appears in the experiment's page under **RESULTS > SCALARS**.

![LightGBM scalars](../../../img/examples_lightgbm_scalars.png)

## Hyperparameters

ClearML automatically logs the configurations logged to LightGBM. They appear in **CONFIGURATIONS > HYPER PARAMETERS > GENERAL**.

![LightGBM hyperparameters](../../../img/examples_lightgbm_config.png)

## Artifacts

Model artifacts associated with the experiment appear in the info panel of the **EXPERIMENTS** tab and in the info panel of the **MODELS** tab.

![LightGBM model](../../../img/examples_lightgbm_model.png)

## Console

All other console output appears in **RESULTS > CONSOLE**.

![LightGBM console](../../../img/examples_lightgbm_console.png)


