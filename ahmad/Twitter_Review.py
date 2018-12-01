
# coding: utf-8

# ## Setup

# In[85]:


# Dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from pprint import pprint
import requests
import pymongo
 


# In[86]:


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)


# In[87]:


db = client.wine_single_review_db
all_info_coll = db.all_info_coll


# In[88]:


pd.read_csv("wine_fulldata.csv")


# In[89]:


twitter_wine = pd.read_csv("wine_fulldata.csv")


# In[90]:


twitter_wine['taster_twitter_handle'].nunique()


# In[91]:


twitter_names = twitter_wine['taster_twitter_handle'].unique()
twitter_names


# In[92]:


twitter_wine[twitter_wine['taster_twitter_handle'] == "@paulgwine\xa0"].iloc[0]


# In[134]:


df = twitter_wine.drop_duplicates("taster_twitter_handle")
df


# In[136]:


records = json.loads(df.T.to_json()).values()
records


# In[129]:


single_review = []
for names in twitter_names:
#     info = twitter_wine[twitter_wine['taster_twitter_handle'] == names].iloc[0].to_dict()
    info = json.loads(twitter_wine[twitter_wine['taster_twitter_handle'] == names].iloc[0].to_json()).values()
    single_review.append(info)
#     print(info)
print(single_review)


# In[130]:


single_review[0]


# In[137]:


all_info_coll.insert(records)

