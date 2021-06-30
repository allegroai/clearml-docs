---
title: PyTorch Ignite Integration
---

The [cifar_ignite.py](https://github.com/allegroai/clearml/blob/master/examples/frameworks/ignite/cifar_ignite.py) example 
script integrates **ClearML** into code that uses [ignite](https://github.com/pytorch/ignite). 
The script creates a neural network to train a model to classify images from the CIFAR10 dataset. 

The example script does the following:
* Creates a [ClearML Task](../../../fundamentals/task.md) named 'image classification CIFAR10', which is associated with the 'Image Example' project.
* Calls the [`Task.connect`](../../../references/sdk/task.md#connect) method to report configurations.
* Uses ignite's `TensorboardLogger` and attaches handlers to it. See ignite's [handler](https://github.com/pytorch/ignite/blob/master/ignite/contrib/handlers/tensorboard_logger.py). 
* Uses **ClearML**'s automatic logging to capture data and outputs logged with `TensorboardLogger`.

:::note 
If you are not already using **ClearML**, see our [Getting Started](../../../getting_started/ds/ds_first_steps.md) page.
:::

## Logging hyperparameters

Parameters are explicitly reported to **ClearML** using the `task.connect` method.  

```python
params = {'number_of_epochs': 20, 'batch_size': 64, 'dropout': 0.25, 'base_lr': 0.001, 'momentum': 0.9, 'loss_report': 100}
params = task.connect(params)  # enabling configuration override by clearml
```
The hyperparameter configurations can be viewed in the WebApp in the experiment's page, in the **CONFIGURATION** tab. 

## Ignite Tensorboard Logger

`TensorboardLogger` is a handler to log metrics, parameters, and gradients when training a model. When **ClearML** is integrated
into a script which uses `TensorboardLogger`, all information logged through the handler is automatically captured by **ClearML**. 

Integrate **TensorboardLogger** with the following steps:
1. Create an ignite `TensorboardLogger` object. 
   
  ```python
  from ignite.contrib.handlers import TensorboardLogger

  tb_logger = TensorboardLogger(log_dir="cifar-output")
  ```

1. Later in the code, attach additional handlers to the `TensorboardLogger` object (see below).

## Logging 


To log the Ignite `trainer` and `evaluator` engines' output and / or metrics, use the `attach_output_handler` method on 
the the `TensorboardLogger` object. 
**ClearML** automatically captures everything logged through `TensorboardLogger`

* Log trainer loss every 100 iterations (as configured in the `loss_report` parameter):
```python
tb_logger.attach_output_handler(
    trainer,
    event_name=Events.ITERATION_COMPLETED(every=params.get('loss_report')),
    tag="training",
    output_transform=lambda loss: {"loss": loss},
    )
```

* Log metrics for training and validation:

A logger is attached to the evaluator on the validation dataset so all metrics are logged after
each epoch. `global_step_transform=global_step_from_engine(trainer)` is set to take the epoch of the
`trainer` instead of `evaluator`
    
```python
# Attach handler to dump evaluator's metrics every epoch completed
for tag, evaluator in [("training", trainer), ("validation", evaluator)]:
    tb_logger.attach_output_handler(
        evaluator,
        event_name=Events.EPOCH_COMPLETED,
        tag=tag,
        metric_names="all",
        global_step_transform=global_step_from_engine(trainer),
        )
```

View the scalars, including training and validation metrics, in the experiment's page in the **ClearML Web UI**, under 
**RESULTS** **>** **SCALARS**.

![image](../../../img/examples_cifar_scalars.png)


## Model snapshots

To save input snapshots, use `torch.save`:

```python
torch.save(net.state_dict(), PATH)
```

**ClearML** automatically captures the model and saves it as an artifact. 

View saved snapshots in the experiment's **ARTIFACTS** tab.

![image](../../../img/examples_cifar_artifacts.png)

To view the model, in the **ARTIFACTS** tab, click the model name (or download it).

![image](../../../img/examples_cifar_model.png)


## Ignite ClearMLLogger

**ClearML** automatically captures information and ouputs logged by the `TensorboardLogger`. Pytorch Ignite also 
offers a `ClearMLLogger` handler to log metrics, text, model/optimizer parameters, plots during training and validation.

For more information, see the [Pytorch Ignite ClearMLLogger](https://pytorch.org/ignite/generated/ignite.contrib.handlers.clearml_logger.html)
example.

