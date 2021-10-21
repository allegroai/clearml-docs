---
title: Storage Examples
---

This page describes storage examples using the [StorageManager](../../references/sdk/storage.md) 
class. The storage examples include:

* [Downloading a file](#downloading-a-file) - Get an object from storage.
* [Uploading a file](#uploading-a-file) - Upload an object.
* [Setting cache limits](#setting-cache-limits) - Set the maximum number of objects.

:::note 
`StorageManager` supports http(s), S3, Google Cloud Storage, Azure, and file system folders.
:::

## StorageManager


### Downloading a File

To download a ZIP file from storage to the `global` cache context, call the [StorageManager.get_local_copy](../../references/sdk/storage.md#storagemanagerget_local_copy) 
method, and specify the destination location as the `remote_url` argument:

    # create a StorageManager instance
    manager = StorageManager()
    
    manager.get_local_copy(remote_url="s3://MyBucket/MyFolder/file.zip")

:::note
Zip and tar.gz files will be automatically extracted to cache. This can be controlled with the`extract_archive` flag.
:::

To download a file to a specific context in cache, specify the name of the context as the `cache_context` argument:

    manager.get_local_copy(remote_url="s3://MyBucket/MyFolder/file.ext", cache_context="test")

To download a non-compressed file, set the `extract_archive` argument to `False`. 

    manager.get_local_copy(remote_url="s3://MyBucket/MyFolder/file.ext", extract_archive=False)


### Uploading a File

To upload a file to storage, call the [StorageManager.upload_file](../../references/sdk/storage.md#storagemanagerupload_file) 
method. Specify the full path of the local file as the `local_file` argument, and the remote URL as the `remote_url` 
argument.

    manager.upload_file(local_file="/mnt/data/also_file.ext", remote_url="s3://MyBucket/MyFolder")


### Setting Cache Limits

To set a limit on the number of files cached, call the [StorageManager.set_cache_file_limit](../../references/sdk/storage.md#storagemanagerset_cache_file_limit) 
method and specify the `cache_file_limit` argument as the maximum number of files. This does not limit the cache size, 
only the number of files.

    new_cache_limit = manager.set_cache_file_limit(cache_file_limit=100)