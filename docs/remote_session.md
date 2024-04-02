---
title: Overview
---

Machine Learning and Deep Learning development is sometimes more challenging than traditional software development. If 
you are working on an average laptop or computer, and you have a sizeable dataset that requires significant computation, 
your local machine may not be able to provide you with the resources for an effective workflow.

If you can run and debug your code on your own machine, congrats you are lucky! Continue doing that, then clone your code 
in the UI and send it for long-term training on a remote machine.

**If you are not that lucky**, this section is for you :)

ClearML provides tools that allow you to launch remote sessions and to execute code on a remote machine that better 
meets resource needs:
* [Clearml Session CLI](apps/clearml_session.md) - Launch a JupyterLab and VS Code session on a remote machine
* GUI Applications (available under ClearML Enterprise Plan) - These apps provide local links to access JupyterLab or 
  VS Code on a remote machine over a secure and encrypted SSH connection, letting you use the IDE as if you're running 
  on the target machine itself.
  * [JupyterLab](webapp/applications/apps_jupyter_lab.md) - Launch a JupyterLab session on a remote machine 
  * [VS Code](webapp/applications/apps_vscode.md) - Launch a VS Code session on a remote machine 

:::info Remote PyCharm
You can also work with PyCharm in a remote session over SSH. Use the [PyCharm Plugin](guides/ide/integration_pycharm.md) 
to automatically sync local configurations with a remote session.
:::
