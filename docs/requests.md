# Requests
List of requests and what data should be present in the body of the request (for POST)

### Registration
Endpoint: `/register`\
Body:
```json5
{
  "email": "email",
  "password": "password"
}
```

### Login
Endpoint: `/login`\
Body:
```json5
{
  "email": "email",
  "password": "password"
}
```

### Item
#### Add item
Endpoint: `item/add/:organization`\
Body:
```json5
{
  "name": "name",
  "amount": 12, //any int
  "category": "category" //(optional)
}
```
#### Delete item
Endpoint: `item/delete/:organization`\
Body:

```json5
{
  "id": "item-id"
}
```