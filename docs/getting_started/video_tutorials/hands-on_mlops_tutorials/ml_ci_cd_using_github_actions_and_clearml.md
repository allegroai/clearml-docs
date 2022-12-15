---
title: Machine Learning CI/CD using Github Actions and ClearML
---


## Video Tutorial

<div style={{position: 'relative', overflow: 'hidden', width: '100%', paddingTop: '56.25%' }} >
<iframe style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '100%', height: '100%'}} 
        src="https://www.youtube.com/embed/k5e-E5oEFUw?rel=0" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
</iframe>
</div>

<details className="cml-expansion-panel info">
<summary className="cml-expansion-panel-summary">Read the transcript</summary>
<div className="cml-expansion-panel-content">

hello welcome back to ClearML my name is

Victor and in this video I'll be going

through some cicd tips and tricks you

can do with clearml

for this video I'm going to assume that

you already know about clearml and cicd

in general the cicd stuff will be

relatively easy to understand but if

this is your first time working with

caramel you better check out our getting

started series first now there's three

specific cicd jobs that I want to talk

about in this video that you can

accomplish with clearml the first job

is about visibility imagine I have an

experiment that I am tracking in git

somewhere I open a new PR to add a new

feature and now I want to make sure that

curamal has at least one task in its

database that has been successfully run

using this PR code right to make this

very visible I want to automatically add

the model metrics from that task as a

comment on the open PR

the second job is similar to the first

in the sense that I still want to take

the task that corresponds to the open

PR's code but in this case I want to

make sure that the model residing in

this task is equal or better than the

previous best model in clearml I can

easily keep track of that with tags in

the clearml UI and in this way I can

always guarantee that my main branch

contains the best model finally for the

last job usually I use my local computer

and environment to quickly iterate and

develop my code and then only later I'll

send it to a clearml agent to be

executed remotely and properly trained

on some gpus for example now to make

sure that always works I want to add a

check to my PR that basically checks out

this PR code runs it on a clearml agent

and then listens to it and the moment

that the clearml agents starts spitting

out iterations it means that the whole

setup process was successful and in this

way I can make sure that every single

commit in my main branch is remotely

runnable right so those were the three

jobs that I want to talk about in this

video let's get started so as you can

see I have here my example project uh

with me and there's a few things

immediately apparent so one is we have

the dot GitHub folder with workflows

we're using GitHub actions in this

specific video again you don't have to

use GitHub actions if you don't want to

it's just as an example for General CI

CD stuff then we have a few scripts here

and we have our task as well now I'll

start with the task because that's the

thing we're going to run as the

experiment you want to keep track of in

your git and in clearml and in this case

we'll just take like a dummy task we'll

take a very very simple example here so

we just do import from clearml import

task we do the task that initialize if

you're familiar with clearml this will

be very familiar to you as well it's

just the task dot initialize give it a

project give it a name and then I

basically always set to reuse lost task

ID to false which basically means that

it will never override the previous task

if it didn't complete properly it's more

or less a thing of taste then I set

random C to do something completely

random

and then for in with 10 times basically

we're going to be reporting a scalar

which is called performance metric in

series series one and it will it will

have a random value so in this case it's

super super simple it's just a dummy

task this of course this report scalar

should be your metric your output metric

that you're trying to check could be F1

score could be map whatever

and fix your fancy right

um if I then go to uh clearml itself

let me make this a little bigger for you

if I then do go to clearml itself

you'll see the dummy task right here so

we actually take care of the repository

here we also have the commit ID which

will come in handy later and then we

also have the script path and the

working directory as you might know we

also keep track of any uncommitted

changes so if you add anything in the

code that isn't already tracked by clear

by git

um in itself we also take care of that

but that will come in handy a little bit

later as well we also keep track of

install packages and stuff like that in

this case of course we don't really keep

track of very much it's it's only the

task that in it and then just reporting

some scalars but what we do have is some

scalars so this is what it would look

like and we'll be using this one later

down the line right so if I go back here

to my code you can also see we have a

GitHub folder with the workflow

