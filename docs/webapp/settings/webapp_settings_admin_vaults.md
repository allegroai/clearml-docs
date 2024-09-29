---
title: Administrator Vaults
---

:::info Enterprise Feature
This feature is available under the ClearML Enterprise plan.
:::

Administrators can define multiple [configuration vaults](webapp_settings_profile.md#configuration-vault) which will each be applied to designated 
[user groups](webapp_settings_users.md). Use configuration vaults to extend and/or override entries in the local ClearML [configuration file](../../configs/clearml_conf.md)
where a ClearML task is executed. Configuration vault values will be applied to tasks run by members of the designated user groups. 

To apply its contents, a vault should be enabled. New entries will extend the configuration in the local ClearML [configuration file](../../configs/clearml_conf.md). 
Most existing configuration file entries will be overridden by the vault values.

:::info 
The following configuration values are machine and/or agent specific, so they can't be set in a configuration vault:
* `agent.cuda_version`
* `agent.cudnn_version`
* `agent.default_python`
* `agent.worker_id` 
* `agent.worker_name`
* `agent.debug`
:::

**To create a vault:**
1. Click **+ Add Vault**
1. Fill in vault details:
   1. Vault name - Name that appears in the Administrator Vaults table
   1. User Group - Specify the User Group that the vault affects
   1. Format - Specify the configuration format: HOCON / JSON / YAML.
1. Fill in the configuration values (click <img src="/docs/latest/icons/ico-info.svg" alt="Info" className="icon size-md space-sm" /> 
to view configuration file reference). To import and existing configuration file, click <img src="/docs/latest/icons/ico-import.svg" alt="Import" className="icon size-md space-sm" />. 
1. Click **Save** 

The **Administrator Vaults** table lists all currently defined vaults, and the following details:
* Active - Toggle to enable / disable the vault
* Name - Vault name
* Group - User groups to apply this vault to 
* ID - Vault ID (click to copy)
* Vault Content - Vault content summary
* Update - Last update time

Hover over a vault in the table to Download, Edit, or Delete a vault.  

![Admin vaults](../../img/settings_admin_vaults.png)