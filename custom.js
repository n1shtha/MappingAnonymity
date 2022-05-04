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
  map.setFilter('temporality_count_sequence_number', ['==', ['temporal_sequece', ['get', 'count']], 1]);
  document.getElementById('temporality').innerText = '1 Pre-Partition (before 1947-08-14)'
  map.setLayoutProperty('temporality_count_sequence_number', 'visibility', 'none')

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
    
     map.setFilter('temporality_count', ['==', ['temporal_sequence', ['get', 'temporal_sequence']], step]);
     //This sets the label above the slider to the period value.
     document.getElementById('temporality').innerText = label[step - 1] // + ampm;
  })
}

const chapters = {
'part_1': {
bearing:0,
center: [77.0688997, 28.5272803],
zoom: 3,
pitch: 0
},
'part_2': {
duration: 7000,
center: [74.3141829, 31.5656822],
bearing: 0,
zoom: 10,
pitch: 0
},
'part_3': {
bearing: 45,
center: [74.3383, 31.5767],
zoom: 13,
speed: 1,
pitch: 50
},
'part_4': {
bearing: 45,
center: [74.8736788, 31.6343083],
zoom: 14,
pitch: 65,
speed: .5
},
'part_5': {
bearing: 180,
center: [77.1835, 28.6239],
zoom: 11,
pitch: 10,
speed: 1,
curve:1
},
'part_6': {
bearing: 25,
center: [77.0688997, 28.5272803],
zoom: 7
}
};

let activeChapterName = 'part_1';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;

map.flyTo(chapters[chapterName]);

document.getElementById(chapterName).classList.add('active');
document.getElementById(activeChapterName).classList.remove('active');

activeChapterName = chapterName;
}

function isElementOnScreen(id) {
const element = document.getElementById(id);
const bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// On every scroll event, check which element is on screen
window.onscroll = () => {
for (const chapterName in chapters) {
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
}
};
