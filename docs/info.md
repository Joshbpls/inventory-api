### Authentication
After the user successfully signs in or registered they are issued a jsonwebtoken. This token has some information
embedded in it which we will use for database queries. 

### Security
Each password is hashed using the `scrypt` function provided by the `crypto` package. For additional security,
a random 16 byte salt is generated when the user registers and is also used in the hashing. 

### Requests
Each response must have the `success` and `message` fields. 