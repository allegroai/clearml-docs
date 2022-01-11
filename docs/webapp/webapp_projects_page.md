---
title: Projects Page
---

Use the Projects Page for project navigation and management. 

Your projects are displayed like folders: click a folder to access its contents. The Projects Page shows the top-level 
projects in your workspace. Projects that contain nested subprojects are identified by an extra nested project tab. 
An exception is the **All Experiments** folder, which shows all projects’ and subprojects’  contents in a single, flat
list.

![Projects page](../img/webapp_projects_page.png)

If a project has any subprojects, clicking its folder will open its own project page. Access the projects’ top-level 
contents (i.e. experiments, models etc.) via the folder with the bracketed (`[ ]`) project name.

![Subprojects in projects](../img/webapp_projects_inside.png)

If a project does not contain any subprojects, clicking on its folder will open its experiment table (or [Project Overview](webapp_project_overview.md)
page when relevant).

## Project Folders

Project folders display summarized project information.  

![Project card](../img/webapp_projects_card.png)

When relevant, the folder has a tab which displays the number of subprojects in the project. Click the tab to view a list of 
subprojects. Click on a subproject's name to navigate to it.  

![Subproject tab](../img/webapp_sub_project_card.png)

### Project Actions

Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> on the top right
of a project folder to open its context menu and access project actions.  

![Project context menu](../img/webapp_projects_context_menu.png)

To delete a project, all of its experiments must be [archived](webapp_archiving.md) first. 

## Create New Projects

1. Click the **+ NEW PROJECT** button in the top right of the page in a project's context menu, which will open a 
   **New Project** window. 
1. Input a project name
1. Input a target location (`Create in`). Projects can be created in the root or in another project (or subproject)
1. Input a description and default output destination. 
