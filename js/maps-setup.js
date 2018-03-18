// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(48.429386,-123.367345); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});


var legendHTML = "<h1>Legend</h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];

// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
var myGeoJSON= {
  "type":"FeatureCollection",
  "features":
  [{"type":"Feature",
    "properties":{myColor: 'red'},
    "myColor" : "red",
    "geometry":{"type":"Polygon",
                "coordinates":[[[-85.60546875,49.03786794532644],[-96.6796875,40.713955826286046],
                                [-79.62890625,37.71859032558816],[-81.2109375,49.26780455063753],
                                [-85.60546875,49.03786794532644]]]}},
   {"type":"Feature",
    "properties":{myColor: 'green'},
    "myColor" : "green",
     "geometry":{"type":"Polygon",
                 "coordinates":[[[-113.203125,58.35563036280967],[-114.78515624999999,51.944264879028765],
                                 [-101.6015625,51.944264879028765],[-112.32421875,58.263287052486035],
                                 [-113.203125,58.35563036280967]]]
                }}]};






                // add some misisng code to google!
    if (!google.maps.Polygon.prototype.getBounds) {
      google.maps.Polygon.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds();
        this.getPath().forEach(function (element, index) { bounds.extend(element); });
        return bounds;
      };
    }
    var triangleCoords = [
      {lat: 48.42934, lng: -123.36169},
     {lat: 48.43014, lng: -123.36943},
     {lat: 48.42911, lng: -123.36965},
     {lat: 48.42809, lng: -123.37021},
     {lat: 48.42712, lng: -123.36205},
     {lat: 48.42706, lng: -123.36167},
     {lat: 48.42934, lng: -123.36169}
     //final co-ord is same as first co-ord!
    ];
    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      window_content: "<h4>Bermuda Triangle</h4><p>This is a polygon!</p>"
        });
    bermudaTriangle.setMap(my_map);

    google.maps.event.addListener(bermudaTriangle, 'click', function (evt) {
      infowindow.setContent(this.window_content);
      infowindow.setPosition(this.getBounds().getCenter());
      infowindow.open(my_map);
    });









/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 13,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(48.424983,-123.369649),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "Fort Victoria",
              window_content: "<p> Fort Victoria: This Harbour was established as the sole port of entry into British Columbia in 1858 during the Gold Rush. This is the port early Chinese migrants first entered Canada from.</p>"
             },
             {position: new google.maps.LatLng(49.167886,-122.572060),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Fort Langley",
              window_content: "<p>Fort Langley: This was the main gateway to the Goldrush. It was the the Fort nearest to the Fraser River and the major channel of information regarding the mining of gold.</p>"
            },
            {position: new google.maps.LatLng(50.256491,-121.508888),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: "Thompson River",
             window_content: "<p>Thompson River:This is a tributary of Fraser river that Gold was first found in. The gold found here had jumpstarted the pull and further exploration of the Fraser River for gold. </p>"
           },
           {position: new google.maps.LatLng(49.170908,-122.573667),
            map: my_map,
            icon: blueURL, // this sets the image that represents the marker in the map
            title: "Fraser River",
            window_content: "<p>Fraser River: The river was the center of the Gold Rush migration to Canada. The river is approximately 1,375 km long. This point indicates were most mining industries would set out on their hunt for gold after leaving Fort Langley. </p>"
          },
            {position: new google.maps.LatLng(48.429499,-123.367707),
             map: my_map,
             icon: redURL, // this sets the image that represents the marker in the map
             title: "Chinese Consolidated Benevolent Association Headquarters",
             window_content: "<p>Chinese Consolidated Benevolent Association Headquarters: This was the location of the CCBA. The postioning of this structure of Fisgard Street promoted the northward expansion of Vicoria's Chinatown, eventually making this area the heart of Chinatown.</p>"
           },
           {position: new google.maps.LatLng(48.429880,-123.367641),
            map: my_map,
            icon: redURL, // this sets the image that represents the marker in the map
            title: "Chinese Hospital",
            window_content: "<p>Chinese Hospital: This was constructed on Herald Street and encouraged the use of alleyways as most Chinese settlers entered the hospital by walking through the narrow alleys. </p>"
          },
           {position: new google.maps.LatLng(48.429629,-123.365793),
            map: my_map,
            icon: redURL, // this sets the image that represents the marker in the map
            title: "Imperial Chinese School",
            window_content: "<p>Imperial Chinese School: This was the Chinese school made in 1907 during the restricting of Chinese students based on newly designed qualifcation requirements </p>"
        },
        {position: new google.maps.LatLng(48.432204,-123.317651),
         map: my_map,
         icon: blueURL, // this sets the image that represents the marker in the map
         title: "Rock Bay School",
         window_content: "<p>Rock Bay School: This had been the public school most Chinese children had been attending in the early twentieth century in Victoria before being majority of the Chinese children began to be restricted entrance </p>"
       },

            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.title + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  var romeCircle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    // in general, we always have to *set the map* when we
    // add features.
    map: my_map,
    bounds: {
      north: 42.685,
      south: 40.671,
      east: 12.501,
      west: 12.485
    },

    center: {"lat": 48.429386, "lng":-123.367345},
    radius: 1000
  });



  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
