function createMap(winePoints) {
    var emeraldmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.emerald",
    accessToken: API_KEY
    });

    var piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.pirates",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Green": emeraldmap,
        "Dark": darkmap,
        "Howdy": piratemap
    };

    // var layers = {
    //     GOOD_WINE: new L.LayerGroup(),
    //     GREAT_WINE: new L.LayerGroup()
    // };
    
    var overlayMaps = {
        "Wine Spots": winePoints //,
        // "Good Wine": layers.GOOD_WINE,
        // "Great Wine": layers.GREAT_WINE
    };

    var myMap = L.map('map', {
        center: [
            37.09, -115.71
        ],
        zoom: 6,
        layers: [
            emeraldmap, 
            winePoints //,
            // layers.GOOD_WINE,
            // layers.GREAT_WINE
        ]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var info = L.control({
        position: 'bottomright'
    });

    info.onAdd = function() {
        var div = L.DomUtil.create('div', 'legend');
        return div;
    };

    info.addTo(myMap);
};

function createMarkers(wineData) {
    var wineSpots = [];

    // TO FIX: Only shows icon and doesn't show the marker
    var specialMarker = L.ExtraMarkers.icon({
        icon: 'fa-wine-glass-alt',
        iconColor: 'white',
        markerColor: 'red',
        shape: 'circle',
        prefix: 'fa'
    });

    // var specialMarker = L.ExtraMarkers.icon({
    //     icon: "ion-android-bicycle",
    //     iconColor: "white",
    //     markerColor: "red",
    //     shape: "circle"
    // });

    for (var i = 0; i < 500; i++) {
        var lat = wineData[i].Latitude;

        var lon = wineData[i].Longitude;

        var wineSpot = L.marker([lat, lon], {icon: specialMarker})
            .bindPopup("<h4>" + wineData[i].title + "<hr> Price per Bottle: " + wineData[i].price + "</h4>");

        wineSpots.push(wineSpot);
    }
    

    createMap(L.layerGroup(wineSpots));
}




d3.csv('../top_1000.csv', createMarkers);
