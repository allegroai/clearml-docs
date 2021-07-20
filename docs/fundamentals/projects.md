---
title: Projects
---

Projects are the entities that contain [tasks](task.md) and [models](artifacts.md#models). Projects are similar to folders. 
Users can decide how to group tasks and models in different projects, though different models or objectives are usually 
grouped into different projects.

Projects can be divided into sub-projects (and sub-sub-projects, etc.) just like files and subdirectories on a 
computer, making experiment and model organization easier. 

## Webapp 

Users can create and modify projects, and see project details in the WebApp (see [WebApp Home](../webapp/webapp_home.md)). 
A project contains of an [overview](../webapp/webapp_overview.md), where a general description of the project can be 
written and shared. Each project's tasks and models can be viewed in the project's [experiments table](../webapp/webapp_exp_table.md)
and [models table](../webapp/webapp_model_table.md). 

## Usage

### Creating sub-projects

When initializing a task, its project needs to be specified. If the project entered does not exist, it will be created. 
Projects can be divided into sub-projects, just like folders are broken into sub-folders. Input into the `project_name` 
parameter a target project path. 

For example:

```python
from clearml import Task

Task.init(project_name='main_project/sub_project', task_name='test')
```

Nesting projects works on multiple levels. For example: `project_name=main_project/sub_project/sub_sub_project` 

Projects can also be created using the [`projects.create`](../references/api/endpoints.md#post-projectscreate) REST API call. 

### View all projects in system

To view all projects in the system, sorted by last updated time, use the `Task` class method `get_projects`

```python
project_list = Task.get_projects()
```

This returns a list of project sorted by last update time.

### Querying tasks and models

Searching and filtering tasks and models can be done via the [web UI](../webapp/webapp_overview.md) and programmatically.

To query tasks by their project, input `project_name` as a search parameters into the `Task.get_tasks` method, which 
returns a list of Task objects that match the search. 

```python
task_list = Task.get_tasks(project_name="examples")
```

To query models, use either the `Model.query_models` or `InputModel.query_models` class methods, and input the `project_name`
parameter, which returns a list of matching models sorted by descending last update time. 


```python
from clearml import Model 

model_list = Model.query_models(project_name="examples")
```

In both the cases of querying tasks and models, the input project as well as all of its nested project are queried.

### More actions

For additional ways to work with projects, use the RESTAPI `projects` resource. Some of the available actions include:
* [`projects.create`](../references/api/endpoints.md#post-projectscreate) and [`projects.delete`](../references/api/endpoints.md#post-projectsdelete) - create and delete projects
* [`projects.get_hyper_parameters`](../references/api/endpoints.md#post-projectsget_hyper_parameters) - get a list of all hyperparameter sections and names used in a project
* [`projects.merge_projects`](../references/api/endpoints.md#post-projectsmerge) - merge projects into a single project

See more in the [REST API reference](../references/api/endpoints.md#projects)



