/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
    mainSidebar: [
        {'Getting Started': ['getting_started/main', {
            'Where do I start?': [{'Data Scientists': ['getting_started/ds/ds_first_steps', 'getting_started/ds/ds_second_steps', 'getting_started/ds/best_practices']},
                {'MLOps and LLMOps': ['getting_started/mlops/mlops_first_steps','getting_started/mlops/mlops_second_steps','getting_started/mlops/mlops_best_practices']}]
        }, 'getting_started/architecture', {'Video Tutorials': 
        [
            'getting_started/video_tutorials/quick_introduction',
            'getting_started/video_tutorials/core_component_overview',
            'getting_started/video_tutorials/experiment_manager_hands-on',
            'getting_started/video_tutorials/experiment_management_best_practices',
            'getting_started/video_tutorials/agent_remote_execution_and_automation',
            'getting_started/video_tutorials/hyperparameter_optimization',
            'getting_started/video_tutorials/pipelines_from_code',
            'getting_started/video_tutorials/pipelines_from_tasks',
            'getting_started/video_tutorials/clearml-data',
            'getting_started/video_tutorials/the_clearml_autoscaler',
            'getting_started/video_tutorials/hyperdatasets_data_versioning',
            {
                'Hands-on MLOps Tutorials':[
                    'getting_started/video_tutorials/hands-on_mlops_tutorials/how_clearml_is_used_by_a_data_scientist',
                    'getting_started/video_tutorials/hands-on_mlops_tutorials/how_clearml_is_used_by_an_mlops_engineer',
                    'getting_started/video_tutorials/hands-on_mlops_tutorials/ml_ci_cd_using_github_actions_and_clearml'
                ]
            }        
        ]}]},
        {'ClearML Fundamentals': ['fundamentals/projects', 'fundamentals/task', 'fundamentals/hyperparameters', 'fundamentals/artifacts', 'fundamentals/logger', 'fundamentals/agents_and_queues',
            'fundamentals/hpo']},
        {'ClearML SDK': ['clearml_sdk/clearml_sdk', 'clearml_sdk/task_sdk', 'clearml_sdk/model_sdk', 'clearml_sdk/apiclient_sdk']},
        {'ClearML Agent':
            ['clearml_agent', 'clearml_agent/clearml_agent_setup', 'clearml_agent/clearml_agent_deployment',
            'clearml_agent/clearml_agent_execution_env', 'clearml_agent/clearml_agent_env_caching',
            'clearml_agent/clearml_agent_dynamic_gpus', 'clearml_agent/clearml_agent_fractional_gpus',
            'clearml_agent/clearml_agent_services_mode', 'clearml_agent/clearml_agent_docker',
            'clearml_agent/clearml_agent_scheduling'
        ]},
        {'Cloud Autoscaling': [
            'cloud_autoscaling/autoscaling_overview',
             {'Autoscaler Apps': [
                    'webapp/applications/apps_aws_autoscaler',
                    'webapp/applications/apps_gcp_autoscaler',
                 ]
             }
             ]
        },
        {'ClearML Pipelines':['pipelines/pipelines',
                {"Building Pipelines":
                        ['pipelines/pipelines_sdk_tasks', 'pipelines/pipelines_sdk_function_decorators']
                }
                ]
        },
        {'ClearML Data': ['clearml_data/clearml_data', 'clearml_data/clearml_data_cli', 'clearml_data/clearml_data_sdk', 'clearml_data/best_practices',
                {'Workflows': [
                    'clearml_data/data_management_examples/workflows',
                    'clearml_data/data_management_examples/data_man_simple',
                    'clearml_data/data_management_examples/data_man_folder_sync',
                    'clearml_data/data_management_examples/data_man_cifar_classification',
                    'clearml_data/data_management_examples/data_man_python'
                    ]
                },
            ]
        },
        'hyper_datasets',
        'model_registry',
        {'Remote IDE': [
            'remote_session',
            'apps/clearml_session',
            {type: 'ref', id: 'webapp/applications/apps_jupyter_lab'},
            {type: 'ref', id: 'webapp/applications/apps_vscode'}
            ]
        },
        {'ClearML Serving':['clearml_serving/clearml_serving', 'clearml_serving/clearml_serving_setup', 'clearml_serving/clearml_serving_cli', 'clearml_serving/clearml_serving_tutorial']},
        {'CLI Tools': [
            'apps/clearml_task',
            {type: 'ref', id: 'clearml_agent/clearml_agent_ref'},
            {type: 'ref', id: 'clearml_data/clearml_data_cli'},
            'apps/clearml_param_search',
            {type: 'ref', id: 'apps/clearml_session'},
            {type: 'ref', id: 'clearml_serving/clearml_serving_cli'},
            ]
        },
        {'Integrations': [
                'integrations/autokeras',
                'integrations/catboost',
                'integrations/click',
                'integrations/fastai',
                {"Hugging Face": ['integrations/transformers', 'integrations/accelerate']},
                'integrations/hydra', 'integrations/jsonargparse',
                'integrations/keras', 'integrations/keras_tuner',
                'integrations/langchain',
                'integrations/lightgbm', 'integrations/matplotlib',
                'integrations/megengine', 'integrations/monai', 'integrations/tao',
                {"OpenMMLab":['integrations/mmcv', 'integrations/mmengine']},
                'integrations/optuna',
                'integrations/python_fire', 'integrations/pytorch',
                'integrations/ignite',
                'integrations/pytorch_lightning',
                'integrations/scikit_learn', 'integrations/seaborn',
                'integrations/splunk',
                'integrations/tensorboard', 'integrations/tensorboardx', 'integrations/tensorflow',
                'integrations/xgboost', 'integrations/yolov5', 'integrations/yolov8'
            ]
        },
        'integrations/storage',
        {'WebApp': ['webapp/webapp_overview', 'webapp/webapp_home',
            {
                'Projects': [
                    'webapp/webapp_projects_page',
                    'webapp/webapp_project_overview',
                    {
                        'Experiments': ['webapp/webapp_exp_table', 'webapp/webapp_exp_track_visual', 'webapp/webapp_exp_reproducing', 'webapp/webapp_exp_tuning',
                            'webapp/webapp_exp_comparing']
                    },
                    {
                        'Models': ['webapp/webapp_model_table', 'webapp/webapp_model_viewing', 'webapp/webapp_model_comparing']
                    },
                    'webapp/webapp_exp_sharing'
                ]
            },
            {
                'Datasets':[
                    'webapp/datasets/webapp_dataset_page', 'webapp/datasets/webapp_dataset_viewing'
                ]
            },
            {
                'Pipelines':[
                    'webapp/pipelines/webapp_pipeline_page', 'webapp/pipelines/webapp_pipeline_table', 'webapp/pipelines/webapp_pipeline_viewing'
                ]
            },
            'webapp/webapp_reports',
            {
                'Orchestration': [
                    'webapp/webapp_workers_queues',
                    'webapp/webapp_orchestration_dash',
                    'webapp/resource_policies'
                ]
            },
            {
                'ClearML Applications': [
                    'webapp/applications/apps_overview',
                    'webapp/applications/apps_hpo',
                    'webapp/applications/apps_dashboard',
                    'webapp/applications/apps_task_scheduler',
                    'webapp/applications/apps_trigger_manager',
                    'webapp/applications/apps_jupyter_lab',
                    'webapp/applications/apps_vscode',
                    'webapp/applications/apps_gradio',
                    'webapp/applications/apps_streamlit'
                ]

            },
            'webapp/webapp_profile']
        },
        {'Configuring ClearML': ['configs/configuring_clearml', 'configs/clearml_conf', 'configs/env_vars']},
        {'User Management': [
            'user_management/user_groups',
            'user_management/access_rules',
            'user_management/admin_vaults',
            'user_management/identity_providers'
            ]
        },
        {'ClearML Server': ['deploying_clearml/clearml_server',
            {
                'Deploying ClearML Server': ['deploying_clearml/clearml_server_aws_ec2_ami', 'deploying_clearml/clearml_server_gcp',
                    'deploying_clearml/clearml_server_linux_mac', 'deploying_clearml/clearml_server_win',
                    'deploying_clearml/clearml_server_kubernetes_helm']
            },
            {
                'Upgrading ClearML Server':['deploying_clearml/upgrade_server_aws_ec2_ami','deploying_clearml/upgrade_server_gcp',
                    'deploying_clearml/upgrade_server_linux_mac', 'deploying_clearml/upgrade_server_win',
                    'deploying_clearml/upgrade_server_kubernetes_helm',
                    'deploying_clearml/clearml_server_es7_migration', 'deploying_clearml/clearml_server_mongo44_migration']
            },
            'deploying_clearml/clearml_server_config', 'deploying_clearml/clearml_server_security'
        ]},

        //'Comments': ['Notes'],



    ],
    guidesSidebar: [
            'guides/guidemain',
            {'Advanced': ['guides/advanced/execute_remotely', 'guides/advanced/multiple_tasks_single_process']},
            {'Automation': ['guides/automation/manual_random_param_search_example', 'guides/automation/task_piping']},
            {'ClearML Task': ['guides/clearml-task/clearml_task_tutorial']},
            {'ClearML Agent': ['guides/clearml_agent/executable_exp_containers', 'guides/clearml_agent/exp_environment_containers', 'guides/clearml_agent/reproduce_exp']},
            {'Datasets': ['clearml_data/data_management_examples/data_man_cifar_classification', 'clearml_data/data_management_examples/data_man_python']},
            {'Distributed': ['guides/distributed/distributed_pytorch_example', 'guides/distributed/subprocess_example']},
            {'Docker': ['guides/docker/extra_docker_shell_script']},
            {'Frameworks': [
                'guides/frameworks/autokeras/autokeras_imdb_example',
                'guides/frameworks/catboost/catboost',
                'guides/frameworks/fastai/fastai_with_tensorboard',
                 {'Hugging Face': ['guides/frameworks/huggingface/transformers']},
                 {'Keras': ['guides/frameworks/keras/jupyter', 'guides/frameworks/keras/keras_tensorboard']},
                'guides/frameworks/lightgbm/lightgbm_example',
                'guides/frameworks/matplotlib/matplotlib_example',
                'guides/frameworks/megengine/megengine_mnist',
                {'PyTorch':
                        [
                            'guides/frameworks/pytorch/pytorch_distributed_example', 'guides/frameworks/pytorch/pytorch_matplotlib',
                            'guides/frameworks/pytorch/pytorch_mnist', 'guides/frameworks/pytorch/pytorch_tensorboard','guides/frameworks/pytorch/tensorboard_toy_pytorch',
                            'guides/frameworks/pytorch/pytorch_tensorboardx', 'guides/frameworks/pytorch/pytorch_abseil', 'guides/frameworks/pytorch/model_updating',
                            {'PyTorch Notebooks': [
                                {'Audio': ['guides/frameworks/pytorch/notebooks/audio/audio_classification_UrbanSound8K', 'guides/frameworks/pytorch/notebooks/audio/audio_preprocessing_example']},
                                {'Image': ['guides/frameworks/pytorch/notebooks/image/hyperparameter_search', 'guides/frameworks/pytorch/notebooks/image/image_classification_CIFAR10']},
                                {'Table': ['guides/frameworks/pytorch/notebooks/table/download_and_preprocessing', 'guides/frameworks/pytorch/notebooks/table/tabular_training_pipeline']},
                                {'Text': ['guides/frameworks/pytorch/notebooks/text/text_classification_AG_NEWS']}]
                            }
                            ]
                },
                {'PyTorch Ignite': ['guides/frameworks/pytorch_ignite/integration_pytorch_ignite', 'guides/frameworks/pytorch_ignite/pytorch_ignite_mnist']},
                'guides/frameworks/pytorch_lightning/pytorch_lightning_example',
                {'Scikit-Learn': ['guides/frameworks/scikit-learn/sklearn_joblib_example', 'guides/frameworks/scikit-learn/sklearn_matplotlib_example']},
                {'TensorBoardX': ['guides/frameworks/tensorboardx/tensorboardx', "guides/frameworks/tensorboardx/video_tensorboardx"]},
                {
                    'TensorFlow': ['guides/frameworks/tensorflow/tensorboard_pr_curve', 'guides/frameworks/tensorflow/tensorboard_toy',
                        'guides/frameworks/tensorflow/tensorflow_mnist', 'guides/frameworks/tensorflow/integration_keras_tuner']
                },
                {'XGBoost': ['guides/frameworks/xgboost/xgboost_sample', 'guides/frameworks/xgboost/xgboost_metrics']}
            ]},
            {'IDEs': ['guides/ide/remote_jupyter_tutorial', 'guides/ide/integration_pycharm', 'guides/ide/google_colab']},
            {'Offline Mode':['guides/set_offline']},
            {'Optimization': ['guides/optimization/hyper-parameter-optimization/examples_hyperparam_opt']},
            {'Pipelines': ['guides/pipeline/pipeline_controller', 'guides/pipeline/pipeline_decorator', 'guides/pipeline/pipeline_functions']},

            {'Reporting': ['guides/reporting/explicit_reporting','guides/reporting/3d_plots_reporting', 'guides/reporting/artifacts', 'guides/reporting/using_artifacts', 'guides/reporting/clearml_logging_example', 'guides/reporting/html_reporting',
                'guides/reporting/hyper_parameters', 'guides/reporting/image_reporting', 'guides/reporting/manual_matplotlib_reporting', 'guides/reporting/media_reporting',
                'guides/reporting/model_config', 'guides/reporting/pandas_reporting', 'guides/reporting/plotly_reporting',
                'guides/reporting/scalar_reporting', 'guides/reporting/scatter_hist_confusion_mat_reporting', 'guides/reporting/text_reporting']},
            {'Services': ['guides/services/aws_autoscaler', 'guides/services/cleanup_service', 'guides/services/slack_alerts']},
            {'Storage': ['guides/storage/examples_storagehelper']},
            {'Web UI': ['guides/ui/building_leader_board','guides/ui/tuning_exp']}

    ],
    rnSidebar: {
        'Release Notes': [
            'release_notes/ver_1_16', 'release_notes/ver_1_15',
            'release_notes/ver_1_14', 'release_notes/ver_1_13', 'release_notes/ver_1_12', 'release_notes/ver_1_11',
            'release_notes/ver_1_10', 'release_notes/ver_1_9', 'release_notes/ver_1_8', 'release_notes/ver_1_7',
            'release_notes/ver_1_6', 'release_notes/ver_1_5', 'release_notes/ver_1_4', 'release_notes/ver_1_3',
            'release_notes/ver_1_2','release_notes/ver_1_1', 'release_notes/ver_1_0', 'release_notes/ver_0_17',
            'release_notes/ver_0_16', 'release_notes/ver_0_15', 'release_notes/ver_0_14', 'release_notes/ver_0_13',
            'release_notes/ver_0_12', 'release_notes/ver_0_11', 'release_notes/ver_0_10', 'release_notes/ver_0_9',
        ],
    },
    sdkSidebar: [
            'references/sdk/task',
            'references/sdk/logger',
            {'Model': ['references/sdk/model_model',
                'references/sdk/model_inputmodel', 'references/sdk/model_outputmodel',]},
            'references/sdk/storage',
            'references/sdk/dataset',
            {'Pipeline': ['references/sdk/automation_controller_pipelinecontroller',
                'references/sdk/automation_job_clearmljob']},
            'references/sdk/scheduler',
            'references/sdk/trigger',
            {'HyperParameter Optimization': [
                'references/sdk/hpo_optimization_hyperparameteroptimizer',
                'references/sdk/hpo_optimization_gridsearch',
                'references/sdk/hpo_optimization_randomsearch',
                'references/sdk/hpo_optuna_optuna_optimizeroptuna',
                'references/sdk/hpo_hpbandster_bandster_optimizerbohb',
                'references/sdk/hpo_parameters_discreteparameterrange',
                'references/sdk/hpo_parameters_uniformintegerparameterrange',
                'references/sdk/hpo_parameters_uniformparameterrange',
                'references/sdk/hpo_parameters_parameterset',
                ]},
    ],
    clearmlAgentSidebar: [
        'clearml_agent/clearml_agent_ref', 'clearml_agent/clearml_agent_env_var'
    ],
    hyperdatasetsSidebar: [
        'hyperdatasets/overview',
        {'Frames': [
            'hyperdatasets/frames',
            'hyperdatasets/single_frames',
            'hyperdatasets/frame_groups',
            'hyperdatasets/sources',
            'hyperdatasets/annotations',
            'hyperdatasets/masks',
            'hyperdatasets/previews',
            'hyperdatasets/custom_metadata'
            ]},
        'hyperdatasets/dataset',
        'hyperdatasets/dataviews',
        'hyperdatasets/task',
        {'WebApp': [
                {'Projects': [
                        'hyperdatasets/webapp/webapp_dataviews', 'hyperdatasets/webapp/webapp_exp_track_visual',
                        'hyperdatasets/webapp/webapp_exp_modifying', 'hyperdatasets/webapp/webapp_exp_comparing',
                        ]
                },
                {'Datasets': [
                    'hyperdatasets/webapp/webapp_datasets',
                    'hyperdatasets/webapp/webapp_datasets_versioning',
                    'hyperdatasets/webapp/webapp_datasets_frames'
                    ]
                },
                'hyperdatasets/webapp/webapp_annotator'
            ]
        },
        'hyperdatasets/code_examples'
    ],
    sdkHyperDataset: [
        {'Hyper-Dataset': ['references/hyperdataset/hyperdataset', 'references/hyperdataset/hyperdatasetversion']},
        {'DataFrame': ['references/hyperdataset/singleframe',
            'references/hyperdataset/framegroup', 'references/hyperdataset/annotation',]},
        'references/hyperdataset/dataview',
    ],
    apiSidebar: [
        'references/api/index',
        'references/api/definitions',
        'references/api/login',
        'references/api/debug',
        'references/api/projects',
        'references/api/queues',
        'references/api/workers',
        'references/api/events',
        'references/api/models',
        'references/api/tasks',
    ]
};
