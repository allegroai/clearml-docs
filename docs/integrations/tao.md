---
title: Nvidia TAO
---

The NVIDIA TAO Toolkit, built on TensorFlow and PyTorch, is a low-code version of the NVIDIA TAO framework that 
accelerates the model training process by abstracting away the AI/DL framework complexity. The TAO Toolkit lets you use 
the power of transfer learning to fine-tune NVIDIA pretrained models with your own data and optimize for 
inference—without AI expertise or large training datasets. See [TAO Toolkit documentation](https://docs.nvidia.com/tao/tao-toolkit/index.html).

Integrate ClearML when working with TAO Toolkit to get a lot more insight into the training process using our open source 
experiment manager. ClearML tracks metrics, model files, plots, and debug images in real time, so you can always see how 
your training is progressing. 

During training, TAO will generate quite a bit of useful output, such as performance metrics, console logs, plots and 
debug images. Not to mention our valuable trained model! All of these outputs are sent to a ClearML Server during training. 

All you have to do is install and set up ClearML:

1. Install the `clearml` python package:

   ```commandline
   pip install clearml
   ``` 
   
1. To keep track of your experiments and/or data, ClearML needs to communicate to a server. You have 2 server options:
    * Sign up for free to the [ClearML Hosted Service](https://app.clear.ml/) 
    * Set up your own server, see [here](../deploying_clearml/clearml_server.md).  
1. Connect the ClearML SDK to the server by creating credentials (go to the top right in the UI to **Settings > Workspace > Create new credentials**), 
   then execute the command below and follow the instructions:

   ```commandline
   clearml-init
   ```
   
   :::tip Jupyter Notebook 
   If you're using Jupyter Notebook, in the New Credential modal, click "Jupyter Notebook", and copy the credential and paste
   them in your notebook 
   :::    
That’s it! In every training run from now on, the ClearML experiment 
manager will capture:


Training configuration in code

Training and configuration changes

By default, ClearML only keeps track of the model name, it won’t actually upload the model. When you’re training locally,
this is an excellent way to save bandwidth, but there are of course situations where you do want to upload the models.

To do that, go back to the ClearML cell in the notebook and add the following line:

`%env CLEARML_DEFAULT_OUTPUT_URI=https://files.clear.ml`
This will tell ClearML to upload any captured models directly to the hosted server. If you’re hosting your own server, you should adjust the URL to your own files endpoint.

You can also configure ClearML to store your models on a cloud bucket like S3. This is a more advanced feature that’s beyond the scope of this blogpost, but you can find more information on how to do that here.

Task configuration
While going through the notebook, you’ll see that a specific configuration file is used for model training.

Task configuration

In this configuration file, you’ll find a lot of options to play around with, but the specific section we’re interested in is located under training_config > visualizer > clearml_config. Here, you can set a custom project name, task name and tags for the ClearML Task.

clearml_config{
	  project: "TAO Toolkit ClearML Demo"
	  task: "detectnet_v2_resnet18_clearml"
	  tags: "detectnet_v2"
	  tags: "training"
	  tags: "resnet18"
	  tags: "unpruned"
}
Visualizer configuration
Under training_config > visualizer , you’ll also find frequency settings that tell TAO when to log how many visualization images. Setting the logging frequency to something lower than the default of 50, will report images to ClearML more often.

Analysing the results
Experiment management UI
After running the notebook, you’ll see that we now have 2 ClearML tasks, one for the normal model training and one of the training of the pruned model.

Experiment Management User Interface

Under configuration, you’ll find which configfile was used at the time of training, as well as several other parameters.

In the artifacts tab, you’ll find both the input models that were used to finetune from and the output models, which are the file that are the most interesting.

Naturally, you’ll also have general info and console logs in here that can be interesting for debugging.

The scalars tab will show you the different metrics that were captured by TAO and plot them. On the left you can choose to hide or reveal individual scalars.

The plots section consists of a series of 3 dimensional histogram plots of the beta, gamma and weights distributions over time.

Finally, there are debug samples to show you visually how progress is going!

Comparison
Finally, you can use the webUI to easily compare multiple different experiments. Simply select 2 or more experiments and click “Compare” in the bottom ribbon. Now you can browse through the differences between them and learn what effect changes in parameters will have on the final metrics.

Comparing different experiments

Conclusion and Next Steps
As you can see it is very easy to enable ClearML integration into NVIDIA TAO Toolkit. You can get a lot more insight into your training process and it allows you to analyse your model more in-depth and faster.

Combined with the out-of-the-box powerhouse that is TAO Toolkit, there is nothing stopping you now from creating amazing machine learning models!

The example notebook will allow you to train an initial, large model, then prune it and then retrain it again to make up for the lost performance due to pruning. ClearML will capture both training runs.

Next to training though, the notebook also allows you to export models in a format that’s ready for deployment using NVIDIA Triton inference server. ClearML Serving is based on NVIDIA Triton and extends it with more MLOps, production focused features. A good next step is to take the model you trained in this notebook and deploy it using ClearML Serving powered by NVIDIA Triton.