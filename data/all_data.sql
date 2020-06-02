-- query with all the information in one table.

SELECT 
	*
FROM 
	leagues
JOIN (teams JOIN players USING(team_id)) USING (league_id)
