---
title: Annotations
---

With ClearML Enterprise, annotations can be applied to video and image frames. [Frames](single_frames.md) support 
two types of annotations: **Frame objects** and **Frame labels**.

Annotation Tasks can be used to efficiently organize the annotation of frames in Dataset versions (see 
[Annotations Task Page](webapp/webapp_annotator.md)).  

For information about how to view, create, and manage annotations using the WebApp, see [Annotating Images and Videos](#annotating-images-and-video).

## Frame objects

Frame objects are labeled Regions of Interest (ROIs), which can be bounded by polygons (including rectangles), ellipses, 
or key points. These ROIs are useful for object detection, classification, or semantic segmentation. 

Frame objects can include ROI labels, confidence levels, and masks for semantic segmentation. In ClearML Enterprise, 
one or more labels and sources dictionaries can be associated with an ROI (although multiple source ROIs are not frequently used).

## Frame labels

Frame labels are applied to an entire frame, not a region in a frame.


## Usage

### Adding a frame object

To add a frame object annotation to a SingleFrame, use the [`SingleFrame.add_annotation`](google.com) method.  

```python
# a bounding box labeled "test" at x=10,y=10 with width of 30px and height of 20px
frame.add_annotation(box2d_xywh=(10, 10, 30, 20), labels=['test'])
```

The argument `box2d_xywh` specifies the coordinates of the annotation's bounding box, and the argument `labels` specifies
a list of labels for the annotation.

When adding an annotation there are a few options for entering the annotation's boundaries, including: 
* `poly2d_xy` - A list of floating points (x,y) to create for single polygon, or a list of Floating points lists for a 
  complex polygon
* `ellipse2d_xyrrt` - A List consisting of cx, cy, rx, ry, and theta for an ellipse 
* And more! See [`SingleFrame.add_annotation`](google.com) for further options. 

### Adding a Frame label

Adding a frame label is similar to creating a frame objects, except that coordinates don't need to be specified, since 
the whole frame is being referenced. 

Use the [`SingleFrame.add_annotation`](google.com) method, but use only the `labels` parameter. 

```python
# labels for the whole frame        
frame.add_annotation(labels=['frame level label one','frame level label two'])
```
