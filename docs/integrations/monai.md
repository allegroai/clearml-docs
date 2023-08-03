---
title: Monai
---

[Monai](https://github.com/Project-MONAI/MONAI) is a PyTorch-based, open-source framework for deep learning in healthcare imaging. You can integrate ClearML into your code using Monai's built-in handlers: [ClearMLImageHandler](#clearmlimagehandler) 
and [ClearMLStatsHandler](#clearmlstatshandler). 

## ClearMLImageHandler

view the images in the experiment's **Debug Samples**

This class inherits all functionality from TensorBoardImageHandler class.
    Everything from Tensorboard is logged automatically to ClearML.

## ClearMLStatsHandler
Monai supports the ClearMLStatsHandler to log metrics 

Class to write tensorboard stats by inheriting TensorBoardStatsHandler class.
    Everything from Tensorboard is logged automatically to ClearML.


For more information, see the [ignite documentation](https://pytorch.org/ignite/generated/ignite.contrib.handlers.clearml_logger.html). 

See code example [here](https://github.com/pytorch/ignite/blob/master/examples/contrib/mnist/mnist_with_clearml_logger.py)

