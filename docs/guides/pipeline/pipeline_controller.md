---
title: Simple Pipeline - Serialized Data
---

The [pipeline_from_tasks.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/pipeline_from_tasks.py) 
example demonstrates a simple pipeline in **ClearML**. 
This pipeline is composed of three steps: 
1. Download data
1. Process data
3. Train a network. 
   
It is implemented using the [automation.controller.PipelineController](../../references/sdk/automation_controller_pipelinecontroller.md) 
class. This class includes functionality to: 
* Create a pipeline controller
* Add steps to the pipeline 
* Pass data from one step to another
* Control the dependencies of a step beginning only after other steps complete
* Run the pipeline 
* Wait for the pipeline to complete 
* Cleanup after pipeline completes execution
 
This example implements the pipeline with four Tasks (each Task is created using a different script):
* **Controller Task** ([pipeline_from_tasks.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/pipeline_from_tasks.py)) - 
  Creates a pipeline controller, adds the steps (Tasks) to the pipeline, runs the pipeline. 
* **Step 1 Task** ([step1_dataset_artifact.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/step1_dataset_artifact.py)) - 
  Downloads data and stores the data as an artifact.
* **Step 2 Task** ([step2_data_processing.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/step2_data_processing.py)) - 
  Loads the stored data (from Step 1), processes it, and stores the processed data as artifacts.
* **Step 3 Task** ([step3_train_model.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/step3_train_model.py)) - 
  Loads the processed data (from Step 2) and trains a network.

When the pipeline runs, the Step 1, Step 2, and Step 3 Tasks are cloned, and the newly cloned Tasks execute. The Tasks 
they are cloned from, called the base Tasks, do not execute. This way, the pipeline can run multiple times. These 
base Tasks must have already run at least once for them to be in **ClearML Server** and to be cloned. The controller Task 
itself can be run from a development environment (by running the script), or cloned, and the cloned Task executed remotely (if the 
controller Task has already run at least once and is in **ClearML Server**).

The sections below describe in more detail what happens in the controller Task and in each step Task.

## The Pipeline Controller

1. Create the pipeline controller object.

   ```python
   pipe = PipelineController(default_execution_queue='default', add_pipeline_tags=False)
   ```
 