subfolder in there this basically tells

GitHub that whatever you do a push or

commit or whatever it will check this

yaml file to see if it has to do any

kind of checks right in this case we'll

call it clearml checks and we'll set

the on to pull requests now most of the

time that you're using clearml it's going to

be interesting to do checks on a pull

request because it can take some time

it's machine learning after all but it

highly depends on what you want to do of

course now I'll be setting it to pull

requests specifically to branches main

so if I want to do a pull request to my

main branch I will want those checks

being fired and then I wanted them to be

added to like several different actions

there specifically the edited and opened

are the ones that I'm interested in so

every time I open a PR but also every

time I update a PR like send a new

commit to it it will trigger

and then what do we actually want to

trigger right so this is the meat of the

story this is the jobs in this video

we're going to run three specific jobs

one is Task starts to comment the other

one is compare models and the third one

is test remote runnable now the first

one task starts to come to comment

basically wants to take a task that

corresponds to the code you're trying to

merge and then add a comment on the pr

with the different performance metrics

from clearml so that it's like kind of

neat you can easily see what the task is

doing how good it is stuff like that so

that's what we're going to do first

now how this is built up

um I'll run down this and I will go into

the code later in a second but then to

start with we have the environment

variables now to be sure that the clear

that the GitHub action worker or the

gitlab runner or whatever you're going

to run these actions on has access to

clearml you have to give it the clear

remote credentials right and you can do

that with the environment variable clear

ml API access key and clearml API

secret key these are the kind of these

are the keys you get when you create new

um new credentials in the main UI in the

web UI

uh in this case I'll get them from the

secrets I've added them to GitHub as a

secret and we can gather them from there

same thing with the clearml API host in

our case it will just be app.clear.ml

which is the free tier version

um of caramel you also want a GitHub

token because we want to actually

comment add a comment to a PR right so

we also need to GitHub token which is

very easy to easy to generate I'll put a

link for that down in the description

then we also have the comment commit ID

so specifically we want the pull request

head shot which is the latest commit in

the pull request we're going to do some

things with that we'll run this uh these

this job basically on Ubuntu and then we

have some steps here so first we want to

check out our code which is just the pr

then we want to set up python with 3.10

which depends on on whatever you would

you might be running with and then also

install clearml so we have some

packages here that we want to install in

order to be able to run our code now

most of the time I like to to just have

a very simple job like this that just

uses a python script that does the

actual logic because command line logic

is not very handy to work with so it's

usually easier to just use a python file

like this so we'll be doing python task

starts to comment.pi which will check

out right away

I'll collapse some of these functions

for you because they're not actually

that interesting most of the code here

is not related to clearml specifically

it's mainly related to getting the

comment out out to the PR but in this

case we'll just walk through the if

name.main and we'll go from there so

first off

this is running on a PR right so we want

to say we're running on the commit hash

with the commit hash just so we know and

then we already have our first

interesting function so the first step

that we want to do is to make sure that

we already have a task in clearml

present in clearml that basically runs

the code that wants to be committed

right now so we have to check that the

two are the same right we have a PR

opened right now we have a commit hash

we want to check if that commit hash is

in any of the tasks in clearml so we

can say like this is the code in clear

ml that we want to track right so we

know where to get the statistics

basically I'll check this open so this

is the first cool thing is uh querying a

lot of people don't know that you can

actually use the clearml SDK to just

query the database in clear about so in

this case I'll want to query all of our

tasks with the task filter basically

order it by the latest first then set

the script version number and the script

version number tag or the the key here

actually corresponds here to the commit

ID so we'll basically get this

and I wanted to fit the commit ID that

we get from the pr right so now we've

opened the pr we get the commit ID that

is the latest in this case you'll see

actually here it's uh this one so the

commit ID is the one that we set here as

the pull request head

we get that from the environment here

and pass it through this function and if

we go to this function this commit ID we

basically want to check if this

committed ID is already in a task in

clear amount

and I also want the task to be completed

I don't want any failed tasks here we

just want to make sure that that the

