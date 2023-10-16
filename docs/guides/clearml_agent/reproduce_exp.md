---
title: Recreating Experiment Environments 
---

<div class="vid" >
<iframe style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '100%', height: '100%'}} 
        src="https://www.youtube.com/embed/WTVrchczD34?si=2mZoMi4QdGl4MnUe" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
</iframe>
</div>

<br/>

When you run your code with ClearML, ClearML logs everything needed to reproduce your experiment and its environment: 
uncommitted changes, used packages, and more.

You can also easily reproduce your experiment's execution environment using ClearML.  
Sometimes, you may need to recreate your experiment environment in your machine, but you haven't committed your code.
If you have ClearML integrated into your code, and have run your experiment a few times, you can reproduce any of your 
experiment run's executions environments anywhere.

This is what you have to do:
1. Go to the [WebApp](../../webapp/webapp_overview.md), to the experiment page of the task you want to reproduce locally 
   :::tip
   Use the UI's [filtering and sorting](../../webapp/webapp_exp_table.md#filtering-columns) to find the best performing experiments  
   ::: 
1. Copy the desired experiment's ID
1. Use the ClearML Agent's [`build`](../../clearml_agent/clearml_agent_ref.md#build) command to rebuild the experiment. 
   Input the experiment's ID and the target local folder, where the experiment will be stored

   ```commandline
   clearml-agent build --id <task_id> --target <target_folder>
   ```
   After running this command, the target folder will contain that task's original code with uncommitted changes applied, 
   as well as a complete recreated virtual environment 
2. Activate the virtual environment using the activation script. Once done, you'll find all of your environment's packages 
   already installed in the environment 

And that's it! Your experiment's environment and your code has been reproduced! 