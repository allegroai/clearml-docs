---
title: Hyperparameter optimization
---

## What is HyperParameter Optimization?
Hyperparameters are variables that directly control the behaviors of training algorithms, and have a significant effect on 
the performance of the resulting machine learning models. Finding the hyperparameter values that yield the best 
performing models can be complicated. Manually adjusting hyperparameters over the course of many training trials can be 
slow and tedious. Luckily, **hyperparameter optimization** can be automated and boosted using **ClearML**'s 
`HyperParameterOptimizer` class.

## What does ClearML's `HyperParameterOptimizer` do? 

The  `HyperParameterOptimizer` class does the following:
* Clones the base experiment that needs to be optimized
* Changes arguments based on an optimizer strategy that is specified
* Tries to minimize / maximize defined objectives. 


The `HyperParameterOptimizer` class contains **ClearML**’s hyperparameter optimization modules. Its modular design enables 
using different optimizers, including existing software frameworks, enabling simple, accurate, and fast hyperparameter 
optimization.

**The optimizers include:**  

* **Optuna** - `automation.optuna.optuna.OptimizerOptuna`. Optuna is the default optimizer in ClearML. It makes use of 
  different samplers such as grid search, random, bayesian, and evolutionary algorithms. 
  For more information, see the [Optuna](https://optuna.readthedocs.io/en/latest/) 
  documentation.
* **BOHB** - `automation.hpbandster.bandster.OptimizerBOHB`. BOHB performs robust and efficient hyperparameter optimization 
  at scale by combining the speed of Hyperband searches with the guidance and guarantees of convergence of Bayesian Optimization. 
  For more information about HpBandSter BOHB, see the [HpBandSter](https://automl.github.io/HpBandSter/build/html/index.html) 
  documentation.
* **Random** uniform sampling of hyperparameters - `automation.optimization.RandomSearch`
* **Full grid** sampling strategy of every hyperparameter combination - `Grid search automation.optimization.GridSearch`.
* **Custom** - `automation.optimization.SearchStrategy`. - Use a custom class and inherit from the ClearML automation base strategy class 

Make use of **ClearML**'s hyperparameter optimization capabilities by:
* Initializing an Optimizer Task, which will record and monitor arguments, execution details, results, and more. 
* Instantiating a `HyperParameterOptimizer`, where the following is specified:
  * Task to optimize
  * Hyperparameters to optimize
  * Metric to optimize 
  * Optimizer class (optimization strategy) where the optimization configuration and resources budget are defined
  * And more.
* Enqueuing the Task to be executed by a `clearml-agent` or multiple agent in a remote machine. 
* Monitoring the optimization process and viewing the summarized results in the **ClearML web UI**

**ClearML**'s approach to hyperparameter optimization is scalable, easy to set up and to manage, and it makes it easy to 
compare results.

## Defining a hyperparameter optimization search example

1. Import ClearML's automation modules: 

  ```python 
  from clearml.automation import UniformParameterRange, UniformIntegerParameterRange
  from clearml.automation import HyperParameterOptimizer
  from clearml.automation.optuna import OptimizerOptuna
  ```
1. Initialize the Task, which will be stored in ClearML Server when the code runs. After the code runs at least once, 
   it can be reproduced and tuned:
  ```python
  from clearml import Task
  
  task = Task.init(project_name='Hyper-Parameter Optimization',
                 task_name='Automatic Hyper-Parameter Optimization',
                 task_type=Task.TaskTypes.optimizer,
                 reuse_last_task_id=False)
  
  ```

1. Define the optimization configuration and resources budget:
  ```python
  optimizer = HyperParameterOptimizer(
        # specifying the Task to be optimized, Task must be in system already so it can be cloned
        base_task_id=TEMPLATE_TASK_ID,  
        # setting the hyper-parameters to optimize
        hyper_parameters=[
            UniformIntegerParameterRange('number_of_epochs', min_value=2, max_value=12, step_size=2),
            UniformIntegerParameterRange('batch_size', min_value=2, max_value=16, step_size=2),
            UniformParameterRange('dropout', min_value=0, max_value=0.5, step_size=0.05),
            UniformParameterRange('base_lr', min_value=0.00025, max_value=0.01, step_size=0.00025),
            ],
        # setting the objective metric we want to maximize/minimize
        objective_metric_title='accuracy',
        objective_metric_series='total',
        objective_metric_sign='max',  

        # setting optimizer  
        optimizer_class=OptimizerOptuna,
    
        # configuring optimization parameters
        execution_queue='default',  
        max_number_of_concurrent_tasks=2,  
        optimization_time_limit=60., 
        compute_time_limit=120, 
        total_max_jobs=20,  
        min_iteration_per_job=15000,  
        max_iteration_per_job=150000,  
        )
  ```
  For further information about the `HyperParameterOptimizer` arguments, see the [Automation module reference](../references/sdk/hpo_optimization_hyperparameteroptimizer.md).

1. Make sure an agent or multiple agents are listening to the queue defined above (`execution_queue='default'`). See [Clearml Agent](../clearml_agent.md).

1. Start the hyperparameter optimization process:
  ```python
  optimizer.set_report_period(1) # setting the time gap between two consecutive reports
  optimizer.start()
  optimizer.wait() # wait until process is done
  optimizer.stop() # make sure background optimization stopped    
  ```

1. Take a look at the summarized results of the optimization in the **Web UI**,  in the optimizer Task's experiment page. 
   There is also the option to look at the results of a specific experiment, or the results of a few experiments and 
   to [Compare](../webapp/webapp_exp_comparing.md). 

