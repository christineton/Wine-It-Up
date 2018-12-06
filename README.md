# Wine It Up

## Data Clean Up <br/>
We worked with a data set we found on Kaggle that had 10 columns and 130,000+ Wine Reviews.  With this, we found that we had a great combined amount of data such as country, description, designation, points, price, province.  Since our data set was so large, we moved forward with cleaning up the data with Pandas.  Our new data now concluded to be just the US resulting in ~22,000 wine reviews.  We did this by cleaning up all rows that had empty info.

## Data Table:<br/>

The data table section (data.html) shows the entire data set when loaded. The records are filterable by 5 fields:

<br/>
    
•    The variety of the wine.<br/>
•   The state the winery is located.<br/>
•    The name of the wine taster / reviewer.<br/>
•    The name of the winery.<br/>
•    The price of the wine reviewed.<br/>

After the page loads, you can review the records for possible entries to filter on. Entering an exact match for the record and pressing search will return the results.<br/>
There are a large number of records so the page loads very slowly. This is due to the HTML calling a .js file with json entries for each record. Ideally, this would be optimized by using SQLAlchemy or SQLite. Have a glass of wine while you wait! <br/>

<<<<<<< HEAD
## Mapping Top Wines
---
=======
## Map <br/>

>>>>>>> 212a1eaad8fa4d89fceac5efb9c99834377e3c5b
The map shows the top 500 wines featuring custom wine markers (made using [Leaflet Extra Markers](https://github.com/coryasilva/Leaflet.ExtraMarkers) and [Font Awesome](https://fontawesome.com/)). Click on the marker to find out the name of the wine and the price per bottle.

![alt-text](images/map.png)

##### Getting Coordinates for Each Wine Region
The data file provided the region and winery from which the wine was produced. To map each wine, we used [Google Maps API](https://developers.google.com/maps/documentation/) to get the coordinates of each region.

Limitations: For some of the regions, there are more than one with the same name in the world. To improve the accuracy of the coordinates, we combined region 1 and region 2 columns to get a more specific name of the region.

## Authors <br/>
+ [Alex Barrera](https://github.com/Alexbp)
+ [Christine Ton](https://github.com/christineton)
+ [Htet Yi Linn](https://github.com/hlinn1)
+ [Amad Merhi](https://github.com/AhmadBouMerhi)
