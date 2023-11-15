# WebArchitecture_Group1EdgeRunner
# Introduction

In this project, we delve into the realm of connected environments by developing an interactive platform that integrates and visualizes crime data in London. Our focus is on creating a dynamic interface where users can explore the intricate relationship between crime rates, emergency response times, and demographic data across different wards of the city. This initiative is rooted in the concept of a connected environment, where data from diverse sources is amalgamated to offer a comprehensive view of urban safety dynamics.

By harnessing the power of data analytics and interactive web technologies, we aim to provide valuable insights for policymakers, law enforcement, and the public. This project not only enhances understanding of crime patterns but also fosters a more informed and engaged community, contributing to the broader goal of creating safer, more connected urban spaces.

# Outline of Website

The project encompasses two distinct yet interconnected web pages. 

## Interactive Crime Rate Map

- **Functionality**: This web page features an interactive map of London, highlighting various wards. Users can click on different areas of the map to receive specific data about crime rates in those locations. The map is designed to be user-friendly and informative, providing immediate visual feedback and data representation.
- **Design**: The map utilizes Google Maps API for its base layer, with an overlay of GeoJSON data representing the different wards of London. The interactivity is achieved through JavaScript, allowing users to click on a ward and retrieve data from a MySQL database via a Node.js backend.
- **Data Integration**: The backend, developed in Node.js, connects to a MySQL database to fetch crime statistics for each ward. This data includes the number of crimes per thousand people, robbery cases, and theft cases. The frontend sends requests to the backend when a user clicks on a ward, and the backend responds with the relevant data, which is then displayed to the user.

## Data Analysis and Project Introduction Page

- **Functionality**: This page presents a scatter plot that visualizes the relationship between the average response times of emergency services and the crime rates per thousand people. It serves as an analytical tool to understand potential correlations between these two variables.
- **Design**: The scatter plot is created using a JavaScript charting library, such as Plot.js, which provides dynamic and interactive visualization. The page also includes textual content that introduces the project and provides insights into the data analysis.
- **Data Integration**: Like the interactive map, this page retrieves data from the MySQL database through the Node.js backend. However, the focus here is on aggregating data for the scatter plot and presenting a broader analysis. The data is processed and formatted to fit the requirements of the chosen charting library.

Both web pages are designed to be intuitive and informative, offering users a comprehensive view of crime statistics in London. The interactive map provides a localized view of crime rates, while the data analysis page offers a broader perspective, analyzing trends and correlations in the data. Together, these pages form a cohesive and comprehensive tool for understanding crime in London.

# Data Handling and Integration

One of the unique challenges we faced was the integration of this crime data with geographical information. Since wards are specific administrative divisions in London, standard map APIs do not readily provide reverse geocoding services for these areas. To overcome this, we sourced GIS (Geographic Information System) files delineating the ward boundaries. Using GIS software, we converted these files into GeoJSON format, which is compatible with our web technologies. This GeoJSON file plays a pivotal role in our frontend development, enabling us to accurately render the map of London's wards and boroughs and to facilitate the retrieval of ward and borough names upon user interaction.


# Technical Integration Between Frontend and Backend Services

## Frontend to Backend Communication

### Interactive Map Integration

- The frontend, developed using HTML, CSS, and JavaScript, incorporates an interactive map powered by the Google Maps API and enhanced with GeoJSON for ward and borough boundaries.
- When a user clicks on a specific area of the map, JavaScript event handlers capture the ward and borough names.
- These details are then sent to the backend via an AJAX request to the Node.js server.

### Data Retrieval from Node.js API

- The Node.js server processes the incoming requests, extracting the ward and borough names.
- It queries the MySQL database for crime statistics corresponding to the selected area, including crime rates per thousand people, robbery cases, and theft cases.
- The server then sends back the queried data in JSON format to the frontend.

### Displaying Retrieved Data

- Upon receiving the response from the backend, the frontend dynamically updates the map to display the relevant crime statistics.
- This process is near-instantaneous, providing users with immediate feedback and information.

## Integration for Scatter Plot Visualization

### API for Scatter Plot

- A separate API was developed to facilitate the scatter plot visualization on the data analysis page.
- This API, also built using Node.js, accepts ward and borough as input parameters.
- It returns the average emergency response times and total crime cases for the specified area.

### Data Processing for Visualization

- The frontend sends requests to that API when users select different wards or boroughs for detailed analysis.
- The backend processes these requests, fetching and aggregating the required data from the database.
- The processed data is then sent back to the frontend in a format suitable for plotting on a scatter chart.

### Rendering the Scatter Plot

- The frontend uses a JavaScript charting library (plot.js) to render the scatter plot.
- The data received from the backend is plotted to show the correlation between response times and total crime cases, providing valuable insights into the efficiency of emergency services in relation to crime rates.
