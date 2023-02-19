---
title: Model
---

The following page provides an overview of the basic Pythonic interface to ClearML Models.

ClearML provides the following classes to work with models:
* `Model` - Represents a ClearML model, regardless of any task connection. Use this class to programmatically access and manage the ClearML model store.
* `InputModel` - Represents an existing ClearML model to be used in an experiment. Use this class to load a model from ClearML's model store or to import a pre-trained 
model from an external resource to use as an experiment's initial starting point.
* `OutputModel` - Represents an experiment's output model (training results). An OutputModel is always connected to a [task](../fundamentals/task.md),
so the models are traceable to experiments. 

## Output Models

### Manually Logging Models  

To manually log a model, create an instance of OutputModel class. 

```python
from clearml import OutputModel, Task

# Instantiate a Task 
task = Task.init(project_name="myProject", task_name="myTask")

# Create an output model for the PyTorch framework
output_model = OutputModel(task=task, framework="PyTorch")
```

You can set the destination the model will be uploaded to and its label enumeration using the
[`OutputModel.set_upload_destination`](../references/sdk/model_outputmodel.md#set_upload_destination) and 
[`OutputModel.update_labels`](../references/sdk/model_outputmodel.md#update_labels) methods respectively.

```python
# Set the URI of the storage destination for uploaded model weight files
output_model.set_upload_destination(uri=models_upload_destination)

# Set the label numeration
output_model.update_labels({'background': 0, 'label': 255})
```

### Updating Models
ClearML doesn’t automatically log the snapshots of manually logged models. To update an experiment’s model use the 
[OutputModel.update_weights](../references/sdk/model_outputmodel.md#update_weights) method.

```python
# If validation shows this network is the best so far, update the output model
if val_log['iou'] > best_iou:
    output_model.update_weights(weights_filename='models/model.pth')
```

* Specify either the path of a local weights file to upload (`weights_filename`), or the network location of a remote 
  weights file (`registered_uri`).
* Use the `upload_uri` argument to explicitly specify an upload destination for the weights file.
* Model metadata 
  * `update_comment` - update the model's description
  * `iteration` - input the iteration number 

Alternatively, update a model through its associated task, using the [`Task.update_output_model`](../references/sdk/task.md#update_output_model)
method. 

## Input Models

### Using Registered Models

To use a ClearML model as an input model, create an InputModel object and [connect](../references/sdk/task.md#connect) 
it to a task.

```python
# Create an input model using the ClearML ID of a model already registered in the ClearML platform
input_model = InputModel(model_id="fd8b402e874549d6944eebd49e37eb7b")

# Connect the input model to the task
task.connect(input_model)
``` 

### Importing Models

To import an existing model, use the [`InputModel.import_model`](../references/sdk/model_outputmodel.md#inputmodelimport_model) 
class method and specify the `weights_url` - the URL for the imported model. If the URL already exists in the ClearML 
server, it is reused. Otherwise, a new model is registered.

Then [connect](../references/sdk/task.md#connect) the model to a task. 

```python
# Instantiate a Task 
task = Task.init(project_name="examples", task_name="example task")

input_model = InputModel.import_model(
    # Name for model in ClearML
    name='Input Model with Network Design',
    # Import the model using a URL
    weights_url='https://s3/models/model.pth',
    # Set label enumeration values
    label_enumeration={'person' : 1, 'car' : 2, 'truck' : 3, 'bus' : 4,
                       'motorcycle' : 5, 'bicycle' : 6, 'ignore': -1},
    framework='PyTorch'
)

# Connect the input model to the task
task.connect(input_model)
```

## Querying Models
Retrieve a list of model objects by querying the system by model names, projects, tags, and more, using the 
[`Model.query_models`](../references/sdk/model_model.md#modelquery_models) and / or 
the [`InputModel.query_models`](../references/sdk/model_inputmodel.md#inputmodelquery_models) class methods. These 
methods return a list of model objects that match the queries. The list is ordered according to the models’ last update 
time.

When you query models by tags, use the `-` prefix in order to filter out models with that tag.

```python
model_list = Model.query_models(
    # Only models from `examples` project
    project_name='examples', 
    # Only models with input name
    model_name=None,
    # Only models with `demo` tag but without `TF` tag
    tags=['demo', '-TF'],
    # If `True`, only published models
    only_published=False,
    # If `True`, include archived models
    include_archived=True,
    # Maximum number of models returned
    max_results=5,
    # Only models with matching metadata
    metadata={"key":"value"}
)
```

## SDK Reference

For information about all model methods, see the following SDK reference pages:
* [Model](../references/sdk/model_model.md)
* [InputModel](../references/sdk/model_inputmodel.md)
* [OutputModel](../references/sdk/model_outputmodel.md)
