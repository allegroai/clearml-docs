---
title: Reports
---

<div style={{position: 'relative', overflow: 'hidden', width: '100%', paddingTop: '56.25%' }} >
<iframe style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '100%', height: '100%'}} 
        src="https://www.youtube.com/embed/D6fCvpmV8eo" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
</iframe>
</div>

<br/>

With ClearML’s Reports you can write up notes, experiment findings, or really anything you want. You can create reports 
in any of your ClearML projects.

In addition to its main document, a report also contains a description field, which will appear in the report's card in 
the [Reports Page](#reports-page). Reports are searchable based on their description, so adding a description 
can make it easier to find the report later. 

Reports are editable Markdown documents, supporting:
* Multi-level headings
* Text formatting: Italics, bold, and strikethrough
* Bulleted and numbered lists
* Tables
* Code blocks
* Text and image hyperlinks
* Embedded images uploaded from your computer
* Embedded ClearML task content

![Report](../img/webapp_report.png)

Publishing a report locks it for future editing, so you can preserve its contents. You can also share your reports, 
download a PDF copy, or simply copy the MarkDown content and reuse in your editor of choice.

Access ClearML reports through the [Reports Page](#reports-page).

## Embedding ClearML Visualizations
You can embed plots and images from your experiments into your reports: scalar graphs and other plots, and debug samples 
from an individual experiment or from an experiment comparison page. These visualizations are updated live as the 
experiment(s) updates.

To add a graphic resource: 
1. Go to the resource you want to embed in your report (a plot or debug sample from an individual experiment or 
experiment comparison) 
2. Hover over the resource and click <img src="/docs/latest/icons/ico-plotly-embed-code.svg" alt="Generate embed code" className="icon size-md space-sm" />. 
   
   ![Reports step 2](../img/reports_step_2.png)

   Click `Embed in ClearML report`. This generates the embed code for accessing the resource, and copies 
   it to your clipboard. 
 
   ![Reports step 2a](../img/reports_step_2a.png)

3. Return to your report page and paste the code snippet

   ![Reports step 3](../img/reports_step_3.png)
   
## Reports Page
Use the Reports Page to navigate between and manage reports. 

You can view the reports page in Project view <img src="/docs/latest/icons/ico-project-view.svg" alt="Project view" className="icon size-md" /> 
or in List view <img src="/docs/latest/icons/ico-flat-view.svg" alt="List view" className="icon size-md" />. In List 
view, all reports are shown side-by-side. In Project view, reports are organized according to their projects, and 
top-level projects are displayed. Click on a project card to view the project's reports.

![Report page](../img/webapp_report_page.png)

## Project Cards
In Project view, project cards display a project’s summarized report information:

<div class="max-w-50">

![Report project card](../img/webapp_report_project_card.png)

</div>

Click on a project card to view its reports.

### Report Cards

In List view, the report cards display summarized report information:

<div class="max-w-50">

![report card](../img/webapp_report_card.png)

</div>

* Report name
* Report's project
* Creating user
* Last update time
* Status
* Description
* Tags 

#### Report Actions

Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> on the top right
of a report card to open its context menu and access report actions:  

<div class="max-w-50">

![Report card context menu](../img/webapp_report_card_context_menu.png)

</div>

* **Rename** - Change the report’s name
* **Share** - Copy URL to share report
* **Add Tag** - Add labels to the report to help easily classify groups of reports.
* **Move to** - Move the report into another project. If the target project does not exist, it is created on-the-fly.
* **Archive** - Move report from active reports page to archive
* **Delete** - Delete the report. To delete a report, it must first be archived. 

### Create New Reports

To create a new project, click the **+ NEW REPORT** button in the top right of the page, 
which will open a **New Report** modal.

![New project modal](../img/webapp_report_new_report.png)

## MarkDown Formatting Quick Guide

The following is a quick reference for the MarkDown syntax that can be used in ClearML Reports.

### Heading Levels

To create headings, add `#` in front of the phrases that you want to turn into
headings. The number of `#` signs correspond to the heading level (i.e. `#` for level-1 heading, `##` for level-2, etc.): 

| MarkDown | Rendered Output |
|---|---|
| <code># H1<br/>## H2<br/>### H3<br/>#### H4<br/>##### H5<br/>###### H6</code>|![Report headings](../img/reports_headings.png)|

### Text Emphasis

The following table presents the text format options: 

|Format Option| MarkDown | Rendered Output |
|---|---|---|
|Bold | \*\*This is bold text\*\* and \_\_so is this\_\_ |**This is bold text** and __so is this__|
|Italics | \*This is italic text\* and \_so is this\_|*This is italic text* and _so is this_|
|Strikethrough |\~\~Strikethrough\~\~ |~~Strikethrough~~|
|Inline Code | \`this is code\`| `this is code` |

### Blockquotes

To create a blockquote, add a `>` before each line of the quote. Nest blockquotes by adding additional 
`>` signs before each line of the nested blockquote.  

| MarkDown | Rendered Output |
|---|---|
| <code>\> Blockquote<br/>\>\> Nested quote 1<br/>\>\>\> Nested quote 2</code>|![Report Blockquotes](../img/reports_blockquotes.png)|

### Lists

#### Ordered List

Create an ordered list by numbering the list items with numbers followed by periods. The list items do not have to be numbered 
correctly, but the list will be rendered numerically starting with `1.`.

| MarkDown | Rendered Output |
|---|---|
| <code>1. Item 1<br/>2. Item 2<br/>1. Item 3<br/>1. Item 4</code>|![Report ordered list](../img/reports_ordered_list.png)|

#### Unordered List

Create an unordered list by starting each line with the `+`, `-`, or `*` signs. Different 
signs can be used to create the bullets in the same list, but they are all rendered uniformly.

You can also use checkmarks (`* [x]`), following any of the bullet signs. 

To nest lists, indent nested items 2 spaces more than their parent list item.

| MarkDown | Rendered Output |
|---|---|
| <code>+ Item 1<br/>+ Item 2<br/>&nbsp;&nbsp;- Sub-item a:<br/>&nbsp;&nbsp;&nbsp;&nbsp;\* Sub-sub-item x<br/>&nbsp;&nbsp;&nbsp;&nbsp;+ Sub-sub-item y<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Sub-sub-item z<br/>\* [x] A checkmark </code>|![Report unordered list](../img/reports_unordered_list.png)|


### Tables

MarkDown code for a table looks like this:

```markdown
|          | Align Right | Align Left | Align Center |
| -------- | -----------:|:---------- |:------------:|
| 1        |           1 | 1          |      1       |
| 11       |          11 | 11         |      11      |
```

The rendered output should look like this:

![Reports table](../img/reports_table.png)

Add the table column names in the first row; each name is preceded and followed by a pipe (`|`).
In the second row, add sets of at least three hyphens (`---`) for each column, and add a pipe before and after each set 
of hyphens. In the second row, you can specify each table column's contents alignment. To align the contents to the 
left, place a colon (`:`) to the left of the hyphens. To align right, place a colon to the right of the hyphens. To 
center align, place colons on both sides of the hyphens. 

### Code

To render inline code, surround the code with single backticks (<code>\`</code>). For example \`code\` will be rendered `code`. 

To create block code, use one of the following options:
* Indent the code  
    ```
        from clearml import Task

        t = Task.init(project_name='My project', task_name='Base')
    ```

* Surround code with "fences"--three backticks (<code>```</code>):

      ```
      from clearml import Task

      t = Task.init(project_name='My project', task_name='Base')
      ```

Both of these options will be rendered as:

```
from clearml import Task

t = Task.init(project_name='My project', task_name='Base')
```

#### Syntax Highlighting 

To display syntax highlighting, specify the coding language after the first fence (e.g. <code>\```python</code>, <code>\```json</code>, <code>\```js</code>, etc.):

    ```python
    from clearml import Task

    t = Task.init(project_name='My project', task_name='Base')
    ```

The rendered output should look like this:

```py
from clearml import Task

t = Task.init(project_name='My project', task_name='Base')
```


### Links

To create a link, enclose link text inside brackets, followed by the URL link enclosed in parentheses:

```
[link text](https://clear.ml)
```

The rendered output should look like this:
[link text](https://clear.ml)

To add a title to the link, which you can see in a tooltip when hovering over the link, add the title after the URL
link in the parentheses: 

```
[link with title](https://clear.ml "ClearML Documentation")
```

The rendered output should look like this: [link with title](https://clear.ml "ClearML Documentation"). Hover over the 
link to see the link's title.

### Collapsible Sections

The MarkDown code for a collapsible panel looks like this:

| MarkDown | Rendered Output |
|---|---|
| <code><details\><br/>&nbsp<summary\>Section title</summary\><br/>&nbsp;&nbsp;Collapsible Section Contents<br/></details\></code>|<details><summary>Section title</summary>Collapsible Section Contents</details>|

The collapsible panel is surrounded by `<details>` tags. Within the `<details>` tag, add the section's title between
the `<summary>` tags. This title can be seen when the panel is collapsed. After the `</summary>` tag, add the panel
contents. 

### Horizontal Rules

Create horizontal lines using three hyphens (`---`), underscores (`___`), or asterisks (`***`): 

| MarkDown | Rendered Output |
|---|---|
| <code>---<br/><br/>___<br/><br/>***</code>|![Reports horizontal rules](../img/reports_horizontal_rules.png)|


### Images

To add an image, add an exclamation point, followed by the alt text enclosed by brackets, followed by the link to the 
image enclosed in parentheses: 

```
![Logo](https://raw.githubusercontent.com/allegroai/clearml/master/docs/clearml-logo.svg)
```

The rendered output should look like this:

![Logo](https://raw.githubusercontent.com/allegroai/clearml/master/docs/clearml-logo.svg)

To add a title to the image, which you can see in a tooltip when hovering over the image, add the title after the image's
link: 

```
![With title](https://raw.githubusercontent.com/allegroai/clearml/master/docs/clearml-logo.svg "ClearML logo")
```
The rendered output should look like this:

![Logo with title](https://raw.githubusercontent.com/allegroai/clearml/master/docs/clearml-logo.svg "ClearML logo")

Hover over the image to see its title. 