code can run right that it all has

already run in caramel and I also want

the script diff which is the uncommitted

changes as well we'll check that in just

a sec so basically this query will just

return all the tasks that fit these

descriptions basically every single task

that was run on this code base

essentially

but we don't just want the commit ID to

to match we also want to make sure that

there weren't any uncommitted changes so

we make very very sure that the task in

clearml has the exact same code as the pr

we're looking at right now

so we basically check if tasks so if any

tasks were

returned then we can go through them if

none of these tasks have no if no task

was found

so if no task was found we basically

want to raise a value error saying you

at least have to run it once in clearml

with this code base before you can

actually merge it into main seems like a

reasonable request if we actually do

find a task we go for each task in the

task there could be multiple but again

they're sorted on last update remember

so we just can take the first one and

then if not task script.diff basically

if there's not any uncommitted changes

we know the exact code that was used

there then we can just return the task

and that's it so now we have our task

object we know for sure that was run

with the same code AS was done in the pr

and we also know that was completed

successfully so we want to add a tag for

example main branch just in your clear

ml you will be able to see a tag there

main branch

then we also want to get the statistics

right because we still want to log it to

the pr in as part of a comment so if I

go there and open it up we first get the

status of the task just to be sure

remember we queried it on completed but

something else might have happened in

the meantime if the status is not

completed we want to say this is the

status it isn't completed this should

not happen but if it is completed we are

going to create a table with these

functions that I won't go deeper into

basically they format the dictionary of

the state of the task scalars into

um markdown that we can actually use let

me just go into this though one quick

time so we can basically do task dot get

lost scalar metrics and this function is

built into clearml which basically gives

you a dictionary with all the metrics on

your task right we'll just get that

formatted into a table make it into a

pandas data frame and then tabulate it

with this cool package that basic turns

it into markdown

right so now that we have marked down in

the table we then want to return results

table you can view the full task this is

basically the comment content right this

is what we want to be in the comment

that will later end up in the pr if

something else went wrong we want to log

it here

it will also end up in a comment by the

way so then we know that something went

wrong from the pr itself

right so this is what get task stats

returns so basically in stats now we

have our markdown that can be used to

create a GitHub comment and then we have

create stats comment which just uses the

GitHub

API to essentially get the repository

get the full name take your token and

then get the pull request and create the

comment using the project stats that we

gave here now to check if everything is

working we can open a new PR for example

I have I'm here on the branch video

example I'll just add

a small change here just so we know that

everything uh that there is a change and

then we'll change the we'll add a PR so

add PR for video example

there we go let's do that

publish the branch and then I can create

a pull request straight from vs code

because it's an awesome tool

created and now if I go to our PR here

which we can go into oh in

GitHub here you can actually see that

there's a little bubble here it's

already checking everything that it

should so you can see here we have the

add PR for Via example we changed our

tests here

or test five here and you can see all

the checks here so tasks that's the

comment is the one that we're interested

right now it will basically set up

everything install clearml and then run

the task now no task based on this code

was found in clearml right because we

just changed the code

it has an uncommitted change remember so

there is no task in clearml yet with

the change that we just made so in order

to get that running we have to go into

task run this first

with this new PR and now we actually get

get a um a new task right here with the

exact commits in Branch video example

without any uncommitted changes and if

we now rerun our pipeline we should be

good to go

so let me just go there it is almost

done here yep it's done so this should

now be completed there we go

and if I go back to our tests here we

can see that some of them have failed so

let's rerun the failed jobs rerun now

this in this case we actually do or we

should actually find a task in clearml

that has all our code changes and it

should work just like nicely

right we're back this actually worked

totally fine this time um so it actually

only took 25 or 35 seconds depending on

which the tasks you run but task starts

to comment

was successful so this means that if we

now go to the pull request we see our

little checkbox here that all the checks

worked out perfectly fine and if I go in

here you can see that the actual

performance metric of series 1 is right

there so that's really really cool we

just changed it and there's already an

example there right

so that was actually the first one

um task starts to comment which is

