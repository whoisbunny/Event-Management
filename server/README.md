# API Documentation

## Authentication Endpoints

### Endpoint: `/api/auth/signup`

#### Description
This endpoint is used to register a new user.

#### Method
`POST`

#### Request Body
The request body should be a JSON object containing the following fields:
- `name`: A string (required)
- `email`: A valid email address (required)
- `password`: A string (required)

Example:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the authentication token and user details.

Example:
```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "token": "your_jwt_token"
}
```

##### User Already Exists
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "User already exists"
}
```

### Endpoint: `/api/auth/login`

#### Description
This endpoint is used to log in an existing user.

#### Method
`POST`

#### Request Body
The request body should be a JSON object containing the following fields:
- `email`: A valid email address (required)
- `password`: A string (required)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the authentication token, user details, and token expiry date.

Example:
```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "token": "your_jwt_token",
  "expiryDate": "2025-05-14T10:00:00.000Z"
}
```

##### Invalid Credentials
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Invalid credentials"
}
```

##### User Not Found
- **Status Code**: `404 Not Found`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "User not found"
}
```

### Endpoint: `/api/auth/profile`

#### Description
This endpoint is used to get the profile of the authenticated user.

#### Method
`GET`

#### Headers
- `Authorization`: Bearer token (required)

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the user details (excluding password).

Example:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

##### Unauthorized
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Not authorized Token expired"
}
```

### Endpoint: `/api/auth/profile`

#### Description
This endpoint is used to update the profile of the authenticated user.

#### Method
`PUT`

#### Headers
- `Authorization`: Bearer token (required)

#### Request Body
The request body should be a JSON object containing any of the following fields:
- `name`: A string (optional)
- `email`: A valid email address (optional)
- `password`: A string (optional)

Example:
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "password": "newpassword123"
}
```

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the updated user details.

Example:
```json
{
  "_id": "user_id",
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

### Endpoint: `/api/auth/profile`

#### Description
This endpoint is used to delete the authenticated user's profile.

#### Method
`DELETE`

#### Headers
- `Authorization`: Bearer token (required)

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing a success message.

Example:
```json
{
  "message": "User deleted successfully"
}
```

### Endpoint: `/api/auth/logout`

#### Description
This endpoint is used to log out the authenticated user.

#### Method
`GET`

#### Headers
- `Authorization`: Bearer token (required)

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing a success message.

Example:
```json
{
  "message": "User logged Out"
}
```

## Event Endpoints

### Endpoint: `/api/event`

#### Description
This endpoint is used to create a new event.

#### Method
`POST`

#### Headers
- `Authorization`: Bearer token (required)

#### Request Body
The request body should be a JSON object containing the following fields:
- `name`: A string (required)
- `description`: A string (required)
- `date`: A date string (required)

Example:
```json
{
  "name": "Team Meeting",
  "description": "Weekly team sync-up meeting",
  "date": "2025-05-15T10:00:00.000Z"
}
```

#### Responses

##### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the event details.

Example:
```json
{
  "event": {
    "_id": "event_id",
    "name": "Team Meeting",
    "description": "Weekly team sync-up meeting",
    "date": "2025-05-15T10:00:00.000Z",
    "createdBy": "user_id"
  },
  "message": "Event created successfully"
}
```

### Endpoint: `/api/event`

#### Description
This endpoint is used to get all events with pagination.

#### Method
`GET`

#### Headers
- `Authorization`: Bearer token (required)

#### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)
- `sortField`: Field to sort by (default: "date")
- `sortOrder`: Sort order ("asc" or "desc", default: "desc")
- `globalFilter`: Search string to filter events

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing paginated events data.

Example:
```json
{
  "data": [
    {
      "_id": "event_id",
      "name": "Team Meeting",
      "description": "Weekly team sync-up meeting",
      "date": "2025-05-15T10:00:00.000Z",
      "createdBy": {
        "_id": "user_id",
        "name": "John Doe"
      }
    }
  ],
  "totalData": 50,
  "totalPages": 5,
  "page": 1,
  "limit": 10,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

### Endpoint: `/api/event/:id`

#### Description
This endpoint is used to get a specific event by ID.

#### Method
`GET`

#### Headers
- `Authorization`: Bearer token (required)

#### URL Parameters
- `id`: The ID of the event to retrieve

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the event details.

Example:
```json
{
  "_id": "event_id",
  "name": "Team Meeting",
  "description": "Weekly team sync-up meeting",
  "date": "2025-05-15T10:00:00.000Z",
  "createdBy": "user_id"
}
```

### Endpoint: `/api/event/:id`

#### Description
This endpoint is used to update a specific event.

#### Method
`PUT`

#### Headers
- `Authorization`: Bearer token (required)

#### URL Parameters
- `id`: The ID of the event to update

#### Request Body
The request body should be a JSON object containing any of the following fields:
- `name`: A string (optional)
- `description`: A string (optional)
- `date`: A date string (optional)

Example:
```json
{
  "name": "Updated Team Meeting",
  "description": "Monthly team sync-up meeting",
  "date": "2025-05-20T10:00:00.000Z"
}
```

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the updated event details.

Example:
```json
{
  "event": {
    "_id": "event_id",
    "name": "Updated Team Meeting",
    "description": "Monthly team sync-up meeting",
    "date": "2025-05-20T10:00:00.000Z",
    "createdBy": "user_id"
  },
  "message": "Event updated successfully"
}
```

### Endpoint: `/api/event/:id`

#### Description
This endpoint is used to delete a specific event.

#### Method
`DELETE`

#### Headers
- `Authorization`: Bearer token (required)

#### URL Parameters
- `id`: The ID of the event to delete

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing a success message.

Example:
```json
{
  "message": "Event deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### Server Error
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Error message",
  "error": "Detailed error information"
}
```

### Invalid Event ID
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Invalid event ID"
}
```

### Not Found
- **Status Code**: `404 Not Found`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Event not found"
}
```

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). To authenticate requests:

1. Obtain a token by logging in through `/api/auth/login`
2. Include the token in the Authorization header of subsequent requests:
   ```
   Authorization: Bearer your_jwt_token
   ```

## Rate Limiting and Security

- All routes are protected with CORS configuration
- Authentication tokens expire after a set period
- Passwords are hashed using bcrypt before storage
- Refresh tokens are used for secure session management

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.49lzarp.mongodb.net/Event_Management-Upforce_Tech
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
TOKEN_EXPIRY=2d
NODE_ENV=development
CLIENT=http://localhost:3000
```

### Notes:
- Replace `<username>` and `<password>` in `MONGODB_URI` with your MongoDB credentials.
- Use secure and unique values for `JWT_SECRET` and `JWT_REFRESH_SECRET`.
