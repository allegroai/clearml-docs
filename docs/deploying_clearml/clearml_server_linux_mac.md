---
title: Linux and macOS
---

Deploy the **ClearML Server** in Linux or macOS using the pre-built Docker image.

For ClearML docker images, including previous versions, see [https://hub.docker.com/r/allegroai/clearml](https://hub.docker.com/r/allegroai/clearml). 
However, pulling the ClearML Docker image directly is not required. We provide a docker-compose YAML file that does this. 
The docker-compose file is included in the instructions on this page.

For information about upgrading ClearML Server in Linux or macOS, see [here](upgrade_server_linux_mac.md)

:::important
If ClearML Server is being reinstalled, we recommend clearing browser cookies for ClearML Server. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the ClearML Server URL.
:::


## Prerequisites


For Linux users only:

* Linux distribution must support Docker. For more information, see this [explanation](https://docs.docker.com/engine/install/) in the Docker documentation. 
* Be logged in as a user with `sudo` privileges.
* Use `bash` for all command-line instructions in this installation.
* The ports `8080`, `8081`, and `8008` must be available for the ClearML Server services.

## Deploying


:::warning
By default, ClearML Server launches with unrestricted access. To restrict ClearML Server access, follow the 
instructions in the [Security](clearml_server_security.md) page.
:::

**To launch ClearML Server on Linux or macOS:**

1. Install Docker. The instructions depend upon the operating system:

    * Linux - see [Docker for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/).
    * macOS - see [Docker for OS X](https://docs.docker.com/docker-for-mac/install/).

1. Verify the Docker CE installation. Execute the command:

        docker run hello-world
   
    The expected is output is:

        Hello from Docker!
        This message shows that your installation appears to be working correctly.
        To generate this message, Docker took the following steps:

        1. The Docker client contacted the Docker daemon.
        2. The Docker daemon pulled the "hello-world" image from the Docker Hub. (amd64)
        3. The Docker daemon created a new container from that image which runs the executable that produces the output you are currently reading.
        4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.

1. For macOS only, increase the memory allocation in Docker Desktop to `8GB`.

    1. In the top status bar, click the Docker icon.
    1. Click **Preferences** **>** **Resources** **>** **Advanced**, and then set the memory to at least `8192`.
    1. Click **Apply**.

1. For Linux only, install `docker-compose`. Execute the following commands (for more information, see [Install Docker Compose](https://docs.docker.com/compose/install/) in the Docker documentation): 

        sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose

1. Increase `vm.max_map_count` for Elasticsearch in Docker. Execute the following commands, depending upon the operating system:

    * Linux:

            echo "vm.max_map_count=262144" > /tmp/99-clearml.conf
            sudo mv /tmp/99-clearml.conf /etc/sysctl.d/99-clearml.conf
            sudo sysctl -w vm.max_map_count=262144
            sudo service docker restart

    * macOS:
    
            screen ~/Library/Containers/com.docker.docker/Data/vms/0/tty
            sysctl -w vm.max_map_count=262144

1. Remove any previous installation of ClearML Server.

    **This clears all existing ClearML SDK databases.**

        sudo rm -R /opt/clearml/

1. Create local directories for the databases and storage.

        sudo mkdir -p /opt/clearml/data/elastic_7
        sudo mkdir -p /opt/clearml/data/mongo_4/db
        sudo mkdir -p /opt/clearml/data/mongo_4/configdb
        sudo mkdir -p /opt/clearml/data/redis
        sudo mkdir -p /opt/clearml/logs
        sudo mkdir -p /opt/clearml/config
        sudo mkdir -p /opt/clearml/data/fileserver
        
1. For macOS only do the following:

    1. Open the Docker app.
    
    1. Select **Preferences**.

    1. On the **File Sharing** tab, add `/opt/clearml`.

1. Grant access to the Dockers, depending upon the operating system.

    * Linux:

            sudo chown -R 1000:1000 /opt/clearml

    * macOS:

            sudo chown -R $(whoami):staff /opt/clearml

1. Download the ClearML Server docker-compose YAML file.

        sudo curl https://raw.githubusercontent.com/allegroai/clearml-server/master/docker/docker-compose.yml -o /opt/clearml/docker-compose.yml

1. For Linux only, configure the **ClearML Agent Services**. If `CLEARML_HOST_IP` is not provided, then ClearML Agent Services uses the external public address of the ClearML Server. If `CLEARML_AGENT_GIT_USER` / `CLEARML_AGENT_GIT_PASS` are not provided, then ClearML Agent Services can't access any private repositories for running service tasks.

        export CLEARML_HOST_IP=server_host_ip_here
        export CLEARML_AGENT_GIT_USER=git_username_here
        export CLEARML_AGENT_GIT_PASS=git_password_here

1. Run `docker-compose` with the downloaded configuration file.

        docker-compose -f /opt/clearml/docker-compose.yml up -d
   
The server is now running on [http://localhost:8080](http://localhost:8080).
 
## Port Mapping

After deploying ClearML Server, the services expose the following ports:

* Web server on port `8080`
* API server on port `8008`
* File server on port `8081`

## Restarting

**To restart ClearML Server Docker deployment:**

* Stop and then restart the Docker containers by executing the following commands:

        docker-compose -f /opt/clearml/docker-compose.yml down
        docker-compose -f /opt/clearml/docker-compose.yml up -d



## Backing Up and Restoring Data and Configuration

The commands in this section are an example of how to back up and to restore data and configuration    . 

If the data and configuration folders are in `/opt/clearml`, then archive all data into `~/clearml_backup_data.tgz`, and
configuration into `~/clearml_backup_config.tgz`:

    sudo tar czvf ~/clearml_backup_data.tgz -C /opt/clearml/data .
    sudo tar czvf ~/clearml_backup_config.tgz -C /opt/clearml/config .

If needed, restore data and configuration by doing the following:

1. Verify the existence of backup files.
1. Replace any existing data with the backup data:

        sudo rm -fR /opt/clearml/data/* /opt/clearml/config/*
        sudo tar -xzf ~/clearml_backup_data.tgz -C /opt/clearml/data
        sudo tar -xzf ~/clearml_backup_config.tgz -C /opt/clearml/config 

1. Grant access to the data, depending upon the operating system:

    * Linux:

            sudo chown -R 1000:1000 /opt/clearml

    * macOS:

            sudo chown -R $(whoami):staff /opt/clearml
## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).