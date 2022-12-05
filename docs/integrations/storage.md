---
title: Storage
---


ClearML is able to interface with the most popular storage solutions in the market for storing model checkpoints, artifacts
and charts.

Supported storage mediums include:

![image](../../static/icons/ClearML_Supported_Storage--on-light.png)

:::note
Once uploading an object to a storage medium, each machine that uses the object must have access to it.
:::

## Configuring Storage

Configuration for storage is done by editing the [clearml.conf](../configs/clearml_conf.md).

The ClearML configuration file uses [HOCON](https://github.com/lightbend/config/blob/main/HOCON.md) format, which supports runtime environment variable access.

### Configuring AWS S3

Modify these parts of the clearml.conf file and add the key, secret, and region of the s3 bucket.

It's possible to also give access to specific s3 buckets in the `aws.s3.credentials` section. The default configuration 
provided in the `aws.s3` section is applied to any bucket without a bucket-specific configuration. 

You can also enable using a credentials chain to let Boto3 
pick the right credentials. This includes picking credentials from environment variables, a credential file, and metadata service 
with an IAM role configured. See [Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials).

You can specify additional [ExtraArgs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html#the-extraargs-parameter) 
to pass to boto3 when uploading files. You can set this on a per-bucket basis. 

```
aws {
    s3 {
        # S3 credentials, used for read/write access by various SDK elements

        # default, used for any bucket not specified below
        key: ""
        secret: ""
        region: ""
        use_credentials_chain: false
        extra_args: {}
        
        credentials: [
            # specifies key/secret credentials to use when handling s3 urls (read or write)
            {
                bucket: "my-bucket-name"
                key: ""
                secret: ""
                verify: "/path/to/ca/bundle.crt" OR false to not verify
                use_credentials_chain: false
            },
                
        ]
    }
    boto3 {
        pool_connections: 512
        max_multipart_concurrency: 16
    }
}
```

AWS's S3 access parameters can be specified by referencing the standard environment variables if already defined.

For example: 
```
aws {
        s3 {
            # default, used for any bucket not specified below
            key: ${AWS_ACCESS_KEY_ID}
            secret: ${AWS_SECRET_ACCESS_KEY}
            region: ${AWS_DEFAULT_REGION}
        }
}
``` 

ClearML also supports [MinIO](https://github.com/minio/minio) by adding this configuration:
```
aws {
        s3 {
            # default, used for any bucket not specified below
            key: ""
            secret: ""
            region: ""

            credentials: [
                {
                    # This will apply to all buckets in this host (unless key/value is specifically provided for a given bucket)
                    host: "my-minio-host:9000"
                    key: ""
                    secret: ""
                    multipart: false
                    secure: false
                }
            ]
        } 
}
```

:::info non-AWS Endpoints
To force usage of a non-AWS endpoint (like the MinIO example above), port declaration is *always* needed, even if standard.
To enable TLS, pass `secure: true`.
:::

### Configuring Azure
To configure Azure blob storage specify the account name and key.

```
azure.storage {
    containers: [
        {
            account_name: ""
            account_key: ""
            # container_name:
        }
    ]
}
```

Azure's storage access parameters can be specified by referencing the standard environment variables if already defined.

For example:
```
azure.storage {
    containers: [
        {
            account_name: ${AZURE_STORAGE_ACCOUNT}
            account_key: ${AZURE_STORAGE_KEY}
            # container_name:
        }
    ]
}
```

### Configuring Google Storage
To configure Google Storage, specify the project and the path to the credentials JSON file.

It's also possible to specify credentials for a specific bucket in the `google.storage.credentials` section. The default 
configuration provided in the `google.storage` section is applied to any bucket without a bucket-specific configuration.

```
google.storage {
    # Default project and credentials file
    # Will be used when no bucket configuration is found
    project: "clearml"
    credentials_json: "/path/to/credentials.json"

    # Specific credentials per bucket and sub directory
    credentials = [
         {
             bucket: ""
             subdir: "path/in/bucket" # Not required
             project: ""
             credentials_json: "/path/to/credentials.json"
         },
     ]
}
```

GCP's storage access parameters can be specified by referencing the standard environment variables if already defined.

```
google.storage {
    credentials = [
         {
             bucket: ""
             subdir: "path/in/bucket" # Not required
             project: ""
             credentials_json: ${GOOGLE_APPLICATION_CREDENTIALS}
         },
     ]
}
```

## Storage Manager

ClearML offers the [StorageManager](../references/sdk/storage.md) class to manage downloading, uploading, and caching of 
content directly from code.

See [Storage Examples](../guides/storage/examples_storagehelper.md).

### Path Substitution
The ClearML StorageManager supports local path substitution when fetching files.

This is especially useful when managing data using [`clearml-data`](../clearml_data/clearml_data_cli.md)! If different data consumers have the data physically stored in different locations, path 
substitution allows for registering the data into `clearml-data` once, and then storing and accessing it in multiple locations.

To enable path substitution, modify the clearml.conf file and configure:

```bash
sdk{
    storage{
        path_substitution = [
            # Replace registered links with local prefixes,
            # Solve mapping issues, and allow for external resource caching.
            # {
            #     registered_prefix = "s3://bucket/research"
            #     local_prefix = "file:///mnt/shared/bucket/research
            # },
            # {
            #     registered_prefix = "file:///mnt/shared/folder/"
            #     local_prefix = "file:///home/user/shared/folder"
            # }
        ]
    }
}
```

## Caching
ClearML also manages a cache of all downloaded content so nothing is duplicated, and code won't need to download the same
piece twice!

Configure cache location by modifying the [clearml.conf](../configs/clearml_conf.md) file:

```
storage {
    cache {
        # Defaults to system temp folder / cache
        default_base_dir: "~/.clearml/cache"
    }

    direct_access: [
        # Objects matching are considered to be available for direct access, i.e. they will not be downloaded
        # or cached, and any download request will return a direct reference.
        # Objects are specified in glob format, available for url and content_type.
        { url: "file://*" }  # file-urls are always directly referenced
    ]
}
```

### Direct Access
By default, all artifacts (Models / Artifacts / Datasets) are automatically downloaded to the cache before they're used.

Some storage mediums (NFS / Local storage) allows for direct access,
which means that the code would work with the object where it's originally stored and not downloaded to cache first.

To enable direct access, specify the urls to access directly.