really handy you can just slap it on any

task and you'll always get the output

there if you add a new commit to your PR

you'll just get a new comment from these

checks just to be sure that it's always

up to date

right so let's get to the second part we

now have oh these are all the jobs so we

had our task starts to comment what else

might you want to do with uh GitHub CI

CD right another thing you might want to

do is compare models basically compare

the output of the model or like the last

metric that we just pulled

from the current task which is the task

connected to the pr that we want to open

or that we we've just opened and compare

it compare its performance to the

performance of the best model before it

right so we can always know that it's

either equal or better performance than

last commit so if we go to compare

models here and we have our environments

again so this is all the same thing we

run again on Ubuntu 20.04 we check out

the code we set up python we install our

packages and then we run compare

models.py compare models.py is very very

similar it is very simple

so here we say we print running on

Commit hash which we get from the

environment that we just gave to the to

GitHub

and then we run compare and tag task

right so what we want to do is basically

compare and then if it's better

tag it as such right so if I do now

current current task is get clear maltas

from current commit which is basically

the same thing that we used before in

the last check basically it goes again

it goes to clearml to check if there's

already a task that has been run with

this exact same code as in the pr so we

get a task from there which is the

current task and then we want to get the

best task as well so in this case it's

very simple to get it so you just run

get task give the project name to the

project that we want to run in right now

give the task name which will be the

same probably as the one that we're

running now but also with the tags best

performance and then if I go into our

clearml overview here what you'll

get is the best performance here because

our checks already run so you solve the

three checks right before we open the pr

so basically the dummy task here was

found to be the best performance and it

has been tagged but that means that

every single time I open a PR or I

update a PR it will search clearml and

get this dummy task

it will get this one and then we say if

we find the best task if not we'll just

add best performance anyway because

you're the first task in the list you'll

always be getting best performance but

if you're not then we'll get the best

latest metric for example get reported

scalers get performance metrics get

scale get series 1 and get y so the the

why value there so this could basically

be the best or the highest map from a

task or like the highest F1 score from a

task or any some such then you have the

best metric we do the same thing for the

current task as well and then it's

fairly easy we just say hey if the

current metric is larger or equal than

the best metric then this means we're

better or equal we're good to go current

task add tags best performance if not

this means the current metric is worse

and the pr you're trying to merge

actually has worse performance than what

was there before

we at least want to say that but you

could also easily say I want to raise a

value error for example that says must

be better

and then the pipeline will fail which

can allow you to block the pr until it

actually is equal or better right so now

it's time for the third check and the

last one as well this is a little more

complicated so that's why I keep it kept

it for last but it's a really cool one

as well specifically we're going to be

using the remote execution capabilities

of clearml next to the CI CD so

will basically test if whatever you want

to add to the main branch so whatever is

in your PR we want to check if that code

is even remotely runnable using a clearml 

agent because most of the time what

you want to be doing is you want to be

running stuff locally and testing

locally and iterating very very fast and

then whenever your code is good to go

you want to check if that actually runs

on a remote machine because that's where

you want to end up doing the real heavy

lifting the real training so the only

thing we want to check is is there

anything missing from the requirements

if there's anything other that might

break if it's going to run on the remote

machine the cool thing about that is

that you know for sure that every commit

on the main branch is also runnable on a

remote machine just to be sure so how

can we do that

we can add again our environment

variables so that our runner has access

to clearml we run on Ubuntu 20.04 we

check out this time we check out

specifically to the branch because

sometimes the agent might have issues

with that so we want to make sure that

we're actually in the headshot

um and then we set up our python

environments again we pip install

clearml and we also add some rib grab

function that we'll just use in just a

second now the first thing we want to do

in this whole pipeline is we want to

start the task remotely

we want to make sure that it doesn't

fail and then we actually want to pull

every so often to to capture if it

starts its iterations if only one

iteration is already reported it means

that the loop the main training Loop

will probably work just fine and we can

quit it there so that's exactly what

we're going to do first step launching

the task so we want to start a task here

we'll give it an ID so that we can

