---
title: PyTorch TensorBoardX
---

The [pytorch_tensorboardX.py](https://github.com/allegroai/clearml/blob/master/examples/frameworks/tensorboardx/pytorch_tensorboardX.py) 
example demonstrates the integration of **ClearML** into code that uses PyTorch and TensorBoardX. 

The example does the following:
* Trains a simple deep neural network on the PyTorch built-in [MNIST](https://pytorch.org/vision/stable/datasets.html#mnist) 
  dataset. 
* Creates a TensorBoardX `SummaryWriter` object to log: 
  * Scalars during training 
  * Scalars and debug samples during testing 
  * A test text message to the console (a test message to demonstrate **ClearML** automatic logging).
* Creates an experiment named `pytorch with tensorboardX`, which is associated with the `examples` project in the **ClearML Web UI**.

## Scalars

The loss and accuracy metric scalar plots, along with the resource utilization plots, which are titled **:monitor: machine**, 
appear in the experiment's page in the **web UI**, under **RESULTS** **>** **SCALARS**.
.

![image](../../../img/examples_pytorch_tensorboardx_03.png)

## Hyperparameters

**ClearML** automatically logs command line options defined with `argparse`. They appear in **CONFIGURATIONS** **>** 
**HYPER PARAMETERS** **>** **Args**.

![image](../../../img/examples_pytorch_tensorboardx_01.png)

## Log

Text printed to the console for training progress, as well as all other console output, appear in **RESULTS** **>** **LOG**.

![image](../../../img/examples_pytorch_tensorboardx_02.png)

## Artifacts

Model artifacts associated with the experiment appear in the info panel of the **EXPERIMENTS** tab and in the info panel 
of the **MODELS** tab.  

The experiment info panel shows model tracking, including the model name and design (in this case, no design was stored).

![image](../../../img/examples_pytorch_tensorboardx_04.png)

The model info panel contains the model details, including: 
* Model URL 
* Framework 
* Snapshot locations.

![image](../../../img/examples_pytorch_tensorboardx_05.png)
