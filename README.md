# blog-site

View Live Demo at: http://blog-site-assign.herokuapp.com/

# Blog-it Blog Platform

## Features

- User login and Sign up.
- A logged in user can view any blogs.
- A logged in user can delete or edit only his/her posts.



## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
SECRETKEY = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd blog-site-frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

## Build & Deploy

```
# Create frontend prod build
cd blog-site-frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku



```
Sample User Logins

test@example.com
123456789

```
