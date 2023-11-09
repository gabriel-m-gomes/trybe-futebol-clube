const Awayquery = ` SELECT
  te.team_name as name,
  SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) as totalPoints,
  COUNT(m.id) as totalGames,
  SUM(
    CASE 
      WHEN m.home_team_goals < m.away_team_goals THEN 1
      ELSE 0
    END
  ) as totalVictories,
  SUM(
    CASE 
      WHEN m.home_team_goals > m.away_team_goals THEN 1
      ELSE 0
    END
  ) as totalLosses,
  SUM(
    CASE 
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) as totalDraws,
  SUM(m.away_team_goals) as goalsFavor,
  SUM(m.home_team_goals) as goalsOwn,
  SUM(m.away_team_goals - m.home_team_goals) as goalsBalance,
  ROUND((SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) / (COUNT(m.id) * 3) * 100), 2) as efficiency
FROM matches as m
JOIN teams as t ON t.id = m.home_team_id
JOIN teams as te ON te.id = m.away_team_id
WHERE in_progress = 0
GROUP BY m.away_team_id
ORDER BY
  totalPoints DESC,
  goalsBalance DESC,
  goalsFavor DESC`;

export default Awayquery;
