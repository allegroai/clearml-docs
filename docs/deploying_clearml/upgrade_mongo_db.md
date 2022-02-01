---
title: MongoDB Upgrade 
---

Before upgrading to ClearML Server Version 1.2 or higher, you need to upgrade MongoDB and migrate all of your data to 
a new database. 

You can upgrade MongoDB with one of the following options:
* Automatic - execute [this script](google.com)
* Manual - execute the commands [below](#manual-upgrade)


## Manual Upgrade 

Follow the following steps:
1. If ClearML Server is up, shut it down (assumes the configuration file is in the environment path):
   * Linux and macOS
   ```bash
   docker-compose -f docker-compose.yml down
   ```
   * Windows
   ```
   docker-compose -f c:\opt\clearml\docker-compose-win10.yml down
   ```
   * Kubernetes using Helm
   ```bash
   helm delete --purge clearml-server
   ```
   * GCP
   ```bash
   docker-compose -f docker-compose.yml down
   ```

1. Backup the source data folder
   ```bash
   sudo tar -zcf mongodb_upgrade.gz -C /opt/clearml/data/mongo .
   ```
1. Restore data to the new folder and set permissions
    ```bash
    sudo mkdir /opt/clearml/data/mongo_4
    sudo tar -xzf mongodb_upgrade.gz -C /opt/clearml/data/mongo_4
    sudo chown -R 1000:1000 /opt/clearml/data/mongo_4     
    ```
    - The permissions are for Linux

1. Upgrade data to mongo 4.4
    ```bash
    sudo docker run -id -v /opt/clearml/data/mongo_4/db:/data/db -v /opt/clearml/data/mongo_4/configdb:/data/configdb --name mongodb_upgrade mongo:4.0.27
    sudo docker exec mongodb_upgrade bash -c 'mongo --eval "db.adminCommand({setFeatureCompatibilityVersion:\"4.0\"})"'    
    ```
    - You should see the { "ok" : 1 } response from this command
    ```bash
    stop mongodb_upgrade && sudo docker rm mongodb_upgrade
    ```
    ```bash
    sudo docker run -id -v /opt/clearml/data/mongo_4/db:/data/db -v /opt/clearml/data/mongo_4/configdb:/data/configdb --name mongodb_upgrade mongo:4.2.16
    sudo docker exec mongodb_upgrade bash -c 'mongo --eval "db.adminCommand({setFeatureCompatibilityVersion:\"4.2\"})"'    
    ```
    - You should see the { "ok" : 1 } response from this command
    ```bash
    stop mongodb_upgrade && sudo docker rm mongodb_upgrade
    ```
    ```bash
    sudo docker run -id -v /opt/clearml/data/mongo_4/db:/data/db -v /opt/clearml/data/mongo_4/configdb:/data/configdb --name mongodb_upgrade mongo:4.4.9
    sudo docker exec mongodb_upgrade bash -c 'mongo --eval "db.adminCommand({setFeatureCompatibilityVersion:\"4.4\"})"'    
    ```
    - You should see the { "ok" : 1 } response from this command
    ```bash
    stop mongodb_upgrade && sudo docker rm mongodb_upgrade
    ```