---
title: Model
---

The following page provides an overview of the basic Pythonic interface to ClearML Models.

ClearML provides the following classes to work with models:
* `Model` - Represents a ClearML model, regardless of any task connection. Use this class to programmatically access and manage the ClearML model store.
* `InputModel` - Represents an existing ClearML model to be used in an experiment. Use this class to load a model from ClearML's model store or to import a pre-trained 
model from an external resource to use as an experiment's initial starting point.
* `OutputModel` - Represents an experiment's output model (training results). An OutputModel is always connected to a [task](../fundamentals/task.md),
so the models are traceable to experiments. 

## Output Models

### Manually Logging Models  

To manually log a model, create an instance of OutputModel class. 

```python
from clearml import OutputModel, Task

# Instantiate a Task 
task = Task.init(project_name="myProject", task_name="myTask")

# Create an output model for the PyTorch framework
output_model = OutputModel(task=task, framework="PyTorch")
```

You can set the destination the model will be uploaded to and its label enumeration using the
[`OutputModel.set_upload_destination`](../references/sdk/model_outputmodel.md#set_upload_destination) and 
[`OutputModel.update_labels`](../references/sdk/model_outputmodel.md#update_labels) methods respectively.

```python
# Set the URI of the storage destination for uploaded model weight files
output_model.set_upload_destination(uri=models_upload_destination)

# Set the label numeration
output_model.update_labels({'background': 0, 'label': 255})
```

### Updating Models
ClearML doesn’t automatically log the snapshots of manually logged models. To update an experiment’s model use the 
[OutputModel.update_weights](../references/sdk/model_outputmodel.md#update_weights) method.

```python
# If validation shows this network is the best so far, update the output model
if val_log['iou'] > best_iou:
    output_model.update_weights(weights_filename='models/model.pth')
```

* Specify either the path of a local weights file to upload (`weights_filename`), or the network location of a remote 
  weights file (`registered_uri`).
* Use the `upload_uri` argument to explicitly specify an upload destination for the weights file.
* Model metadata 
  * `update_comment` - update the model's description
  * `iteration` - input the iteration number 

Alternatively, update a model through its associated task, using the [`Task.update_output_model`](../references/sdk/task.md#update_output_model)
method. 

## Input Models

### Using Registered Models

To use a ClearML model as an input model, create an InputModel object and [connect](../references/sdk/task.md#connect) 
it to a task.

```python
# Create an input model using the ClearML ID of a model already registered in the ClearML platform
input_model = InputModel(model_id="fd8b402e874549d6944eebd49e37eb7b")

# Connect the input model to the task
task.connect(input_model)
``` 

### Importing Models

To import an existing model, use the [`InputModel.import_model`](../references/sdk/model_outputmodel.md#inputmodelimport_model) 
class method and specify the `weights_url` - the URL for the imported model. If the URL already exists in the ClearML 
server, it is reused. Otherwise, a new model is registered.

Then [connect](../references/sdk/task.md#connect) the model to a task. 

```python
# Instantiate a Task 
task = Task.init(project_name="examples", task_name="example task")

input_model = InputModel.import_model(
    # Name for model in ClearML
    name='Input Model with Network Design',
    # Import the model using a URL
    weights_url='https://s3/models/model.pth',
    # Set label enumeration values
    label_enumeration={'person' : 1, 'car' : 2, 'truck' : 3, 'bus' : 4,
                       'motorcycle' : 5, 'bicycle' : 6, 'ignore': -1},
    framework='PyTorch'
)

# Connect the input model to the task
task.connect(input_model)
```

## Querying Models
Retrieve a list of model objects by querying the system by model names, projects, tags, and more, using the 
[`Model.query_models`](../references/sdk/model_model.md#modelquery_models) and / or 
the [`InputModel.query_models`](../references/sdk/model_inputmodel.md#inputmodelquery_models) class methods. These 
methods return a list of model objects that match the queries. The list is ordered according to the models’ last update 
time.

When you query models by tags, use the `-` prefix in order to filter out models with that tag.

```python
model_list = Model.query_models(
    # Only models from `examples` project
    project_name='examples', 
    # Only models with input name
    model_name=None,
    # Only models with `demo` tag but without `TF` tag
    tags=['demo', '-TF'],
    # If `True`, only published models
    only_published=False,
    # If `True`, include archived models
    include_archived=True,
    # Maximum number of models returned
    max_results=5,
    # Only models with matching metadata
    metadata={"key":"value"}
)
```

## Attach Additional Data to the Model $$$$

You can attach additional data to your model, including scalar values and series and data plots. 

Use the following methods to explicitly log additional information to your models:
* Scalars - you can explicitly attach a scalar series plot using `Model.report_scalar` and single scalar values
using the `Model.report_single_value`
 def report_scalar(self, title, series, value, iteration):
        # type: (str, str, float, int) -> None
        """
        For explicit reporting, plot a scalar series.
        :param str title: The title (metric) of the plot. Plot more than one scalar series on the same plot by using
            the same ``title`` for each call to this method.
        :param str series: The series name (variant) of the reported scalar.
        :param float value: The value to plot per iteration.
        :param int iteration: The reported iteration / step (x-axis of the reported time series)
        """
        self._init_reporter()
        return self._reporter.report_scalar(title=title, series=series, value=float(value), iter=iteration)

    def report_single_value(self, name, value):
        # type: (str, float) -> None
        """
        Reports a single value metric (for example, total experiment accuracy or mAP)
        :param name: Metric's name
        :param value: Metric's value
        """
        self._init_reporter()
        return self._reporter.report_scalar(title="Summary", series=name, value=float(value), iter=-2**31)

def report_histogram(
            self,
            title,  # type: str
            series,  # type: str
            values,  # type: Sequence[Union[int, float]]
            iteration=None,  # type: Optional[int]
            labels=None,  # type: Optional[List[str]]
            xlabels=None,  # type: Optional[List[str]]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            mode=None,  # type: Optional[str]
            data_args=None,  # type: Optional[dict]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, plot a (default grouped) histogram.
        Notice this function will not calculate the histogram,
        it assumes the histogram was already calculated in `values`
        For example:
        .. code-block:: py
           vector_series = np.random.randint(10, size=10).reshape(2,5)
           model.report_histogram(title='histogram example', series='histogram series',
                values=vector_series, iteration=0, labels=['A','B'], xaxis='X axis label', yaxis='Y axis label')
        :param title: The title (metric) of the plot.
        :param series: The series name (variant) of the reported histogram.
        :param values: The series values. A list of floats, or an N-dimensional Numpy array containing
            data for each histogram bar.
        :param iteration: The reported iteration / step. Each ``iteration`` creates another plot.
        :param labels: Labels for each bar group, creating a plot legend labeling each series. (Optional)
        :param xlabels: Labels per entry in each bucket in the histogram (vector), creating a set of labels
            for each histogram bar on the x-axis. (Optional)
        :param xaxis: The x-axis title. (Optional)
        :param yaxis: The y-axis title. (Optional)
        :param mode: Multiple histograms mode, stack / group / relative. Default is 'group'.
        :param data_args: optional dictionary for data configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/bar/
            example: data_args={'orientation': 'h', 'marker': {'color': 'blue'}}
        :param extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/bar/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """

    def report_vector(
            self,
            title,  # type: str
            series,  # type: str
            values,  # type: Sequence[Union[int, float]]
            iteration=None,  # type: Optional[int]
            labels=None,  # type: Optional[List[str]]
            xlabels=None,  # type: Optional[List[str]]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            mode=None,  # type: Optional[str]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, plot a vector as (default stacked) histogram.
        For example:
        .. code-block:: py
           vector_series = np.random.randint(10, size=10).reshape(2,5)
           model.report_vector(title='vector example', series='vector series', values=vector_series, iteration=0,
                labels=['A','B'], xaxis='X axis label', yaxis='Y axis label')
        :param title: The title (metric) of the plot.
        :param series: The series name (variant) of the reported histogram.
        :param values: The series values. A list of floats, or an N-dimensional Numpy array containing
            data for each histogram bar.
        :param iteration: The reported iteration / step. Each ``iteration`` creates another plot.
        :param labels: Labels for each bar group, creating a plot legend labeling each series. (Optional)
        :param xlabels: Labels per entry in each bucket in the histogram (vector), creating a set of labels
            for each histogram bar on the x-axis. (Optional)
        :param xaxis: The x-axis title. (Optional)
        :param yaxis: The y-axis title. (Optional)
        :param mode: Multiple histograms mode, stack / group / relative. Default is 'group'.
        :param extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/layout/
            example: extra_layout={'showlegend': False, 'plot_bgcolor': 'yellow'}
        """

    def report_table(
            self,
            title,  # type: str
            series,  # type: str
            iteration=None,  # type: Optional[int]
            table_plot=None,  # type: Optional[pd.DataFrame, Sequence[Sequence]]
            csv=None,  # type: Optional[str]
            url=None,  # type: Optional[str]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit report, report a table plot.
        One and only one of the following parameters must be provided.
        - ``table_plot`` - Pandas DataFrame or Table as list of rows (list)
        - ``csv`` - CSV file
        - ``url`` - URL to CSV file
        For example:
        .. code-block:: py
           df = pd.DataFrame({'num_legs': [2, 4, 8, 0],
                   'num_wings': [2, 0, 0, 0],
                   'num_specimen_seen': [10, 2, 1, 8]},
                   index=['falcon', 'dog', 'spider', 'fish'])
           model.report_table(title='table example',series='pandas DataFrame',iteration=0,table_plot=df)
        :param title: The title (metric) of the table.
        :param series: The series name (variant) of the reported table.
        :param iteration: The reported iteration / step.
        :param table_plot: The output table plot object
        :param csv: path to local csv file
        :param url: A URL to the location of csv file.
        :param extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/layout/
            example: extra_layout={'height': 600}
        """
    def report_line_plot(
            self,
            title,  # type: str
            series,  # type: Sequence[SeriesInfo]
            xaxis,  # type: str
            yaxis,  # type: str
            mode="lines",  # type: str
            iteration=None,  # type: Optional[int]
            reverse_xaxis=False,  # type: bool
            comment=None,  # type: Optional[str]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, plot one or more series as lines.
        :param str title: The title (metric) of the plot.
        :param list series: All the series data, one list element for each line in the plot.
        :param int iteration: The reported iteration / step.
        :param str xaxis: The x-axis title. (Optional)
        :param str yaxis: The y-axis title. (Optional)
        :param str mode: The type of line plot.
            The values are:
            - ``lines`` (default)
            - ``markers``
            - ``lines+markers``
        :param bool reverse_xaxis: Reverse the x-axis
            The values are:
            - ``True`` - The x-axis is high to low  (reversed).
            - ``False`` - The x-axis is low to high  (not reversed). (default)
        :param str comment: A comment displayed with the plot, underneath the title.
        :param dict extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/scatter/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """

    def report_scatter2d(
            self,
            title,  # type: str
            series,  # type: str
            scatter,  # type: Union[Sequence[Tuple[float, float]], np.ndarray]
            iteration=None,  # type: Optional[int]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            labels=None,  # type: Optional[List[str]]
            mode="line",  # type: str
            comment=None,  # type: Optional[str]
            extra_layout=None,  # type: Optional[dict]
    ):
        """
        For explicit reporting, report a 2d scatter plot.
        For example:
        .. code-block:: py
           scatter2d = np.hstack((np.atleast_2d(np.arange(0, 10)).T, np.random.randint(10, size=(10, 1))))
           model.report_scatter2d(title="example_scatter", series="series", iteration=0, scatter=scatter2d,
                xaxis="title x", yaxis="title y")
        Plot multiple 2D scatter series on the same plot by passing the same ``title`` and ``iteration`` values
        to this method:
        .. code-block:: py
           scatter2d_1 = np.hstack((np.atleast_2d(np.arange(0, 10)).T, np.random.randint(10, size=(10, 1))))
           model.report_scatter2d(title="example_scatter", series="series_1", iteration=1, scatter=scatter2d_1,
                xaxis="title x", yaxis="title y")
           scatter2d_2 = np.hstack((np.atleast_2d(np.arange(0, 10)).T, np.random.randint(10, size=(10, 1))))
           model.report_scatter2d("example_scatter", "series_2", iteration=1, scatter=scatter2d_2,
                xaxis="title x", yaxis="title y")
        :param str title: The title (metric) of the plot.
        :param str series: The series name (variant) of the reported scatter plot.
        :param list scatter: The scatter data. numpy.ndarray or list of (pairs of x,y) scatter:
        :param int iteration: The reported iteration / step.
        :param str xaxis: The x-axis title. (Optional)
        :param str yaxis: The y-axis title. (Optional)
        :param list(str) labels: Labels per point in the data assigned to the ``scatter`` parameter. The labels must be
            in the same order as the data.
        :param str mode: The type of scatter plot. The values are:
          - ``lines``
          - ``markers``
          - ``lines+markers``
        :param str comment: A comment displayed with the plot, underneath the title.
        :param dict extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/scatter/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """
    def report_scatter3d(
            self,
            title,  # type: str
            series,  # type: str
            scatter,  # type: Union[Sequence[Tuple[float, float, float]], np.ndarray]
            iteration=None,  # type: Optional[int]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            zaxis=None,  # type: Optional[str]
            labels=None,  # type: Optional[List[str]]
            mode="markers",  # type: str
            fill=False,  # type: bool
            comment=None,  # type: Optional[str]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, plot a 3d scatter graph (with markers).
        :param str title: The title (metric) of the plot.
        :param str series: The series name (variant) of the reported scatter plot.
        :param Union[numpy.ndarray, list] scatter: The scatter data.
            list of (pairs of x,y,z), list of series [[(x1,y1,z1)...]], or numpy.ndarray
        :param int iteration: The reported iteration / step.
        :param str xaxis: The x-axis title. (Optional)
        :param str yaxis: The y-axis title. (Optional)
        :param str zaxis: The z-axis title. (Optional)
        :param list(str) labels: Labels per point in the data assigned to the ``scatter`` parameter. The labels must be
            in the same order as the data.
        :param str mode: The type of scatter plot. The values are:
          - ``lines``
          - ``markers``
          - ``lines+markers``
          For example:
          .. code-block:: py
             scatter3d = np.random.randint(10, size=(10, 3))
             model.report_scatter3d(title="example_scatter_3d", series="series_xyz", iteration=1, scatter=scatter3d,
                  xaxis="title x", yaxis="title y", zaxis="title z")
        :param bool fill: Fill the area under the curve. The values are:
          - ``True`` - Fill
          - ``False`` - Do not fill (default)
        :param str comment: A comment displayed with the plot, underneath the title.
        :param dict extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/scatter3d/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """
        self._init_reporter()
        # check if multiple series
        multi_series = (
            isinstance(scatter, list)
            and (
                isinstance(scatter[0], np.ndarray)
                or (
                    scatter[0]
                    and isinstance(scatter[0], list)
                    and isinstance(scatter[0][0], list)
                )
            )
        )
        if not multi_series:
            if not isinstance(scatter, np.ndarray):
                if not isinstance(scatter, list):
                    scatter = list(scatter)
                scatter = np.array(scatter)
            try:
                scatter = scatter.astype(np.float32)
            except ValueError:
                pass
        return self._reporter.report_3d_scatter(
            title=title,
            series=series,
            data=scatter,
            iter=iteration or 0,
            labels=labels,
            mode=mode,
            fill=fill,
            comment=comment,
            xtitle=xaxis,
            ytitle=yaxis,
            ztitle=zaxis,
            layout_config=extra_layout
        )
    def report_confusion_matrix(
            self,
            title,  # type: str
            series,  # type: str
            matrix,  # type: np.ndarray
            iteration=None,  # type: Optional[int]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            xlabels=None,  # type: Optional[List[str]]
            ylabels=None,  # type: Optional[List[str]]
            yaxis_reversed=False,  # type: bool
            comment=None,  # type: Optional[str]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, plot a heat-map matrix.
        For example:
        .. code-block:: py
           confusion = np.random.randint(10, size=(10, 10))
           model.report_confusion_matrix("example confusion matrix", "ignored", iteration=1, matrix=confusion,
                xaxis="title X", yaxis="title Y")
        :param str title: The title (metric) of the plot.
        :param str series: The series name (variant) of the reported confusion matrix.
        :param numpy.ndarray matrix: A heat-map matrix (example: confusion matrix)
        :param int iteration: The reported iteration / step.
        :param str xaxis: The x-axis title. (Optional)
        :param str yaxis: The y-axis title. (Optional)
        :param list(str) xlabels: Labels for each column of the matrix. (Optional)
        :param list(str) ylabels: Labels for each row of the matrix. (Optional)
        :param bool yaxis_reversed: If False 0,0 is at the bottom left corner. If True, 0,0 is at the top left corner
        :param str comment: A comment displayed with the plot, underneath the title.
        :param dict extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/heatmap/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """
        self._init_reporter()
        if not isinstance(matrix, np.ndarray):
            matrix = np.array(matrix)
        return self._reporter.report_value_matrix(
            title=title,
            series=series,
            data=matrix.astype(np.float32),
            iter=iteration or 0,
            xtitle=xaxis,
            ytitle=yaxis,
            xlabels=xlabels,
            ylabels=ylabels,
            yaxis_reversed=yaxis_reversed,
            comment=comment,
            layout_config=extra_layout
        )
    def report_matrix(
            self,
            title,  # type: str
            series,  # type: str
            matrix,  # type: np.ndarray
            iteration=None,  # type: Optional[int]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            xlabels=None,  # type: Optional[List[str]]
            ylabels=None,  # type: Optional[List[str]]
            yaxis_reversed=False,  # type: bool
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, plot a confusion matrix.
        .. note::
            This method is the same as :meth:`Model.report_confusion_matrix`.
        :param str title: The title (metric) of the plot.
        :param str series: The series name (variant) of the reported confusion matrix.
        :param numpy.ndarray matrix: A heat-map matrix (example: confusion matrix)
        :param int iteration: The reported iteration / step.
        :param str xaxis: The x-axis title. (Optional)
        :param str yaxis: The y-axis title. (Optional)
        :param list(str) xlabels: Labels for each column of the matrix. (Optional)
        :param list(str) ylabels: Labels for each row of the matrix. (Optional)
        :param bool yaxis_reversed: If False, 0,0 is at the bottom left corner. If True, 0,0 is at the top left corner
        :param dict extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/heatmap/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """
        self._init_reporter()
        return self.report_confusion_matrix(
            title,
            series,
            matrix,
            iteration or 0,
            xaxis=xaxis,
            yaxis=yaxis,
            xlabels=xlabels,
            ylabels=ylabels,
            yaxis_reversed=yaxis_reversed,
            extra_layout=extra_layout
        )
    def report_surface(
            self,
            title,  # type: str
            series,  # type: str
            matrix,  # type: np.ndarray
            iteration=None,  # type: Optional[int]
            xaxis=None,  # type: Optional[str]
            yaxis=None,  # type: Optional[str]
            zaxis=None,  # type: Optional[str]
            xlabels=None,  # type: Optional[List[str]]
            ylabels=None,  # type: Optional[List[str]]
            camera=None,  # type: Optional[Sequence[float]]
            comment=None,  # type: Optional[str]
            extra_layout=None  # type: Optional[dict]
    ):
        """
        For explicit reporting, report a 3d surface plot.
        .. note::
           This method plots the same data as :meth:`Model.report_confusion_matrix`, but presents the
           data as a surface diagram not a confusion matrix.
        .. code-block:: py
           surface_matrix = np.random.randint(10, size=(10, 10))
           model.report_surface("example surface", "series", iteration=0, matrix=surface_matrix,
                xaxis="title X", yaxis="title Y", zaxis="title Z")
        :param str title: The title (metric) of the plot.
        :param str series: The series name (variant) of the reported surface.
        :param numpy.ndarray matrix: A heat-map matrix (example: confusion matrix)
        :param int iteration: The reported iteration / step.
        :param str xaxis: The x-axis title. (Optional)
        :param str yaxis: The y-axis title. (Optional)
        :param str zaxis: The z-axis title. (Optional)
        :param list(str) xlabels: Labels for each column of the matrix. (Optional)
        :param list(str) ylabels: Labels for each row of the matrix. (Optional)
        :param list(float) camera: X,Y,Z coordinates indicating the camera position. The default value is ``(1,1,1)``.
        :param str comment: A comment displayed with the plot, underneath the title.
        :param dict extra_layout: optional dictionary for layout configuration, passed directly to plotly
            See full details on the supported configuration: https://plotly.com/javascript/reference/surface/
            example: extra_layout={'xaxis': {'type': 'date', 'range': ['2020-01-01', '2020-01-31']}}
        """
        self._init_reporter()
        if not isinstance(matrix, np.ndarray):
            matrix = np.array(matrix)
        return self._reporter.report_value_surface(
            title=title,
            series=series,
            data=matrix.astype(np.float32),
            iter=iteration or 0,
            xlabels=xlabels,
            ylabels=ylabels,
            xtitle=xaxis,
            ytitle=yaxis,
            ztitle=zaxis,
            camera=camera,
            comment=comment,
            layout_config=extra_layout
        )
    def publish(self):
        # type: () -> ()
        """
@@ -439,6 +1060,17 @@ class BaseModel(object):
        if not self.published:
            self._get_base_model().publish()
    def _init_reporter(self):
        if self._reporter:
            return
        metrics_manager = Metrics(
            session=_Model._get_default_session(),
            storage_uri=None,
            task=self,  # this is fine, the ID of the model will be fetched here
            for_model=True
        )
        self._reporter = Reporter(metrics=metrics_mana
## SDK Reference

For information about all model methods, see the following SDK reference pages:
* [Model](../references/sdk/model_model.md)
* [InputModel](../references/sdk/model_inputmodel.md)
* [OutputModel](../references/sdk/model_outputmodel.md)
