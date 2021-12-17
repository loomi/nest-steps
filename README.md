<p align="center">
  <img src="https://avatars.githubusercontent.com/u/68288528?s=200&v=4" alt="Loomi" width="80" />
</p>

<h1 align="center">Nest Steps</h1>

<p align="center">
  Nest Steps is a nestJS boilerplate to jump initial stages of development.
</p>

## Requeriments
- Docker, Docker compose and NestJS

## 💻 Running locally

### Setup

**`(nano | vi | vim| nvim ) .env`**
> Create .env follow the .env.example

**`yarn or npm install`**
> Install js dependencies
### Runing Local
**`npm run start:dev`**
> Access http://localhost:{ENV.PORT} to see the swagger documentation

### Runing with Docker
**`sudo docker-compose build && sudo docker-compose up -d && sudo docker-compose logs -f`**
> Run the docker to up the adminer, api and databases

> Access http://localhost:{ENV.PORT} to see the swagger documentation

##  😎 "Code" Quickly
### Generate CRUD for basic Entity
**`nest generate resource {name of entity}`**
> Generate initial CRUD (add entity repository to respect single responsibility rule)

### Use Prisma
**`git merge feature/add-prisma-orm`**
> execute your queries quickly.
### Use Firebase
**`git merge feature/add-firebase`**
> Get all firebase function to authenticate and authorize user.

### Use Passport
**`git merge feature/add-passport`**
> you don't like firebase?? passport help you in authenticate and authorize user.
### Use s3
**`git merge feature/add-s3`**
> Get all s3 function to handle images.


## 💻 Testing

### UNIT

> Don't need of the project run to test!

**`npm run test:unit`**
> To run tests in time of development with hot-reload

**`npm run test:ci`**
> To run all tests of the project and generate coverage

#
Made with ❤️ by **Loomi**