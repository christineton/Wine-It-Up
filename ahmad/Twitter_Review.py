# Dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from pprint import pprint
import requests
import pymongo
import json
from flask import Flask, render_template
import time
import numpy as np

def init_browser():
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    return Browser('chrome', **executable_path, headless=False)

def scrape():
    # conn = 'mongodb://localhost:27017'
    # client = pymongo.MongoClient(conn)

    # db = client.wine_single_review_db
    # all_info_coll = db.all_info_coll

    pd.read_csv("wine_fulldata.csv")


    twitter_wine = pd.read_csv("wine_fulldata.csv")

    twitter_wine['taster_twitter_handle'].nunique()

    twitter_names = twitter_wine['taster_twitter_handle'].unique()


    twitter_wine[twitter_wine['taster_twitter_handle'] == "@paulgwine\xa0"].iloc[0]


    df = twitter_wine.drop_duplicates("taster_twitter_handle")


    records = json.loads(df.T.to_json()).values()

    single_review = []
    for names in twitter_names:
    #     info = twitter_wine[twitter_wine['taster_twitter_handle'] == names].iloc[0].to_dict()
        info = json.loads(twitter_wine[twitter_wine['taster_twitter_handle'] == names].iloc[0].to_json()).values()
        single_review.append(info)

    single_review[0]
    return single_review

    # all_info_coll.insert(records)

    # all_info_coll.insert_many(single_review)

