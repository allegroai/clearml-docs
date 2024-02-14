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

:::caution
By default, ClearML Server deploys as an open network. To restrict ClearML Server access, follow the instructions 
in the [Security](clearml_server_security.md) page.
:::

The minimum recommended amount of RAM is 8 GB. For example, a `t3.large` or `t3a.large` EC2 instance type would accommodate the recommended RAM size.

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

**To access ClearML Server WebApp (UI):**

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
* File Server: `/opt/clearml/data/fileserver/`


## Backing Up and Restoring Data and Configuration

:::caution
Stop your server before backing up or restoring data and configuration
:::

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

#### v1.14.1

* **af-south-1** : ami-08292ed0f8bceea4d
* **ap-east-1** : ami-08ded1bdff6f21072
* **ap-northeast-1** : ami-02d4269795695d489
* **ap-northeast-2** : ami-09133d17315cde44f
* **ap-northeast-3** : ami-0befd6387a599b5a5
* **ap-south-1** : ami-0df04f663307b3b96
* **ap-south-2** : ami-03598820b7631d39b
* **ap-southeast-1** : ami-0ec9f8decd0d931c8
* **ap-southeast-2** : ami-0b3e3dbe492c20e45
* **ap-southeast-3** : ami-05bf783591088bfb1
* **ap-southeast-4** : ami-048b28b14bfd01456
* **ca-central-1** : ami-0a7c7075c9c31a5bb
* **ca-west-1** : ami-0db0778d29a63bb5e
* **eu-central-1** : ami-04bfe02407f629832
* **eu-central-2** : ami-022228423a1d600d9
* **eu-north-1** : ami-0ba5c6fd3431aa152
* **eu-south-1** : ami-0a969e0a72e09fb44
* **eu-south-2** : ami-069a6fb784901e26f
* **eu-west-1** : ami-0b87854a58a101910
* **eu-west-2** : ami-07fe5e86e78ccd152
* **eu-west-3** : ami-0ea127f7da7ce32d7
* **il-central-1** : ami-0da1313c523c066d5
* **me-central-1** : ami-071de9a7da8a613a3
* **me-south-1** : ami-01278245ad32c2c67
* **sa-east-1** : ami-0126d1b5fafb9fdd7
* **us-east-1** : ami-00afc13b09a0dbf89
* **us-east-2** : ami-040f00690660bca93
* **us-west-1** : ami-0e1e26ff04ee85cdb
* **us-west-2** : ami-011fcc9fc9fbf1d0a

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
