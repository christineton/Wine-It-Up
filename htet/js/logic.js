// d3.csv('data/wine_fulldata.csv', function(error, wineData) {
    var myMap = L.map('map', {
        center: [
            37.09, -115.71
        ],
        zoom: 6,
    });

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    }).addTo(myMap);
// });

d3.csv('../data/wine_fulldata.csv', function(error, wineData) {
    if (error) throw error;
    
    for (i = 0; i < wineData.length; i++) {
        var region = wineData[i].first_region;
        console.log(region);
    };

});