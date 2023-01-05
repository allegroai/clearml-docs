---
title: Linux or macOS
---

<details className="cml-expansion-panel info">
<summary className="cml-expansion-panel-summary">Important: Upgrading from v0.14 or older</summary>
<div class="cml-expansion-panel-content">
  

   For Linux only, if upgrading from <strong>Trains Server</strong> v0.14 or older, configure the <strong>ClearML Agent Services</strong>.

   * If ``CLEARML_HOST_IP`` is not provided, then **ClearML Agent Services** uses the external public address of the ClearML Server.
   * If ``CLEARML_AGENT_GIT_USER`` / ``CLEARML_AGENT_GIT_PASS`` are not provided, then **ClearML Agent Services** can't access any private repositories for running service tasks.


       export CLEARML_HOST_IP=server_host_ip_here
       export CLEARML_AGENT_GIT_USER=git_username_here
       export CLEARML_AGENT_GIT_PASS=git_password_here
       

:::note
For backwards compatibility, the environment variables ``TRAINS_HOST_IP``, ``TRAINS_AGENT_GIT_USER``, and ``TRAINS_AGENT_GIT_PASS`` are supported.          
:::
    
</div>
</details>
   
<br/>

**To upgrade ClearML Server Docker deployment:**

1. Shutdown ClearML Server. Execute the following command (which assumes the configuration file is in the environment path).
 
        docker-compose -f docker-compose.yml down
        
1. If upgrading from **Trains Server** version 0.15 or older, a data migration is required before continuing this upgrade. See instructions [here](clearml_server_es7_migration.md).

1. If upgrading from ClearML Server version older than 1.2, you need to migrate your data before upgrading your server. See instructions [here](clearml_server_mongo44_migration.md).

1. [Backing up data](clearml_server_linux_mac.md#backing-up-and-restoring-data-and-configuration) is recommended and, if the configuration folder is 
   not empty, backing up the configuration.

1. If upgrading from **Trains Server** to **ClearML Server**, rename `/opt/trains` and its subdirectories to `/opt/clearml`.

        sudo mv /opt/trains /opt/clearml

1. Download the latest `docker-compose.yml` file.

        curl https://raw.githubusercontent.com/allegroai/clearml-server/master/docker/docker-compose.yml -o /opt/clearml/docker-compose.yml

1. Startup ClearML Server. This automatically pulls the latest ClearML Server build.
        
        docker-compose -f /opt/clearml/docker-compose.yml pull
        docker-compose -f /opt/clearml/docker-compose.yml up -d

If issues arise during your upgrade, see the FAQ page, [How do I fix Docker upgrade errors?](../faq.md#common-docker-upgrade-errors).
