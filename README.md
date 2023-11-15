# WebArchitecture_Group1EdgeRunner
# Introduction

In this project, we delve into the realm of connected environments by developing an interactive platform that integrates and visualizes crime data in London. Our focus is on creating a dynamic interface where users can explore the intricate relationship between crime rates, emergency response times, and demographic data across different wards of the city. This initiative is rooted in the concept of a connected environment, where data from diverse sources is amalgamated to offer a comprehensive view of urban safety dynamics.

By harnessing the power of data analytics and interactive web technologies, we aim to provide valuable insights for policymakers, law enforcement, and the public. This project not only enhances understanding of crime patterns but also fosters a more informed and engaged community, contributing to the broader goal of creating safer, more connected urban spaces.

## Background

In today's urban landscape, escalating crime rates, particularly in major cities like London, pose an increasingly severe issue. Criminal activities, especially theft and robbery, not only inflict financial losses on victims but can also have long-lasting psychological and physical impacts. Moreover, the frequent occurrence of such crimes undermines the overall sense of safety and stability in society. Therefore, raising public awareness of high-risk areas and understanding the efficiency of police response in different regions is crucial for preventing and reducing crime.

## Objectives

This project aims to develop an interactive web application to query and display the number of theft and robbery crimes and police response times across different areas in London. The main objectives of the project include:
Enhancing Public Safety Awareness: 
By providing easily accessible and understandable crime data, the application aims to alert the public to be extra vigilant about their personal and property safety in certain areas.

Data Visualization: 
Utilize maps and other visual tools to intuitively present crime data, enabling users to quickly identify high-risk areas.

Offering Real-time Data: 
Integrate the latest crime and policing data to provide users with timely updated information.

Assisting in Decision Making: 
Provide valuable data to residents, tourists, businesses, and government agencies, aiding them in making more informed decisions, such as planning travel routes, business layouts, or safety measures.

Encouraging Community Engagement and Crime Prevention: 
Motivate public participation in maintaining community safety and raise awareness about crime prevention.

By achieving these objectives, the project not only offers an essential information resource for London's residents and visitors but also provides local government and law enforcement agencies with a tool to deploy resources more effectively and enhance police response efficiency, thus better serving the community. This proactive approach to crime awareness and prevention is expected to foster a safer and more informed society.

## Storyboarding

1. Landing View:
The user is greeted with a full-screen map centered on London.
The simple toolbar includes location and search functions, which can confirm the user's location in real time, as well as search data for the area the user wants.
2. Interaction with the Map:
Users can interact with the map by zooming in/out and clicking on specific wards.
3. Selecting an Area:
Clicking on a ward brings up the sidebar with detailed information, including theft and robbery counts, average police response times, and crimes per thousand people.
4. Data Analysis:
Click on 'Data Analysis' to go to the Data analysis page to see the connection between the number of crimes and the speed of response.

# Design

## Outline of Website

The project encompasses two distinct yet interconnected web pages. 

The design of the crime data visualization web application is focused on user-friendliness, clarity, and efficiency. The interface is structured to provide intuitive navigation and immediate access to key information. The design is anchored on the following elements:

Interactive Map: Central to the design is an interactive map displaying London's various wards. The map serves as the primary tool for visualizing crime data geographically.

The sidebar provides buttons to switch to Data Analysis: a retractable sidebar where clicking on Data Analysis takes you to the Data Analysis page.

Responsive Design: The layout is responsive, ensuring usability across various devices, from desktops to mobile phones.

Minimalistic Aesthetics: A clean and modern look is maintained, avoiding clutter, to enhance user experience.

### Interactive Crime Rate Map

- **Functionality**: This web page features an interactive map of London, highlighting various wards. Users can click on different areas of the map to receive specific data about crime rates in those locations. The map is designed to be user-friendly and informative, providing immediate visual feedback and data representation.
- **Design**: The map utilizes Google Maps API for its base layer, with an overlay of GeoJSON data representing the different wards of London. The interactivity is achieved through JavaScript, allowing users to click on a ward and retrieve data from a MySQL database via a Node.js backend.
- **Data Integration**: The backend, developed in Node.js, connects to a MySQL database to fetch crime statistics for each ward. This data includes the number of crimes per thousand people, robbery cases, and theft cases. The frontend sends requests to the backend when a user clicks on a ward, and the backend responds with the relevant data, which is then displayed to the user.

