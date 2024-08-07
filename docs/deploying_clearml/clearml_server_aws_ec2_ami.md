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

#### v1.16.2

* **af-south-1** : ami-031b61cbc29cc8c98
* **ap-east-1** : ami-0fb7ddb4213ea4968
* **ap-northeast-1** : ami-075c470f756116187
* **ap-northeast-2** : ami-067d1e186f52481f9
* **ap-northeast-3** : ami-006fac274cfbd1707
* **ap-south-1** : ami-04978ac89040e7ee0
* **ap-south-2** : ami-01f718738ee813a00
* **ap-southeast-1** : ami-063afbd67c22f1a1b
* **ap-southeast-2** : ami-032e51599be1e55ac
* **ap-southeast-3** : ami-02a1444ba952ee8e7
* **ap-southeast-4** : ami-0d62343e2a9a92a27
* **ca-central-1** : ami-0449cef121a69902e
* **ca-west-1** : ami-0527047502d78548f
* **eu-central-1** : ami-060af776c4fec447d
* **eu-central-2** : ami-091e905b2f54bf703
* **eu-north-1** : ami-07e2b4ce8e278eee3
* **eu-south-1** : ami-0a0416aa6ed48782c
* **eu-south-2** : ami-07d8281efca84435b
* **eu-west-1** : ami-085eb8e36190aa3ea
* **eu-west-2** : ami-06bd84407cb0a75fa
* **eu-west-3** : ami-0d8116b54107fd6fe
* **il-central-1** : ami-0747e37229b5bf5b1
* **me-central-1** : ami-08dbc277c38fdff43
* **me-south-1** : ami-0539bcc99ff7a92fc
* **sa-east-1** : ami-0595e37e8217b2713
* **us-east-1** : ami-0249f03d190062970
* **us-east-2** : ami-0e2f7227609a927dc
* **us-west-1** : ami-00a5524429d7e3355
* **us-west-2** : ami-08cc56371f396bb74

## Next Step

To keep track of your experiments and/or data, the `clearml` package needs to communicate with your server. 
For instruction to connect the ClearML SDK to the server, see [Getting Started: First Steps](../getting_started/ds/ds_first_steps.md).
