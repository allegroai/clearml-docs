---
title: Configuring ClearML Server
---

:::important
This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.
:::

This page describes the ClearML Server [deployment](#clearml-server-deployment-configuration) and [feature](#clearml-server-feature-configurations) configurations. Namely, it contains instructions on how to configure ClearML Server for:

* [Sub-domains and load balancers](#sub-domains-and-load-balancers) - An AWS load balancing example
* [Opening Elasticsearch, MongoDB, and Redis for External Access](#opening-elasticsearch-mongodb-and-redis-for-external-access)
* [Web login authentication](#web-login-authentication) - Create and manage users and passwords
* [Using hashed passwords](#using-hashed-passwords) - Option to use hashed passwords instead of plain-text passwords
* [Non-responsive Task watchdog](#non-responsive-task-watchdog) - For inactive experiments
* [Custom UI context menu actions](#custom-ui-context-menu-actions)

For all configuration options, see the [ClearML Configuration Reference](../configs/clearml_conf.md) page.

:::important 
Using the latest version of ClearML Server is recommended.
:::

## ClearML Server Deployment Configuration

ClearML Server supports two deployment configurations: single IP (domain) and sub-domains.
    
### Single IP (Domain) Configuration

Single IP (domain) with the following open ports:

* Web application on port `8080`
* API service on port `8008`
* File storage service on port `8081`

### Sub-domain Configuration
    
Sub-domain configuration with default http/s ports (`80` or `443`):

* Web application on sub-domain: `app.*.*`
* API service on sub-domain: `api.*.*`
* File storage service on sub-domain: `files.*.*`

When [configuring sub-domains](#sub-domains-and-load-balancers) for ClearML Server, they will map to the ClearML Server's 
internally configured ports for the Dockers. As a result, ClearML Server Dockers remain accessible if, for example, 
some type of port forwarding is implemented.   

:::important 
``app``, ``api``, and ``files`` as the sub-domain labels must be used.
:::

For example, a domain is called `mydomain.com`, and a sub-domain named `clearml.mydomain.com` is created, use the following:

* `app.clearml.mydomain.com` (web server)
* `api.clearml.mydomain.com` (API server)
* `files.clearml.mydomain.com` (file server)

Accessing the **ClearML Web UI** with `app.clearml.mydomain.com` will automatically send API requests to `api.clearml.mydomain.com`.

## ClearML Server Feature Configurations

ClearML Server features can be configured using either configuration files or environment variables.

### Configuration Files

The ClearML Server uses the following configuration files:

* `apiserver.conf`
* `hosts.conf`
* `logging.conf`
* `secure.conf`
* `services.conf`

When starting up, the ClearML Server will look for these configuration files, in the `/opt/clearml/config` directory
(this path can be modified using the `CLEARML_CONFIG_DIR` environment variable). 
The default configuration files are in the [clearml-server](https://github.com/allegroai/clearml-server/tree/master/apiserver/config/default) repository.

:::note
 Within the default structure, the `services.conf` file is represented by a subdirectory with service-specific `.conf` files.
If `services.conf` is used to configure the server, any setting related to a file under the `services` subdirectory can
simply be represented by a key within the `services.conf` file.
For example, to override `multi_task_histogram_limit` that appears in the `default/services/tasks.conf`, the `services.conf` file should contain:

```
tasks {
   "multi_task_histogram_limit": <new-value>
}
```
:::


### Environment Variables

The ClearML Server supports several fixed environment variables that affect its behavior,
as well as dynamic environment variable that can be used to override any configuration file setting.

#### Fixed Environment Variables

General

* `CLEARML_CONFIG_DIR` allows overriding the default directory where the server looks for configuration files. Multiple directories can be specified (in the same format used for specifying the system's `PATH` env var)

Database service overrides:  

* `CLEARML_MONGODB_SERVICE_HOST` allows overriding the hostname for the MongoDB service
* `CLEARML_MONGODB_SERVICE_PORT` allows overriding the port for the MongoDB service
* `CLEARML_ELASTIC_SERVICE_HOST` allows overriding the hostname for the ElasticSearch service
* `CLEARML_ELASTIC_SERVICE_PORT` allows overriding the port for the ElasticSearch service
* `CLEARML_REDIS_SERVICE_HOST` allows overriding the hostname for the Redis service
* `CLEARML_REDIS_SERVICE_PORT` allows overriding the port for the Redis service


#### Dynamic Environment Variables

Dynamic environment variables can be used to override any configuration setting that appears in the configuration files.

The environment variable's name should be `CLEARML__<configuration-path>`, where `<configuration-path>` represents the full path 
to the configuration field being set, including the configuration file name. Elements of the configuration path 
should be separated by `__` (double underscore). 

For example, given the default `secure.conf` file contents:
```
    ...
    
    credentials {
        apiserver {
            role: "system"
            user_key: "defualt-key"
            user_secret: "default-secret"
        }
        
        ...
        
    }
```

the default secret for the system's apiserver component can be overridden by setting the following environment variable: 
`CLEARML__SECURE__CREDENTIALS__APISERVER__USER_SECRET="my-new-secret"`

:::note
* Since configuration fields may contain JSON-parsable values, make sure to always quote strings (otherwise the server 
  might fail to parse them)
* In order to comply with environment variables standards, it is also recommended to use only upper-case characters in 
  environment variable keys. For this reason, ClearML Server will always convert the configuration path specified in the 
  dynamic environment variable's key to lower-case before overriding configuration values with the environment variable value.
:::

## Configuration Procedures



### Sub-domains and Load Balancers

The following example, which is based on AWS load balancing, demonstrates the configuration: 

1. In the ClearML Server `/opt/clearml/config/apiserver.conf` file, add the following `auth.cookies` section:

        auth {
          cookies {
            httponly: true
            secure: true
            domain: ".clearml.mydomain.com"
            max_age: 99999999999
          }
        }

1. Use the following load balancer configuration:

    * Listeners:
    
        * Optional: HTTP listener, that redirects all traffic to HTTPS.
        * HTTPS listener for `app.` forwarded to `AppTargetGroup`
        * HTTPS listener for `api.` forwarded to `ApiTargetGroup`
        * HTTPS listener for `files.` forwarded to `FilesTargetGroup`

    * Target groups:
    
        * `AppTargetGroup`: HTTP based target group, port `8080`
        * `ApiTargetGroup`: HTTP based target group, port `8008`
        * `FilesTargetGroup`: HTTP based target group, port `8081`

    * Security and routing:
    
        * Load balancer: make sure the load balancers are able to receive traffic from the relevant IP addresses (Security 
          groups and Subnets definitions).
        * Instances: make sure the load balancers are able to access the instances, using the relevant ports (Security 
          groups definitions).

1. Restart ClearML Server.



### Opening Elasticsearch, MongoDB, and Redis for External Access 

For improved security, the ports for ClearML Server Elasticsearch, MongoDB, and Redis servers are not exposed by default; 
they are only open internally in the docker network. If external access is needed, open these ports (but make sure to 
understand the security risks involved with doing so).

:::warning 
Opening the ports for Elasticsearch, MongoDB, and Redis for external access may pose a security concern and is not recommended 
unless you know what you're doing. Network security measures, such as firewall configuration, should be considered when 
opening ports for external access.
:::

To open external access to the Elasticsearch, MongoDB, and Redis ports:
    
1. Shutdown ClearML Server. Execute the following command (which assumes the configuration file is in the environment path). 

        docker-compose down

1. Edit the `docker-compose.yml` file as follows:

    * In the `elasticsearch` section, add the two lines:

            ports:
            - "9200:9200"

    * In the `mongo` section, add the two lines:
    
            ports:
            - "27017:27017"

    * In the `redis` section, add the two lines:
    
            ports:
            - "6379:6379"

1. Startup ClearML Server.

        docker-compose -f docker-compose.yml pull
        docker-compose -f docker-compose.yml up -d



### Web Login Authentication

Web login authentication can be configured in the ClearML Server in order to permit only users provided 
with credentials to access the ClearML system. Those credentials are a username and password. 

Without web login authentication, ClearML Server does not restrict access (by default).

**To add web login authentication to the ClearML Server:**

1. In ClearML Server `/opt/clearml/config/apiserver.conf`, add the `auth.fixed_users` section and specify the users.

    For example:

        auth {
            # Fixed users login credentials
            # No other user will be able to login
            fixed_users {
                enabled: true
                pass_hashed: false
                users: [
                    {
                        username: "jane"
                        password: "12345678"
                        name: "Jane Doe"
                    },
                    {
                        username: "john"
                        password: "12345678"
                        name: "John Doe"
                    },
                ]
            }
        }

1. Restart ClearML Server.

### Using Hashed Passwords
You can also use hashed passwords instead of plain-text passwords. To do that:
 - Set `pass_hashed: true`
 - Use a base64-encoded hashed password in the `password` field instead of a plain-text password. Assuming Jane's plain-text password is `123456`, use the following bash command to generate the base64-encoded hashed password: 
   ```bash
   > python3 -c 'import bcrypt,base64; print(base64.b64encode(bcrypt.hashpw("123456".encode(), bcrypt.gensalt())))'
   b'JDJiJDEyJDk3OHBFcHFlNEsxTkFoZDlPcGZsbC5sU1pmM3huZ1RpeHc0ay5WUjlzTzN5WE1WRXJrUmhp'
   ```
 - Use the command's output as the user's password. Resulting `apiserver.conf` file should look as follows:

        auth {
            # Fixed users login credentials
            # No other user will be able to login
            fixed_users {
                enabled: true
                pass_hashed: true
                users: [
                    {
                        username: "jane"
                        password: "JDJiJDEyJDk3OHBFcHFlNEsxTkFoZDlPcGZsbC5sU1pmM3huZ1RpeHc0ay5WUjlzTzN5WE1WRXJrUmhp"
                        name: "Jane Doe"
                    }
                ]
            }
        }

### Non-responsive Task Watchdog

The non-responsive experiment watchdog monitors experiments that were not updated for a specified time interval, and then 
the watchdog marks them as `aborted`. The non-responsive experiment watchdog is always active.

Modify the following settings for the watchdog:

* Watchdog status - enabled / disabled
* The time threshold (in seconds) of experiment inactivity (default value is 7200 seconds (2 hours)).
* The time interval (in seconds) between watchdog cycles.
 
**To configure the non-responsive watchdog for the ClearML Server:**

1. In the ClearML Server `/opt/clearml/config/services.conf` file, add or edit the `tasks.non_responsive_tasks_watchdog` 
   and specify the watchdog settings.

    For example:

        tasks {
            non_responsive_tasks_watchdog {
                enabled: true

                # In-progress tasks that haven't been updated for at least 'value' seconds will be stopped by the watchdog
                threshold_sec: 7200
        
                # Watchdog will sleep for this number of seconds after each cycle
                watch_interval_sec: 900
            }
        }
        
1. Restart ClearML Server.

### Custom UI Context Menu Actions

:::note Enterprise Feature
This feature is available under the ClearML Enterprise plan
:::

Create custom UI context menu actions to be performed on ClearML objects (projects, tasks, models, dataviews, or queues) 
by defining an HTTP request to issue when clicking on the action from an object’s context menu.

To create a custom action, add the action definitions to the ClearML Server `/opt/clearml/config/services.conf` 
file, using the following format:

```conf
organization.ui_actions: {
  # key is the object type: project / task / model / dataview / queue
  project: [ 
    {
        # name of action which will appear in the context menu
        name: "Action Item Name"
        tooltip: "Custom action 1"
        # action specifies the HTTP request performed by the browser when clicking the action
        action {  
           # request method, options are GET / POST / DELETE
           method: GET  
           # request URL, may contain ${id} which will be replaced by the object's ID
           url: "http://example.com/${id}"
           # Request payload (any string)  
           payload: "{'foo': 'bar'}"
           # Request headers, custom key/value header values  
           headers {  
              # example: specify to the request target that the payload is in JSON format  
              "Content-Type": "application/json"  
           }
        }
     }
  ]
}
```

The action will appear in the context menu for the object type in which it was specified:
* Task, model, dataview - Right-click an object in the [experiments](../webapp/webapp_exp_table.md), [models](../webapp/webapp_model_table.md), 
  and [dataviews](../hyperdatasets/webapp/webapp_dataviews.md) tables respectively. Alternatively, click the object to 
  open its info tab, then click the menu button <img src="/docs/latest/icons/ico-bars-menu.svg" className="icon size-md space-sm" /> 
  to access the context menu. 
* Project - In the project page > click the menu button <img src="/docs/latest/icons/ico-bars-menu.svg" className="icon size-md space-sm" /> 
  on a specific project card to access its context menu
* Queue - In the [Workers and Queues](../webapp/webapp_workers_queues.md) page > **QUEUES** tab, right-click the queue 
  to access its context menu

The custom action is always performed from a context-menu opened from a specific selected item.

When clicking the custom action, the UI sends the target endpoint (`url`) the appropriate request, injecting the template 
with the object's ID.

The UI will display a toast message conveying action success or failure.