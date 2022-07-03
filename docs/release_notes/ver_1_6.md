---
title: Version 1.6
---

### ClearML SDK 1.6.1

**Bug Fixes**
* Fix Task.get_tasks() fails when sending search_hidden=False
* Fix LightGBM example shows UserWarning

### ClearML SDK 1.6.0

**New Features and Improvements**
* New Hyperparameter Optimization CLI `clearml-param-search`
* Improvements to ClearML Data
  * Add support for a new ClearML Data UI in the ClearML WebApp
  * Add `clearml-data` new options set-description and rename
* Add random seed control using `Task.set_random_seed()` allowing to set a new random seed for task initialization or 
  to disable it
* Improve error messages when failing to download an artifact
* Improve error messages when testing for permissions

**Bug Fixes**
* Fix axis range settings when logging plots
* Fix `Task.get_project()` to return more than 500 entries [ClearML GitHub issue #612](https://github.com/allegroai/clearml/issues/612)
* Fix pipeline progress calculation
* Fix `StorageManager.upload_folder()` returns `None` for both successful and unsuccessful uploads
* Fix script path capturing stores a relative path and not an absolute path
* Fix HTML debug samples are saved incorrectly on S3
* Fix Hydra deprecation warning in examples
* Fix missing requirement for TensorBoardX example

**Known Issues**
* When removing an image from a Dataset, its preview image won't be removed
* Moving Datasets between projects still shows the Dataset in the old project
