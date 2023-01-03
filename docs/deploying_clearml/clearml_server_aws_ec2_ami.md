---
title: AWS EC2 AMIs
---

Deployment of ClearML Server on AWS is easily performed using AWS AMIs, which are available in the AWS community AMI catalog.
The [ClearML Server community AMIs](#clearml-server-aws-community-amis) are configured by default without authentication
to allow quick access and onboarding.

After deploying the AMI, configure the ClearML Server instance to provide the authentication scheme that 
best matches the workflow.

For information about upgrading a ClearML Server in an AWS instance, see [here](upgrade_server_aws_ec2_ami.md).

:::important
If ClearML Server is being reinstalled, clearing browser cookies for ClearML Server is recommended. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the ClearML Server URL.
:::

## Launching

:::warning
By default, ClearML Server deploys as an open network. To restrict ClearML Server access, follow the instructions 
in the [Security](clearml_server_security.md) page.
:::

The minimum recommended amount of RAM is 8 GB. For example, a t3.large or t3a.large EC2 instance type would accommodate the recommended RAM size.

**To launch a ClearML Server AWS community AMI**, use one of the [ClearML Server AWS community AMIs](#clearml-server-aws-community-amis) 
and see:

* The AWS Knowledge Center page, [How do I launch an EC2 instance from a custom Amazon Machine Image (AMI)?](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/)
* Detailed instructions in the AWS Documentation for [Launching an Instance Using the Launch Instance Wizard](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-instance.html).

## Accessing ClearML Server

Once deployed, ClearML Server exposes the following services:

* Web server on `TCP port 8080`
* API server on `TCP port 8008`
* File Server on `TCP port 8081`

**To locate ClearML Server address:**

1. Go to AWS EC2 Console.
1. In the **Details** tab, **Public DNS (IPv4)** shows the ClearML Server address.

**To access ClearML Server Web-App (UI):**

* Direct browser to its web server URL: `http://<Server Address>:8080`

**To SSH into ClearML Server:**

* Log into the AWS AMI using the default username `ec2-user`. Control the SSH credentials from the AWS management console.

### Logging in to the WebApp (UI)

Enter any name to log in to the ClearML WebApp (UI). If needed, modify the default login behavior to match workflow policy, 
see [Configuring Web Login Authentication](clearml_server_config.md#web-login-authentication) 
on the "Configuring Your Own ClearML Server" page.

## Storage Configuration

The pre-built ClearML Server storage configuration is the following:

* MongoDB: `/opt/clearml/data/mongo_4/`
* Elasticsearch: `/opt/clearml/data/elastic_7/`
* File Server: `/mnt/fileserver/`


## Backing Up and Restoring Data and Configuration

:::note
If data is being moved between a **Trains Server** and a **ClearML Server** installation, make sure to use the correct paths 
for backup and restore (`/opt/trains` and `/opt/clearml` respectively).
:::

The commands in this section are examples for backing up and restoring data and configuration.

If data and configuration folders are in `/opt/clearml`, then archive all data into `~/clearml_backup_data.tgz`, and 
configuration into `~/clearml_backup_config.tgz`:

```bash
sudo tar czvf ~/clearml_backup_data.tgz -C /opt/clearml/data .
sudo tar czvf ~/clearml_backup_config.tgz -C /opt/clearml/config .
```

**If data and configuration need to be restored**:

1. Verify you have the backup files.
1. Replace any existing data with the backup data:
   ```bash
   sudo rm -fR /opt/clearml/data/* /opt/clearml/config/*
   sudo tar -xzf ~/clearml_backup_data.tgz -C /opt/clearml/data
   sudo tar -xzf ~/clearml_backup_config.tgz -C /opt/clearml/config
   ```
1. Grant access to the data:
   ```bash
   sudo chown -R 1000:1000 /opt/clearml
   ```
        

## ClearML Server AWS Community AMIs

The following section contains a list of AMI Image IDs per-region for the latest ClearML Server version.



### Latest Version

#### v1.9.1

* **af-south-1** : ami-0c8a0d519c0899ff7 
* **ap-east-1** : ami-0e1d519f431c188cc 
* **ap-northeast-1** : ami-0f208e02d120d52c4 
* **ap-northeast-2** : ami-0e561eb3769cc9d81 
* **ap-northeast-3** : ami-09711ebc0397b6821 
* **ap-south-1** : ami-0c061d628d27c85f8 
* **ap-south-2** : ami-02887b3538ca1fb67 
* **ap-southeast-1** : ami-0f79d04c14fc3177b 
* **ap-southeast-2** : ami-05448640b722d58c7 
* **ap-southeast-3** : ami-08b97c334dc62635f 
* **ca-central-1** : ami-0ad888ef835f3b472 
* **eu-central-1** : ami-0806ed398229dc150 
* **eu-central-2** : ami-0b3000298770dfe4e 
* **eu-north-1** : ami-0cdd5cbd4581b3e14 
* **eu-south-1** : ami-07a25a8604362f891 
* **eu-south-2** : ami-02a89956bfc8e5aaa 
* **eu-west-1** : ami-0c443b8bb761c2757 
* **eu-west-2** : ami-05eb33f3e459e9a7e 
* **eu-west-3** : ami-027c9436891786ebb 
* **me-central-1** : ami-0793feafc6fdec682 
* **me-south-1** : ami-08710245e747b9585 
* **sa-east-1** : ami-01e6aa85f348dfcb5 
* **us-east-2** : ami-0fa3ff48f124b3c02 
* **us-west-1** : ami-0a20134fb79384371 
* **us-west-2** : ami-048abf434ff5566e2 
* **us-east-1** : ami-0734f8f2790c906e1 

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
