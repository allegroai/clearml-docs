---
title: Hyperparameter Optimization
---

The [hyper_parameter_optimizer.py](https://github.com/allegroai/clearml/blob/master/examples/optimization/hyper-parameter-optimization/hyper_parameter_optimizer.py) 
example script demonstrates hyperparameter optimization, which is automated by using ClearML 

## Set the Search Strategy for Optimization

A search strategy is required for the optimization, as well as a search strategy optimizer class to implement that strategy.

The following search strategies can be used:

* Optuna hyperparameter optimization - [automation.optuna.OptimizerOptuna](../../../references/sdk/hpo_optuna_optuna_optimizeroptuna.md). 
  For more information about Optuna, see the [Optuna](https://optuna.org/) documentation.
* BOHB - [automation.hpbandster.OptimizerBOHB](../../../references/sdk/hpo_hpbandster_bandster_optimizerbohb.md).
  
  BOHB performs robust and efficient hyperparameter optimization at scale by combining the speed of Hyperband searches 
  with the guidance and guarantees of convergence of Bayesian Optimization.
    
    ClearML implements BOHB for automation with HpBandSter's [bohb.py](https://github.com/automl/HpBandSter/blob/master/hpbandster/optimizers/bohb.py). 
  For more information about HpBandSter BOHB, see the [HpBandSter](https://automl.github.io/HpBandSter/build/html/index.html) 
  documentation.
     
* Random uniform sampling of hyperparameter strategy - [automation.RandomSearch](../../../references/sdk/hpo_optimization_randomsearch.md)
* Full grid sampling strategy of every hyperparameter combination - Grid search [automation.GridSearch](../../../references/sdk/hpo_optimization_gridsearch.md).
* Custom - Use a custom class and inherit from the ClearML automation base strategy class, automation.optimization.SearchStrategy.

The search strategy class that is chosen will be passed to the [automation.HyperParameterOptimizer](../../../references/sdk/hpo_optimization_hyperparameteroptimizer.md) 
object later.

The example code attempts to import `OptimizerOptuna` for the search strategy. If `clearml.automation.optuna` is not 
installed, it attempts to import `OptimizerBOHB`. If `clearml.automation.hpbandster` is not installed, it uses 
the `RandomSearch` for the search strategy. 

```python
try:
    from clearml.automation.optuna import OptimizerOptuna  # noqa
    aSearchStrategy = OptimizerOptuna
except ImportError as ex:
    try:
        from clearml.automation.hpbandster import OptimizerBOHB  # noqa
        aSearchStrategy = OptimizerBOHB
    except ImportError as ex:
        logging.getLogger().warning(
            'Apologies, it seems you do not have \'optuna\' or \'hpbandster\' installed, '
            'we will be using RandomSearch strategy instead')
        aSearchStrategy = RandomSearch
```

## Define a Callback

When the optimization starts, a callback is provided that returns the best performing set of hyperparameters. In the script, 
the `job_complete_callback` function returns the ID of `top_performance_job_id`.

```python
def job_complete_callback(
    job_id,                 # type: str
    objective_value,        # type: float
    objective_iteration,    # type: int
    job_parameters,         # type: dict
    top_performance_job_id  # type: str
):
    print('Job completed!', job_id, objective_value, objective_iteration, job_parameters)
    if job_id == top_performance_job_id:
        print('WOOT WOOT we broke the record! Objective reached {}'.format(objective_value))
```

## Initialize the Optimization Task

Initialize the Task, which will be stored in ClearML Server when the code runs. After the code runs at least once, it 
can be [reproduced](../../../webapp/webapp_exp_reproducing.md) and [tuned](../../../webapp/webapp_exp_tuning.md).

We set the Task type to optimizer, and create a new experiment (and Task object) each time the optimizer runs (`reuse_last_task_id=False`). 

When the code runs, it creates an experiment named **Automatic Hyper-Parameter Optimization** that is associated with 
the project **Hyper-Parameter Optimization**, which can be seen in the **ClearML Web UI**. 
 
 ```python
# Connecting CLEARML
task = Task.init(
    project_name='Hyper-Parameter Optimization',
    task_name='Automatic Hyper-Parameter Optimization',
    task_type=Task.TaskTypes.optimizer,
    reuse_last_task_id=False
)
```

## Set Up the Arguments

Create an arguments dictionary that contains the ID of the Task to optimize, and a Boolean indicating whether the 
optimizer will run as a service, see [Running as a service](#running-as-a-service).

In this example, an experiment named **Keras HP optimization base** is being optimized. The experiment must have run at 
least once so that it is stored in ClearML Server, and, therefore, can be cloned.

Since the arguments dictionary is connected to the Task, after the code runs once, the `template_task_id` can be changed 
to optimize a different experiment.

```python
# experiment template to optimize in the hyperparameter optimization
args = {
    'template_task_id': None,
    'run_as_service': False,
}
args = task.connect(args)
    
# Get the template task experiment that we want to optimize
if not args['template_task_id']:
    args['template_task_id'] = Task.get_task(
        project_name='examples', task_name='Keras HP optimization base').id
```

## Creating the Optimizer Object

Initialize an [automation.HyperParameterOptimizer](../../../references/sdk/hpo_optimization_hyperparameteroptimizer.md) 
object, setting the optimization parameters, beginning with the ID of the experiment to optimize.

```python
an_optimizer = HyperParameterOptimizer(
    # This is the experiment we want to optimize
    base_task_id=args['template_task_id'],
```

Set the hyperparameter ranges to sample, instantiating them as ClearML automation objects using [automation.UniformIntegerParameterRange](../../../references/sdk/hpo_parameters_uniformintegerparameterrange.md) 
and [automation.DiscreteParameterRange](../../../references/sdk/hpo_parameters_discreteparameterrange.md).

```python
    hyper_parameters=[
        UniformIntegerParameterRange('layer_1', min_value=128, max_value=512, step_size=128),
        UniformIntegerParameterRange('layer_2', min_value=128, max_value=512, step_size=128),
        DiscreteParameterRange('batch_size', values=[96, 128, 160]),
        DiscreteParameterRange('epochs', values=[30]),
        ],
```
      
Set the metric to optimize and the optimization objective.

```python
    objective_metric_title='val_acc',
    objective_metric_series='val_acc',
    objective_metric_sign='max',
```

Set the number of concurrent Tasks.
```python
    max_number_of_concurrent_tasks=2,
```
Set the optimization strategy, see [Set the search strategy for optimization](#set-the-search-strategy-for-optimization).
```python
    optimizer_class=aSearchStrategy,
```
Specify the queue to use for remote execution. This is overridden if the optimizer runs as a service.
```python
    execution_queue='1xGPU',
```
Specify the remaining parameters, including the time limit per Task (minutes), period for checking the optimization (minutes), maximum number of jobs to launch, minimum and maximum number of iterations for each Task.
```python
    # Optional: Limit the execution time of a single experiment, in minutes.
    # (this is optional, and if using  OptimizerBOHB, it is ignored)
    time_limit_per_job=10.,
    # Check the experiments every 6 seconds is way too often, we should probably set it to 5 min,
    # assuming a single experiment is usually hours...
    pool_period_min=0.1,
    # set the maximum number of jobs to launch for the optimization, default (None) unlimited
    # If OptimizerBOHB is used, it defined the maximum budget in terms of full jobs
    # basically the cumulative number of iterations will not exceed total_max_jobs * max_iteration_per_job
    total_max_jobs=10,
    # This is only applicable for OptimizerBOHB and ignore by the rest
    # set the minimum number of iterations for an experiment, before early stopping
    min_iteration_per_job=10,
    # Set the maximum number of iterations for an experiment to execute
    # (This is optional, unless using OptimizerBOHB where this is a must)
    max_iteration_per_job=30,
    
)  # done creating HyperParameterOptimizer

```

## Running as a Service

The optimization can run as a service, if the `run_as_service` argument is set to  `true`. For more information about 
running as a service, see [Services Mode](../../../clearml_agent.md#services-mode).

```python
# if we are running as a service, just enqueue ourselves into the services queue and let it run the optimization
if args['run_as_service']:
    # if this code is executed by `clearml-agent` the function call does nothing.
    # if executed locally, the local process will be terminated, and a remote copy will be executed instead
    task.execute_remotely(queue_name='services', exit_process=True)
```

## Optimize

The optimizer is ready. Set the report period and [start](../../../references/sdk/hpo_optimization_hyperparameteroptimizer.md#start) 
it, providing the callback method to report the best performance.

```python
# report every 12 seconds, this is way too often, but we are testing here J
an_optimizer.set_report_period(0.2)
# start the optimization process, callback function to be called every time an experiment is completed
# this function returns immediately
an_optimizer.start(job_complete_callback=job_complete_callback)
# set the time limit for the optimization process (2 hours)
```

Now that it is running: 
1. Set a time limit for optimization
1. Wait 
1. Get the best performance 
1. Print the best performance 
1. Stop the optimizer.

```python
# set the time limit for the optimization process (2 hours)
an_optimizer.set_time_limit(in_minutes=90.0)
# wait until process is done (notice we are controlling the optimization process in the background)
an_optimizer.wait()
# optimization is completed, print the top performing experiments id
top_exp = an_optimizer.get_top_experiments(top_k=3)
print([t.id for t in top_exp])
# make sure background optimization stopped
an_optimizer.stop()

print('We are done, good bye')
```
