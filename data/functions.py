# Dependencies
import requests
import os
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
from random import randint
from statistics import mean 
import unicodedata


headers = {'User-agent': 
           'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'}

convert_url = "https://www.google.com/search?q=euro+to+dollar&oq=eur&aqs=chrome.1.69i57j35i39j0j46j0l2j69i61l2.2373j1j4&sourceid=chrome&ie=UTF-8"
html = requests.get(convert_url, headers=headers)
soup = BeautifulSoup(html.content, 'html.parser')
curr_value = soup.find('div', class_= "b1hJbf")
curr_value = round(float(curr_value["data-exchange-rate"]),2)


def value_us( x, curr_value):
    value = []
    for char in x:
        value.append(char)
    if value[-1] == "m":
        float_value = "".join(value[1:-1])
        return round(float(float_value)*curr_value,2)
    else:
        float_value = "".join(value[1:-3])
        return round((float(float_value)*curr_value)/1000,2)


def accents( text):
    try:
        text = unicode(text, 'utf-8')
    except NameError: # unicode is a default on python 3 
        pass

    text = unicodedata.normalize('NFD', text)\
        .encode('ascii', 'ignore')\
        .decode("utf-8")

    return str(text.strip())



def heights( soccer_data1):
    for player in soccer_data1['players']:
        
        if player["height"] == 0:
            # print(player["name"])
            list_height= []
            targ_player = player
            nat = targ_player["nat"]
            position = targ_player["position"]
            field_position = targ_player["field_position"]
            for player in soccer_data1['players']:
                if player["position"] == position and player["nat"] == nat:
                    if player["height"] != 0:
                        list_height.append(float(player["height"]))

                if len(list_height) == 0:
                    if player["field_position"] == field_position and player["nat"] == nat:
                        if player["height"] != 0:
                            list_height.append(float(player["height"]))

                if len(list_height) == 0:
                    if player["field_position"] == field_position:
                        if player["height"] != 0:
                            list_height.append(float(player["height"]))

            # targ_player["height"] = round(sum(list_height) / len(list_height),2)
            targ_player["height"] = round(mean(list_height),2)



def league_data( soccer_data):
    team_id = 1
    for league in soccer_data["leagues"]:
        teams = []
        leaguename = league['league_name']
        url = league["league_link"]
        print(f"scraping: {league['country']}_{league['tier']}_{league['league_name']}")
        time.sleep(1)
        html = requests.get(url, headers=headers)
        soup = BeautifulSoup(html.content, 'html.parser')
        htmltable = soup.find('table', class_= "items")
        results = htmltable.findAll("tr", class_ =["odd","even"])
        #league['clubs'] = {}
        for result in results:
            features = result.findAll("td")
            link = ("https://www.transfermarkt.com"+result.find("a", href=True)\
                        ["href"]+"/plus/1").replace("startseite", "kader").replace("2019", "2020")
            logo = result.find("img", src=True)["src"]
            logo = logo.split("?")[0]
            logo = logo.replace("tiny", "header")
            name = accents(features[1].text)
            # squad = int(features[3].text)
            # foreigner = int(features[5].text)
            # total_MV = float(value_us(features[6].text,curr_value))
            # avg_MV = float(value_us(features[7].text,curr_value))
            
            # All data
            teams.append({"team_ID" : team_id, "league_ID":league["league_ID"], 'league_name': leaguename,
                        "club" : name,
                        #  "squad" : squad, "foreigners" : foreigner, "avg_market_m" : avg_MV, "total_MV_m" : total_MV, 
                         "logo_img" : logo, "link_page" : link})

            # hierachy
        #  teams.append({"team_ID" : team_id,"club" : name, "squad" : squad, "foreigners" : foreigner, "avg_market_m" : avg_MV,
        #                "total_MV_m" : total_MV, "logo_img" : logo, "link_page" : link})
            team_id = team_id + 1
        league["clubs"] = teams
    return soccer_data
    #soccer_data['clubs'] = teams




