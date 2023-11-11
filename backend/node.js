const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8848;
const cors = require('cors');

// Allow cross-domain requests
app.use(cors());
// MySQL connection configuration
const pool = mysql.createPool({
    host: 'database-host',
    user: 'database-username',
    password: 'database-password',
    database: 'database-name'
});

// API endpoint
app.get('/crime-data', (req, res) => {
    const wardName = req.query.wardName;
    const boroughName = req.query.boroughName;

    // Check if both ward name and borough name are provided
    if (!wardName || !boroughName) {
        return res.status(400).send('Both ward name and borough name are required');
    }

    // SQL query
    const query = `
        SELECT 
            g.WardName,
            g.LookUp_BoroughName,
            SUM(CASE WHEN g.MajorText = 'Robbery' THEN g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\` ELSE 0 END) AS TotalRobberyCases,
            SUM(CASE WHEN g.MajorText = 'Theft' THEN g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\` ELSE 0 END) AS TotalTheftCases,
            SUM(
                CASE 
                    WHEN g.MajorText IN ('Robbery', 'Theft') THEN 
                        g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\`
                    ELSE 0 
                END
            ) AS TotalCases,
            AVG(g.\`Response Times I\`) AS AvgResponseI,
            AVG(g.\`Response Times S\`) AS AvgResponseS,
            AVG(g.\`Response Times E\`) AS AvgResponseE,
            (SUM(
                CASE 
                    WHEN g.MajorText IN ('Robbery', 'Theft') THEN 
                        g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\`
                    ELSE 0 
                END
            ) / MAX(p.Population)) * 1000 AS CrimesPerThousand
        FROM 
            Groupwork g
        JOIN 
            Group_Population p ON g.WardName = p.WardName AND g.LookUp_BoroughName = p.BoroughName
        WHERE 
            g.WardName = ? AND g.LookUp_BoroughName = ?
        GROUP BY 
            g.WardName, g.LookUp_BoroughName;
    `;

    // Execute the query
    pool.query(query, [wardName, boroughName], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('Data not found');
        }
        res.json(results[0]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
