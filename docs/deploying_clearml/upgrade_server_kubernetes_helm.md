---
title: Kubernetes Helm
---

:::important
**This documentation page is being updated.** Please see the new and improved **[ClearML Helm Charts repository](https://github.com/allegroai/clearml-helm-charts)**
for the most updated instructions.
::: 

:::note
* This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.

* We strongly encourage to keep the **ClearML Server** up to date, by upgrading to the current release.
:::

1. Upgrade using new or upgraded values.yaml

        helm upgrade clearml-server allegroai/clearml-server-chart -f new-values.yaml
        
1. If **ClearML Server** was previously deployed, first delete old deployments using the following command:

        helm delete --purge clearml-server
        
1. If upgrading from ClearML Server version older than 1.2, you need to upgrade MongoDB and migrate your data before upgrading your server. See instructions [here](upgrade_mongo_db.md). 
If upgrading from Trains Server version 0.15 or older, a data migration is required before continuing this upgrade. See instructions [here](clearml_server_es7_migration.md).

1. Upgrade deployment to match repository version.
    
        helm upgrade clearml-server allegroai/clearml-server-chart
