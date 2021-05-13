---
title: PyTorch with Matplotlib
---

The [pytorch_matplotlib.py](https://github.com/allegroai/clearml/blob/master/examples/frameworks/pytorch/pytorch_matplotlib.py) 
example demonstrates the integration of **ClearML** into code that uses PyTorch and Matplotlib. 

The example does the following: 
1. The script calls Matplotlib methods to show images, each with a different title.
1. **ClearML** automatically logs the images as debug samples. 
1. When the script runs, it creates an experiment named `pytorch with matplotlib example`, which is associated with the 
   `examples` project.

The images shown in the example script's `imshow` function appear according to metric in **RESULTS** **>** **DEBUG SAMPLES**.

![image](../../../img/examples_pytorch_matplotlib_02.png)

Select a debug sample by metric.

![image](../../../img/examples_pytorch_matplotlib_02a.png)

Open the debug sample in the image viewer.

![image](../../../img/examples_pytorch_matplotlib_02b.png)














