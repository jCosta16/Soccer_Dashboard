select 	
 	AVG(height)
from 
 	players p
INNER JOIN
	teams t
USING 
	(team_id)
Where 
	p.position = 'Centre-Back' and t.league_id = '1' and p.nat = 'Brazil'
	 
SELECT * 
FROM 
(
	select 	
		name, market_value, club, position
	from 
		players p
	INNER JOIN 
		teams t 
	USING
		(team_id)
	Group by  
		club, name , market_value, position
) as temp_table

		WHERE temp_table.position = 'Centre-Forward'
		order by temp_table.market_value desc limit 1

-- 	) as temp_table
-- ON temp_table.team_id = p.team_id 
-- WHERE temp_table.min_height = p.height
-- -- order by p.height asc
	