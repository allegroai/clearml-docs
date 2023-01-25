---
title: AWS Autoscaler
---

:::info Pro Plan Offering
The ClearML AWS Autoscaler App is available under the ClearML Pro plan
:::

The AWS Autoscaler Application optimizes AWS EC2 instance usage according to a user defined resource budget: define your 
budget by specifying the type and amount of available compute resources.

Each resource type is associated with a ClearML [queue](../../fundamentals/agents_and_queues.md#what-is-a-queue) whose status determines the need for instances of that resource 
type (i.e. spin up new instances if there are pending jobs on the queue).

When running, the autoscaler periodically polls your AWS cluster. The autoscaler automatically terminates idle instances 
based on a specified maximum idle time, or spins up new instances when there aren't enough to execute pending tasks in a 
queue (until reaching the defined maximum number of instances). You can add an init script, which will be executed when 
each instance is spun up. 

## Autoscaler Instance Configuration
* **Import Configuration** - Import an app instance configuration file. This will fill the configuration wizard with the 
  values from the file, which can be modified before launching the app instance
* **AWS Credentials** - Credentials with which the autoscaler can access your AWS account. See [Generating AWS IAM Credentials](#generating-aws-iam-credentials)
    * Use IAM role - Select if you are running your autoscalers on your own EC2 instances which are attached to an [IAM 
      role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html). In such a case, no AWS IAM credentials are required
    * AWS Region - [AWS Region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions) 
      where the EC2 instances will be spun up
    * AWS Access Key ID and AWS Secret Access Key - The credentials with which the autoscaler will access your AWS 
      account for spinning EC2 instances up/down
* **Git Configuration** - Git credentials with which the ClearML Agents running on your EC2 instances will access your 
  repositories to retrieve the code for their jobs
    * Git User 
    * Git Password / Personal Access Token
* **Max Idle Time** (Optional) - Maximum time in minutes that an EC2 instance can be idle before the autoscaler spins it 
  down 
* **Workers Prefix** (Optional) - A Prefix added to workers’ names, associating them with this autoscaler
* **Polling Interval** (Optional) - Time period in minutes at which the designated queue is polled for new tasks
* **Base Docker Image** (Optional) - Default Docker image in which the ClearML Agent will run. Provide a Docker stored 
  in a Docker artifactory so instances can automatically fetch it
* **Compute Resources**
    * Resource Name - Assign a name to the resource type. This name will appear in the Autoscaler dashboard
    * EC2 Instance Type - See [Instance Types](https://aws.amazon.com/ec2/instance-types) for full list of types
    * Use Spot Instance - Check box to use a spot instance. Else, a reserved instance is used
    * Availability Zone - The [EC2 availability zone](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.AvailabilityZones) 
      to launch this resource in
    * AMI ID - The AWS AMI to launch
    * Max Number of Instances - Maximum number of concurrent running instances of this type allowed
    * Monitored Queue - Queue associated with this instance type. The tasks enqueued to this queue will be executed on 
      instances of this type
    * EC2 Tags (Optional) - AWS instance tags to attach to launched EC2 instances. Insert key=value pairs, separated by 
      commas 
    * EBS Device (Optional) - Disk mount point
    * EBS Volume Size (Optional) - Disk size  (GB)
    * EBS Volume Type (Optional) - See [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html) 
      for full list of types
    * Instance Key Pair (Optional) - AWS key pair that is provided to the spun EC2 instances for connecting to them via 
      SSH. Provide the Key Pair's name, as was created in AWS. See [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) 
      for more details
    * Security Group ID (Optional) - Comma separated list of AWS VPC Security Group IDs to attach to the launched 
      instance. Read more [here](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) 
    * \+ Add Item - Define another resource type
* **IAM Instance Profile** (Optional) - Set an IAM instance profile for all instances spun by the Autoscaler 
    * Arn - Amazon Resource Name specifying the instance profile
    * Name - Name identifying the instance profile
* **Autoscaler Instance Name** (Optional) - Name for the Autoscaler instance. This will appear in the instance list
* **Init script** (Optional) - A bash script to execute after launching the EC2 instance 
* **Additional ClearML Configuration** (Optional) - A ClearML configuration file to use by the ClearML Agent when 
  executing your experiments
* **Export Configuration** - Export the app instance configuration as a JSON file, which you can later import to create 
  a new instance with the same configuration 

![Autoscaler wizard](../../img/app_aws_autoscaler_wizard.png)

:::note Enterprise Feature
You can utilize the [configuration vault](../../webapp/webapp_profile.md#configuration-vault) to globally add your AWS 
credentials in the following format: 

```
auto_scaler.v1 {
    aws {
        cloud_credentials_key: XXX
        cloud_credentials_secret: XXX
    }
```
:::

## Dashboard
Once an autoscaler is launched, the autoscaler's dashboard provides information about available EC2 instances and their 
status.

![Autoscaler dashboard](../../img/app_aws_autoscaler.png)

The autoscaler dashboard shows:
* Number of idle Instances
* Queues and the resource type associated with them
* Number of current running instances 
* Console: the application log containing everything printed to stdout and stderr appears in the console log. The log 
  shows polling results of the autoscaler’s associated queues, including the number of tasks enqueued, and updates EC2 
  instances being spun up/down.  

## Generating AWS IAM Credentials

The autoscaler app accesses your AWS account with the credentials you provide. 

You will need to create an AWS policy which grants the autoscaler app the required access privileges, attach the policy 
to an IAM user, and create credentials keys for that user to configure in the autoscaler app: 

1. In your AWS account, go to Services **Menu > IAM > Policies** 
    
   ![AWS Policies](../../img/apps_aws_permissions_1.png)

1. Under policies, click **Create Policy** 

   ![AWS create policy](../../img/apps_aws_permissions_2.png)

1. In the **Create Policy** modal, click on the JSON option

   ![AWS create policy JSON](../../img/apps_aws_permissions_3.png)

1. Insert the following policy into the text box: 

   ```json
   {                  
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "ec2:DescribeInstances",
                   "ec2:TerminateInstances",
                   "ec2:RequestSpotInstances",
                   "ec2:DeleteTags",
                   "ec2:CreateTags",
                   "ec2:RunInstances",
                   "ec2:DescribeSpotInstanceRequests",
                   "ec2:GetConsoleOutput"
               ],
               "Resource": "*"
           }
       ]
   }
   ```
   
   This is a basic policy which gives the autoscaler access to your account. See example policy with finer security 
configuration [here](#aws-iam-restricted-access-policy). 

1. Complete creating the policy
1. Attach the created policy to an IAM user/group whose credentials will be used in the autoscaler app (you can create a 
   new IAM user/group for this purpose)
1. Obtain a set of AWS IAM credentials for the user/group to which you have attached the created policy in the previous step  


### AWS IAM Restricted Access Policy

The template policy below demonstrates how to restrict the autoscaler to launch EC2.

The policy includes the following permissions:
* Enables performing certain EC2 actions on all resources in specified regions 
* Enables performing certain EC2 actions on specified resources (in selected subnet and security group, and any network-interface, volume, key-pair, instance) 
* Enables performing an EC2 action to use on a specified AMI on condition that the `ec2:Owner` is a specified owner

```json
{

    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "GeneralEC2",
            "Effect": "Allow",
            "Action": [
                "ec2:AttachClassicLinkVpc",
                "ec2:CancelSpotInstanceRequests",
                "ec2:CreateFleet",
                "ec2:Describe*",
                "ec2:GetConsoleOutput",
                "ec2:DetachClassicLinkVpc",
                "ec2:ModifyInstanceAttribute",
                "ec2:RequestSpotInstances"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "aws:RequestedRegion": "<region>"
                }
            }
        },
        {
            "Sid": "RunEC2",
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances",
                "ec2:CreateTags",
                "ec2:DeleteTags",
                "ec2:StartInstances",
                "ec2:StopInstances",
                "ec2:TerminateInstances",
                "ec2:DescribeVolumes",
                "ec2:DescribeAvailabilityZones",
                "ec2:CreateVolume",
                "ec2:AttachVolume",
                "ec2:DetachVolume"
            ],
            "Resource": [
                "arn:aws:ec2:<region>:<account id>:subnet/<subnet id>",
                "arn:aws:ec2:<region>:<account id>:network-interface/*",
                "arn:aws:ec2:<region>:<account id>:volume/*",
                "arn:aws:ec2:<region>:<account id>:key-pair/*",
                "arn:aws:ec2:<region>:<account id>:security-group/<security group id>",
                "arn:aws:ec2:<region>:<account id>:instance/*"
            ]
        },
        {
            "Sid": "RunEC2AMI",
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances"
            ],
            "Resource": [
                "arn:aws:ec2:<region>::image/<ami id>"
            ],
            "Condition": {
                "StringEquals": {
                    "ec2:Owner": "<owner>"
                }
            }
        }
    ]
}
```