import os
import pandas as pd
from datetime import datetime
import time
from random import randint
import unicodedata
import json
# from functions import league_data , team_data, heights


with open('./dict_soccer_data.json') as f:
  teams_data = json.load(f)


def short_name_func(item, club_name):
    abb = ''.join([x[0].upper() for x in item.split(' ')])
    club_name = club_name.replace(item,abb)
    
    return club_name



def team_name_fix(club_name):
    short_list = ["Club Atletico", "Asociacion Atletica", "Sport Club", "Futebol Clube", "Sporting Club",
                 "Sociedade Esportiva", "Esporte Clube", "Football Club", "Foot-Ball Porto Alegrense" ]
    remove_list = ["Estudiantes", "Foot Ball Club", "Clube de Regatas do","Futebol e Regatas", 
                   "Club de Regatas", "Godoy ", "Gimnasia", "Lorenzo"]
    for item in short_list:
#         print(item)
        if club_name.find(item) ==-1:
#             print(club_name+ " ==-1")
            club_name = club_name
            
        
        elif club_name == "Sport Club do Recife":
            club_name = club_name
            
        elif club_name == "Gremio Foot-Ball Porto Alegrense":
            club_name = "Gremio FBPA"
        
        elif club_name.find("Club Atletico") != -1:
            club_name = club_name.replace("Club Atletico ", "")
            
        elif club_name.find(item) !=-1:
            club_name = short_name_func(item,club_name)

    
    for item in remove_list:
        if club_name.find(item) !=-1:
            if club_name == "Clube de Regatas do Flamengo":
                club_name = "CR Flamengo"
                
            elif club_name == "Botafogo de Futebol e Regatas":
                club_name = "Botafogo FR"
                
            elif club_name == "Club de Regatas Vasco da Gama":
                club_name = "CR Vasco da Gama"
                
            elif club_name == "Club Deportivo Godoy Cruz Antonio Tomba":
                club_name = "CD Godoy Cruz"
                
            elif club_name == "Club de Gimnasia y Esgrima La Plata":
                club_name = "Gimnasia y Esgrima"
                
            elif club_name == "Club Atletico San Lorenzo de Almagro":
                club_name = "San Lorenzo"
                
            elif club_name == "Club Estudiantes de La Plata":
                club_name = "Estudiantes de La Plata"
    return club_name
        


for league in teams_data["leagues"]:
    for club in league["clubs"]:
        old = club['club']
        club['club'] = team_name_fix(club['club'])
        print(old, club['club'])

with open('dict_soccer_data.json', 'w') as fp:
    json.dump(teams_data, fp, indent=4, sort_keys=True, default=str)