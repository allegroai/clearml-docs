---
title: Pytorch Lightning

---
title: LightGBM
---

The [pytorch-lightning](https://github.com/allegroai/clearml/blob/master/examples/frameworks/pytorch-lightning/pytorch_lightning_example.py) 
script demonstrates the integration of ClearML into code that uses PyTorch Lightning. 

The example script does the following:
* Trains a simple deep neural network on the PyTorch built-in MNIST dataset
* Specifies Argparse configurations which are automatically captured by ClearML
* Creates an experiment named `pytorch lightning mnist example`, which is associated with the `examples` project.

## Scalars



## Hyperparameters

ClearML automatically logs command line options defined with argparse. They appear in CONFIGURATIONS > HYPER PARAMETERS > Args.


## Artifacts

Model artifacts associated with the experiment appear in the info panel of the **EXPERIMENTS** tab and in the info panel of the **MODELS** tab.


## Console

All other console output appears in **RESULTS > CONSOLE**.



