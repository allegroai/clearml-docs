---
title: Archiving
---

Archive experiments and models to improve the organization of active work. Archived experiments and models do not appear
in the active (main) experiments and models tables. They only appear in the archive. Experiments can be restored from the
archive.

When archiving an experiment:

* If it is enqueued to execute (its status is *Pending*), the experiment is automatically dequeued (its status becomes
  *Draft*).
* If it is shared (**ClearML Hosted Service** only), the experiment becomes private.

**To archive experiments or models:**

* Archive an experiment or model from either the:

    * Experiments or models table - Right-click the experiment or model **>** **Archive**.
    * Info panel or full screen details view - Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Bars menu" className="icon size-sm space-sm" /> (menu) **>** **Archive**.

* Archive multiple experiments or models from the:

    * Experiments or models table - Multi-select or individually select the checkboxes of the experiments to archive **>** In the footer menu that appears, click **ARCHIVE**.

**To restore experiments or models:**

1. Go to the experiment table of the archived experiment's project, or to the **All Projects** experiments table.

1. Click **OPEN ARCHIVE** on the top left of the page.

1. Select the experiment(s) or model(s):

    * Restore an experiment or model from either the:

        * Experiments or models table - Right-click the experiment or model **>** **Restore**.
        * Info panel or full screen details view - Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Bars menu" className="icon size-sm space-sm" />
          (menu) **>** **Restore from Archive**.

    * Restore multiple experiments or models from the:

        * Experiments or models table - Multi-select or individually select the checkboxes of the experiments to restore **>** Click **Restore** in the footer menu that appears.
