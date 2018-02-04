#!/usr/bin/env node

// Copyright (c) 2017 Intel Corporation. All rights reserved.
// Use of this source code is governed by an Apache 2.0 license
// that can be found in the LICENSE file.


'use strict';

const rs2 = require('../index.js');
const {GLFWWindow} = require('./glfw-window.js');
const {glfw} = require('./glfw-window.js');

// A GLFW Window to display the captured image
const win = new GLFWWindow(1280, 720, 'Node.js Capture Example');

// Colorizer is used to map distance in depth image into different colors
const colorizer = new rs2.Colorizer();

// The main work pipeline of camera
const pipeline = new rs2.Pipeline();

const ds = new rs2.DepthSensor();

function getMin(set)
{
  var min = set[0];
  for (var i = 1; i < set.length; i++)
  {
    if (set[i] < min){
      min = set[i];
    }
  }
  return min;
}

function getMax(set)
{
  var min = set[0];
  for (var i = 1; i < set.length; i++)
  {
    if (set[i] > min){
      min = set[i];
    }
  }
  return min;
}


function main() {


// Start the camera
const cfg = new rs2.Config;
cfg.enableDeviceFromFile("depth_under_water.bag");
pipeline.start(cfg);

var x_min = 1280 * .48;
var x_max = 1280 * .52;
var y_min = 720 * .48;
var y_max = 720 * .52;
var array = [];
var set = new Set();
var done = [];
var min1 = [];
var max1 = [];
var counter = 0;
var distance = 0;

while (! win.shouldWindowClose()) {
  const frameset = pipeline.waitForFrames();
  // Build the color map
  var df = frameset.depthFrame
  array.push(df.getDistance(700,360));
  
  if (array.length % 10 == 0)
  {

    counter = counter + 1;
    max1.push(getMax(array))
    min1.push(getMin(array))
    if (counter == 2)
    {
      counter = 0;
      distance = getMax(max1) - getMin(min1);
      done.push(distance);
      if (done.length == 11)
        return done;
    }
    array = [];
  }
  
  const depthMap = colorizer.colorize(df);
  if (depthMap) {
    // Paint the images onto the window
    win.beginPaint();
    const color = frameset.colorFrame;
    glfw.draw2x2Streams(win.window, 2,
        depthMap.data, 'rgb8', depthMap.width, depthMap.height,
        color.data, 'rgb8', color.width, color.height);
    win.endPaint();
    //array.push({key: frameset.depthFrame.getDistance(700,360), value: frameset.depthFrame.getDistance(700,360)});
  }
}


pipeline.stop();
pipeline.destroy();
win.destroy();
rs2.cleanup();

}

console.log(main());


