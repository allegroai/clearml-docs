---
title: Optuna
---


ClearML  automatically logs and tracks parameters created with Hydra. ClearML logs the Omegaconf which holds all the configuration files, as well as values overridden during runtime. 
The hydra_example.py demonstrates ClearML automatically logging configuration objects created using Hydra. The example code loads the `config.yaml` configuration file from the `config_files` folder, and ClearML logs all the parameters in 