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

:::warning
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

#### v1.14.0

* **af-south-1** : ami-0e69792cb3be26d55
* **ap-east-1** : ami-07524dbb2b03ff201
* **ap-northeast-1** : ami-007249581a013504d
* **ap-northeast-2** : ami-0caf85dd3d4f219d6
* **ap-northeast-3** : ami-0e10ca701a6bb7469
* **ap-south-1** : ami-054c70485ca886616
* **ap-south-2** : ami-0ee463ae4ece7007d
* **ap-southeast-1** : ami-0a6af47f6aa3ca8a3
* **ap-southeast-2** : ami-01844c10140f557d6
* **ap-southeast-3** : ami-0dcce74d0ef388d21
* **ap-southeast-4** : ami-0e6a5dedd284d147f
* **ca-central-1** : ami-0da8b81a0ac520ce6
* **ca-west-1** : ami-0b257406c6be268c2
* **eu-central-1** : ami-038c4c2b29337b8b0
* **eu-central-2** : ami-047b3de405e0da6a0
* **eu-north-1** : ami-0225c5a0fc71a5920
* **eu-south-1** : ami-0b487e868d6f558ec
* **eu-south-2** : ami-0343e0d81203a5a70
* **eu-west-1** : ami-0f4c6ea53f0ce7e6c
* **eu-west-2** : ami-08be0e71fde585b89
* **eu-west-3** : ami-02089b6890f55ce22
* **il-central-1** : ami-098b5ed3c758c5c8f
* **me-central-1** : ami-0ba83e2a2bcf35a57
* **me-south-1** : ami-0fbddf979e090c105
* **sa-east-1** : ami-0bb2661ad1d39b122
* **us-east-1** : ami-0e608019816bb5f01
* **us-east-2** : ami-01e69562133afabfc
* **us-west-1** : ami-00f975c6de93f13ac
* **us-west-2** : ami-0b75375a006916e53

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
