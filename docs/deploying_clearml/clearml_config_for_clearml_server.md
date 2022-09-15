---
title: Configuring ClearML for Your ClearML Server
---

:::important
This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.
:::

The ClearML **configuration file** that will be initialized will contain the host URLs of the ClearML Server, and 
ClearML credentials, allowing the code to integrate with the server. Later, ClearML can be tailored to fit requirements
by setting [configuration options](../configs/clearml_conf.md).

**To configure ClearML for your ClearML Server:**
1. If not installed already, install `clearml` (see [install](../getting_started/ds/ds_first_steps.md))
1. In a terminal session, run the ClearML setup wizard. 
   ```
   clearml-init 
   ```

   <details className="cml-expansion-panel info">
   <summary className="cml-expansion-panel-summary">Learn about creating multiple ClearML configuration files</summary>
   <div className="cml-expansion-panel-content">

   Additional ClearML configuration files can be created, for example, to use inside Docker containers when executing 
   a Task.
   
   Use the `--file` option for `clearml-init`.

       clearml-init --file MyOtherClearML.conf

   and then specify it using the ``CLEARML_CONFIG_FILE`` environment variable inside the container:
        
        CLEARML_CONFIG_FILE = MyOtherClearML.conf

   For more information about running experiments inside Docker containers, see [ClearML Agent Execution](../clearml_agent.md#execution)
   and [ClearML Agent Reference](../clearml_agent/clearml_agent_ref.md).
    
   </div>
   </details>
   <br/>

   If the setup wizard's response indicates that a configuration file already exists, follow the instructions in 
   [here](#add-clearml-to-a-configuration-file). The wizard does not edit or overwrite existing configuration files.

   1. The setup wizard prompts for ClearML credentials.
    
    
            ClearML SDK setup process
            
           Please create new clearml credentials through the settings page in your `clearml-server` web app, 
           or create a free account at https://app.clear.ml/settings/webapp-configuration
            
           In the settings > workspace  page, press "Create new credentials", then press "Copy to clipboard".
           Paste copied configuration here: 

   1. Get ClearML credentials. Open the ClearML Web UI in a browser. On the **SETTINGS > WORKSPACE** page, click 
      **Create new credentials** **>** **Copy to clipboard**.
    
   1. At the command prompt `Paste copied configuration here:`, copy and paste the ClearML credentials.
        
        The setup wizard confirms the credentials. 

            Detected credentials key="********************" secret="*******"

   1. Enter the ClearML Server web server URL, or press **Enter** to accept the default which is detected from the 
      credentials.
    
            WEB Host configured to: [https://app.<your-domain>] 
    
   1. Enter the ClearML Server API server URL, or press **Enter** to accept the default value which is based on the previous response:
    
            API Host configured to: [https://api.<your-domain>] 
    
   1. Enter the ClearML Server file server URL, or press **Enter** to accept the default value which is based on the previous response:
    
            File Store Host configured to: [files.<your-domain>] 
    
       The wizard responds with a configuration and directs to the ClearML Server.
    
            CLEARML Hosts configuration:
            Web App: https://app.<your-domain>
            API: https://api.<your-domain>
            File Store: https://files.<your-domain>
            
            Verifying credentials ...
            Credentials verified!
    
            New configuration stored in /home/<username>/clearml.conf
            CLEARML setup completed successfully.
    
<br/>
The configuration file's location depends upon the operating system:

* Linux - `~/clearml.conf`
* Mac - `$HOME/clearml.conf`
* Windows - `\User\<username>\clearml.conf`

## Add ClearML to a Configuration File

The setup wizard may indicate that a configuration file already exists. For example, if a **ClearML Agent** was previously 
configured, then a configuration file was created. The wizard does not edit or overwrite existing configuration files. 
    
The host URLs for the ClearML Server are required:

* ClearML Server web server
* ClearML Server API server
* ClearML Server file server

These may be localhost, the domain, or a subdomain of the domain.
        
**To add ClearML settings to an existing ClearML configuration file:**
        
1. Open the ClearML configuration file for editing. Depending upon the operating system, it is:

    * Linux - `~/clearml.conf`
    * macOS - `$HOME/clearml.conf`
    * Windows - `\User\<username>\clearml.conf`

1. In the `sdk.development` section, add the logging of environment variables option (see ``log_os_environments`` in an 
   [example configuration file](https://github.com/allegroai/clearml/blob/master/docs/clearml.conf#L178)).
   
    ```editorconfig
        # Log specific environment variables. OS environments are enlisted in the "Environment" section
        # of the Hyper-Parameters.
        # multiple selected variables are supported including the suffix '*'.
        # For example: "AWS_*" will log any OS environment variable starting with 'AWS_'.
        # This value can be overwritten with os environment variable CLEARML_LOG_ENVIRONMENT="[AWS_*, CUDA_VERSION]"
        # Example: log_os_environments: ["AWS_*", "CUDA_VERSION"]
        log_os_environments: []
    ```

1. Save the ClearML configuration file. ClearML is now configured for the ClearML Server.