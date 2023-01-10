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
class method, and specify the destination location as the `remote_url` argument:

```python
from clearml import StorageManager

StorageManager.get_local_copy(remote_url="s3://MyBucket/MyFolder/file.zip")
```

:::note
Zip and tar.gz files will be automatically extracted to cache. This can be controlled with the`extract_archive` flag.
:::

To download a file to a specific context in cache, specify the name of the context as the `cache_context` argument:

```python
StorageManager.get_local_copy(remote_url="s3://MyBucket/MyFolder/file.ext", cache_context="test")
```

To download a non-compressed file, set the `extract_archive` argument to `False`. 

```python
StorageManager.get_local_copy(remote_url="s3://MyBucket/MyFolder/file.ext", extract_archive=False)
```

By default, the `StorageManager` reports its download progress to the console every 5MB. You can change this using the 
[`StorageManager.set_report_download_chunk_size`](../../references/sdk/storage.md#storagemanagerset_report_download_chunk_size) 
class method, and specifying the chunk size in MB (not supported for Azure and GCP storage).

### Uploading a File

To upload a file to storage, call the [StorageManager.upload_file](../../references/sdk/storage.md#storagemanagerupload_file) 
class method. Specify the full path of the local file as the `local_file` argument, and the remote URL as the `remote_url` 
argument.

```python
StorageManager.upload_file(
    local_file="/mnt/data/also_file.ext", remote_url="s3://MyBucket/MyFolder"
)
```

Use the `retries parameter` to set the number of times file upload should be retried in case of failure.

By default, the `StorageManager` reports its upload progress to the console every 5MB. You can change this using the 
[`StorageManager.set_report_upload_chunk_size`](../../references/sdk/storage.md#storagemanagerset_report_upload_chunk_size) 
class method, and specifying the chunk size in MB (not supported for Azure and GCP storage).


### Setting Cache Limits

To set a limit on the number of files cached, call the [StorageManager.set_cache_file_limit](../../references/sdk/storage.md#storagemanagerset_cache_file_limit) 
class method and specify the `cache_file_limit` argument as the maximum number of files. This does not limit the cache size, 
only the number of files.

```python
new_cache_limit = StorageManager.set_cache_file_limit(cache_file_limit=100)
```