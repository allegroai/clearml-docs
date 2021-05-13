---
title: Configuring Models
---

The [model_config.py](https://github.com/allegroai/clearml/blob/master/examples/reporting/model_config.py) example demonstrates 
configuring a model and defining label enumeration. Connect the configuration and label enumeration to a Task and, once 
connected, **ClearML** tracks any changes to them. When **ClearML** stores a model, in any framework, **ClearML** stores 
the configuration and label enumeration with it. 

When the script runs, it creates an experiment named `Model configuration example`, which is associated with the `examples` project.

## Configuring models

### Using a configuration file

Connect a configuration file to a Task by calling the [Task.connect_configuration](../../references/sdk/task.md#connect_configuration) 
method with the file as an argument.

    # Connect a local configuration file
    config_file = os.path.join('data_samples', 'sample.json')
    config_file = task.connect_configuration(config_file)

**ClearML** reports the configuration in the **ClearML Web UI**, experiment details, **CONFIGURATION** tab, **CONFIGURATION OBJECTS** 
area. See the image in the next section.

### Configuration dictionary

Connect a configuration dictionary to a Task by creating a dictionary, and then calling the [Task.connect_configuration](../../references/sdk/task.md#connect_configuration) 
method with the dictionary as an argument. After the configuration is connected, **ClearML** tracks changes to it.

    model_config_dict = {
        'value': 13.37,
        'dict': {'sub_value': 'string', 'sub_integer': 11},
        'list_of_ints': [1, 2, 3, 4],
    }
    model_config_dict = task.connect_configuration(model_config_dict)
    
    # We now update the dictionary after connecting it, and the changes will be tracked as well.
    model_config_dict['new value'] = 10
    model_config_dict['value'] *= model_config_dict['new value']

**ClearML** reports the configuration in the **ClearML Web UI** **>** experiment details **>** **CONFIGURATION** tab **>** 
**CONFIGURATION OBJECTS** area.

![image](../../img/examples_reporting_config.png)

## Label enumeration

Connect a label enumeration dictionary by creating the dictionary, and then calling the [Task.connect_label_enumeration](../../references/sdk/task.md#connect_label_enumeration) 
method with the dictionary as an argument.

    # store the label enumeration of the training model
    labels = {'background': 0, 'cat': 1, 'dog': 2}
    task.connect_label_enumeration(labels)

