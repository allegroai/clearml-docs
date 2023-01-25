---
title: Models
---

ClearML supports tracking, updating, and visualizing models.

Models are stored in ClearML as experiment artifacts, but unlike other artifacts that are dependent on their creating 
task, models are independent entities with their own unique ID. Models can be accessed directly with a model object or 
indirectly via their creating task. This property makes Models a standalone entry that can be used as an artifactory 
interface.

## Automatically Logging Models 

Once integrated into code, ClearML automatically logs and tracks models and any snapshots created by the following 
frameworks:
- TensorFlow (see [code example](../guides/frameworks/tensorflow/tensorflow_mnist.md))
- Keras (see [code example](../guides/frameworks/keras/keras_tensorboard.md))
- PyTorch (see [code example](../guides/frameworks/pytorch/pytorch_mnist.md))
- scikit-learn (only using joblib) (see [code example](../guides/frameworks/scikit-learn/sklearn_joblib_example.md))
- XGBoost (only using joblib) (see [code example](../guides/frameworks/xgboost/xgboost_sample.md))
- FastAI (see [code example](../guides/frameworks/fastai/fastai_with_tensorboard.md))
- MegEngine (see [code example](../guides/frameworks/megengine/megengine_mnist.md))
- CatBoost (see [code example](../guides/frameworks/catboost/catboost.md))

When a supported framework loads a weights file, the running task will be automatically updated, with its input model 
pointing directly to the original training task's model.

## Manually Logging Models

### Output Models

ClearML stores training results as output models. The `OutputModel` object is instantiated with a task object as an 
argument (see [`task`](../references/sdk/model_outputmodel.md) parameter), so it's automatically registered as the Task’s 
output model. Since OutputModel objects are connected to tasks, the models are traceable in experiments.

Output models are read-write so weights can be updated throughout training. Additionally, users can specify a model's 
network design and label enumeration. Once an output model is registered, it can be used as the input model for another 
experiment.

The snapshots of manually uploaded models aren't automatically captured, but ClearML provides methods to update them 
through a `Task` or `OutputModel` object.

### Input Models  

ClearML provides flexibility for explicitly connecting input models and experimentation, including:

* Importing pre-trained models from external sources such as Amazon AWS, GIT repositories, PyTorch, and TensorFlow.
* Using standalone models already registered in ClearML by previously run experiments. 
* Defining your own input models in scripts
  
## Setting Upload Destination

* ClearML automatically captures the storage path of Models created by supported frameworks. By default, it stores the 
  local path they are saved to.
* Upload destinations can be specified explicitly on a per OutputModel or per experiment basis. Alternatively, the upload 
  destination of all OutputModels can be specified in the ClearML [configuration file](../configs/clearml_conf.md). 

## WebApp Interface

In the ClearML's web UI, model information can be located through a project's Model Table or through the model's creating 
task.

Models associated with a task appear in the task's **ARTIFACTS** tab. To see further model details, including design, 
label enumeration, and general information, click the model name, which is a hyperlink to the 
[model's detail page](../webapp/webapp_model_viewing.md).

Models can also be accessed through their associated project's [Model Table](../webapp/webapp_model_table.md), where all 
the models associated with a project are listed.

![WebApp Model](../img/examples_model_update_model.png) 

## SDK Interface

See [the Models SDK interface](../clearml_sdk/model_sdk.md) for an overview for using the most basic Pythonic methods of the model 
classes. See a detailed list of all available methods in the [Model](../references/sdk/model_model.md), [OutputModel](../references/sdk/model_outputmodel.md), and [InputModel](../references/sdk/model_inputmodel.md) 
reference pages. 

