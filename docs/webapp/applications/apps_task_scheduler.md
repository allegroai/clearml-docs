---
title: Task Scheduler
---

:::important Enterprise Feature
The Task Scheduler application is available under the ClearML Enterprise plan
:::

ClearML’s Task Scheduler Application lets you schedule tasks for one-shot and/or periodic execution at specified times 
and intervals. The Scheduler is useful for scheduling routine operations, such as backups, generating reports, as well 
as periodically running pipelines for updating data and models. 

Each scheduling job is configured with existing ClearML tasks and a scheduling specification for each task: the time 
for execution and recurrence type. The Scheduler app will then launch copies of the specified tasks at their specified 
times. 

## Scheduler Instance Configuration

<Wizard IMAGE>

* **Scheduled Tasks** 
  * **Base Task ID** - ID of an existing ClearML task to schedule. This task will be cloned and enqueued for execution at the specified time. 
  * **Destination Project** - The project where scheduled tasks will be saved.
  * **Queue** - The ClearML Queue to which scheduled tasks are enqueued (make sure an agent is assigned to that queue)
  * **Recurrence** - Recurrence type, select one of the following options:
    * **None** - The task will run once at the specified time.
    * **Daily** - Task will run every day at the times specified in the `Time of the Day` field
    * **Weekly** - Task will run every week on the specified day, at the times specified in the `Time of the Day` field
    * **Monthly** - Task will run every month on the specified days, and at the times specified in the `Time of the Day` field
    * **Time of the Day** - The time(s) (UTC) at which the task should run
    * **Add item** - Add another task to schedule 
* **Scheduling Job Name** - Name for the Scheduler instance. This will appear in the instance list
 
## Dashboard

<Dashboard image> 

Once a Task Scheduler instance is launched, the dashboard displays a summary of the scheduled tasks.

The Task Scheduler dashboard shows:
* Scheduled Tasks - Table of tasks scheduled for execution, their next scheduled run time, and other task details 
* Executed Tasks - Table of tasks that have been executed, and their start and finish times 

