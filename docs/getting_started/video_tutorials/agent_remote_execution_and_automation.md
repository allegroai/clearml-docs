---
title: Agent Remote Execution and Automation
---


## Youtube video

<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/MX3BrXnaULs" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>

## Transcript

Welcome to clearml. In this video we’ll take a look at the ClearML agent, which will allow you to run your tasks remotely and open the door for automating your workflows.

Remember our overview from the previous videos? We talked about the pip package that allows us to run experiments and data management as well as the server, which stores everything we track. Today we add a third component: the clearml agent.

The agent will turn any machine, either on premise or in the cloud into a worker that will execute your tasks. So let’s see how that’s done!

For the purpose of this video, we’ll be running the agent on a simple ubuntu machine, but you can run it anywhere you want.

The agent can be installed by using the pip package clearml-agent. Then we run the command clearml-agent init to connect our agent to the clearml server.

Pasting the credentials works the same way as in the experiment manager, but there are several more options you’ll be asked to fill in, when compared to the regular clearml-init command.

The most important difference is that you’ll also be asked for your git information, this is necessary for the agent to be able to pull your code when it’s asked to run it. You’ll find more information about these settings in our documentation.

Before we run the agent though, let's take a quick look at what will happen when we spin it up.

Our server hosts one or more queues in which we can put our tasks. And then we have our agent. By default, it will be running in pip mode, or virtual environment mode. Once an agent pulls a new task from the queue to be executed, it will create a new python virtual environment for it. It will then clone the code itself and install all required python packages in the new virtual environment. It then runs the code and injects any new hyperparameters we changed in the UI.

PIP mode is really handy and efficient. It will create a new python virtual environment for every task it pulls and will use smart caching so packages or even whole environments can be reused over multiple tasks.

You can also run the agent in conda mode or poetry mode, which essentially do the same thing as pip mode, only with a conda or poetry environment instead.

However, there’s also docker mode. In this case the agent will run every incoming task in its own docker container instead of just a virtual environment. This makes things much easier if your tasks have system package dependencies for example, or when not every task uses the same python version. For our example, we’ll be using docker mode.

Now that our configuration is ready, we can start our agent in docker mode by running the command `clearml-agent daemon –docker` 


After running the command, we can see it pop up in our workers table. Now the agent will start listening for tasks in the default queue and it’s ready to go!

Now, let’s say you have a task that you already ran on your local machine and you tracked it using the 2 magic lines that we saw before. Just like in the last video, we can right click it and clone it, so it’s now in draft mode. We can easily change some of the hyperparameters on the fly and *enqueue* the task.

The agent will immediately detect that we enqueued a task and start working on it. Like we saw before, it will spin up a docker container, install the required packages and dependencies and run the code.

The task itself is reported to the experiment manager just like any other task and you can browse its outputs like normal, albeit with the changed parameters we edited earlier during draft mode.

On the left we can see a button labeled “Workers and Queues”. Under the workers tab we can see that our worker is indeed busy with our task and we can see it’s resource utilization as well. If we click on the current experiment, we end up in our experiment view again. Now, imagine we see in the scalar output that our model isn’t training the way we want it to, we can abort the task here and the agent will start working on the next task in the queue.

Back to our workers overview. Over in the Queues tab, we get some extra information about which experiments are currently in the queue and we can even change their order by dragging them in the correct position like so. Finally, we have graphs of the overall waiting time and overall amount of enqueued tasks over time.

Talking of which, let’s say your wait times are very long because all data scientists have collectively decided that now is a perfect time to train their models and your on-premise servers are at capacity. We have built in autoscalers for AWS and GCP (in the works) which will automatically spin up new clearml agent VMs when the queue wait time becomes too long. If you go for the premium tiers of ClearML, you’ll even get a really nice dashboard to go along with it.

In the following video we’ll go a little deeper yet into this newly discovered automation thing we just saw and introduce things like automatic hyperparameter optimization and pipelines.

But for now, feel free to start spinning up some agents on your own machines completely for free at app.clear.ml or by using our self hosted server on github and don’t forget to join our slack channel if you need any help.
