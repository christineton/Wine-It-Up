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
    "Basic": emeraldmap,
    "Dark": darkmap,
    "Howdy": piratemap
};

var layers = {
    cheap: new L.LayerGroup(),
    expensive: new L.LayerGroup(),
    veryEx: new L.LayerGroup(),
    other: new L.LayerGroup()
};

var myMap = L.map('map', {
    center: [
        37.09, -115.71
    ],
    zoom: 6,
    layers: [
        emeraldmap, 
        layers.cheap,
        layers.expensive,
        layers.veryEx
    ]
});

emeraldmap.addTo(myMap);

var overlays = {
    "Great Cheap Wines": layers.cheap,
    "Great Expensive Wines": layers.expensive,
    'Great & Very Expensive Wines': layers.veryEx
};

L.control.layers(baseMaps, overlays).addTo(myMap);

var icons = {
    cheap: L.ExtraMarkers.icon({
        icon: 'fa-wine-glass-alt',
        iconColor: 'white',
        markerColor: 'green',
        shape: 'circle',
        prefix: 'fa'
    }),
    expensive: L.ExtraMarkers.icon({
        icon: 'fa-wine-glass-alt',
        iconColor: 'white',
        markerColor: 'yellow',
        shape: 'circle',
        prefix: 'fa'
    }),
    veryEx: L.ExtraMarkers.icon({
        icon: 'fa-wine-glass-alt',
        iconColor: 'white',
        markerColor: 'red',
        shape: 'circle',
        prefix: 'fa'
    })
};

d3.csv('https://github.com/christineton/Wine-It-Up/blob/master/top_1000.csv', function(data) {
    // console.log(data);
    
    var priceLevel;

    for (var i = 0; i < 500; i++) {
        if (data[i].price <= 30) {
            priceLevel = 'cheap';
        }
        else if (data[i].price <= 80) {
            priceLevel = 'expensive'
        }
        else if (data[i].price > 80) {
            priceLevel = 'veryEx';
        }
        else {
            priceLevel = 'noData';
        }
        
        var marker = L.marker([data[i].Latitude, data[i].Longitude], {
            icon: icons[priceLevel]
        });

        marker.addTo(layers[priceLevel]);

        marker.bindPopup("<h4>" + data[i].title + "<hr> Price per Bottle: " + data[i].price + "</h4>");
    }
});