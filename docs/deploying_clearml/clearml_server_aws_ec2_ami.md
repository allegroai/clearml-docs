---
title: AWS EC2 AMIs
---

:::important
This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.
:::

Deployment of **ClearML Server** on AWS is easily performed using AWS AMIs, which are available in the AWS Marketplace catalog 
and in the AWS community AMI catalog.

* AWS Marketplace ClearML Server is coming soon - Preconfigured with unique initial access credentials. Until it arrives, 
  use [AWS Marketplace Trains Server](https://aws.amazon.com/marketplace/pp/B085D8W5NM) with the instructions on the page.

* [ClearML Server community AMIs](#clearml-server-aws-community-amis) - Configured by default without authentication to allow quick access and onboarding.

After deploying either type of AMI, configure the **ClearML Server** instance to provide the authentication scheme that 
best matches the workflow.

For information about upgrading a **ClearML Server** in an AWS instance, see [here](upgrade_server_aws_ec2_ami.md).

:::important
If **ClearML Server** is being reinstalled, we recommend clearing browser cookies for **ClearML Server**. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the **ClearML Server** URL.
:::

## Launching

:::warning
By default, **ClearML Server** deploys as an open network. To restrict **ClearML Server** access, follow the instructions 
in the [Security](clearml_server_security.md) page.
:::

The minimum recommended amount of RAM is 8 GB. For example, a t3.large or t3a.large EC2 instance type would accommodate the recommended RAM size.


### AWS community AMIs

**To launch a ClearML Server AWS community AMI:**

* Use one of the [ClearML Server AWS community AMIs](#clearml-server-aws-community-amis) and see:

    * The AWS Knowledge Center page, [How do I launch an EC2 instance from a custom Amazon Machine Image (AMI)?](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/)
    * Detailed instructions in the AWS Documentation for [Launching an Instance Using the Launch Instance Wizard](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-instance.html).

### AWS Marketplace AMIs

**To launch a ClearML Server AWS Marketplace AMI through the AWS Marketplace website:** 

1. Open the AWS Marketplace for the [Allegro AI ClearML Server](https://aws.amazon.com/marketplace/pp/B085D8W5NM).
1. In the heading area, click **Continue to Subscribe**.
1. **On the Subscribe to software** page, click **Accept Terms**, and then click **Continue to Configuration**.
1. On the **Configure this software** page, complete the following:

    1. In the **Fulfillment Option** list, select **64-bit (x86) Amazon Machine Image (AMI)**.
    1. In the **Software Version** list, select your **ClearML Server** version. For example, **0.13.0 (Mar 02, 2020)**.
    1. In the **Region** list, select your region.
    1. Click **Continue to Launch**.

1. On the **Launch this software** page, in the **Choose Action** list, select either of following options, and perform the steps for that option:

    * **Launch through EC2**:
    
        1. Click **Launch**.
        1. Follow the instructions on the [How do I launch an EC2 instance from a custom Amazon Machine Image (AMI)?](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/) AWS documentation page.

    * **Launch from Website**:
    
        1. Select required settings: EC2 Instance Type, VPC Settings, Subnet Settings, Security Group Settings, and Key Pair Settings.
        1. Click **Launch**.
        1. On the **Launch this software** page, note your Instance ID. You can use it later to search for your instance in the EC2 Console.

## Accessing ClearML Server

Once deployed, **ClearML Server** exposes the following services:

* Web server on `TCP port 8080`
* API server on `TCP port 8008`
* File Server on `TCP port 8081`

**To locate **ClearML Server** address:**

1. Go to AWS EC2 Console.
1. In the **Details** tab, **Public DNS (IPv4)** shows the **ClearML Server** address.

**To access **ClearML Server** Web-App (UI):**

* Direct browser to its web server URL: `http://<Server Address>:8080`

**To SSH into ClearML Server:**

* Log into the AWS AMI using the default username `ec2-user`. Control the SSH credentials from the AWS management console.

### Logging in to the Web-App (UI)

**To log in to the **ClearML** Web-App (UI):**

* If **ClearML Server** was launched from an AWS Community AMI, enter any name.
* If **ClearML Server** was launched through the AWS Marketplace, enter the preconfigured default login credentials, which 
  are:

    * **clearml-user** (the default username).
    * The **ClearML Server** EC2 instance ID (the default password).

If needed, modify the default login behavior to match workflow policy, see [Configuring Web Login Authentication](clearml_server_config.md#web-login-authentication) 
on the "Configuring Your Own ClearML Server" page.

## Storage configuration

The pre-built **ClearML Server** storage configuration is the following:

* MongoDB: `/opt/clearml/data/mongo/`
* Elasticsearch: `/opt/clearml/data/elastic_7/`
* File Server: `/mnt/fileserver/`


## Backing up and restoring data and configuration

:::note
If data is being moved between a **Trains Server** and a **ClearML Server** installation, make sure to use the correct paths 
for backup and restore (/opt/trains and /opt/clearml respectively).
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
        

## ClearML Server AWS community AMIs

The following sections contain lists of AMI Image IDs, per region, for each released **ClearML Server** version.



### Latest version

#### v1.0.0

* **eu-north-1** : ami-0d6b1781328f44b21 
* **ap-south-1** : ami-03d18434eb00ba0d4 
* **eu-west-3** : ami-0ca027ed4205e7d67 
* **eu-west-2** : ami-04304fe1639f8324f 
* **eu-west-1** : ami-06260010b2e24b438 
* **ap-northeast-3** : ami-0d16f3c2176cf8639 
* **ap-northeast-2** : ami-0a3a2e08cec3e2709 
* **ap-northeast-1** : ami-04c2c71b7bcecf6af 
* **sa-east-1** : ami-00c86a9d8b5b87239 
* **ca-central-1** : ami-0889a860b58dd8d88 
* **ap-southeast-1** : ami-0a9ac9925ab98a270 
* **ap-southeast-2** : ami-01735e0de7b1a13f2 
* **eu-central-1** : ami-0b93523a0f9ec5e2b 
* **us-east-2** : ami-0fa34e08b01eadb96 
* **us-west-1** : ami-0a8cb65f6856dd561 
* **us-west-2** : ami-0eb1b443c591054fe 
* **us-east-1** : ami-07ed6a6bbb63799cc 

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).