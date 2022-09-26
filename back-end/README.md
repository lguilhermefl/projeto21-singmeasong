# <p align = "center"> Projeto 21 - Sing Me a Song - Back-end </p>
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

This is the application's back-end. In it you'll find all the needed routes to run the app. There is also a folder with integration and unit tests.

## :computer:	 Technologies & concepts

- REST APIs
- Node.js
- TypeScript
- Postgres with Prisma
- Jest and Supertest for tests

## :rocket: Routes

```yml
POST /recommendations
    - Route to register a new song recommendation
    - headers: {}
    - body: {
      "name": "Lorem ipsum",
      "youtubeLink": "https://www.youtube.com/lorem-ipsum"
    }
    - name is a required string
    - youtubeLink is a required valid YouTube link string
```

```yml
POST /recommendations/:id/upvote
    - Route to add a point to a song recommendation score
    - params: recommendation id
    - headers: {}
    - body: {}
```

```yml
POST /recommendations/:id/downvote
    - Route to remove a point from a song recommendation score
    - params: recommendation id
    - headers: {}
    - body: {}
    - if a song recommendation gets a score less than -5 it's removed from database
```

```yml
GET /recommendations
    - Route to get the last 10 recommendations or less if there isn't 10 or more registered in database yet
    - headers: {}
    - body: {}
    - response body: [
      {
        "id": 10,
        "name": "Lorem ipsum 10",
        "youtubeLink": "https://www.youtube.com/lorem-ipsum-10",
        "score": 0
      },
      ...
      {
        "id": 1,
        "name": "Lorem ipsum 1",
        "youtubeLink": "https://www.youtube.com/lorem-ipsum-1",
        "score": 5
      },
    ]
```

```yml
GET /recommendations/:id
    - Route to get a song recommendation by id
    - params: recommendation id
    - headers: {}
    - body: {}
    - response body: {
      "id": 10,
      "name": "Lorem ipsum 10",
      "youtubeLink": "https://www.youtube.com/lorem-ipsum-10",
      "score": 0
    }
```

```yml
GET /recommendations/random
    - Route to get a random song recommendation
    - 70% of the times it'll return a recommendation with score > 10 
    - 30% of the times it'll return a recomendation with score [-5, 10]
    - If there are only recommendations with score > 10 or <= 10, 100% of the times it'll random return any recommendation
    - If there are no recommendations registered in database it'll return status code 404
    - headers: {}
    - body: {}
    - response body: {
      "id": 1,
      "name": "Lorem ipsum 1",
      "youtubeLink": "https://www.youtube.com/lorem-ipsum-1"
      "score": 5
    }
```

```yml
GET /recommendations/top/:amount
    - Route to get a list of top song recommendations by higher score
    - The list will have length equal to amount sent by params or less if there aren't enough recommendations in database
    - params: recommendation amount
    - headers: {}
    - body: {}
    - response body: [
      {
        "id": 100,
        "name": "Lorem ipsum 100",
        "youtubeLink": "https://www.youtube.com/lorem-ipsum-100"
        "score": 510
      },
      {
        "id": 120,
        "name": "Lorem ipsum 120",
        "youtubeLink": "https://www.youtube.com/lorem-ipsum-120"
        "score": 430
      },
      {
        "id": 90,
        "name": "Lorem ipsum 90",
        "youtubeLink": "https://www.youtube.com/lorem-ipsum-90"
        "score": 429
      },
    ]
```

## 🏁 Running application

This project was initialized with [npm](https://www.npmjs.com/) and written in [Node.js](https://nodejs.org/en/download/), so make sure you have the last stable version running locally.

Firstly you shou've had already cloned the whole repository. If you haven't, run this command in your machine's terminal:

```
git clone https://github.com/lguilhermefl/projeto21-singmeasong.git
```

After you had it cloned, open the main folder in your code editor. With the terminal opened run the following commands to install all dependencies:

```
cd back-end/
npm i
```

To run this back-end you'll need to have Postgres installed in your machine. If you don't have it, go to this link and install:

```
https://www.postgresql.org/download/
```

After that you'll need to create your .env files. In this API we use two .env files, one for production and another for tests (.env and .env.test). You can see the .env.example and .env.test.example for examples.

In order to create the database table, run this command inside the back-end folder in your terminal:

```
npx prisma migrate dev
```

If you want to run the production version, run:

```
npm run dev
```

If you want to run the integration tests, run:

```
npm run test:int
```

If you want to run the unit tests, run:

```
npm run test:unit
```

If you want to deploy this application you'll need to add two scripts to package.json file:

```
"build": "tsc && npx prisma generate && npx prisma migrate deploy",
"start": "node dist/server.js",
```

:stop_sign: Don't forget to follow all the instructions above with the [repository](https://github.com/lguilhermefl/projeto21-singmeasong.git) that contains the application's interface to test this project.
