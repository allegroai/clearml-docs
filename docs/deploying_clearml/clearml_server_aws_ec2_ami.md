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

#### v1.13.0

* **af-south-1** : ami-0925778a7b18ccb15
* **ap-east-1** : ami-004c914f2dfe8cc37
* **ap-northeast-1** : ami-058ef5ad26f0a5598
* **ap-northeast-2** : ami-0f2dbb11a8c0b824d
* **ap-northeast-3** : ami-0cfdca4e88b95667b
* **ap-south-1** : ami-077cf4bd5598ba750
* **ap-south-2** : ami-0f6c2d1b51286ce29
* **ap-southeast-1** : ami-04645c49508e5f7a3
* **ap-southeast-2** : ami-07e58229050ea8269
* **ap-southeast-3** : ami-04b5535a3e58e9fda
* **ap-southeast-4** : ami-07e05d467d28a19b7
* **ca-central-1** : ami-006638ddf9adde3b0
* **eu-central-1** : ami-002a2f51c8a9a19d9
* **eu-central-2** : ami-0929fa2f97ae325a7
* **eu-north-1** : ami-0a0397ae41ebb9a9d
* **eu-south-1** : ami-0a28af869932ef9a9
* **eu-south-2** : ami-07aec155849b83da5
* **eu-west-1** : ami-0fd5bd2e6e4a07c1d
* **eu-west-2** : ami-075f461df4fc39514
* **eu-west-3** : ami-0fd3e6168a0efbe67
* **il-central-1** : ami-037fba544537bc31f
* **me-central-1** : ami-05d98e11cc1c91aee
* **me-south-1** : ami-09d252aec3018d380
* **sa-east-1** : ami-0233053644af13697
* **us-east-1** : ami-094b50dd004bdb97d
* **us-east-2** : ami-01e19392c5639cdd1
* **us-west-1** : ami-09df65ce04f66d81e
* **us-west-2** : ami-02fc5124b2c987816

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
