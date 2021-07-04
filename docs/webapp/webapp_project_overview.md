---
title: Project Overview
---

Every project contains an **OVERVIEW** tab, which consists of a metric snapshot and an editable Markdown document,
that provides the option to set down a general picture of the project. If an overview is inputted, the **OVERVIEW** tab
becomes the first page that is seen when entering a project. Otherwise, you are sent to the project's experiment table. 

![image](../img/gif/webapp_metric_snapshot.gif)

## Metric snapshot

On the top of the **OVERVIEW** tab, there is an option to display a **metric snapshot**. Choose a metric and variant, 
and then the window will present an aggregated view of the value for the specified metric value and the time that each 
experiment scored that value. This way, the project's progress can be quickly deduced.

All project experiments that measured the specified metric show up in the snapshot. Their colors vary based
on their status (`Completed`, `Aborted`, `Published`, or `Failed`). Hover over a point in the snapshot, and a box will 
appear with the details of the experiment associated with the metric. Click the point, and you will 
be sent to the experiment's page. 

## Editable Markdown document

Every project has a `description` field. The UI provides a Markdown editor to edit this field.

In the Markdown field, you can write and share reports, add links to **ClearML** experiments 
or any network resource such as issue tracker, web repository, etc., and anything else related to a specific project.


### Editing an overview

To edit the description in the **OVERVIEW** tab, hover over the description section, and press the  **EDIT** button that
appears on the top right of the window. When using the Markdown editor, you can make use of features such as bullets, 
numbered lists, code blocks, headings with levels, images, italicized and bolded text.   
