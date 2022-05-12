// JavaScript for enabling the map on load. Change the access token and the web page.

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWxhbWFuaXNoIiwiYSI6ImNsMXQ4eDliMzB6N3kzb3FxbzY3ZmN5bDYifQ.swLACYH2fKaTe93_6hQ5sg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/ilamanish/cl31ode73001w14pi8htaefck",
  center: [77.0688997, 20.5272803],
  zoom: 4,
  bearing: 0,
  pitch: 0,
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/ilamanish/" + layerId);
  };
}

//This is all the stuff that runs on the first load of the map.
map.on("load", () => {
  //Hide all presentation layers
  //This demo uses three specific layers. I want to hide them initially so I can reveal them piece meal.
  map.setLayoutProperty(
    "Percentage of Unknown Characters",
    "visibility",
    "none"
  );
  map.setLayoutProperty(
    "Percentage of Unknown Male Characters",
    "visibility",
    "none"
  );
  map.setLayoutProperty(
    "Percentage of Unknown Female Characters",
    "visibility",
    "none"
  );
  map.setLayoutProperty(
    "Percentage of Unknown Female Characters in Private Spaces",
    "visibility",
    "none"
  );
  map.setLayoutProperty(
    "Percentage of Unknown Female Characters in Public Spaces",
    "visibility",
    "none"
  );
  map.setLayoutProperty(
    "Percentage of Unknown Male Characters in Public Spaces",
    "visibility",
    "none"
  );
  map.setLayoutProperty(
    "Percentage of Unknown Male Characters in Public Spaces",
    "visibility",
    "none"
  );

  //Hide the legend, slider, and infobox on first load. Obviously delete these lines if you want them visible from the start.
  //document.getElementById("legend").style.display = "none";

  //to reduce clutter, the steps for creating a legend, slider, and menu have all been turned into functions.
  createLegend();
  // createSlider();
  // createMenu();
});

/**
 
function createMenu() {
  // MENU For selecting layers
  // Read in all the layers you want to toggle
  var toggleableLayerIds = [
    "Percentage of Unknown Male Characters",
    "Percentage of Unknown Male Characters in Private Spaces",
    "Percentage of Unknown Male Characters in Public Spaces",
    "Percentage of Unknown Female Characters",
    "Percentage of Unknown Female Characters in Private Spaces",
    "Percentage of Unknown Female Characters in Public Spaces",
  ];

  //These are the names for the layers that will appear on the menu
  var layerNames = [
    "Males",
    "Males in Private Spaces",
    "Males in Public Spaces",
    "Females",
    "Females in Private Spaces",
    "Females in Public Spaces",
  ];

  //Loop that generates a menu item for each layer in the above array.
  for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var name = layerNames[i];
    var link = document.createElement("a");
    link.href = "#";
    link.className = ""; //Menu initially sets every item as inactive.
    link.textContent = name;
    link.id = id;

    //create an event handler for each menu item. If clicked check whether the layer is visible, if so set visibility to 'none' and vice versa.
    link.onclick = function (e) {
      var clickedLayer = this.id;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, "visibility");

      if (visibility === "visible") {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.className = "";
      } else {
        this.className = "active";
        map.setLayoutProperty(clickedLayer, "visibility", "visible");
      }
    };
    var layers = document.getElementById("menu");
    layers.appendChild(link);
  }
}
 */

// //This is a lazy function to hide and show menus relative to the layers. It waits for any change in the map rendering and then checks to see what menu items are active and turns on the infobox, slider, and legend. Normally, you would build this logic into the click event handler for each button.

/** 
map.on("idle", () => {
  var toggleableLayerIds = [
    "Percentage of Unknown Male Characters",
    "Percentage of Unknown Male Characters in Private Spaces",
    "Percentage of Unknown Male Characters in Public Spaces",
    "Percentage of Unknown Female Characters",
    "Percentage of Unknown Female Characters in Private Spaces",
    "Percentage of Unknown Female Characters in Public Spaces",
  ];

  for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var visibility = map.getLayoutProperty(id, "visibility");
    if (
      id == "Percentage of Unknown Male Characters" &&
      visibility === "none"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Male Characters",
        "visibility",
        "visible"
      );
    } else if (
      id == "Percentage of Unknown Male Characters" &&
      visibility === "visible"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Male Characters",
        "visibility",
        "none"
      );
    }
    if (
      id == "Percentage of Unknown Female Characters" &&
      visibility === "none"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Female Characters",
        "visibility",
        "visible"
      );
    } else if (
      id == "Percentage of Unknown Female Characters" &&
      visibility === "visible"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Female Characters",
        "visibility",
        "none"
      );
    }
    if (
      id == "Percentage of Unknown Female Characters in Private Spaces" &&
      visibility === "none"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Female Characters in Private Spaces",
        "visibility",
        "visible"
      );
    } else if (
      id == "Percentage of Unknown Female Characters in Private Spaces" &&
      visibility === "visible"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Female Characters in Private Spaces",
        "visibility",
        "none"
      );
    }
    if (
      id == "Percentage of Unknown Female Characters in Public Spaces" &&
      visibility === "none"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Female Characters in Public Spaces",
        "visibility",
        "visible"
      );
    } else if (
      id == "Percentage of Unknown Female Characters in Public Spaces" &&
      visibility === "visible"
    ) {
      map.setLayoutProperty(
        "Percentage of Unknown Female Characters in Public Spaces",
        "visibility",
        "none"
      );
    }
  }
});

*/

