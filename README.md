# noteplus
Noteplus is a simple application that allows you to create notes and code snippets for your github projects.
Noteplus integrates with Github. Feel free to use it to keep track of what you learn while contributing 
to your projects.

## Getting Started

These instructions will get you a copy of the project up and running on your environment.

### Setup

Clone repository from Github
    
```
git clone https://github.com/MariusBorcan/noteplus
```

Setup node.js

```
cd noteplus
```

```
npm install
```

Setup mysql

```
mysql-ctl start
```

```
mysql -u root
```
```
source sql/database.sql
```
```
exit
```

run server.js
```
node server.js
```

##Endpoints

Get a list of all users

```
GET https://noteplus-mariusbd.c9users.io/users
```

```
[
    {
        "id": 1,
        "name": "Marius Dumitru Borcan",
        "email": "dtrumarius16@gmail.com",
        "password": "abc",
        "githubUrl": "github",
        "imageUrl": "image",
        "organization": "org",
        "location": "loc",
        "website": "www",
        "createdAt": "2017-11-21T19:14:16.000Z",
        "updatedAt": "2017-11-21T19:14:16.000Z"
    },
    {
        "id": 3,
        "name": "Ion Popescu",
        "email": "ionpopescu@gmail.com",
        "password": "abc",
        "githubUrl": "github",
        "imageUrl": "image",
        "organization": "org",
        "location": "loc",
        "website": "www",
        "createdAt": "2017-11-21T19:14:53.000Z",
        "updatedAt": "2017-11-21T19:14:53.000Z"
    }
]
```

Add an user

```
POST https://noteplus-mariusbd.c9users.io/users
```
```
    {
        "id": 1,
        "name": "Marius Dumitru Borcan",
        "email": "dtrumarius16@gmail.com",
        "password": "abc",
        "githubUrl": "github",
        "imageUrl": "image",
        "organization": "org",
        "location": "loc",
        "website": "www",
        "createdAt": "2017-11-21T19:14:16.000Z",
        "updatedAt": "2017-11-21T19:14:16.000Z"
    }
```

Update an user

```
PUT https://noteplus-mariusbd.c9users.io/users
```
```
    {
        "id": 1,
        "name": "Marius Dumitru Borcan",
        "email": "dtrumarius16@gmail.com",
        "password": "abc",
        "githubUrl": "github",
        "imageUrl": "image",
        "organization": "org",
        "location": "loc",
        "website": "www",
        "createdAt": "2017-11-21T19:14:16.000Z",
        "updatedAt": "2017-11-21T19:14:16.000Z"
    }
```
Delete an user

```
DELETE https://noteplus-mariusbd.c9users.io/users/1
```

Get a list of all projects

```
GET https://noteplus-mariusbd.c9users.io/projects
```

Add a project

```
POST https://noteplus-mariusbd.c9users.io/projects
```
```
    {
		"userId":1,
        "title": "Noteplus",
        "description": "Awesome project",
        "githubUrl": "github"
    }   
```

Delete a project

```
DELETE https://noteplus-mariusbd.c9users.io/projects/1
```



## Components
 * Projects list
 * Projects search
 * Notes list
 * Notes search
 * Search bar
 * Text editor
 * Options bar
 * User badge
 * Code snippet tool

## Features
 * Connect with Github
 * View projects
 * View notes grouped by projects
 * Add project
 * Add note to a project
 * Search projects
 * Search notes
 * Edit a note
 * Insert snippet into a note
 * Delete note
 * Delete project



