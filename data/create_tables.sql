-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/ka7Nxi
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

CREATE TABLE "Leagues" (
    "league_ID" Integer   NOT NULL,
    "country" VARCHAR(255)   NOT NULL,
    "tier" Integer   NOT NULL,
    "league_name" VARCHAR(255)   NOT NULL,
    "league_link" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_Leagues" PRIMARY KEY (
        "league_ID"
     )
);

CREATE TABLE "Teams" (
    "team_ID" Integer   NOT NULL,
    "league_ID" Integer   NOT NULL,
    "club" VARCHAR(255)   NOT NULL,
    "squad" Integer   NOT NULL,
    "foreigners" Integer   NOT NULL,
    "avg_market_value_m" Float   NOT NULL,
    "total_MV_m" NUMERIC   NOT NULL,
    "Logo_img" VARCHAR(255)   NOT NULL,
    "link_page" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "team_ID"
     )
);

CREATE TABLE "Players" (
    "players_ID" Integer   NOT NULL,
    "team_ID" Integer   NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "position" VARCHAR(255)   NOT NULL,
    "Age" Integer   NOT NULL,
    "Nat" VARCHAR(255)   NOT NULL,
    "Height" NUMERIC,
    "foot" VARCHAR(255)   NOT NULL,
    "dt_joined" DATE,
    "prev_team" VARCHAR(255)   NOT NULL,
    "contract_expires" DATE,
    "market_value" NUMERIC   NOT NULL,
    "player_page" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_Players" PRIMARY KEY (
        "players_ID"
     )
);

-- CREATE TABLE "Player_status" (
--     "players_ID" Integer   NOT NULL,
--     "league_ID" Interger   NOT NULL,
--     "appearances" Interger   NOT NULL,
--     "Goals" Interger   NOT NULL,
--     "assists" Interger   NOT NULL,
--     "clean_sheats" Interger   NOT NULL,
--     "goals_conceded" Interger   NOT NULL,
--     "minutes_played" Interger   NOT NULL
-- );

ALTER TABLE "Teams" ADD CONSTRAINT "fk_Teams_league_ID" FOREIGN KEY("league_ID")
REFERENCES "Leagues" ("league_ID");

ALTER TABLE "Players" ADD CONSTRAINT "fk_Players_team_ID" FOREIGN KEY("team_ID")
REFERENCES "Teams" ("team_ID");

-- ALTER TABLE "Player_status" ADD CONSTRAINT "fk_Player_status_players_ID" FOREIGN KEY("players_ID")
-- REFERENCES "Players" ("players_ID");

-- ALTER TABLE "Player_status" ADD CONSTRAINT "fk_Player_status_league_ID" FOREIGN KEY("league_ID")
-- REFERENCES "Leagues" ("league_ID");