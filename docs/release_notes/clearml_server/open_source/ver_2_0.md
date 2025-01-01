---
title: Version 2.0
---

### ClearML Server 2.0.0

**New Features**
* New look and feel: Full light/dark themes ([ClearML GitHub issue #1297](https://github.com/allegroai/clearml/issues/1297))
* New UI task creation options
  * Support bash as well as Python scripts
  * Support file upload
* New UI setting for configuring cloud storage credentials with which ClearML can clean up cloud storage artifacts on task deletion.
* Add UI scalar plots presentation of plots in sections grouped by metrics.
* Add UI batch export plot embed codes for all metric plots in a single click.
* Add UI pipeline presentation of steps grouped into stages
* Upgrade MongoDB major version to 6.x

**Bug Fixes**
* Fix UI Model Endpoint's Number of Requests plot sometimes displays incorrect data
* Fix UI datasets page does not filter according to project when dataset is running
* Fix UI task scalar legend does not change colors when smoothing is enabled
* Fix queue list in UI Workers and Queues page does not alphabetically sort by queue display name
* Fix queue display name is not searchable in UI Task Creation modal's queue field