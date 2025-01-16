---
title: Google Cloud Platform
---

**To upgrade ClearML Server Docker deployment:**

1. Shut down the docker containers with the following command:

   ```
   docker-compose -f docker-compose.yml down
   ```
   
1. If upgrading from **Trains Server** version 0.15 or older to **ClearML Server**, do the following:

    1. Follow these [data migration instructions](clearml_server_es7_migration.md), 
       and then continue this upgrade.
       
    1. Rename `/opt/trains` and its subdirectories to `/opt/clearml`:
   
       ```
       sudo mv /opt/trains /opt/clearml
       ```
       
1. If upgrading from ClearML Server version older than 1.2, you need to migrate your data before upgrading your server. See instructions [here](clearml_server_mongo44_migration.md). 
1. If upgrading from ClearML Server version older than 1.7, you first need to upgrade to ClearML Server v1.17 using [this `docker-compose` file](https://github.com/allegroai/clearml-server/blob/2976ce69cc91550a3614996e8a8d8cd799af2efd/upgrade/1_17_to_2_0/docker-compose.yml).
1. [Backing up data](clearml_server_gcp.md#backing-up-and-restoring-data-and-configuration) is recommended, and if the configuration folder is 
   not empty, backing up the configuration.

1. Download the latest `docker-compose.yml` file:

   ```
   curl https://raw.githubusercontent.com/allegroai/clearml-server/master/docker/docker-compose.yml -o /opt/clearml/docker-compose.yml
   ```
   
1. Startup ClearML Server. This automatically pulls the latest ClearML Server build.
        
   ```   
   docker-compose -f /opt/clearml/docker-compose.yml pull
   docker-compose -f /opt/clearml/docker-compose.yml up -d
   ```
        
If issues arise during your upgrade, see the FAQ page, [How do I fix Docker upgrade errors?](../faq.md#common-docker-upgrade-errors)
