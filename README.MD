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
![image]


![Demo](Next-Round-Demo.gif)
