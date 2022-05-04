// JavaScript for enabling the map on load. Change the access token and the web page.

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlzaHRoYWRhcyIsImEiOiJjbDF3NXd0NzcxNXN6M2lxdmZ5ZTlibHg4In0.yzzogggdKJ1aNaST6hbUcg";

window.onload = function () {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/ilamanish/cl2qgws4u005p14o1jmqoa4sl", // style URL
    center: [77.0688997, 20.5272803], // starting position [lng, lat]
    zoom: 4, // starting zoom
  });
};
