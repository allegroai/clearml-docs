---
title: Hyper-Datasets
---

:::important Enterprise Feature
Hyper-Datasets are available under the ClearML Enterprise plan
:::

<div class="vid">
<iframe style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '100%', height: '100%'}} 
        src="https://www.youtube.com/embed/1VliYRexeLU?si=WAXIdAwsja7D0lxH" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
</iframe>
</div>

<br/>

Hyper-Datasets is a data management system that is designed for unstructured data like text, audio, or visual data. Hyperdatasets
decouples metadata from raw data files. allows you to maniplate metadata in all sorts of way. ths is done through queries and parameters
that can be tracked through experiment manager. you can clone experiment using different data manipulation without changing any
of the hard coded values. data manipulations become part of the experiment, they are called DataViews. can experiment with
different data configurations without changing the code. data and metadata are not entwined.

data exploration - explore datasets. can see version history of datasets. each child version inherits contents of parents.
by default, versions in draft mode meaning that they can still be modified. you can publish it so it can't be modified. 
you can create child version which you can modifiy.

you can see previews of the datasets. 

click on sample, see image itself, as well as bounding boxes, rois, labels, annotations. 

ClearML's Hyper-Datasets are an MLOps-oriented abstraction of your data, which facilitates traceable, reproducible model development
through parameterized data access and meta-data version control. 

The basic premise is that a user-formed query is a full representation of the dataset used by the ML/DL process. 

ClearML **Enterprise**'s Hyper-Datasets supports rapid prototyping, creating new opportunities such as: 
* Hyperparameter optimization of the data itself
* QA/QC pipelining
* CD/CT (continuous training) during deployment
* Enabling complex applications like collaborative (federated) learning. 


For more information, see [Hyper-Datasets](hyperdatasets/overview.md).
