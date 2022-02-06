---
title: Windows
---

:::important
This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.
:::

**To upgrade ClearML Server Docker deployment:**

1. Shut down the docker containers. 
   
1. Execute one of the following commands, depending upon the version that is being upgraded:
   
   * Upgrading **ClearML Server** version:

         docker-compose -f c:\opt\clearml\docker-compose-win10.yml down
   
   * Upgrading from **Trains Server** to **ClearML Server**:

         docker-compose -f c:\opt\trains\docker-compose-win10.yml down
        
1. If upgrading from ClearML Server version older than 1.2, you need to upgrade MongoDB and migrate your data before upgrading your server. See instructions [here](upgrade_mongo_db.md). 
   If upgrading from Trains Server version 0.15 or older, a data migration is required before continuing this upgrade. See instructions [here](clearml_server_es7_migration.md).

1. We recommend backing up data and, if the configuration folder is not empty, backing up the configuration.
 
    :::note
    For example, if the configuration is in ``c:\opt\clearml``, then backup ``c:\opt\clearml\config`` and ``c:\opt\clearml\data``. 
    Before restoring, remove the old artifacts in ``c:\opt\clearml\config`` and ``c:\opt\clearml\data``, and then restore. 
    :::
   
1. If upgrading from **Trains Server** to **ClearML Server**, rename `/opt/trains` and its subdirectories to `/opt/clearml`.

1. Download the latest `docker-compose.yml` file.

        curl https://raw.githubusercontent.com/allegroai/clearml-server/master/docker/docker-compose-win10.yml -o c:\opt\clearml\docker-compose-win10.yml
        
1. Startup **ClearML Server**. This automatically pulls the latest **ClearML Server** build.
        
        docker-compose -f c:\opt\clearml\docker-compose-win10.yml pull
        docker-compose -f c:\opt\clearml\docker-compose-win10.yml up -d

If issues arise during your upgrade, see the FAQ page, [How do I fix Docker upgrade errors?](../faq.md#common-docker-upgrade-errors). 
