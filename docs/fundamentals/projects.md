---
title: Projects
---

Projects are contextual containers for [tasks](task.md) and [models](artifacts.md) (as well as [dataviews](../hyperdatasets/dataviews.md) 
when Hyper-Datasets are enabled), providing a logical structure similar to file system folders. 
An often useful method is to categorize components into projects according to models or objectives. 
Grouping into projects helps in identifying tasks, models, and dataviews when queried.

Projects can be divided into subprojects (and sub-subprojects, etc.) just like files and subdirectories on a 
computer, making organization easier. 

Projects contain a textual description field for noting relevant information. The WebApp supports markdown rendering 
of the description (see [overview](../webapp/webapp_project_overview.md)).

In addition, the project's default output URI can be specified. When new experiments from 
the project are executed, the model checkpoints (snapshots) and artifacts are stored in the default output location. 

## WebApp 

Users can create and modify projects, and see project details in the WebApp (see [WebApp Home](../webapp/webapp_home.md)). 
The project's description can be edited in the [overview](../webapp/webapp_overview.md) page. Each project's experiments,
models, and dataviews, can be viewed in the project's [experiments table](../webapp/webapp_exp_table.md),
 [models table](../webapp/webapp_model_table.md), and [dataviews table](../hyperdatasets/webapp/webapp_dataviews.md). 

## Usage

### Creating Subprojects

When [initializing a task](../clearml_sdk/task_sdk.md#task-creation), its project needs to be specified. If the project entered does not exist, it will be created. 
Projects can contain subprojects, just like folders can contain sub-folders. Input into the `project_name` 
parameter a target project path. The project path should follow the project tree hierarchy, in which the project and 
subprojects are slash (`/`) delimited.

For example:

```python
from clearml import Task

Task.init(project_name='main_project/sub_project', task_name='test')
```

Nesting projects works on multiple levels. For example: `project_name=main_project/sub_project/sub_sub_project` 

Projects can also be created using the [`projects.create`](../references/api/projects.md#post-projectscreate) REST API call. 

### View All Projects in System

To view all projects in the system, use the `Task` class method `get_projects`:

```python
project_list = Task.get_projects()
```

This returns a list of project sorted by last update time.

### More Actions

For additional ways to work with projects, use the REST API `projects` resource. Some of the available actions include:
* [`projects.create`](../references/api/projects.md#post-projectscreate) and [`projects.delete`](../references/api/projects.md#post-projectsdelete) - create and delete projects
* [`projects.get_hyper_parameters`](../references/api/projects.md#post-projectsget_hyper_parameters) - get a list of all hyperparameter sections and names used in a project
* [`projects.merge_projects`](../references/api/projects.md#post-projectsmerge) - merge projects into a single project

See more in the [REST API reference](../references/api/projects.md#projects).



