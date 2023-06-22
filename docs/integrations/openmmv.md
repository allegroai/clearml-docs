---
title: OpenMMLab
---

[OpenMMLab](https://github.com/open-mmlab) is a computer vision framework. You can integrate ClearML into your 
code using the `mmcv` package's [`ClearMLLoggerHook`](https://mmcv.readthedocs.io/en/master/_modules/mmcv/runner/hooks/logger/clearml.html)
class. This class is used to create a ClearML Task and to automatically log metrics. 

For example, the following code sets up the configuration for logging metrics periodically to ClearML, and then registers
the ClearML hook to a [runner](https://mmcv.readthedocs.io/en/v1.3.8/runner.html?highlight=register_training_hooks#epochbasedrunner),
which manages training in `mmcv`:

```python
log_config = dict(
    interval=100,
    hooks=[
        dict(
            type='ClearMLLoggerHook',
            init_kwargs=dict(
                project_name='examples',
                task_name='OpenMMLab cifar10',
                output_uri=True
            )
        ),
    ]
)

# register hooks to runner and those hooks will be invoked automatically
runner.register_training_hooks(
    lr_config=lr_config,
    optimizer_config=optimizer_config,
    checkpoint_config=checkpoint_config,
    log_config=log_config # ClearMLLogger hook
)
```

 The `init_kwargs` dictionary can include any parameter from [`Task.init()`](../references/sdk/task.md#taskinit). 
The `hooks` dictionary for configuring ClearML can also include the following keys:
* `interval` - Logging interval in iterations (default 10).
* `ignore_last` - If set to `True`, ignore the log of last iterations in each epoch if less than `interval` (default `True`).
* `reset_flag` - If set to `True`,  clear the output buffer after logging (default `False`).
* `by_epoch` - If set to `True`, [`EpochBasedRunner`](https://mmcv.readthedocs.io/en/v1.3.8/runner.html?highlight=register_training_hooks#epochbasedrunner) 
is used (default `True`).
This creates a ClearML task `OpenMMLab cifar10` in the `examples` project.

You can view the metrics in the experiment's **Scalars** tab in the [WebApp](../webapp/webapp_overview.md).

![OpenMMLab scalars](../img/itegration_openmmlab_scalars.png)

See OpenMMLab code example [here](https://github.com/allegroai/clearml/blob/master/examples/frameworks/openmmlab/openmmlab_cifar10.py).