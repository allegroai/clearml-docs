---
title: Kubernetes
---

:::important
This documentation page applies to deploying your own open source ClearML Server. It does not apply to ClearML Hosted Service users.
:::

:::note
We strongly encourage to keep your **ClearML Server** up to date, by upgrading to the current release.
:::

To update deployment, edit the yaml file that needs to be updated and then run following command:

**To update the ClearML Server in Kubernetes clusters:**

1. If a **ClearML Server** was previously deployed, delete old deployments using the following command:

        kubectl delete -f .

1. If upgrading from **Trains Server** version 0.15 or older to **ClearML Server**, a data migration is required before 
   upgrading. First follow these [data migration instructions](clearml_server_es7_migration.md), and then continue this 
   upgrade.

1. Edit the YAML file that needs to be updated and then run following command:

        kubectl apply -f <file you edited>.yaml
