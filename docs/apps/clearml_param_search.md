---
title: ClearML Param Search
---

Using only the command line, you can search for experiment parameters that yield the best models.  

The `clearml-param-search` CLI tool allows you to configure 
search for the best parameters for your models

## What Does `clearml-param-search` Do?

The Hyperparameter Optimization Application searches for parameter values that yield the best performing models. 

## How Does ClearML Task Work?

## Execution Configuration

### Objective

The options are: 
* `min` - Minimize the last reported value for the specified title/series scalar
* `max` - Maximize the last reported value for the specified title/series scalar
* `min_global` - Minimize the min value of *all* reported values for the specific title/series scalar
* `max_global` - Maximize the max value of *all* reported values for the specific title/series scalar

### Parameter Search 

List of parameters to search optimal value of. The following are options: 

Each parameter must be a JSON having the following format:
```python
{
        "name": str,  # Name of the paramter you want to optimize
        "type":  Union["LogUniformParameterRange", "UniformParameterRange", "UniformIntegerParameterRange", "DiscreteParameterRange"],
        # other fields depending on type
}
```
The fields corresponding to each parameters are:
- LogUniformParameterRange:
    - min_value: float  # The minimum exponent sample to use for uniform random sampling
    - max_value: float  # The maximum exponent sample to use for uniform random sampling
    - base: Optional[float]  # The base used to raise the sampled exponent. Default: 10
    - step_size: Optional[float]  # If not None, set step size (quantization) for value sampling. Default: None
    - include_max_value: Optional[bool]  # Whether or not to include the max_value in range. Default: True
- UniformParameterRange:
    - min_value: float  # The minimum exponent sample to use for uniform random sampling
    - max_value: float  # The maximum exponent sample to use for uniform random sampling
    - step_size: Optional[float]  # If not None, set step size (quantization) for value sampling. Default: None
    - include_max_value: Optional[bool]  # Whether or not to include the max_value in range. Default: True
- UniformIntegerParameterRange:
    - min_value: float  # The minimum exponent sample to use for uniform random sampling
    - max_value: float  # The maximum exponent sample to use for uniform random sampling
    - step_size: Optional[int]  # Default: 1
    - include_max_value: Optional[bool]  # Whether or not to include the max_value in range. Default: True
- DiscreteParameterRange:
    - values: List[Any]  # The list of valid parameter values to sample from"


### Command Line Options

<div className="tbl-cmd">

|Name | Description| Optional |
|---|----|---|
|`--project-name`|Name of the target project in which the task will be created. If the project does not exist, it is created. If unspecified, the repository name is used|YES|
|`--task-name`|The name of optimization task. If unspecified, the Python experiment script's file name is used.|YES|
|`--task-id`|ID of an existing ClearML task whose hyperparameters will be optimized. Required unless `--script` is specified||
|`--script`|Script to run the parameter search on. Required unless `--task-id` is specified||
|`--queue`|Queue to run the '--script' from||
|`--params-search`|List of parameters to search optimal value of. See MORE HERE***|NO|
|`--params-override`|List of parameters to override (won't be searched, just override default). Each parameter must be a JSON having the following format:\n { "name": str,  # name of the parameter to override\n' "value": Any  # value of the paramter being overriden\n' }",|| 
|`--objective-metric-title`|The Objective metric title to maximize/minimize. Example: 'validation'|NO|
|`--objective-metric-series`|The Objective metric series to maximize/minimize. Example: 'loss'|NO|
|`--objective-metric-sign`|choices=["min", "max", "min_global", "max_global"]. The objective to maximize/minimize. SEE HERE****|NO|
|`--optimizer-class`|Type of optimization. Possible values are: OptimizerOptuna (default), OptimizerBOHB, GridSearch, RandomSearch||
|`--optimization-time-limit`|The maximum time (minutes) for the entire optimization process.The default is None, indicating no time limit"|YES|
|`--compute-time-limit`|The maximum compute time in minutes. When time limit is exceeded, all jobs aborted|YES|
|`--pool-period-min`|The time between two consecutive pools (minutes)|YES|
|`--total-max-jobs`|The total maximum jobs for the optimization process. The default value is None, for unlimited|YES|
|`--min-iteration-per-job`|The minimum iterations (of the Objective metric) per single job|YES|
|`--max-iteration-per-job`|The maximum iterations (of the Objective metric) per single job. When maximum iterations is exceeded, the job is aborted"|YES|
|`--save-top-k-tasks-only`|If above 0, keep only the top_k performing Tasks, and archive the rest of the created Tasks. If -1, keep everything, nothing will be archived. Default: 10|YES|
|`--time-limit-per-job`|Maximum execution time per single job in minutes. When time limit is exceeded job is aborted. Default: no time limit|YES|


</div>

