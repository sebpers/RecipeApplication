# A recipe application built with React, Tailwind, .Net(8) CORE and SQL Express

## Description
An ongoing hobby project to deepen my knowledge in React, Tailwind,.Net and SQL Express (Microsoft SQL). <br>
Vitest/Jest are used to test the frontend.<br><br>
Mainly just threw the code in there to later on refactor bit by bit for learning.

## Get started
### Server
- Download Microsoft SQL Express (Other databases can be used as well but settings needs to be changed in the backend to match in `appsettings.json`)
- Create a new database and name it to `recipeApp` to match the current database settings in appsettings (or name it to whatever as long the matches)
  
### Backend (.Net 8
- Preferring using Visual Studi as editor for backend!
- Download .Net 8
- Open up the project, navigate to the second API folder
- Make sure to change the database name in `appsettings.json`
- Change the :port to `5098` in `validAudience` within `appsettings.json`
- Run `dotnet build` to build the project
- Make sure the server is running for the next step
- Check if `entity framework` is installed by using `dotnet ef`
- If it's not insttalled, install it by typing `dotnet tool install dotnet-ef` in terminal
- Run `dotnet ef build migrations` to run the migrations add the tables to the database
- run `dotnet run` or click on the green arrow in the header to run the server
  
#### Tests backend
- Currently no tests implemented

### Frontend (React)
- Open up the project
- Navigate to client
- Run `npm i` in the terminal to install all the packages
- Run `npm run dev` to run the client server
  
#### Tests frontend (Vitest)
- Open the project
- Navigate to client
- Run `npx vitest run` to run all the tests

- ----

# How to 
To be able to navigate the correct way on the page you need to know some basics.<br/>
A logged in user gets a cookie which authorize the user, the cookie currently lasts for 1h. <br/>
The application contains of different roles and each role can or can't do something.


## Roles
### Not logged in user (role do not exist) 
- If a user is not logged in, then the user has limited access.
- The user can see recipes, authors and filter.
- Can read comments

### Visitor
- A visitor can see recipes, authors, filter
- Add recipes / authors to favorites
- Create comments on recipes

### Author
- An author can do everything a visitor can do and more
- An author can add, delete and edit it's own recipes

### Admin
- Can do everything
- Add, delete and edit authors/recipes
- Can add user roles to users (Not implemented)
