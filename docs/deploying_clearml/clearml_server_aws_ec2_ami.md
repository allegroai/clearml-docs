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

#### v1.12.0

* **af-south-1** : ami-09abed7f2ef7dc780
* **ap-east-1** : ami-020d607c180608fa6
* **ap-northeast-1** : ami-06980fdefbc2849ec
* **ap-northeast-2** : ami-0295e5d14404f2a5b
* **ap-northeast-3** : ami-0d927c9916ac3802a
* **ap-south-1** : ami-0c781f334c2876e9c
* **ap-south-2** : ami-0d94a451ece7054c5
* **ap-southeast-1** : ami-07ac0fc3cb77d5e2d
* **ap-southeast-2** : ami-09b75f65822649506
* **ap-southeast-3** : ami-09eace366e5400d33
* **ap-southeast-4** : ami-04607e3db0e18a8bd
* **ca-central-1** : ami-00e750f4cd1e55051
* **eu-central-1** : ami-025978834a56443fc
* **eu-central-2** : ami-0493d5cf359d24c65
* **eu-north-1** : ami-08ca17b0ef61a7ec8
* **eu-south-1** : ami-09498b3344e324332
* **eu-south-2** : ami-0fdc2a00bdc315dcf
* **eu-west-1** : ami-09702fd1c4b2ca787
* **eu-west-2** : ami-00b0361be8553a7ea
* **eu-west-3** : ami-070f8ced3dca91b5a
* **me-central-1** : ami-0a11cf6c89bd7bcfa
* **me-south-1** : ami-0a2cc8df4c6dc3ad7
* **sa-east-1** : ami-072dce18d6f3859bc
* **us-east-1** : ami-0017fb171b0ed6c86
* **us-east-2** : ami-086f069986816b2c4
* **us-west-1** : ami-0074983f5a1658b4f
* **us-west-2** : ami-030367d569e87b5ad

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
