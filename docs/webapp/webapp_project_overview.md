---
title: Project Overview
---

In the WebApp, you can navigate through a project's experiments and models by using the [experiments table](webapp_exp_table.md) 
and the [models table](webapp_model_table.md). 

$$$ Start with outline of page
Additionally, to make organization easier, there is an option to provide a general picture in the project's **OVERVIEW** 
tab. The **OVERVIEW** tab consists of a metric snapshot and a Markdown editor for a document. 


to 
and overview for object, which consists of a metric snapshot graph and an editable markdown document. 

$$$ Every project has a 'description' field. The UI provides a markdown editor to edit this field.


in its **OVERVIEW** tab where a project can be described. The project overview is a sort of scratchpad where 
you can write and share reports, add links to ClearML experiments or any network resource such as issue tracker, web repository, etc., 
and anything else related to a specific project.

![image](../img/gif/webapp_metric_snapshot.gif)

## Editing an overview

$$$$

## Metric snapshot

On the top of the **OVERVIEW** tab, there is an option to create a **metric snapshot**. Choose a metric and variant, 
and then the window will display an aggregated view of the value for the specified metric in all experiments 
$$$over time. This way, the project's progress can be quickly deduced.

$$$The value and time that each experiment scored that value 

All project experiments that measured the specified metric show up in the snapshot. Their colors vary based
on their status (`Completed`, `Aborted`, `Published`, or `Failed`). Hover over a point in the snapshot, and a box will appear with 
the details of the experiment associated with the metric. Click the point, and you will 
be sent to the experiment's page. 
