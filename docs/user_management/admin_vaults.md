---
title: Administrator Vaults
---

:::important Enterprise Feature
Administrator Vaults are available under the ClearML Enterprise plan.
:::

Administrators can set configuration for users, [service accounts](../webapp/webapp_profile.md#service-accounts), 
and [user groups](../webapp/webapp_profile.md#user-groups) within a ClearML workspace by using central configuration 
stores--or Administrator Vaults.

Administrators can define multiple [configuration vaults](../webapp/webapp_profile.md#configuration-vault) which will 
each be applied to their designated [user groups](../webapp/webapp_profile.md#user-groups), allowing for custom settings. 
Configuration vault values are applied to tasks run by members of the designated user groups. When applied, the configuration 
vaults extend and/or override entries in the local ClearML [configuration file](../configs/clearml_conf.md)
where a ClearML task is executed.

For more information see [Administrator Vaults](../webapp/webapp_profile.md#administrator-vaults).

