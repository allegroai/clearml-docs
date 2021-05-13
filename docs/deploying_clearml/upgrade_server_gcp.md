---
title: Google Cloud Platform
---

:::important
This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.
:::

**To upgrade ClearML Server Docker deployment:**

1. Shut down the docker containers with the following command:

        docker-compose -f docker-compose.yml down
        
1. If upgrading from **Trains Server** version 0.15 or older to **ClearML Server**, do the following:

    1. A data migration is required before upgrading. First follow these [data migration instructions](clearml_server_es7_migration.md), 
       and then continue this upgrade.
       
    1. Rename `/opt/trains` and its subdirectories to `/opt/clearml`.
   
            sudo mv /opt/trains /opt/clearml

1. We recommend [backing up data](clearml_server_gcp.md#backing-up-and-restoring-data-and-configuration) and, if the configuration folder is 
   not empty, backing up the configuration.

1. Download the latest `docker-compose.yml` file.

        curl https://raw.githubusercontent.com/allegroai/clearml-server/master/docker/docker-compose.yml -o /opt/clearml/docker-compose.yml

1. Startup **ClearML Server**. This automatically pulls the latest **ClearML Server** build.
        
        docker-compose -f /opt/clearml/docker-compose.yml pull
        docker-compose -f /opt/clearml/docker-compose.yml up -d
        
If issues arise during your upgrade, see the FAQ page, [How do I fix Docker upgrade errors?](../faq.md#common-docker-upgrade-errors).
