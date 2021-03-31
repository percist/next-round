# Next Round's on Me
* By [Chris Clark](https://percist.github.io/) - [Live site](https://next-round.herokuapp.com/)

A social site allowing users to buy a buddy a drink at their favorite restaurant or bar.

For a deeper dive into the planning process and code setup, please visit the [Wiki](https://github.com/percist/next-round/wiki).

**Table of Contents**
  * [Next Round at a Glance](#Next-Round-at-a-glance)
  * [Technologies Used](#technologies-used)
  * [Application Architecture](#application-architecture)
  * [Frontend Overview](#frontend-overview)
  * [Backend Overview](#backend-overview)
  * [Backend Installation and Setup](#Backend-Installation-and-Setup)
  * [Frontend Installation and Run Application Locally](#Frontend-Installation-and-Run-Application-Locally)
  * [Conclusion](#conclusion)

## Next Round at a Glance
Next Round is a social site with a dual purpose. Users are encouraged to pay it forward by buying drinks for friends and post about their experiences. 
Bar and Restaurant owners can use Next Round to promote their establishments and drive traffic.

The application is built with a React frontend utilizing original components and styled after Facebook (circa Q1 2021)
The backend is an Express server with a PostgreSQL database.

**Key Features**
* User sign in / sign up with token-based authentication and b-cyrpt password encryption
* User homepage with a feed of buddy's posts, a list of buddies, and ability to claim or send rounds
  * User can comment on rounds and edit or delete their existing comments
* Buddy pages with ability to follow or unfollow and see their previously posted rounds
* Site pages include rounds claimed at that site, menu items, ability for site owner to update menu
* Round claim form allowing user to claim a round they have been sent and transform it into a post
* Round send form allowing user to purchase and send a round to another user
* Search functionality allowing user to search for users or sites and filter based on type
* Menu form allowing site owner to add or delete menu items
* Site form allowing users to add sites they own

## Technologies Used
* Frontend
  * React
  * Redux
  * Javascript
  * CSS
  * AWS (photo hosting)
* Backend
  * Express
  * Node.js
  * Sequelize
  * PostgreSQL
  * Heroku deployment

## Application Architecture
The frontend is a `create-react-app` using functional components with hooks. The backend is an express server with various RESTful endpoints. They are deployed to a Heroku server.

#### Next Round Database Schema
![image](https://github.com/percist/next-round/blob/master/Next-Round-DB.png)

## Frontend Overview
The front end incorporates some visual design elements from Facebook but uses all original architecture using custom components. Components are reused with unique styling to achieve a DRYer code base.

## Backend Overview
The Express backend is a collection of RESTful routes serving data to the frontend from the PostgreSQL database. Routes were designed to deliver as much targeted data as possible to limit the number of API calls from frontend components.

The database is queried using sequelize and seed data was created using faker npm package and resources like Unsplash.

## Backend Installation and Setup

1. Clone this repository (only this branch)

  ```bash
  git clone https://github.com/percist/Next-Round
  ```
2. Install Dependencies

  ```bash
   npm install
   ```
3. Create a **.env** file based on the .env.example with proper settings for your
   development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
  * **NOTE: if you intent to use the photo upload feature, you will need to provide your own AWS access key id and secret key and update the information in awsS3.js**

5. From inside the backend file, use the commands in the **dbCommands.txt** file

6. Start the backend server

  ```bash
  npm start
  ```

## Frontend Installatin and Run Application Locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Change Directory to fontend

  ```bash
  cd frontend
  ```
2. Install Dependencies

  ```bash
  npm install
  ```
3. Start the local host

  ```bash
  npm start
  ```
  
4. Visit application at localhost:3000 (changes you make locally will appear)


## Conclusion
Next Round was inspired by a whiteboard at Tradesman Brewing in Charleston, SC where people can buy a beer for a buddy who can then redeem it the next time they come in as well as the Facebook group 'Isolation Porch Beers'. While I could not visit family and friends during COVID I wanted to develop a platform for people to be able to share a drink remotely that could also serve as a traffic generator for local businesses. 

Future features would include adding items to search, validating follow requests, ratings for menu items, saved locations, favorited menu items, likes on posts, tips on payments, a payments dashboard for owners to see activity and redeem funds, and drag and drop functionality for menu items so an owner can order the menu.
  
![Demo](Next-Round-Demo.gif)
