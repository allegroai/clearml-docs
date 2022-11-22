---
title: Core Component Overview
---

<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/s3k9ntmQmD4" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>

<details className="cml-expansion-panel info">
<summary className="cml-expansion-panel-summary">Read the transcript</summary>
<div className="cml-expansion-panel-content">

Welcome to clearML! This video will serve as an overview of the complete clearML stack. We’ll introduce you to the most important concepts and show you how everything fits together, so you can dive deep into the next videos, which will cover the clearML functionality in more detail.

ClearML is designed to get you up and running in less than 10 minutes and 2 magic lines of code. But if you start digging, you’ll quickly find out that it has a lot of functionality to offer. So let’s break it down, shall we?

At the heart of clearML lies the experiment manager. It consists of the clearml pip package and the clearml server. 

After running `pip install clearml` we can add 2 simple lines of python code to your existing codebase. These 2 lines will capture all the output that your code produces: logs, source code, hyperparameters, plots, images, you name it.

The pip package also includes clearml-data. It can help you keep track of your ever-changing datasets and provides an easy way to store, track and version control your data. It’s also an easy way to share your dataset with colleagues over multiple machines while keeping track of who has which version. Clearml-data can even keep track of your data’s ancestry, making sure you can always figure out where specific parts of your data came from.

Both the 2 magic lines and the data tool will send all of their information to a clearML server. This server then keeps an overview of your experiment runs and data sets over time, so you can always go back to a previous experiment, see how it was created and even recreate it exactly. Keep track of your best models by creating leaderboards based on your own metrics and you can even directly compare multiple experiment runs, helping you to figure out the best way forward for your models. 

To get started with a server right away, you can make use of the free tier. And when your needs grow, we’ve got you covered too! Just check out our website to find a tier that fits your organisation best. But, because we’re open source, you can also host your own completely for free. We have AWS images, Google Cloud images, you can run it on docker-compose locally or even, if you really hate yourself, run it on a self hosted kubernetes cluster using our helm charts.

So, to recap: to get started, all you need is a pip package and a server to store everything. Easy right? But MLops is much more than experiment and data management. It’s also about automation and orchestration, which is exactly where the clearml-agent comes into play.

The clearml agent is a daemon that you can run on 1 or multiple machines and turns them into workers. An agent executes an experiment or other workflow by reproducing the state of the code from the original machine to a remote machine.

Now that we have this remote execution capability, the possibilities are near endless.

For example, It’s easy to set up an agent on a either a CPU or a GPU machine, so you can easily run all of your experiments on any compute resource you have available. And if you spin up your agents in the cloud, they’ll even support auto scaling out of the box. But it can also do all of this locally, if you don’t have access to the cloud.

You can set up multiple machines as agents to support large teams with their complex projects and easily configure a queuing system to get the most out of your available hardware.

Talking about using multiple machines, say you have an experiment and want to optimize your hyper parameters. Clearml can easily and automatically clone your experiments however many times you want, change some hyper parameters on the fly according to your strategy and send the task to any one of your agents.

You can even use a google colab instance as a clearML agent to get free gpu power, just sayin!

As a final example on how you could use the agents functionality, clearml provides a PipelineController, which allows you to chain together tasks by plugging the output of one task as the input of another. Each of the tasks are of course run on your army of agents for full automation.

As you can see clearML is a large toolbox, stuffed with the most useful components for both data scientists and mlops engineers. We’re diving deeper into each component in the following videos if you need more details, but feel free to get started now at clear.ml 

</div>
</details>
