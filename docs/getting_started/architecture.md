---
title: ClearML Modules
---

- **ClearML Python Package** (clearml) for integrating **ClearML** into your existing code-base.
- **ClearML Server** (clearml-server) storing experiment, model, and workflow data, and supporting the Web UI experiment manager. It is also the control plane for the ML-Ops.
- **ClearML Agent** (clearml-agent) The ML-Ops orchestration agent. Enabling experiment and workflow reproducibility, and scalability.
- **ClearML Data** (clearml-data) data management and versioning on top of file-systems/object-storage.
- **ClearML Session** (clearml-session) Launch remote instances of Jupyter Notebooks and VSCode.
solutions combined with the clearml-server control plain.

![clearml architecture](../img/clearml_architecture.png)