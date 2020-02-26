# LAB - Class 12


## JSON Server with Authentication

### Description
JSON-serving API written in TypeScript with user authentication using JWT (JSON Web Token).

### Author: Tyler Sayvetz

## Links and Resources

- [Submission PR]()
- Note yet hosted live


## Dependencies
  ```
    "@types/base-64": "^0.1.3",
    "@types/bcrypt": "^3.0.0",
    "@types/express": "^4.17.2",
    "@types/jsonwebtoken": "^8.3.7",
    "@types/mongoose": "^5.7.1",
    "base-64": "^0.1.0",
    "bcrypt": "^4.0.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.2"

  ```

 ### Environment Variables Needed

- `PORT=3000`
- `MONGODB_URI=mongodb://localhost:27017/users`

### How to initialize/run your application
The following assumes you have an installation of MongoDB. Refer to MongoDB docs if you need to install. 

1. Clone repo to local machine.

2. `cd` to repo

3. `npm i`

4. `npm run dev`



### Tests

Testing to come.

### UML


Web RRC diagram for basic auth server, various routes.
![](assets/basic-auth.jpeg)
