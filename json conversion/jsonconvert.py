import csv
import json

csvfile = open('wine_fulldata.csv', 'r')
jsonfile = open('wine_json2.json', 'w')

fieldnames = ("id","id","country","description","designation","points","price","province","first_region","second_region","taster_name","taster_twitter_handle","title","variety","winery")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')