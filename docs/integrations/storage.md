---
title: Storage
---

import ImageSwitcher from '/ImageSwitcher.js';

ClearML is able to interface with the most popular storage solutions in the market for storing model checkpoints, artifacts 
and charts.

Supported storage mediums include:

<ImageSwitcher alt="ClearML Supported Storage"
    lightImageSrc="/icons/ClearML_Supported_Storage--on-light.png"
    darkImageSrc="/icons/ClearML_Supported_Storage--on-dark.png" 
/>

:::note
Once uploading an object to a storage medium, each machine that uses the object must have access to it.
:::

## Configuring Storage

Configuration for storage is done by editing the [clearml.conf](../configs/clearml_conf.md).

### Configuring AWS S3

Modify these parts of the clearml.conf file and add the key, secret, and region of the s3 bucket.
It's possible to also give access to specific s3 buckets.
```
aws {
        s3 {
            # S3 credentials, used for read/write access by various SDK elements

            # default, used for any bucket not specified below
            key: ""
            secret: ""
            region: ""

            credentials: [
                # specifies key/secret credentials to use when handling s3 urls (read or write)
                # {
                #     bucket: "my-bucket-name"
                #     key: "my-access-key"
                #     secret: "my-secret-key"
                # },
                # {
            ]
        }
        boto3 {
            pool_connections: 512
            max_multipart_concurrency: 16
        }
    }
```

ClearML also supports [MinIO](https://github.com/minio/minio) by adding this configuration:
```
                #     host: "my-minio-host:9000"
                #     key: "12345678"
                #     secret: "12345678"
                #     multipart: false
                #     secure: false
                # }
``` 

### Configuring Azure
To configure Azure blob storage specify the account name and key.

```
    azure.storage {
        # containers: [
        #     {
        #         account_name: "clearml"
        #         account_key: "secret"
        #         # container_name:
        #     }
        # ]
    }
```

### Configuring Google Storage
To configure Google Storage, specify the project and the path to the credentials json file.
It's also possible to specify credentials for a specific bucket.

```
 google.storage {
        # # Default project and credentials file
        # # Will be used when no bucket configuration is found
        # project: "clearml"
        # credentials_json: "/path/to/credentials.json"

        # # Specific credentials per bucket and sub directory
        # credentials = [
        #     {
        #         bucket: "my-bucket"
        #         subdir: "path/in/bucket" # Not required
        #         project: "clearml"
        #         credentials_json: "/path/to/credentials.json"
        #     },
        # ]
    }
```

## Storage Manager

ClearML Offers a package to manage downloading, uploading and caching of content directly from code.

### Uploading files
To upload a file using storage manager, just run the following line specifying the path to a local file or folder, and the 
remote destination.
```python
from clearml import StorageManager

StorageManager.upload_file(local_file='path_to_file',remote_url='s3://my_bucket')
```


### Downloading files
To download files into cache, run the following line, specifying the remote destination's URL.
```python
StorageManager.get_local_copy(remote_url='s3://my_bucket/path_to_file')
``` 

:::note
Zip and tar.gz files will be automatically extracted to cache. This can be controlled with the`extract_archive` flag. 
:::

### Controling cache file limit
It's possible to control the maximum cache size by limiting the number of files it stores.
This is done by calling the ```StorageManager.set_cache_file_limit()``` method.

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
By default, all artifacts (Models \ Artifacts \ Datasets) are automatically downloaded to the cache before they're used.<br/>
Some storage mediums (NFS \ Local storage) allows for direct access, 
which means that the code would work with the object where it's originally stored and not downloaded to cache first.<br/>
To enable direct access, specify the urls to access directly.

