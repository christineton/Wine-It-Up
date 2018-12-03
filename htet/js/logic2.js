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

    var overlayMaps = {
        "Wine": winePoints
    };

    var myMap = L.map('map', {
        center: [
            37.09, -115.71
        ],
        zoom: 6,
        layers: [emeraldmap, winePoints]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
};

function createMarkers(wineData) {
    var wineSpots = [];

    for (var i = 0; i < 100; i++) {
        var lat = wineData[i].Latitude;

        var lon = wineData[i].Longitude;

        var wineSpot = L.marker([lat, lon])
            .bindPopup("<h4>" + wineData[i].title + "<hr> Price per Bottle: " + wineData[i].price + "</h4>");
        
        wineSpots.push(wineSpot);
    }

    createMap(L.layerGroup(wineSpots));
}




d3.csv('../data/wine_data_coords.csv', createMarkers);
