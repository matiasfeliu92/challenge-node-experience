# Challenge DigiChanges

This challenge application contains all the endpoints to perform different actions, such as getting all products, searching by category, create new categories and products.

## Technologies

For the database, MongoDb is used for development.

This was achieved using the following technologies.

- Node Js
- Koa
- Mongoose

***
The challenge application code is in '/Challenge' directory

## Instalation

In order to download the project, you have to clone the github repository, executing the following command in the terminal:

```
git clone https://github.com/matiasfeliu92/challenge-node-experience.git
```

Then you have to access the project folder by executing the following command in the terminal:

```
cd challenge-node-experience
```

Then you have to install the dependencies contained in the package.json file by executing the following command in the terminal:

```
npm install
```

Finally to execute the project we use the following command:

```
npm run dev
```

## Routes

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/products`       |    GET    | Returns all products whose category enable attibute is true |
| `/products/category/:title` |    GET    | Returns products by category if category enable attibute is true |
| `/products` |    POST    | Create new product |
| `/categories` |    GET    | Return all categories |
| `/categories` |    POST    | Create new category |