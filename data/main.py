import requests
import os
from os.path  import basename
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
from random import randint
import unicodedata
import json
from functions import Fix, Scrape

with open('./soccer_data.json') as f:
  soccer_data = json.load(f)

# with open('./dict_soccer_data1.json') as f:
#   soccer_data = json.load(f)

Scrape.league_data(soccer_data)
with open('dict_soccer_teams.json', 'w') as fp:
    json.dump(soccer_data, fp, indent=4, sort_keys=True, default=str)
    # json.dump(soccer_data, fp, default=str) 

Scrape.team_data(soccer_data)
Fix.heights(soccer_data)
with open('dict_soccer_data.json', 'w') as fp:
    json.dump(soccer_data, fp, indent=4, sort_keys=True, default=str)
    # json.dump(soccer_data, fp, default=str) 