---
title: Version 1.8
---

### ClearML Server 1.9.0

**New Features and Improvements**
* New ClearML Reports UI: Create and share rich MarkDown documents supporting embeddable online content [ClearML GitHub issue #839](https://github.com/allegroai/clearml/issues/839)
* Add user option to not show example content in the UI [ClearML GitHub issue #774](https://github.com/allegroai/clearml/issues/774)
* Add tag filter to UI Pipeline, Dataset, and Hyper-Dataset pages
* Extend UI experiment comparison up to 100 experiments
* Allow project default output destination S3 URLs to include dots (`.`) and hyphens (`-`)

**Bug Fixes**
* Fix long experiment names break UI experiment comparison scalar plot display [ClearML GitHub issue #166](https://github.com/allegroai/clearml-server/issues/166)
* Fix plot legend definitions set by SDK don't override UI default settings
* Fix comparing experiments with read-only components causes error 
* Fix UI model link doesn't preserve double spaces, breaking the URI
* Fix tasks/models/datasets can't be moved to UI root project
* Fix UI tag color list doesn't display tags 
* Fix UI dashboard search returns results from team’s work when "My Work" filter is enabled
* Fix UI experiment console does not display complete text when large text is reported
