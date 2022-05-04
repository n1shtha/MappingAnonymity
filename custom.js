// JavaScript for enabling the map on load. Change the access token and the web page.

mapboxgl.accessToken = 'pk.eyJ1IjoiaWxhbWFuaXNoIiwiYSI6ImNsMXQ4eDliMzB6N3kzb3FxbzY3ZmN5bDYifQ.swLACYH2fKaTe93_6hQ5sg';

//Set the initial map view
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/ilamanish/cl2r6nsvb000c14p1x9wtvzwh', // style URL
  center: [77.0688997, 20.5272803], // starting position [lng, lat]
  zoom: 4, // starting zoom
  bearing: 0, //controls the left-right rotation of the map in degrees
  pitch: 0 //controls the up-down rotation of the map.
});

//This is all the stuff that runs on the first load of the map.
map.on('load', () => {
  //Hide all presentation layers
  //This demo uses three specific layers. I want to hide them initially so I can reveal them piece meal.
//   map.setLayoutProperty('final_percentage_unknown', 'visibility', 'none');

//Hide the legend, slider, and infobox on first load. Obviously delete these lines if you want them visible from the start.
// document.getElementById('legend').style.display = 'none';

  //to reduce clutter, the steps for creating a legend, slider, and menu have all been turned into functions.
  createLegend()
  createSlider()
});

// //This is a lazy function to hide and show menus relative to the layers. It waits for any change in the map rendering and then checks to see what menu items are active and turns on the infobox, slider, and legend. Normally, you would build this logic into the click event handler for each button.

// map.on('idle', () => {

//   var toggleableLayerIds = ['final_percentage_unknown'];

//   for (var i = 0; i < toggleableLayerIds.length; i++) {
//     var id = toggleableLayerIds[i];
//     var visibility = map.getLayoutProperty(id, 'visibility');
//   }
// });

function createLegend() {
  //LEGEND TEXT
  //the var layers array sets the text that will show up in the legend. you can enter any value here it is just text. Make sure that the legend values correspond to the ones you set in Mapbox.
  var layers = ['Male', 'Female', 'Other'];

  //LEGEND COLORS
  //Set the corresponding LEGEND colors using HEX the easiest way to do this is by setting your mapcolors in Mapbox using ColorBrewer (colorbrewer2.org). Then copy the exact same hex value to the array below. Remember that each label above should correspond to a color. If the number of items in layers does not match the number of values in colors you will get an error.

  var colors = ['#54278f', '#d95f0e', '#2ca25f'];

//run through each element in the legend array and create a new legend item.
  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
  //LEGEND CODE
  
  function createSlider() {
  //Set the initial view at the first value. In this case, 1 for Pre-Partition.
  map.setFilter('temporality-count', ['==', ['number', ['get', 'temporal_sequence']], 1]);
  document.getElementById('active-temporality').innerText = 'Pre-Partition (before 1947-08-14)'
  map.setLayoutProperty('temporality-count', 'visibility', 'none')

  //Create event listener to catch whenever the slider is moved.
  document.getElementById('slider').addEventListener('input', function(e) {
    //get the value of the movement.
    var step = parseInt(e.target.value, 10);

    //These labels were created to populate the active temporality label. Change them if you are going with your own string sequence.
    var label = ['Pre-Partition (before 1947-08-14)',
      'Partition (1947-08-15 - 1948-02-28)',
      'Post-Partition (1948-03-01 - 1971-12-16)',
      'Long Partition (after 1971-12-16)',
      'Indeterminable'
    ]

    //This is the filter function, it relies on the layer name, the comparison operator (==), the first value which it grabs with the get, temporal sequence function, and then the thing being compared against (step), or the step in the sequence of the slider.

    map.setFilter('temporality-count', ['==', ['number', ['get', 'temporal_sequence']], step]);
    //This sets the label above the slider to the period value.
    document.getElementById('active-temporality').innerText = label[step - 1] //+ ampm;
  })
}


}
