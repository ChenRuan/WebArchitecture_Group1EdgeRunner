# Crime Data API

This project is a Node.js API that provides crime data for specific areas in London. It includes the total number of robbery and theft cases, average response times, and the crime rate per thousand people for given wards and boroughs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)
- MySQL

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary packages using npm:

   ```bash
   npm install

## API Usage

### Endpoint

- URL: `/crime-data`
- Method: `GET`

### Request Parameters

- `wardName` (string): The name of the ward.
- `boroughName` (string): The name of the borough.

### Response

A successful response will return a JSON object containing:

- `WardName` (string): The name of the ward.
- `LookUp_BoroughName` (string): The name of the borough.
- `TotalRobberyCases` (number): Total number of robbery cases.
- `TotalTheftCases` (number): Total number of theft cases.
- `TotalCases` (number): Total number of crimes.
- `AvgResponseI` (number): Average response time I.
- `AvgResponseS` (number): Average response time S.
- `AvgResponseE` (number): Average response time E.
- `CrimesPerThousand` (number): Crime rate per thousand people.

### Error Responses

- `400 Bad Request`: If the request lacks necessary parameters.
- `404 Not Found`: If no data is found for the specified area.
- `500 Internal Server Error`: For server-side errors.
