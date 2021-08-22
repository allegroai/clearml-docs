---
title: Remote Execution
---

The [execute_remotely_example](https://github.com/allegroai/clearml/blob/master/examples/advanced/execute_remotely_example.py)
script demonstrates the use of the [`execute_remotely`](../../references/sdk/task.md#execute_remotely/) method. 

The script does the following: 
* Trains a simple deep neural network on the PyTorch built-in MNIST dataset.
* Uses ClearML automatic logging.
* Creates an experiment named `remote_execution pytorch mnist train`, which is associated with the `examples` project.

When the code is executed, the training runs for one epoch to make sure nothing crashes, then the code passes the `execute_remotely` method
which terminates the local execution of the code. Execution will switch to remote execution by the agent listening to 
queue specified in the `queue_name` parameter of the method. 

This feature is especially helpful if you want to run the first epoch locally on your machine to debug and to
make sure code doesn't crash, and then move to a stronger machine for the entire training.

