#!/usr/bin/env node

// server/databases/databaseAPI.js

// Import mysql
var mysql = require('mysql');

// MySQL Connection Variables
var connection = mysql.createConnection({
    host        : 'casa0017.cetools.org', 
    user        : 'HIDDEN CONTENT',
    password    : 'HIDDEN CONTENT',
    database    : 'HIDDEN CONTENT'
});

connection.connect((err) => {
    if (err) {
      console.error('error:' + err.message);
    } else {
      console.log('Database Connected');
    }
});

function CrimeData(req, res){
    const wardName = req.query.wardName;
    const boroughName = req.query.boroughName;

    // Check if both ward name and borough name are provided
    if (!wardName || !boroughName) {
        return res.status(400).send('Both ward name and borough name are required');
    }

    // SQL query
    const query = `
        SELECT 
            WardName,
            BoroughName,
            TotalRobberyCases,
            TotalTheftCases,
            ( TotalRobberyCases + TotalTheftCases ) AS TotalCases,
            AvgResponseI,
            AvgResponseS,
            AvgResponseE,
            CrimesPerThousand
        FROM 
            Group_Crime_Response
        WHERE 
            WardName = ? AND BoroughName = ?
    `;

    // Execute the query
    connection.query(query, [wardName, boroughName], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            res.json(
                {
                    "TotalName" : "Not Available",
                    "BoroughName" : "Not Available",
                    "TotalRobberyCases" : "Not Available",
                    "TotalTheftCases" : "Not Available",
                    "TotalCases" : "Not Available",
                    "AvgResponseI" : "Not Available",
                    "AvgResponseS" : "Not Available",
                    "AvgResponseE" : "Not Available",
                    "CrimesPerThousand" : "Not Available",
                }
            )
        }
        res.json(results[0]);
    });
};

function MapData(req, res){
    // SQL query
    const query = `
        SELECT 
            WardName,
            BoroughName,
            ( TotalRobberyCases + TotalTheftCases ) AS TotalCases
        FROM 
            Group_Crime_Response
    `;

    // Execute the query
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            res.json(
                {
                    "TotalName" : "Not Available",
                    "BoroughName" : "Not Available",
                    "TotalCases" : "Not Available"
                }
            )
        }
        res.json(results);
    });
};

function DataAnalyze(req, res){
    // SQL query
    const query = `
        SELECT 
            CONCAT(WardName, ' - ', BoroughName) as TotalName,         
            AvgResponseI,
            CrimesPerThousand
        FROM 
            Group_Crime_Response
    `;

    // Execute the query
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('Data not found');
        }
        res.json(results);
    });
};


module.exports = { CrimeData, DataAnalyze, MapData };



// app.get('/getInformation', (req, res) => {
//     var WardName = req.query.WardName;
//     var WardCode = req.query.WardCode;
//     var LookUp_BoroughName = req.query.LookUp_BoroughName;
//     var MajorText = req.query.MajorText;
//     var MinorText = req.query.MinorText;

//     var query = 'select * FROM Groupwork WHERE 1=1'

//     if (WardName) {
//         query += ` AND WardName = '${WardName}'`;
//     }

//     if (WardCode) {
//         query += ` AND WardCode = '${WardCode}'`;
//     }

//     if (LookUp_BoroughName) {
//         query += ` AND LookUp_BoroughName = '${LookUp_BoroughName}'`;
//     }

//     if (MajorText) {
//         query += ` AND MajorText = '${MajorText}'`;
//     }

//     if (MinorText) {
//         query += ` AND MinorText = '${MinorText}'`;
//     }

//     connection.query(query, (err, data) => {
//         //Connection Error Information
//         if (err) {
//             res.status(500).send('ERROR : ' + err.message);
//             return console.log(err.message);
//         }
//         // If there is no matched data
//         else if (data.length === 0) {
//             res.status(500).send('Query failed');
//             return console.log('Empty Data');
//         } 
//         else res.json(data);
//     })
// })

// app.get('/crime-data', (req, res) => {
//     const wardName = req.query.wardName;
//     const boroughName = req.query.boroughName;

//     // Check if both ward name and borough name are provided
//     if (!wardName || !boroughName) {
//         return res.status(400).send('Both ward name and borough name are required');
//     }

//     // SQL query
//     const query = `
//         SELECT 
//             g.WardName,
//             g.LookUp_BoroughName,
//             SUM(CASE WHEN g.MajorText = 'Robbery' THEN g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\` ELSE 0 END) AS TotalRobberyCases,
//             SUM(CASE WHEN g.MajorText = 'Theft' THEN g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\` ELSE 0 END) AS TotalTheftCases,
//             SUM(
//                 CASE 
//                     WHEN g.MajorText IN ('Robbery', 'Theft') THEN 
//                         g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\`
//                     ELSE 0 
//                 END
//             ) AS TotalCases,
//             AVG(g.\`Response Times I\`) AS AvgResponseI,
//             AVG(g.\`Response Times S\`) AS AvgResponseS,
//             AVG(g.\`Response Times E\`) AS AvgResponseE,
//             (SUM(
//                 CASE 
//                     WHEN g.MajorText IN ('Robbery', 'Theft') THEN 
//                         g.\`Cases 202304\` + g.\`Cases 202305\` + g.\`Cases 202306\` + g.\`Cases 202307\` + g.\`Cases 202308\` + g.\`Cases 202309\`
//                     ELSE 0 
//                 END
//             ) / MAX(p.Population)) * 1000 AS CrimesPerThousand
//         FROM 
//             Groupwork g
//         JOIN 
//             Group_Population p ON g.WardName = p.WardName AND g.LookUp_BoroughName = p.BoroughName
//         WHERE 
//             g.WardName = ? AND g.LookUp_BoroughName = ?
//         GROUP BY 
//             g.WardName, g.LookUp_BoroughName;
//     `;

//     // Execute the query
//     pool.query(query, [wardName, boroughName], (error, results) => {
//         if (error) {
//             return res.status(500).send('Server error');
//         }
//         if (results.length === 0) {
//             return res.status(404).send('Data not found');
//         }
//         res.json(results[0]);
//     });
// });



// function getInformation(req,res){
//     var WardName = req.query.WardName;
//     var WardCode = req.query.WardCode;
//     var LookUp_BoroughName = req.query.LookUp_BoroughName;
//     var MajorText = req.query.MajorText;
//     var MinorText = req.query.MinorText;

//     var query = 'select * FROM Groupwork WHERE 1=1'

//     if (WardName) {
//         query += ` AND WardName = '${WardName}'`;
//     }

//     if (WardCode) {
//         query += ` AND WardCode = '${WardCode}'`;
//     }

//     if (LookUp_BoroughName) {
//         query += ` AND LookUp_BoroughName = '${LookUp_BoroughName}'`;
//     }

//     if (MajorText) {
//         query += ` AND MajorText = '${MajorText}'`;
//     }

//     if (MinorText) {
//         query += ` AND MinorText = '${MinorText}'`;
//     }

//     connection.query(query, (err, data) => {
//         //Connection Error Information
//         if (err) {
//             res.status(500).send('ERROR : ' + err.message);
//             return console.log(err.message);
//         }
//         // If there is no matched data
//         else if (data.length === 0) {
//             res.status(500).send('Query failed');
//             return console.log('Empty Data');
//         } 
//         else res.json(data);
//     })
// }

// module.exports = { getInformation };

