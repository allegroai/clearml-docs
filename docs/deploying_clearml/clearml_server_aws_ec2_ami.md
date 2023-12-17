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

#### v1.13.1

* **af-south-1** :  ami-00a1a5b796bfbf021
* **ap-east-1** :  ami-01ddf0fd74b78fe97
* **ap-northeast-1** :  ami-0549778e28913e9ac
* **ap-northeast-2** :  ami-0951177fba557ca59
* **ap-northeast-3** :  ami-003ef9f7444bca188
* **ap-south-1** :  ami-0312796234eccbe9e
* **ap-south-2** :  ami-0bcfb95c3168567ba
* **ap-southeast-1** :  ami-07c4c7acae29ac7e4
* **ap-southeast-2** :  ami-0ad676bf60b2da448
* **ap-southeast-3** :  ami-077b55ea766dbeac6
* **ap-southeast-4** :  ami-03e820d00fdf28414
* **ca-central-1** :  ami-045bc9338c5f4e13d
* **eu-central-1** :  ami-00b0cd2ee4b3492ef
* **eu-central-2** :  ami-05dd9662fabd77b6c
* **eu-north-1** :  ami-0b1992828bfb44e28
* **eu-south-1** :  ami-0a6acd0a31ec0aa70
* **eu-south-2** :  ami-05545aff570624c57
* **eu-west-1** :  ami-0ba1760979452a445
* **eu-west-2** :  ami-0d61da35ce1700ee1
* **eu-west-3** :  ami-073118ca6a3b9985f
* **il-central-1** :  ami-01f25beeb6f548e59
* **me-central-1** :  ami-0b0b622c0e68ab83d
* **me-south-1** :  ami-05b74e886579e82af
* **sa-east-1** :  ami-0df5d97688ff90281
* **us-east-1** :  ami-0836d6b97564b1eaf
* **us-east-2** :  ami-081ae4cf5f07d8987
* **us-west-1** :  ami-095bf47f922c9f302
* **us-west-2** :  ami-002d17b6b9716fad1

## Next Step

* [Configuring ClearML for ClearML Server](clearml_config_for_clearml_server.md).
