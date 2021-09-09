---
title: Matplotlib
---

The [matplotlib_example.py](https://github.com/allegroai/clearml/blob/master/examples/frameworks/matplotlib/matplotlib_example.py) 
example demonstrates integrating **ClearML** into code that uses `matplotlib` to plot scatter diagrams, and show images. 
**ClearML** automatically logs the diagrams and images. When the script runs, it creates an experiment named `Matplotlib example`, 
which is associated with the `examples` project.

## Plots

The scatter plots appear in the **ClearML Web UI**, in **RESULTS** **>** **PLOTS**.

![image](../../../img/examples_matplotlib_example_01.png)

![image](../../../img/examples_matplotlib_example_02.png)

![image](../../../img/examples_matplotlib_example_03.png)

## Debug Samples

The images appear in **RESULTS** **>** **DEBUG SAMPLES**. Each debug sample image is associated with a metric.

![image](../../../img/examples_matplotlib_example_04.png)

View the debug sample in the image viewer.

![image](../../../img/examples_matplotlib_example_05.png)