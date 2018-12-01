from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import Twitter_Review

# Use flask_pymongo to set up mongo connection
app = Flask(__name__)
mongo = PyMongo(app, uri=“mongodb://localhost:27017/wine_single_review_db”)

# route
@app.route(“/”)
def index():
   wine = mongo.db.wine_single_review_db.find_one()
   # print(mars)
   return render_template(“index.html”, wine = wine)

@app.route(“/twitter”)
def scrape():

   wine = mongo.db.wine_single_review_db
   wine_data = Twitter_Review.scrape()
   wine.update({}, wine_data, upsert=True)

   return redirect(“http://localhost:5000/“, code=302)

if __name__ == “__main__“:
   app.run(debug=True)