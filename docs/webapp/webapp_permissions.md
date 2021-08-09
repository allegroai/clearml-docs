---
title: Access Controls
---

:::important 
This feature is only supported by the ClearML Enterprise Server 
:::

When enabled, workspace administrators can use the Access Controls page to manage a workspace in the following ways:
* [Users](#users) - Add and remove users from a workspace
* [User groups](#user-groups) - Define user permission groups for a workspace
* [Access rules](#access-rules) - Grant users and / or user groups access permissions to the following workspace resources: 
    * [Projects](../fundamentals/projects)
    * [Tasks](../fundamentals/task.md) 
    * [Models](../fundamentals/artifacts.md#models)
    * [Dataviews](../hyperdatasets/dataviews.md) 
    * [Datasets](../hyperdatasets/dataset.md)
    * [Queues](../fundamentals/agents_and_queues.md#what-is-a-queue) 

    
## Navigating to the page
A workspace admin can navigate to the Access Controls page by clicking the Profile button <img src="/docs/latest/icons/ico-me.svg" alt="Profile button" className="icon size-lg space-sm" />
on the top right of the WebApp and selecting **Access Controls**.  


## Tables
### Users
The users table lists workspace members. Each row of the table includes a user's email, name, status, and [user groups](#user-groups).

**To add users:** 
1. Press the **+ ADD USER** button and a dialog will pop up
1. Input the user's email or multiple user emails delimited by a comma, semicolon, or pipe
1. Click **ADD**

**To edit a user's name:** 
1. Hover over the user's row on the table
1. Click the <img src="/docs/latest/icons/ico-edit.svg" alt="Edit Pencil" className="icon size-md" /> button.
1. Edit name in dialog
1. Click **SAVE**

**To remove a user:**
1. Hover over the user's row on the table
1. Click the <img src="/docs/latest/icons/ico-trash.svg" alt="Trash can" className="icon size-md" /> button

:::note
Admins can only remove non-admin users. 
:::

### User groups
There is an option for administrators to define user permission groups for a workspace. The user groups 
can be granted a set of access privileges, and users that are assigned to a user group are granted the group's 
access privileges. Users can be assigned to multiple user groups.

Two preconfigured groups that can't be removed or edited are the **Users** and **Admins** groups.

The user group table lists all the active user groups. Each row includes a group's name, description, and member list. 

**To create a group:**
1. Click **+ ADD GROUP**
1. In the dialog, add a group name and description
1. Add members to the group. When clicking the input box, a list of workspace members appears, from which group
members can be selected. The menu can be filtered by inputting name fragments
1. Click **SAVE**

**To edit a user group:**
1. Hover over the user group's row on the table
1. Click the <img src="/docs/latest/icons/ico-edit.svg" alt="Edit Pencil" className="icon size-md" /> button
1. Edit the group's name and / or description
1. Edit group members:
    1. To remove a member, do one of the following:
        1. Hover over a user's row and click the <img src="/docs/latest/icons/ico-trash.svg" alt="Trash can" className="icon size-md" /> button
        1. Click the input box, then a list of workspace members will appear. Uncheck members to remove them 
    1. To add a member:
        1. Click the input box, then a list of workspace members will appear
        1. Select members to add to the group. Filter the menu by typing in name fragments
    
**To delete a user group:**
1. Hover over the user group's row on the table
1. Click the <img src="/docs/latest/icons/ico-trash.svg" alt="Trash can" className="icon size-md" /> button


### Access rules

The access rules table is where the access privileges can be viewed, defined, and edited. 

Access rules delineate the criteria for granting access privileges. Admins can grant **READ ONLY** (RO) and **READ & MODIFY** (RW) 
permissions to resources. A workspace is initially preconfigured so all administrators and users have RW access to all resources.

**To create an access rule:**
1. Click **+ ADD RULES**, and a rule creation dialog pops up
1. Select the resource to grant privileges to. There is an option to select a specific resource object (e.g. a 
   specific project or task)
1. Select the permission type - **Read Only** or **Read & Modify**
1. Assign users to be given access. Click the input box, and select the users from the list that appears. Filter the list by entering name fragments
1. Assign groups to be given access. Click the input box, and select the groups from the list that appears. Filter the list by entering name fragments
1. Click **SAVE**

Access is inherited according to resource containers. For example, if a user is given access to a project, the user will also 
have access to the project's task and their contents. A user who is granted access to a specific task will not have
access to another task in the project, unless explicitly granted.  

**To edit an access rule:**
1. Hover over the access rule's row on the table
1. Click the <img src="/docs/latest/icons/ico-edit.svg" alt="Edit Pencil" className="icon size-md" /> button
1. Change the resource, resource object, and permission type as desired
1. Edit access rules users and groups members:
    1. To revoke a user's or group's access, do one of the following:
        1. Hover over a user's or group's row and click the <img src="/docs/latest/icons/ico-trash.svg" alt="Trash can" className="icon size-md" /> button
        1. Click the relevant input box, then a list of workspace members / groups will appear. Uncheck members / groups to revoke their access rule privilege 
    1. To grant access to a user or group:
        1. Click the relevant input box, then a list of workspace users / groups will appear
        1. Select users / groups from the menu. Filter the menu by typing in name fragments
    1. Click **SAVE**


**To delete an access rule:**
1. Hover over the access's row on the table
1. Click the <img src="/docs/latest/icons/ico-trash.svg" alt="Trash can" className="icon size-md" /> button


#### Filtering the access rules table

The access rules table can be filtered according to resource type and according to users / groups with access. 
* **To filter according to resource**, click the **View** dropdown menu and select the desired resource
* **To filter according to users / groups**, click <img src="/docs/latest/icons/ico-filter-off.svg" alt="Filter" className="icon size-md" />
on the **USERS & GROUPS** column and select the users and groups to view from the list that appears. 


