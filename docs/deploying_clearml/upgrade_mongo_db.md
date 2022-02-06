---
title: MongoDB Upgrade 
---

Before upgrading to ClearML Server Version 1.2 or higher, you need to upgrade MongoDB and migrate all of your data to 
a new database. 

You can upgrade MongoDB with one of the following options:
* [Automatic](#automatic-upgrade) - execute [this script](google.com)
* [Manual](#manual-upgrade) - execute commands from a terminal


## Automatic Upgrade 
1. If you haven’t done so, shut down the ClearML Server (assumes the configuration file is in the environment path): 
   * Linux and macOS
   ```bash
   docker-compose -f docker-compose.yml down
   ```
   * AWS AMI
   ```bash
   docker-compose -f /opt/clearml/docker-compose.yml down
   ```
   * Windows
   ```bash
   docker-compose -f c:\opt\clearml\docker-compose-win10.yml down
   ```
   * Kubernetes
   ```bash
   helm delete --purge clearml-server
   ```
   * GCP
   ```bash
   docker-compose -f docker-compose.yml down
   ```

1. Copy [this script](GOOGLE.COM$$$) to any location on the host computer
1. Run script with python 2.7+ or python 3.6+. On linux, run with `sudo` if you need permissions to perform the Docker commands.
   ```bash
   sudo python3 mongo_upgrade.py
   ```
   See optional script parameters [below](#script-parameters).
1. Continue upgrading your ClearML Server:
   * [AWS EC2 AMIs](upgrade_server_aws_ec2_ami.md)
   * [Google Cloud Platform custom images](upgrade_server_gcp.md)
   * [Linux and macOS](upgrade_server_linux_mac.md)
   * [Windows](upgrade_server_win.md)
   * [Kubernetes](upgrade_server_kubernetes_helm.md)

:::note backup dump
As part of the run, the script always creates the backup dump file in the source folder
:::

### Script Parameters

<div className="tbl-cmd">

|Name|Description|
|----|------|
|`--source <path>`|Source folder. By default /opt/allegro/data/mongo|
|`--target <path>`|Target folder. By default /opt/allegro/data/mongo_4. Make sure to modify ClearML Server v.12’s Docker Compose file so it maps to the new target path when starting the mongo container|
|`--in-place`|Allows upgrading in the source folder. Specify this parameter and pass `--source` and `--target` parameters pointing to the same location| 
|`--verbose`| Verbose report additional output from Mongo upgrade commands |
`--timeout`| Interval in seconds that the script waits for mongo docker to start. By default 15 seconds |

</div>

## Manual Upgrade 

1. If you haven’t done so, shut down the ClearML Server (assumes the configuration file is in the environment path): 
   * Linux and macOS
   ```bash
   docker-compose -f docker-compose.yml down
   ```
   * AWS AMI
   ```bash
   docker-compose -f /opt/clearml/docker-compose.yml down
   ```
   * Windows
   ```bash
   docker-compose -f c:\opt\clearml\docker-compose-win10.yml down
   ```
   * Kubernetes
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
1. Restore data to the new folder and set permissions (the permissions are for Linux)
    ```bash
    sudo mkdir /opt/clearml/data/mongo_4
    sudo tar -xzf mongodb_upgrade.gz -C /opt/clearml/data/mongo_4
    sudo chown -R 1000:1000 /opt/clearml/data/mongo_4     
    ```

1. Upgrade data to mongo 4.4
    ```bash
    sudo docker run -id -v /opt/clearml/data/mongo_4/db:/data/db -v /opt/clearml/data/mongo_4/configdb:/data/configdb --name mongodb_upgrade mongo:4.0.27
    sudo docker exec mongodb_upgrade bash -c 'mongo --eval "db.adminCommand({setFeatureCompatibilityVersion:\"4.0\"})"'    
    ```
    This command should return an `{ "ok" : 1 }` response. 
    ```bash
    stop mongodb_upgrade && sudo docker rm mongodb_upgrade
    ```
    ```bash
    sudo docker run -id -v /opt/clearml/data/mongo_4/db:/data/db -v /opt/clearml/data/mongo_4/configdb:/data/configdb --name mongodb_upgrade mongo:4.2.16
    sudo docker exec mongodb_upgrade bash -c 'mongo --eval "db.adminCommand({setFeatureCompatibilityVersion:\"4.2\"})"'    
    ```
    This command should return an `{ "ok" : 1 }` response. 
    ```bash
    stop mongodb_upgrade && sudo docker rm mongodb_upgrade
    ```
    ```bash
    sudo docker run -id -v /opt/clearml/data/mongo_4/db:/data/db -v /opt/clearml/data/mongo_4/configdb:/data/configdb --name mongodb_upgrade mongo:4.4.9
    sudo docker exec mongodb_upgrade bash -c 'mongo --eval "db.adminCommand({setFeatureCompatibilityVersion:\"4.4\"})"'    
    ```
    This command should return an `{ "ok" : 1 }` response. 
    ```bash
    stop mongodb_upgrade && sudo docker rm mongodb_upgrade
    ```
   
1. Continue upgrading your ClearML Server:
   * [AWS EC2 AMIs](upgrade_server_aws_ec2_ami.md)
   * [Google Cloud Platform custom images](upgrade_server_gcp.md)
   * [Linux and macOS](upgrade_server_linux_mac.md)
   * [Windows](upgrade_server_win.md)
   * [Kubernetes](upgrade_server_kubernetes_helm.md)