function createLegend() {
  //LEGEND TEXT
  //the var layers array sets the text that will show up in the legend. you can enter any value here it is just text. Make sure that the legend values correspond to the ones you set in Mapbox.
  var layers = ["Male", "Female", "Unknown"];

  //LEGEND COLORS
  //Set the corresponding LEGEND colors using HEX the easiest way to do this is by setting your mapcolors in Mapbox using ColorBrewer (colorbrewer2.org). Then copy the exact same hex value to the array below. Remember that each label above should correspond to a color. If the number of items in layers does not match the number of values in colors you will get an error.

  var colors = ["#54278f", "#d95f0e", "#2ca25f"];

  //run through each element in the legend array and create a new legend item.
  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement("div");
    var key = document.createElement("span");
    key.className = "legend-key";
    key.style.backgroundColor = color;

    var value = document.createElement("span");
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
}
//LEGEND CODE

/** 
function createSlider() {
  //Set the initial view at the first value. In this case, 1 for Pre-Partition.
  map.setFilter("temporality_count_sequence_number", [
    "==",
    ["temporal_sequece", ["get", "count"]],
    1,
  ]);
  document.getElementById("temporality").innerText =
    "1 Pre-Partition (before 1947-08-14)";
  map.setLayoutProperty(
    "temporality_count_sequence_number",
    "visibility",
    "none"
  );

  //Create event listener to catch whenever the slider is moved.
  document.getElementById("slider").addEventListener("input", function (e) {
    //get the value of the movement.
    var step = parseInt(e.target.value, 10);

    //These labels were created to populate the active temporality label. Change them if you are going with your own string sequence.
    var label = [
      "Pre-Partition (before 1947-08-14)",
      "Partition (1947-08-15 - 1948-02-28)",
      "Post-Partition (1948-03-01 - 1971-12-16)",
      "Long Partition (after 1971-12-16)",
      "Indeterminable",
    ];

    //This is the filter function, it relies on the layer name, the comparison operator (==), the first value which it grabs with the get, temporal sequence function, and then the thing being compared against (step), or the step in the sequence of the slider.

    map.setFilter("temporality_count", [
      "==",
      ["temporal_sequence", ["get", "temporal_sequence"]],
      step,
    ]);
    //This sets the label above the slider to the period value.
    document.getElementById("temporality").innerText = label[step - 1]; // + ampm;
  });
}
*/

map.on("mousemove", function (e) {
  var info = map.queryRenderedFeatures(e.point, {
    layers: ["final-percentage-unknown-30pov8"],
  });

  if (info.length > 0) {
    document.getElementById("infobox_content").innerHTML =
      "<h5>" +
      "Percentage of Unnamed Characters: " +
      info[0].properties.percentage_unknown +
      "</h5>" +
      "<p>" +
      "Text title: " +
      info[0].properties.text_title +
      "</p><p>" +
      "Location name: " +
      info[0].properties.location_name +
      "</p><p>" +
      "Page number: " +
      info[0].properties.start_page_event +
      "</p>";
  } else {
    document.getElementById("infobox_content").innerHTML =
      "<p>Select 'All' and hover over an area.</p>";
  }
});

const chapters = {
  part_1: {
    bearing: 0,
    center: [77.0688997, 28.5272803],
    zoom: 1,
    pitch: 0,
  },
  part_2: {
    bearing: 0,
    center: [77.0688997, 28.5272803],
    zoom: 3,
    pitch: 0,
  },
  part_3: {
    bearing: 0,
    center: [77.0688997, 28.5272803],
    zoom: 3,
    pitch: 0,
  },
  part_4: {
    bearing: 0,
    center: [72.8054, 18.9629],
    zoom: 11,
    speed: 1,
  },
  part_5: {
    bearing: 0,
    center: [76.5, 30.43],
    zoom: 11,
    speed: 1,
  },
  part_6: {
    bearing: 0,
    center: [77.0688997, 28.5272803],
    zoom: 3,
    pitch: 0,
  },
  part_7: {
    bearing: 0,
    center: [77.0688997, 28.5272803],
    zoom: 3,
    pitch: 0,
  },
  part_8: {
    bearing: 0,
    center: [77.0688997, 28.5272803],
    zoom: 3,
    pitch: 0,
  },
};

let activeChapterName = "part_1";
function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;

  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).classList.add("active");
  document.getElementById(activeChapterName).classList.remove("active");

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
};



