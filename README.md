# Cointab Assignment:
Create a basic 2-page website using Node.js and an SQL database. On the first page, there will be three buttons: "Fetch Users," "Delete Users," and "User Details." When you click the "Fetch Users" button, the website should gather information from the (https://randomuser.me/) API and save it in a table within the database. The fetching process should gather a significant amount of data, like around 50 to 100 records, with just one click.

## Deployed App
[https://cointab-assignments.netlify.app/
](https://coin-tab.netlify.app/)

## Getting Started
To run the project on your local machine, follow the steps below:

1. Clone the repository:

   ```bash

   
   git clone https://github.com/Sourabh12321/cointab-project.git
  
2. Install Dependencies:

   ```bash
   npm i 
  
3. Run the backend server:

   ```bash
   node app.js

4. Start frontend:

   ```bash
   npm run start

## API Endpoints
The project provides the following API endpoints:

1. GET /get: Gets all user data.
2. GET /fetch-users: Gets user data based on the page number.
3. GET /users/filter:Gets user data with specific filters.
4. GET /users: Gets user data with pagination.
5. DELETE /delete-users: Deletes the user table from the database.


## Features
This project has some main features:

1. Pagination: It helps users navigate through their data page by page.
2. Multiple Filters: Users can apply different criteria to filter their data.

# Home
![Screenshot 2023-08-07 164325](https://github.com/Sourabh12321/cointab-project/assets/112754483/08e30c46-8292-4c9b-b0ff-998598d89e97)

# User-Fetch Page
![users page](https://github.com/Sourabh12321/cointab-project/assets/112754483/f7a1d788-d096-4da6-a4bd-6a11539b66aa)

# Pagination 
![pagination](https://github.com/Sourabh12321/cointab-project/assets/112754483/7013b8c7-706b-4167-ab0b-07bed60d97db)
