---
title: APIClient
---

The `APIClient` class provides a Pythonic interface to access ClearML's backend REST API. It is a convenient low-level access tool. 
Through an `APIClient` instance, you can access ClearML’s REST API services:
* [authentication](../references/api/login.md) - Authentication management, authorization and administration for the entire system
* [debug](../references/api/debug.md) - Debugging utilities
* [projects](../references/api/projects.md) - Support for defining Projects containing tasks, models, datasets, and/or pipelines 
* [queues](../references/api/queues.md) - [Queue](../fundamentals/agents_and_queues.md) management API
* [workers](../references/api/workers.md) - API for worker machines to report status and retrieve tasks for execution.
* [events](../references/api/events.md) - Event (e.g. metrics, debug samples) reporting and retrieval API
* [models](../references/api/models.md) - Model management API
* [tasks](../references/api/tasks.md) - [Task](../fundamentals/task.md) Management API

## Using APIClient

`APIClient` makes the ClearML Server’s REST API endpoints available as Python methods. 

To use `APIClient`, create an instance of it then call the method corresponding to the desired REST API endpoints, with 
its respective parameters as described in the [REST API reference page](../references/api/index.md). 

For example, the [`POST/ projects.get_all`](../references/api/projects.md#post-projectsget_all) call returns all projects 
in your workspace. The following code uses APIClient to retrieve a list of all projects whose name starts with "example."

```python
from clearml.backend_api.session.client import APIClient
# Create an instance of APIClient
client = APIClient()
project_list = client.projects.get_all(name="example*")
print(project_list)
```