def team_data( soccer_data):
    player_id = 1
    players = []
    for league in soccer_data["leagues"]:
        for club in league["clubs"]:
            team_id = club["team_ID"]
            team_link = club["link_page"]
            # league_id = club["league_ID"]
            team_name = club["club"]
            print(club["club"])
            time.sleep(randint(1,2))
            html = requests.get(team_link, headers=headers)
            soup = BeautifulSoup(html.content, 'html.parser')
            htmltable = soup.find('table', class_= "items")
            results = htmltable.findAll("tr", class_ =["odd","even"])

            for result in results:
                features = result.findAll("td")

                name_1 = features[2].find("img", alt=True)["alt"]
                name_1 = accents(name_1)

                player_page = "https://www.transfermarkt.com" + features[3].find("a", href=True)["href"]

                position_1 = features[4].text

                if position_1 in ("Centre-Back", "Left-Back", "Right-Back", "Defender"):
                    field_posit = "DEF"
                elif position_1 in ("Defensive Midfield", "Central Midfield" , "Right Midfield" , "Left Midfield" , \
                "Attacking Midfield" , "Midfield"):
                    field_posit = "MID"
                elif position_1 in ("Left Winger" , "Right Winger" , "Centre-Forward" , "Second Striker" , "Forward"):
                    field_posit = "ATT"
                else:
                    field_posit = "GLK"

                try:
                    age_1 = int((features[5].text.split("(",)[-1])[:-1])
                except:
                    age_1 = ""

                nat = features[6].img["alt"]

                # if league_id == 3 or   league_id == 4:
                #     try:
                #         height_1 = float((features[8].text.split(" ")[0]).replace(",", "."))
                #     except:
                #         height_1 = 0

                #     foot_1 = features[9].text
                #     dt_joined_1 = features[10].text
                #     try:
                #         dt_joined_1 = datetime.strptime(dt_joined_1, '%b %d, %Y').date()
                #     except:
                #         dt_joined_1 = ""
                #     try:
                #         prev_team_1 = accents(features[11].img["alt"])
                #     except:
                #         prev_team_1 = "N.A."

                #     contract_expires_1 = features[12].text
                #     try:
                #         contract_expires_1 = datetime.strptime(contract_expires_1, '%d.%m.%Y').date()
                #     except:
                #         contract_expires_1 = ""

                #     try:
                #         market_value_1 = value_us(features[13].text[:-2],curr_value)
                #     except:
                #         market_value_1 = 0
                # else:
                try:
                    height_1 = float((features[7].text.split(" ")[0]).replace(",", "."))
                except:
                    height_1 = 0

                foot_1 = features[8].text

                dt_joined_1 = features[9].text
                try:
                    dt_joined_1 = datetime.strptime(dt_joined_1, '%b %d, %Y').date()
                except:
                    dt_joined_1 = ""

                try:
                    prev_team_1 = accents(features[10].img["alt"])
                except:
                    prev_team_1 = "N.A."


                contract_expires_1 = features[11].text
                try:
                    contract_expires_1 = datetime.strptime(contract_expires_1, '%d.%m.%Y').date()
                except:
                    contract_expires_1 = ""

                try:
                    market_value_1 = value_us(features[12].text[:-2],curr_value)
                except:
                    market_value_1 = 0
                
                if league["country"] == nat:
                    int_player = False
                else:
                    int_player = True


                players.append({"players_ID": player_id, "team_ID": team_id, "club": team_name,
                                "logo_img":club["logo_img"], "league_ID":club["league_ID"], "league_name": club["league_name"], "int_player": int_player,
                                "name": name_1, "position": position_1,"field_position": field_posit, "age":age_1,"nat": nat, 
                                "height": height_1, "foot": foot_1,  'dt_joined': dt_joined_1,"prev_team": prev_team_1,
                                "contract_expires": contract_expires_1, "market_value": market_value_1,"player_page": player_page}) 
                player_id = player_id+1
        # players dentro dos clubes (hierarchy)
        #  club["players"] = players
    # players separado dos clubs #
    soccer_data["players"] = players
    return soccer_data 


