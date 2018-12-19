from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import Twitter_Review
import json

# Use flask_pymongo to set up mongo connection
app = Flask(__name__)
mongo = PyMongo(app, uri="mongodb://localhost:27017/wine_single_review_db")

# route
@app.route("/")
def index():
    wine = mongo.db.all_info_coll.find({})
    wine_list = []
    for w in wine:
        w['_id'] = str(w['_id'])
        wine_list.append(w)
    # print(wine)
    checking = json.dumps(list(wine_list))
    print(checking)
    return render_template("index.html", wine_list = list(wine_list))
    # return render_template("index.html", wine_list = json.dumps(list(wine_list)))


@app.route("/reviews")
def scrape():
    
    wine = mongo.db.wine_single_review_db
    wine_data = Twitter_Review.scrape()
    wine.update({}, wine_data, upsert=True)
    
    return redirect("http://localhost:5000/", code=302)

if __name__ == "__main__":
    app.run(debug=True)

# @app.route('/')
# def list_authors():
#     """List all authors.

#     e.g.: GET /authors"""
#     wine = mongo.db.all_info_coll.query.all()
#     # wine = mongo.db.all_info_coll.find({})
#     w = '<p>Authors:</p>'
#     for w in wine:
#         w += '<p>%s</p>' % wine
#     return w

# if __name__ == '__main__':
#     app.run()