### Data Analysis and Project Introduction Page

- **Functionality**: This page presents a scatter plot that visualizes the relationship between the average response times of emergency services and the crime rates per thousand people. It serves as an analytical tool to understand potential correlations between these two variables.
- **Design**: The scatter plot is created using a JavaScript charting library, such as Plot.js, which provides dynamic and interactive visualization. The page also includes textual content that introduces the project and provides insights into the data analysis.
- **Data Integration**: Like the interactive map, this page retrieves data from the MySQL database through the Node.js backend. However, the focus here is on aggregating data for the scatter plot and presenting a broader analysis. The data is processed and formatted to fit the requirements of the chosen charting library.

Both web pages are designed to be intuitive and informative, offering users a comprehensive view of crime statistics in London. The interactive map provides a localized view of crime rates, while the data analysis page offers a broader perspective, analyzing trends and correlations in the data. Together, these pages form a cohesive and comprehensive tool for understanding crime in London.

# Methods

## Data collection, handling, cleaning and management of dataset

We have selected three databases for our queries. The first set of data involves the crime cases for each Ward in London, and we have extracted data from April to September 2023 (Metropolitan Police Service, 2023). The second set of data is the response speed of each area in London, and the smallest area unit we can find is the Borough, which we use to match with the first set of data. (Metropolitan Police Service, n.d.) To objectively compare the crime rates in each area, we also need to obtain the population for each Ward, which is our third database. (ONS, 2023) 

Since we have chosen government-provided databases, and these data have already been processed, we do not need additional data cleaning. 

As there are same Ward names in London belonging to different boroughs, it is necessary to use both Ward name and Borough name, or Ward code, for geographical matching. To simplify the backend query process, we have abandoned the idea of using MySQL in the backend for data matching and instead used query statements in MySQL Workbench to generate a new, simplified table required by the frontend. Since Google API does not provide Ward Codes, and to avoid issues arising from identical Ward Names, the frontend still needs to query with both Ward name and Borough name simultaneously. 

One of the unique challenges we faced was the integration of this crime data with geographical information. Since wards are specific administrative divisions in London, standard map APIs do not readily provide reverse geocoding services for these areas. To overcome this, we sourced GIS (Geographic Information System) files delineating the ward boundaries. Using GIS software, we converted these files into GeoJSON format, which is compatible with our web technologies. This GeoJSON file plays a pivotal role in our frontend development, enabling us to accurately render the map of London's wards and boroughs and to facilitate the retrieval of ward and borough names upon user interaction.

## Data visualizations

To better illustrate the correlation between crime rates and response time, we plan to use a scatter plot for a clearer representation of their relationship. We have utilized Plotly.js to create a scatter plot. Through the backend, we imported the crime rates and police response time for all Wards, displaying them on the webpage for users to click and view specific data. In order to facilitate optimal observation of the scatter plot and data, we have made the webpage adaptable to both landscape and portrait orientations automatically. 

## Technical Integration Between Frontend and Backend Services

### Frontend to Backend Communication

#### Interactive Map Integration

- The frontend, developed using HTML, CSS, and JavaScript, incorporates an interactive map powered by the Google Maps API and enhanced with GeoJSON for ward and borough boundaries.
- When a user clicks on a specific area of the map, JavaScript event handlers capture the ward and borough names.
- These details are then sent to the backend via an AJAX request to the Node.js server.

#### Data Retrieval from Node.js API

- The Node.js server processes the incoming requests, extracting the ward and borough names.
- It queries the MySQL database for crime statistics corresponding to the selected area, including crime rates per thousand people, robbery cases, and theft cases.
- The server then sends back the queried data in JSON format to the frontend.

