
# coding: utf-8

# ## Setup

# In[21]:


# Dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from pprint import pprint
import requests
import pymongo
import json
 


# In[22]:


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)


# In[23]:


db = client.wine_single_review_db
all_info_coll = db.all_info_coll


# In[24]:


pd.read_csv("wine_fulldata.csv")


# In[25]:


twitter_wine = pd.read_csv("wine_fulldata.csv")


# In[26]:


twitter_wine['taster_twitter_handle'].nunique()


# In[27]:


twitter_names = twitter_wine['taster_twitter_handle'].unique()
twitter_names


# In[28]:


twitter_wine[twitter_wine['taster_twitter_handle'] == "@paulgwine\xa0"].iloc[0]


# In[29]:


df = twitter_wine.drop_duplicates("taster_twitter_handle")
df


# In[30]:


records = json.loads(df.T.to_json()).values()
records


# In[31]:


single_review = []
for names in twitter_names:
#     info = twitter_wine[twitter_wine['taster_twitter_handle'] == names].iloc[0].to_dict()
    info = json.loads(twitter_wine[twitter_wine['taster_twitter_handle'] == names].iloc[0].to_json()).values()
    single_review.append(info)
#     print(info)
print(single_review)


# In[32]:


single_review[0]


# In[ ]:


all_info_coll.insert(records)


# In[ ]:


all_info_coll.insert_many(single_review)

