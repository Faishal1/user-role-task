Project user-role-task

Requirements
Recommended editor:
Visual Studio Code: https://code.visualstudio.com/Download
Prerequisite knowledge:
VS Code, ES6, Mysql, Knex
System requirements:

NODE Version : 8.9.0
NPM Version : 5.5.0


Getting Started
Install dependencies:

```sh
npm install
```

Create db and Run migrations and seeds if needed
```sh
# To run the migrations
npm run knex migrate:latest; 

```

Available Scripts

```sh

npm run knex - for using knex cli

npm start - for starting development server

npm run startD - for starting development server with nodemon

```



Dependencies


mysql2 - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl


bluebird - Bluebird is a fully featured promise library with focus on innovative features and performance


body-parser - Node.js body parsing middleware


express - Fast, unopinionated, minimalist web framework for node


JOI - For validations



Dev Dependencies


babel-cli - Babel command line


babel-core - Babel compiler core



babel-preset-es2015 - Babel preset for all es2015 plugins



nodemon - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected

# Request
role (optional) not required for creating the first user

```sh
{
	"name":"",
	"mobile_number": "",
	"email": "",
	"full_address": "",
	"role": ""  
}
```

# Response

```sh
{
    "status": 201,
    "data": {
    
    },
    "message": "User Record Created Successfully"
}
```

# Endpoint to access 

POST {{host}}/api/users/