actually use the output of that process

and then there is this small tool that

not a lot of people know about but it's

actually clear my task as a command line

utility and the cool thing about that is

clearml Task allows you to basically

run any kind of GitHub repository

remotely from the get-go so you don't

have to add anything to the code in to

begin with right so in this case this is

perfect because we've just checked out

our code and the only thing we want to

do is throw that to a remote machine and

make sure that it works so what we're

going to do let me just copy paste this

for a second so that I can show you

I'll open my

command line here so what I'll do is

I'll put it into a queue that is

non-existent

so that it will fail but then we'll see

the output just to be sure

and then I'll keep make sure that the

branch is gone here because it's an

interpolated value that we don't have in

this case so if I run this in my GitHub

actions example repository here what I

will do is it will launch the task on a

remote machine using pyraml agent so it

will set up the requirements it will set

up everything and it says new task

created with this ID right of course we

can't actually queue it because the

queue is non-existent but what we want

to do here is we use this command to

actually launch the clear mail task and

then we use rib grab to basically get

this task ID out of the console output

we'll store that into a value GitHub

output that we can access here so we'll

give this task ID that we just started

on the remote machine to this python

file which will check out right now so

it's again very simple so we check the

task status of the first argument which

again will be the task ID we'll check

the task status

we'll get the task itself which is a

task object from clearml we'll start a

timer and then we'll say if the task if

we have a task at all right if it starts

it might have broken somewhere so always

check if the task exists we do we check

for a timeout right for a while so what

we want to do is a while loop where you

say okay whenever uh the the time that

I've been checking has not been longer

than a certain timeout I want to be

pulling the task and making sure that

it's still running right so I get the

task status which hopefully should be

either queued pending in progress or

whatever hopefully not failed of course

but that can always happen so we get a

task status we print some stuff and then

if the task status is skewed which means

that there's tasks in the queue before

it and it can't actually be run yet

because all the agents are currently

working we actually just want to reset

the timer so we reset the start time to

be time.time which basically will not

allow this timeout to be triggered this

is kind of nice because we don't want

the timer to be triggered because it's

waiting in the queue like there's

nothing happening to it so we only want

the timer to be started whenever it's

actually being executed by clearml agent

so we've reseted the timer at some point

the task status will change from queued

to anything else if this task status is

failed or stopped it means we did have

an error which is not ideal which is

exactly what we want to catch in this

case so we'll raise a value error with

saying tiles did not return correctly

check the logs in the web UI you'll see

probably in clearml that the task will

actually have failed and then you can

check and debug there also raising a

value error will actually fail the

pipeline as well which is exactly what

we want we don't want this PR to go

through if the pipeline fails because of

a task that can be run remotely this is

exactly what we want to catch

but if the task status is in progress we

go into a next Loop in which we say okay

if the task get lost iteration is larger

than zero basically if we get only one

iteration it means that the whole setups

process was successful the model is

training and we're good to go

so in that case we just clean up we've

just checked everything is good so we

set the task as Mark stopped we set the

task as set archived and we return true

which basically says get the task out of

the way it shouldn't be in the project

anymore we just checked everything works

get it out of my site right so that was

the last of the three checks that I

wanted to cover today I hope you found

this interesting I mean if we go back to

rpr here it's really nice to see all of

these checks coming back green it's very

easy to just use the clearml API and

even clearml task for example to

launch stuff remotely it's not that far

of a fetch either to just think why not

use clearml agent as for example a test

bed for GPU tests right so you could

very easily add things to the queue for

the agent to work on and then just pull

its performance in this way or like pull

its status in this very way so you could

actually run tests that are supposed to

be run on GPU machines this way because

GitHub doesn't automatically or just

isn't out of the books allow you to run

on GPU workers so it's just one of the

very many ways that you can use clearml

to do these kind of things and I hope

you learned something valuable today all

of the code that you saw in this example

will be available in the from a link in

the description and if you need any help

follow us on slack or like join our

slack Channel we're always there always

happy to help and yeah thank you for

watching


</div>
</details>
