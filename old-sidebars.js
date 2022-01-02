/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  someSidebar: {
    'Getting Started': ['main','starting', 'architecture'],
    'Experiment Management': [
        {'Getting Started':['expman/main', 'expman/best practices']},
        {'Task':['expman/task/task','expman/task/task_details']},
        'expman/hyperparameters',
        'expman/artifacts',
        'expman/logger',
        'expman/integrations/libraries',
        'expman/clearml_task',
        {'Functionality':['expman/ui/leaderboard', 'expman/ui/task comparison']},
        {'Remote Development':['expman/remote/remote_jupyter','expman/remote/remote pycharm']},
        {'Advanced Topics':['expman/advanced/multiple tasks','expman/advanced/hpo']},
    ],
    'Automation': [
        {
            'Getting Started': [
                'mlops/main',
                'mlops/setup/getting_started',
                'mlops/setup/agent',
                'mlops/setup/services',
                'mlops/best practices',

            ],
        },
        {'ClearML Agent': [
            'mlops/concepts/agents_and_queues','mlops/concepts/clearml_agent_usage','mlops/concepts/services']
        },
        'mlops/orchestration/pipeline/create pipeline',

    ],
    'Data Management': ['expman/data/data','expman/data/api'],
    'WebApp': ['webapp/webapp_overview','webapp/webapp_home',
              {'Projects Page':[
                  {'Experiments':['webapp/webapp_exp_table','webapp/webapp_exp_track_visual','webapp/webapp_exp_reproducing','webapp/webapp_exp_tuning',
                                  'webapp/webapp_exp_comparing','webapp/webapp_exp_sharing']},
                  {'Models': ['webapp/webapp_model_table','webapp/webapp_model_viewing','webapp/webapp_model_modifying']},
                  'webapp/webapp_archiving']},
              'webapp/webapp_profile','webapp/webapp_workers_queues'],
     //'References': ['references/clearml_ref','references/clearml_agent_ref'],
     'DevOps': ['devops/main','expman/integrations/storage'],
     'Comments': ['Notes'],


  },
    refSidebar: {
        'References':['references/refmain','references/clearml_ref','references/clearml_agent_ref'
        ],
      },
    guidesSidebar:{
      'Guides': [
                'guides/guidemain',
                {'Frameworks':[
                {'Autokeras':['guides/frameworks/autokeras/integration_autokeras','guides/frameworks/autokeras/autokeras_imdb_example']},
                {'FastAI':['guides/frameworks/fastai/fastai_with_tensorboard']},
                {'Keras': ['guides/frameworks/keras/allegro_clearml_keras_tb_example','guides/frameworks/keras/jupyter','guides/frameworks/keras/keras_tensorboard',
                           'guides/frameworks/keras/manual_model_upload']},
                {'Matplotlib': ['guides/frameworks/matplotlib/allegro_clearml_matplotlib_example','guides/frameworks/matplotlib/matplotlib_example']},
                {'Pytorch':['guides/frameworks/pytorch/manual_model_upload','guides/frameworks/pytorch/pytorch_distributed_example','guides/frameworks/pytorch/pytorch_matplotlib',
                            'guides/frameworks/pytorch/pytorch_mnist','guides/frameworks/pytorch/pytorch_tensorboard','guides/frameworks/pytorch/pytorch_tensorboardx',
                            'guides/frameworks/pytorch/tensorboard_toy_pytorch']},
                {'Scikit-Learn':['guides/frameworks/scikit-learn/sklearn_joblib_example','guides/frameworks/scikit-learn/sklearn_matplotlib_example']},
                {'TensorboardX':['guides/frameworks/tensorboardx/tensorboardx']},
                {'Tensorflow':['guides/frameworks/tensorflow/manual_model_upload','guides/frameworks/tensorflow/tensorboard_pr_curve','guides/frameworks/tensorflow/tensorboard_toy',
                               'guides/frameworks/tensorflow/tensorflow_mnist','guides/frameworks/tensorflow/integration_keras_tuner']},
                {'XGboost':['guides/frameworks/xgboost/xgboost_sample']},
                {'Pytorch Ignite':['guides/frameworks/pytorch_ignite/integration_pytorch_ignite']}
                ]},
                {'Automation':['guides/automation/manual_random_param_search_example','guides/automation/task_piping']},
                {'Data Management':['guides/data management/data_man_simple','guides/data management/data_man_folder_sync','guides/data management/data_man_cifar_classification']},
                {'Clearml-task':['guides/clearml-task/clearml_task_tutorial']},
                {'Distributed':['guides/distributed/distributed_pytorch_example','guides/distributed/subprocess_example']},
                {'Optimization':['guides/optimization/hyper-parameter-optimization/examples_hyperparam_opt']},
                {'Pipelines':['guides/pipeline/pipeline_controller']},
                {'Reporting':['guides/reporting/3d_plots_reporting','guides/reporting/artifacts','guides/reporting/clearml_logging_example','guides/reporting/html_reporting',
                              'guides/reporting/hyper_parameters','guides/reporting/image_reporting','guides/reporting/manual_matplotlib_reporting','guides/reporting/media_reporting',
                              'guides/reporting/model_config','guides/reporting/pandas_reporting','guides/reporting/plotly_reporting',
                              'guides/reporting/scalar_reporting','guides/reporting/scatter_hist_confusion_mat_reporting','guides/reporting/text_reporting']},
                {'Services':['guides/services/aws_autoscaler','guides/services/cleanup_service','guides/services/execute_jupyter_notebook_server','guides/services/slack_alerts']},
                {'IDEs':['guides/ide/integration_jupyter','guides/ide/integration_pycharm', 'guides/ide/remote_jupyter_tutorial']},
                {'ClearML':['guides/clearml/building_leader_board', 'guides/clearml/explicit_reporting', 'guides/clearml/tuning_exp']},
                {'Storage':['guides/examples_storagehelper']}
               ]
    }
};
