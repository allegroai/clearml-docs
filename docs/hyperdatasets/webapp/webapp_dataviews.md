---
title: Dataviews Table
---

[Dataviews](../dataviews.mda) appear in the same Project as the experiment that stored the Dataview in the ClearML Enterprise platform, 
as well as the **DATAVIEWS** tab in the **All Projects** page.

The **Dataviews table** is a [customizable](#customizing-the-dataviews-table) list of Dataviews associated with a project.
Use it to [view, create, and edit Dataviews](#viewing-adding-and-editing-dataviews) in the info panel. Dataview tables 
can be filtered by name or name fragments and / or ID, by using the search bar.

![image](../../img/hyperdatasets/dataviews_table_01.png)

The Dataviews table columns in their default order are below. Dynamically order the columns by dragging a column heading 
to a new position.

* **DATAVIEW** - Dataview name.
* **USER** - User creating the Dataview.
* **CREATED** - Elapsed time since the Dataview was created.
* **DESCRIPTION**

## Customizing the Dataviews table

The Dataviews table can be customized. Changes are persistent (cached in the browser), and represented in the URL. 
Save customized settings in a browser bookmark, and share the URL with teammates.

Customize any combination of the following:

* Dynamic column ordering - Drag a column title to a different position.
* Filter by user
* Sort columns - By experiment name and / or elapsed time since creation.
* Column autofit - In the column heading, double click a resizer (column separator).

## Viewing, adding, and editing Dataviews

**To view, add, or edit a Dataview:**

1. Do one of the following:
    
    * Create a new Dataview - Click **+ NEW DATAVIEW**.
    * View or edit a Dataview - In the Dataview table, click the Dataview.
    
1. To edit sections of the Dataview, follow the steps on the "Modifying Dataviews" page for the following:

    1. [Selecting Dataset versions](webapp_exp_modifying.md#selecting-dataset-versions)
    1. [Filtering frames](webapp_exp_modifying.md#filtering-frames)
    1. [Mapping labels (label translation)](webapp_exp_modifying.md#mapping-labels-label-translation) (if appropriate for 
       the data and experiment)
    1. [Label enumeration](webapp_exp_modifying.md#label-enumeration)
    1. [Data augmentation](webapp_exp_modifying.md#data-augmentation)  (if appropriate for the data 
       and experiment)
    1. [Iteration controls](webapp_exp_modifying.md#iteration-controls)

## Cloning Dataviews

Create an exact editable copy of a Dataview. For example, when tuning an experiment, clone a Dataview to apply the same 
frame filters to different Dataset versions.

**To clone a Dataview:**

1. Do one of the following:

    * In the Dataview table, right click a Dataview and then click **Clone**.
    * If the info panel is opened, click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-lg space-sm" /> 
      (menu) and then click **Clone**.
    
1. Select a project or accept the current project, enter a name, and optionally enter a description

1. Click **CLONE**.

## Archiving Dataviews

Archive Dataviews to more easily manage current work. Archived Dataviews do not appear on the active Dataviews table. 
They only appear in the archive. After archiving, the Dataview can be restored from the archive later.

**To archive a Dataview:**

* In the Dataview table:
    * Archive one Dataview - Right click the Dataview **>** **Archive**.
    * Archive multiple Dataviews - Select the Dataview checkboxes **>** In the footer menu that appears at the bottom of 
      the page, click **ARCHIVE**.
* In the Dataview info panel - Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-lg space-sm" /> 
  (menu) **>** **ARCHIVE**.

**To restore a Dataview:**

1. Go to the Dataview table of the archived Dataview or of the **All Projects** page
1. Click **OPEN ARCHIVE**
1. Do any of the following:
    * In the Dataview table:
        * Restore one Dataview - Right click the Dataview **>** **Restore**.
        * Restore multiple Dataviews - Select the Dataview checkboxes **>** **Restore**.
    * In the info panel, restore one Dataview - Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-lg space-sm" /> 
      (menu) **>** **Restore**.

