# Bars and Grills (Restaurant App)

This app will locate nearby restaurants for the user
and allow them to rate/review the restaurants.

Bars and Grills\
Prepared by Damodar Dahal <hi@damodar.dev>\
Last modified on September 3, 2020\


## Component design
### Introduction
This document will describe various aspects of the Restaurant App titled "Bars and Grills". It will feature a progressive React application for mobile with Material UI using a Python (Django) REST API.
Framework Choices
We will develop the backend using Python 3, and the frontend using React.

We will be using Django for quickly prototyping the backend API, authentication, etc. Django is a powerful "Batteries Included" Python framework which can run ASGI (Asynchronous Server Gateway Interface). It helps startups and teams to quickly prototype a software for production. Over the long run, its alternative, Flask, will be more robust since it is much more lightweight and can do exactly what Django can do (using packages of course).

On the frontend, we will use React bootstrapped with create-react-app (babel, webpack) together with TypeScript, Material Design, SASS, Redux, and so on. For full description, see the package.json inside the app folder.
### Routing design
* `/api`: A REST API exposing restaurants, users, and reviews according to specifications
* `/app`: A React app
* `/admin`: Django Admin panel

### UI Design
Mockups of the React app are located here: https://app.moqups.com/bjwW5EGshG/view/page/aa3a663eb

### Frontend Routing Design
* `/login` will be used for login page
* `/dash` for dashboard (restaurant list)
* `/restaurant/{id}` for restaurant details (child page)

### Django project setup
Project was bootstrapped using `django-admin.py`. The following modules
have been added:

* CORS
* REST Framework

### React project Setup
Project was bootstrapped using create-react-app with its typescript template.

The following packages have been integrated:
* SCSS
* TS Lint (executed by `npm run lint`)
* PropTypes
* Axios

Source code uses absolute imports for better readability.
https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d


