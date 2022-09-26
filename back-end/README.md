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
   <img src="https://img.shields.io/github/languages/count/lguilhermefl/projeto21-singmeasong?color=4dae71&style=flat-square" />
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
    - name is a required string and youtubeLink is a required valid YouTube link string
```
