---
title: Kubernetes
---

:::note
We strongly encourage to keep the ClearML Server up to date, by upgrading to the current release.
:::

1. Upgrade using new or upgraded values.yaml

        helm upgrade clearml-server allegroai/clearml-server-chart -f new-values.yaml
        
1. If ClearML Server was previously deployed, first delete old deployments using the following command:

        helm delete --purge clearml-server
        
1. If upgrading from Trains Server version 0.15 or older, a data migration is required before continuing this upgrade. 
   See instructions [here](clearml_server_es7_migration.md).

1. Upgrade deployment to match repository version.
    
        helm upgrade clearml-server allegroai/clearml-server-chart