1. Add Step 1. Call the [automation.controller.PipelineController.add_step](../../references/sdk/automation_controller_pipelinecontroller.md#add_step) 
   method.
   
   ```python
   pipe.add_step(name='stage_data', base_task_project='examples', base_task_name='pipeline step 1 dataset artifact')
   ``` 
    
   * `name` - The name of Step 1 (`stage_data`).
   * `base_task_project` and `base_task_name` - The Step 1 base Task to clone (the cloned Task will be executed when the pipeline runs).

1. Add Step 2.    
   
   ```python 
   pipe.add_step(name='stage_process', parents=['stage_data', ],
                  base_task_project='examples', base_task_name='pipeline step 2 process dataset',
                  parameter_override={'General/dataset_url': '${stage_data.artifacts.dataset.url}',
                                      'General/test_size': 0.25})
   ``` 

                            
   * `name` - The name of Step 2 (`stage_process`).
   * `base_task_project` and `base_task_name` - The Step 2 base Task to clone.
   * `parents` - The start of Step 2 (`stage_process`) depends upon the completion of Step 1 (`stage_data`).
   * `parameter_override` - Pass the URL of the data artifact from Step 1 to Step 2. Override the value of  the parameter 
     whose key is `dataset_url` (in the parameter group named `General`). Override it with the URL of the artifact named `dataset`. Also override the test size. 

    :::important
    The syntax of the ``parameter_override`` value.  
    For other examples of ``parameter_override`` syntax, see the [automation.controller.PipelineController.add_step](../../references/sdk/automation_controller_pipelinecontroller.md#add_step).
    :::

1. Add Step 3.
                                      
    ```python
    pipe.add_step(name='stage_train', parents=['stage_process', ],
                  base_task_project='examples', base_task_name='pipeline step 3 train model',
                  parameter_override={'General/dataset_task_id': '${stage_process.id}'})
    ```

   * `name` - The name of Step 3 (`stage_train`).
   * `parents` - The start of Step 3 (`stage_train`) depends upon the completion of Step 2 (`stage_process`).
   * `parameter_override` - Pass the ID of the Step 2 Task to the Step 3 Task. This is the ID of the cloned Task, not the base Task.
    
1. Run the pipeline, wait for it to complete, and cleanup.
      ```python
      # Starting the pipeline (in the background)
      pipe.start()
      # Wait until pipeline terminates
      pipe.wait()
      # cleanup everything
      pipe.stop()    
      ```
   
## Step 1 - Downloading the Data

In the Step 1 Task ([step1_dataset_artifact.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/step1_dataset_artifact.py)): 
1. Clone base Task and enqueue it for execution
   ```python
   task.execute_remotely()
   ```

1. Download data and store it as an artifact named `dataset`. This is the same artifact name used in `parameter_override`
when the `add_step` method is called in the pipeline controller.
 
   ```python
   # simulate local dataset, download one, so we have something local
   local_iris_pkl = StorageManager.get_local_copy(
       remote_url='https://github.com/allegroai/events/raw/master/odsc20-east/generic/iris_dataset.pkl')
    
   # add and upload local file containing our toy dataset
   task.upload_artifact('dataset', artifact_object=local_iris_pkl)
   ```
   
## Step 2 - Processing the Data

In the Step 2 Task ([step2_data_processing.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/step2_data_processing.py)): 
1. Create a parameter dictionary and connect it to the Task.

   ```python 
   args = {
        'dataset_task_id': '',
        'dataset_url': '',
        'random_state': 42,
        'test_size': 0.2,
    }
    
    # store arguments, later we will be able to change them from outside the code
    task.connect(args)
   ```

   The parameter `dataset_url` is the same parameter name used by `parameter_override` when the `add_step` method is called in the pipeline controller.

1. Clone base Task and enqueue it for execution.
   
   ```python
   task.execute_remotely() 
   ```
   
1. Later in Step 2, the Task uses the URL in the parameter dictionary to get the data.
   
   ```python
   iris_pickle = StorageManager.get_local_copy(remote_url=args['dataset_url'])
   ```
   
1. Task Processes data and then stores the processed data as artifacts.
   
   ```python
   task.upload_artifact('X_train', X_train)
   task.upload_artifact('X_test', X_test)
   task.upload_artifact('y_train', y_train)
   task.upload_artifact('y_test', y_test)
   ```
   
## Step 3 - Training the Network

In the Step 3 Task ([step3_train_model.py](https://github.com/allegroai/clearml/blob/master/examples/pipeline/step3_train_model.py)): 
1. Create a parameter dictionary and connect it to the Task.

   ```python
   # Arguments
   args = {
       'dataset_task_id': 'REPLACE_WITH_DATASET_TASK_ID',
   }
   task.connect(args)
   ```
    
   The parameter `dataset_task_id` is later overridden by the ID of the Step 2 Task (cloned Task, not base Task). 

1. Clone the Step 3 base Task and enqueue it.
   
   ```python
   task.execute_remotely() 
   ```
   
1. Use the Step 2 Task ID to get the processed data stored in artifacts.
   
   ```python
   dataset_task = Task.get_task(task_id=args['dataset_task_id'])
   X_train = dataset_task.artifacts['X_train'].get()
   X_test = dataset_task.artifacts['X_test'].get()
   y_train = dataset_task.artifacts['y_train'].get()
   y_test = dataset_task.artifacts['y_test'].get()
   ```
    
1. Train the network and log plots, along with **ClearML** automatic logging.

## Running the Pipeline

**To run the pipeline:**

1. Run the script for each of the steps, if the script has not run once before.

        python step1_dataset_artifact.py
        python step2_data_processing.py
        python step3_train_model.py
    
1. Run the pipeline controller one of the following two ways:

    * Run the script.
     
            python pipeline_controller.py
        
    * Remotely execute the Task - If the Task `pipeline demo` in the project `examples` already exists in **ClearML Server**, clone it and enqueue it to execute.
    
   :::note
   If you enqueue a Task, a worker must be listening to that queue for the Task to execute.    
   :::

    
The plot appears in **RESULTS** > **PLOTS** describing the pipeline. Hover over a step in the pipeline, and view the name of the step and the parameters overridden by the step.    

![image](../../img/pipeline_controller_01.png)