---
title: Project Overview
---

In the WebApp, you can navigate through a project's experiments and models by using the [experiments table](webapp_exp_table.md) 
and the [models table](webapp_model_table.md). Additionally, to make organization easier, every project has an editable 
markdown file in its **OVERVIEW** tab. The project overview is a sort of scratchpad where you can write and share reports, 
reference specific experiments or models, connect to project management tickets from external services, and anything 
else related to a specific project.

![image](../img/gif/webapp_metric_snapshot.gif)

## Metric snapshot

On the top of the **OVERVIEW** tab, there is an option to create a **metric snapshot**. Choose a metric and variant, 
and then the window will display an aggregated view of the value for the specified metric in all completed experiments 
over time. This way, the project's progress can be quickly deduced.

All completed project experiments that measured the specified metric show up in the snapshot. Their colors vary based
on their status (`Completed`, `Published`, or `Failed`). Hover over a point in the snapshot, and a box will appear with 
the details of the experiment associated with the metric. Click the point, and you will 
be sent to the experiment's page. 
