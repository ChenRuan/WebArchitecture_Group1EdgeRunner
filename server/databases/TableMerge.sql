SELECT   
	t2.WardName,
    t2.BoroughName,
	t1.TotalRobberyCases,
	t1.TotalTheftCases,
	ROUND(t1.AvgResponseI,2),
	ROUND(t1.AvgResponseS,1),
	ROUND(t1.AvgResponseE,1),
    ROUND(1000*(t1.TotalRobberyCases + t1.TotalTheftCases) / t2.Population,2) AS CrimeRate
FROM(
	SELECT 
      WardCode,
	  SUM(
		  CASE 
			  WHEN MajorText = 'Robbery' THEN 
				  `Cases 202304` + `Cases 202305` + `Cases 202306` + 
				  `Cases 202307` + `Cases 202308` + `Cases 202309`
			  ELSE 0 
		  END
	  ) AS TotalRobberyCases,
	  SUM(
		  CASE 
			  WHEN MajorText = 'Theft' THEN 
				  `Cases 202304` + `Cases 202305` + `Cases 202306` + 
				  `Cases 202307` + `Cases 202308` + `Cases 202309`
			  ELSE 0 
		  END
	  ) AS TotalTheftCases,
		AVG(`Response Times I`) AS AvgResponseI,
		AVG(`Response Times S`) AS AvgResponseS,
		AVG(`Response Times E`) AS AvgResponseE
	FROM 
		ucfnlln0.Groupwork
	GROUP BY 
		WardCode) AS t1
INNER JOIN 
  ucfnlln0.Group_Population AS t2
ON  
  t1.WardCode = t2.WardCode;