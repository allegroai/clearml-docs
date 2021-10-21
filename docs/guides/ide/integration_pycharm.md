---
title: Integration for PyCharm
---

The **ClearML PyCharm plugin** enables syncing a local execution configuration to a remote executor machine:

* Sync local repository information to a remote debug machine.

* Multiple users can use the same resource for execution without compromising private credentials.

* Run the [ClearML Agent](../../clearml_agent.md) on default VMs/Containers.

## Installation

1. Download the latest plugin version from the [Releases page](https://github.com/allegroai/clearml-pycharm-plugin/releases). 

1. Install the plugin in PyCharm from local disk:

![image](../../img/ide_pycharm_plugin_from_disk.png)

## Optional: ClearML Configuration Parameters

:::warning
If you set ClearML configuration parameters (ClearML Server and ClearML credentials) in the plugin, they will override 
the settings in the ClearML configuration file.
:::

**To set ClearML configuration parameters:**

1. In PyCharm, open **Settings** **>** **Tools** **>** **ClearML**.

1. Configure your ClearML server information:
    1. API server (for example: ``http://localhost:8008``)
    1. Web server (for example: ``http://localhost:8080``)
    1. File server  (for example: ``http://localhost:8081``)
    
1. Add **ClearML** user credentials key/secret.

![image](../../img/ide_pycharm_config_params.png)
