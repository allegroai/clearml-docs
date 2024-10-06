---
title: Version 1.1
---

### ClearML Serving 1.1.0 

:::warning Backwards Compatibility
This release is not backwards compatible - see notes below on upgrading
:::

**Breaking Changes**
* Triton engine size supports variable request size (-1)

**Features and Bug Fixes**

* Add version number of serving session task
* Triton engine support for variable request (matrix) sizes
* Triton support, fix `--aux-config` to support more configurations elements
* Hugging Face Transformer support
* `Preprocess` class as module 