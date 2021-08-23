---
title: Multiple Tasks in Single Process
---

The [multiple_tasks_single_process](https://github.com/allegroai/clearml/blob/master/examples/advanced/multiple_tasks_single_process.py)
script demonstrates initializing multiple tasks in a single script. 

In order to initialize a task, the `init` method is used. In order to initialize the next tasks, the previous tasks 
must be finalized, using the `close` method. 