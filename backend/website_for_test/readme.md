# Crime Data Map Test Website

This project is a web application designed to interact with the Crime Data API. It displays an interactive map of London and allows users to click on different wards to retrieve and display crime data for that area directly on the map.

## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

What you need to have installed:

- A modern web browser (e.g., Chrome, Firefox, Safari)
- A code editor (e.g., VS Code, Sublime Text)

### Setting Up

1. Clone the repository or download the source code to your local machine.
2. Open the project folder in your code editor.
3. Locate the `index.html` file. This file contains the HTML and JavaScript code for the test website.

### Running the Website

To run the website:

1. Open the `index.html` file in a web browser.
2. The website should load with a map centered on London.
3. Click on different areas of the map to test the API and view crime data.

## Using the Test Website

### Interacting with the Map

- Click on any location in the map.
- A marker will be placed at the clicked location, and a request will be sent to the Crime Data API.
- The crime data for that area will be retrieved and displayed in a popup attached to the marker.

### Understanding the Results

The popup will display the following data from the API:

- Ward Name
- Borough Name
- Total Robbery Cases
- Total Theft Cases
- Total Cases
- Average Response Times (I, S, E)
- Crime Rate per Thousand People

### Customization

You can customize the website by editing the `index.html` file. For example, you can modify the popup content or the map's style and behavior.

## Contributing

Feel free to fork the repository and submit pull requests with any enhancements.


## Acknowledgments

- Leaflet.js for providing the interactive map functionality.
- OpenStreetMap contributors for the map data.
