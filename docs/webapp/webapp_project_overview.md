---
title: Project Overview
---

A project's **OVERVIEW** tab provides options to present a general picture of the project. The page consists of a graph 
that can show a snapshot of a specific metric's value across the project's experiments, and a space to enter and edit a 
project's description. When either overview option is utilized, the **OVERVIEW** tab becomes the project's landing page, 
meaning that it's the first thing that is seen when opening the project. 

![Project overview tab gif](../img/gif/webapp_metric_snapshot.gif)

## Metric Snapshot

On the top of the **OVERVIEW** tab, there is an option to display a **metric snapshot**. Choose a metric and variant, 
and then the window will present an aggregated view of the value for that metric and the time that each 
experiment scored that value. This way, the project's progress can be quickly deduced.

All project experiments that reported the specified metric show up in the snapshot. Their colors vary based
on their status (`Completed`, `Aborted`, `Published`, or `Failed`). Hover over a point in the snapshot, and a box will 
appear with the details of the experiment associated with the metric value. Click the point, and you will 
be sent to the experiment's page. 

## Project Description

Every project has a `description` field. The UI provides a Markdown editor to edit this field.

In the Markdown document, you can write and share reports and add links to **ClearML** experiments 
or any network resource such as issue tracker, web repository, etc.

### Editing the Description

To edit the description in the **OVERVIEW** tab, hover over the description section, and press the  **EDIT** button that
appears on the top right of the window. 

When using the Markdown editor, you can make use of features such as bullets, 
numbered lists, code blocks, headings with levels, images, and italicized and bolded text.   
