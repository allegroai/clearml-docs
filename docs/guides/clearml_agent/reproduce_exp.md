---
title: Reproducing Experiments 
---

reproducing execution environment - how everything looked before your executed 

recreate environment use to run an experiment 


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

When you run your code with ClearML, ClearML logs everything needed to reproduce your experiment remotely and locally 
using ClearML Agent.

Easily reproduce your experiment via the UI--no code necessary. All you have to do is launch a ClearML Agent in the 
machine that you want the experiment to be executed and assign it to a queue. Then, clone your experiment. If you want,
you can modify the experiment's configuration. Then enqueue the experiment copy in a queue, where the agent will pull
it and execute it.

Sometimes, you may need to reproduce your experiment in your machine, and access and modify your code. That is also 
possible with ClearML! Sometimes you may work a long time on your experiment code without committing, which may lead
to you losing some of your work, or not being sure which code and environemtn created the best results. If you you have 
ClearML integrated into your code, and you've run your code a few times,
you can reproduce any of your experiment executions which had ClearML running in the background, and rebuild it anywhere.

This is what you have to do:
1. Go to the WebApp, to the experiment page of the task you want to reproduce locally 
   :::tip
   Use the UI's filtering and sorting to find the best performing experiments  
   ::: 
1. Copy the desired experiment's ID
1. Use the Agent's `build` command to rebuild the task. Input the experiment's and the target local folder, where the experiment
   will be stored 

And that's it! In the target folder, you


you can get from the UI the experiment that you want to reproduce

rebuild the experiment in a local folder.

use agent build command and give task id, and folder to rebuild to.

all original code is there, uncommitted changes are applied and a complete venv is setup.

activate the venv as you usually do, using activation script. you'll find all of your packages already installed.   

