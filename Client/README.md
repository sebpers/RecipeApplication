# React + TypeScript + Vite

# About the app
A simple recipe app which uses user roles to do certatin things

# Get started
- Navigate to client
- Run `npm i` to install dependencies


# Run server
- Navigate to client
- Run `npm run dev` in terminal

# Run tests
The prooject uses `Vitest, Jest and Test library`
- Run npx vitest run

# Roles
- Admin
 - Can do everything
- Author
  - Can add recipe
  - Can edit and delete it's own recipes
  - Save recipes and other other authors as favorites
- Visitor
  - Can see recipes and authors and save as favorites
- No role (not logged in)
 - Can only see recipes and authors

# How to navigate in the app
- To get started you need to get backend started or create multiple fake data and disable validations in the client code
- Register an account in the client app or through backend
- By creating an account through the client you'll get the role `Visitor`
- Currently to get a role of `Author` or `Admin` you need to update the users role in the database

# Lastly
- Have fun!