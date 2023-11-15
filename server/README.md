# Server Part

There are several important files listed here. `app.js` and `databases/DatabaseAPI.js` are directly uploaded to server, and `Data_Cases_ResponseTime.csv`, `Data_CrimeRate_ResponseTime.csv` and `Data_Population.csv` are imported to database and can be queried by MySQL.

## app.js

The `app.js` file is the most comprehensive and crucial file for server-side integration. It encompasses the following functionalities:

* Starting the Express server
* Enabling Cross-Origin Resource Sharing (for local testing)
* Importing modules from `databases/DatabaseAPI.js` and create APIs
* Importing static data
* Defining a port and initiating the server

## DatabaseAPI.js

The main functionality of `DatabaseAPI.js` is:
* Connecting to the database
* Querying the database with specific conditions using MYSQL

## Databases

In the "Database" folder, there are three original databases: one containing the number of cases in each ward in London, another containing the population in each ward, and the third containing the response time for each borough. 

Initially, we merged the `OriginalData_Cases.csv` and `OriginalData_ResponseTime.csv` files into `Data_Cases_ResponseTime.csv`(Table name: `ucfnlln0.Groupwork`) and performed queries using specific conditions. Subsequently, as the frontend required queries for Crime cases per 1000 people, we created the `Data_Population.csv`(Table name: `ucfnlln0.Group_Population`) , uploaded it to the database, and conducted cross-table queries. 

However, due to the efficiency concerns associated with cross-table queries, we eventually created a query statement in MySQL Workbench to simplify and merge the two tables, exported `Data_CrimeRate_ResponseTime.csv`(Table name: `ucfnlln0.Group_Crime_Response`), subsequently re-uploading them to the database, and it is the final and only version we are using.

## Server File Organization

Our file organization uses the following paths:

```
/home/group1/groupWork
  /server
    /databases
      DatabaseAPI.js
    app.js
  /website
    index.html
    DataAnalyze.html
    /Resources
      londonwards.geojson
```

## How to start and stop the server

Firstly, go to our server directory: `cd /home/group1/groupWork/server`

Start `app.js`: `node app.js`

Start `app.js` in the background: `nohup node app.js &` (This command will give a `PID` back)

Stop `app.js` in the background: `kill [PID]`

Querying the PID number: `pgrep -f "node app.js"`
