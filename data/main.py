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
from functions import league_data , team_data, heights

# with open('./soccer_data.json') as f:
#   soccer_data = json.load(f)

# teams_data = league_data(soccer_data)
# with open('dict_soccer_teams.json', 'w') as fp:
#     json.dump(teams_data, fp, indent=4, sort_keys=True, default=str)

with open('./dict_soccer_teams.json') as f:
  teams_data = json.load(f)

full_data = team_data(teams_data)
heights(full_data)

with open('dict_soccer_data.json', 'w') as fp:
    json.dump(full_data, fp, indent=4, sort_keys=True, default=str)
