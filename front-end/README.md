# <p align = "center"> Projeto 21 - Sing Me a Song - Front-end </p>
<p align="center">
  <a href="https://github.com/lguilhermefl/projeto21-singmeasong">
<img height="100px" src="https://raw.githubusercontent.com/lguilhermefl/projeto21-singmeasong/main/mic.svg" />
  </a>
</p>

<p align = "center">
<a href="https://github.com/lguilhermefl">
   <img src="https://img.shields.io/badge/author-lguilhermefl-4dae71?style=flat-square" />
</a>
</p>

##  :clipboard: Description

This is the application's front-end. In it you'll find all the needed files to run the app. There is also a folder with e2e cypress tests.

## :computer:	 Technologies & concepts

- Node.js
- React
- Cypress for tests

## :rocket: Routes

```yml
    /
    - Homepage route
    - Shows buttons for home, top and random song recommendations in menu
    - You can register a new recommendation by filling name and url fields and clicking in the arrow.
```
<img src="https://github.com/lguilhermefl/projeto21-singmeasong/blob/main/front-end/screenshots/homepage.png" />

```yml
    /top
    - top route
    - shows top song recommendations ordered by higher score
```
<img src="https://github.com/lguilhermefl/projeto21-singmeasong/blob/main/front-end/screenshots/top.png" />

```yml
    /random
    - Random route
    - Shows a random song recommendation
```
<img src="https://github.com/lguilhermefl/projeto21-singmeasong/blob/main/front-end/screenshots/random.png" />

## 🏁 Running application

This project was initialized with [Create React App](https://github.com/facebook/create-react-app),so make sure you have the last stable version of [npm](https://www.npmjs.com/) and [Node.js](https://nodejs.org/en/download/) running locally.

Firstly you should had already cloned the whole repository. If you haven't, run this command in your machine's terminal:

```
git clone https://github.com/lguilhermefl/projeto21-singmeasong.git
```

After you had it cloned, open the main folder in your code editor. With the terminal opened run the following commands to install all dependencies:

```
cd front-end/
npm i
```

After that you'll need to create your .env file with your back-end url. Running locally without changing the default port in back-end server file it should be "http://localhost:5000". You can check the .env.example file for example.
To run:

```
npm start
```

:stop_sign: Don't forget to repeat the steps above also using the [backend repository](https://github.com/lguilhermefl/projeto21-singmeasong/tree/main/back-end) to fully test the project
