---
title: Pytorch Lightning
---

The [pytorch-lightning](https://github.com/allegroai/clearml/blob/master/examples/frameworks/pytorch-lightning/pytorch_lightning_example.py) 
script demonstrates the integration of ClearML into code that uses PyTorch Lightning. 

The example script does the following:
* Trains a simple deep neural network on the PyTorch built-in MNIST dataset
* Specifies Argparse configurations which are automatically captured by ClearML
* Creates an experiment named `pytorch lightning mnist example`, which is associated with the `examples` project.

## Scalars

![PyTorch Lightning console](../../../img/examples_pytorch_lightning_scalars.png)


## Hyperparameters

Lightning returns logs after 
ClearML automatically logs command line options defined with argparse. They appear in CONFIGURATIONS > HYPER PARAMETERS > Args.

![PyTorch Lightning parameters](../../../img/examples_pytorch_lightning_params.png)

## Artifacts

Model artifacts associated with the experiment appear in the info panel of the **EXPERIMENTS** tab and in the info panel of the **MODELS** tab.

![PyTorch Lightning model](../../../img/examples_pytorch_lightning_model.png)

## Console

All other console output appears in **RESULTS > CONSOLE**.

![PyTorch Lightning console](../../../img/examples_pytorch_lightning_console.png)