#### Displaying Retrieved Data

- Upon receiving the response from the backend, the frontend dynamically updates the map to display the relevant crime statistics.
- This process is near-instantaneous, providing users with immediate feedback and information.

### Integration for Scatter Plot Visualization

#### API for Scatter Plot

- A separate API was developed to facilitate the scatter plot visualization on the data analysis page.
- This API, also built using Node.js, accepts ward and borough as input parameters.
- It returns the average emergency response times and total crime cases for the specified area.

#### Data Processing for Visualization

- The frontend sends requests to that API when users select different wards or boroughs for detailed analysis.
- The backend processes these requests, fetching and aggregating the required data from the database.
- The processed data is then sent back to the frontend in a format suitable for plotting on a scatter chart.

#### Rendering the Scatter Plot

- The frontend uses a JavaScript charting library (plot.js) to render the scatter plot.
- The data received from the backend is plotted to show the correlation between response times and total crime cases, providing valuable insights into the efficiency of emergency services in relation to crime rates.

### Node.js File Modularization

To enhance readability and maintainability of the backend server, we have adopted a modular approach by organizing each functionality into separate files. This allows for a more structured codebase, making it easier to manage and maintain. By centralizing the functionalities and categorizing them into distinct files, we can streamline the development process.  

With this modular setup, the main file, app.js, serves as the entry point, simplifying the management of both frontend and backend aspects, as well as facilitating the addition of future modules.

# Conclusion

## Difficulties & Solutions 

We encountered and addressed several problems during the process of developing the website. At first, we passed the raw data directly into the database, but when we used the backend cross-table query to transfer the data, we observed slow query speeds. Additionally, creating a new API required a redesign and testing, which was very troublesome. So we streamlined the database to the size we needed for our website and redesigned the API for faster data retrieval.  

To accommodate both mobile and desktop users, the initial data analysis page is very small on mobile phones, which makes it difficult to observe and analyze. Therefore, we have increased the horizontal and vertical screen switching of the data table, and adapted the UI of the web page, so that users can get a good experience regardless of the device used to access our site. 

## Improvements 

Firstly, our user interface graphics lack uniformity and deviate significantly from the functionality we initially planned. If it’s possible, we still hope to incorporate features such as filters and search functionality, enabling users to gain a better understanding of the safety levels in specific time periods for specific areas. 

Additionally, the ward names obtained from the government-provided database do not match the district-level addresses provided by the map API. This results in many areas on our map being unable to retrieve data, significantly impacting the presentation of our data on the map. If a suitable API that aligns with the government's Ward planning is identified, this issue can be better addressed. 

# Bibliography  

1. Great London Authority ,2018. Statistical GIS Boundary Files for London: [online] Available at: https://data.london.gov.uk/publisher/gla (Accessed 13 Nov. 2023) 

2. Metropolitan Police Service, 2023. Recorded Crime: Geographic Breakdown: [Online] Available at: https://data.london.gov.uk/dataset/recorded_crime_summary (Accessed: 24 Oct. 2023) 

3. Metropolitan Police Service, n.d. Average Response Times to Emergency Incidents by Borough from 2019 to 2021: [Online] Available at: https://www.met.police.uk/foi-ai/metropolitan-police/d/march-2022/average-response-times-emergency-incidents-borough-2019-2021/ (Accessed: 7 Nov. 2023) 

4. ONS, 2023. Estimates for London wards and LSOAs: Available at: https://data.london.gov.uk/census/2021-ward-and-lsoa-estimates/ (Accessed: 7 Nov. 2023) 

5. Plotly, n.d. Scatter Plots in JavaScript: Available at: https://plotly.com/javascript/line-and-scatter/  (Accessed: 13 Nov. 2023) 

# Declaration of Authorship 

We, Chen Ruan, Lianglei Liu, Qingyao Tang , confirm that the work presented in this assessment is my own. Where information has been derived from other sources, I confirm that this has been indicated in the work. 

Chen Ruan, Lianglei Liu, Qingyao Tang

15/11/2023 
