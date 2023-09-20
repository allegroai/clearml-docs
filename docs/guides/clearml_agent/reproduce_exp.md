---
title: Reproducing Experiments 
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

When you run your code with ClearML, ClearML logs everything needed to reproduce your experiment remotely and locally using ClearML Agent.


you can get from the UI the experiment that you want to reproduce

rebuild the experiment in a local folder.

use agent build command and give task id, and folder to rebuild to.

all original code is there, uncommitted changes are applied and a complete venv is setup.

activate the venv as you usually do, using activation script. you'll find all of your packages already installed.   

