---
title: Configuring ClearML
---

There are four ways to configure ClearML, listed here in order of priority:
1. Command-line arguments
1. [Environment variables](env_vars.md)
1. [Configuration vault](../webapp/webapp_profile.md#configuration-vault)
1. [Configuration file](clearml_conf.md)

The `clearml.conf` file is the baseline configuration of ClearML, but the values in the file can be overridden by values 
in the configuration vault, which can be overridden by environment variables, which can be overridden by command-line arguments.

For detailed information about the configurable options in **ClearML** and **ClearML Agent**, see the [Configuration File](clearml_conf.md)
reference page.