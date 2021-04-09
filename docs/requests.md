# Requests
List of requests and what data should be present in the body of the request (for POST)

### Registration
Endpoint (POST): `/register`\
Body:
```json5
{
  "email": "email",
  "password": "password"
}
```

### Login
Endpoint (POST): `/login`\
Body:
```json5
{
  "email": "email",
  "password": "password"
}
```

### Item
#### Add item
Endpoint (POST): `item/add/:organization`\
Body:
```json5
{
  "name": "name",
  "amount": 12, //any int
  "category": "category" //(optional)
}
```
#### Delete item
Endpoint (POST): `item/delete/:organization`\
Body:
```json5
{
  "id": "item-id"
}
```

#### Create Organization
The create organization request only requires the `name` field to be present in the body. The `owner`, `members`, 
and `id` fields are generated server side upon creation.\
Endpoint (POST): `org/create`\
Body:
```json5
{
  name: "Organization name"
}
```

#### Get Organizations
Retrieves a list of organizations that the sending user belongs to (owner or member) \
Endpoint (GET): `/user/orgs`
Response:
```json5
{
  organizations: [
    {
      id: "id",
      name: "name",
      owner: "owner",
      members: [] 
    }
  ]
}
```
