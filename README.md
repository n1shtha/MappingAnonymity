# Mapbox Setup
This repository includes the barebones files for getting Mapbox setup. You will need to change the API key in the file `custom.js`. You will also need to change the layer name to your custom style layer.

## Changes

Please see the full video for making the requisite changes. The parts of the text that need to be changed are marked with `Change HERE`.


```
mapboxgl.accessToken = 'Change HERE';

window.onload = function() {
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'Change HERE', // style URL
  center: [77.0688997, 20.5272803], // starting position [lng, lat]
  zoom: 4 // starting zoom
});
};
```
