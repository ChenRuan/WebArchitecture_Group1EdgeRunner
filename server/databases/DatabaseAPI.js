#!/usr/bin/env node

// server/databases/databaseAPI.js


// Import mysql
var mysql = require('mysql');

// MySQL Connection Variables
var connection = mysql.createConnection({
    host        : 'casa0017.cetools.org', 
    user        : 'Hidden content',
    password    : 'Hidden content',
    database    : 'Hidden content'
});

connection.connect((err) => {
    if (err) {
      console.error('error:' + err.message);
    } else {
      console.log('Database Connected');
    }
});

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

function getInformation(req,res){
    var WardName = req.query.WardName;
    var WardCode = req.query.WardCode;
    var LookUp_BoroughName = req.query.LookUp_BoroughName;
    var MajorText = req.query.MajorText;
    var MinorText = req.query.MinorText;

    var query = 'select * FROM Groupwork WHERE 1=1'

    if (WardName) {
        query += ` AND WardName = '${WardName}'`;
    }

    if (WardCode) {
        query += ` AND WardCode = '${WardCode}'`;
    }

    if (LookUp_BoroughName) {
        query += ` AND LookUp_BoroughName = '${LookUp_BoroughName}'`;
    }

    if (MajorText) {
        query += ` AND MajorText = '${MajorText}'`;
    }

    if (MinorText) {
        query += ` AND MinorText = '${MinorText}'`;
    }

    connection.query(query, (err, data) => {
        //Connection Error Information
        if (err) {
            res.status(500).send('ERROR : ' + err.message);
            return console.log(err.message);
        }
        // If there is no matched data
        else if (data.length === 0) {
            res.status(500).send('Query failed');
            return console.log('Empty Data');
        } 
        else res.json(data);
    })
}

module.exports = { getInformation };
