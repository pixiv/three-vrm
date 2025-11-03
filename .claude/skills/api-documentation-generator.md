---
name: api-documentation-generator
description: Generates comprehensive API documentation including OpenAPI/Swagger specs, endpoint descriptions, request/response examples, and integration guides. Use when documenting APIs.
---

# API Documentation Generator Skill

Expert at creating comprehensive, developer-friendly API documentation.

## When to Activate

- "document API endpoints"
- "create API documentation for [feature]"
- "generate OpenAPI/Swagger spec"
- "write API integration guide"

## OpenAPI 3.0 Specification

```yaml
# openapi.yaml
openapi: 3.0.3
info:
  title: User Management API
  description: |
    Comprehensive API for managing users, authentication, and profiles.

    ## Features
    - User CRUD operations
    - JWT authentication
    - Role-based access control
    - Search and pagination

    ## Authentication
    Use Bearer token in Authorization header:
    ```
    Authorization: Bearer <your-jwt-token>
    ```
  version: 1.0.0
  contact:
    name: API Support
    email: api@example.com
    url: https://api.example.com/support
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: Users
    description: User management operations
  - name: Authentication
    description: Authentication and authorization

paths:
  /users:
    get:
      tags: [Users]
      summary: List users
      description: Retrieve a paginated list of users with optional filtering
      operationId: getUsers
      security:
        - bearerAuth: []
      parameters:
        - name: page
          in: query
          description: Page number
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          description: Number of items per page
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 10
        - name: search
          in: query
          description: Search query for name or email
          schema:
            type: string
        - name: role
          in: query
          description: Filter by user role
          schema:
            type: string
            enum: [user, admin, moderator]
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  users:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'
              example:
                users:
                  - id: 1
                    email: user@example.com
                    name: John Doe
                    role: user
                    createdAt: '2024-01-01T00:00:00Z'
                meta:
                  page: 1
                  limit: 10
                  total: 45
                  totalPages: 5
        '401':
          $ref: '#/components/responses/UnauthorizedError'

    post:
      tags: [Users]
      summary: Create user
      description: Create a new user account
      operationId: createUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserInput'
            example:
              name: Jane Doe
              email: jane@example.com
              password: SecurePass123!
              role: user
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/ValidationError'
        '409':
          description: Email already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /users/{id}:
    get:
      tags: [Users]
      summary: Get user by ID
      operationId: getUserById
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
          description: User ID
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          $ref: '#/components/responses/NotFoundError'

    put:
      tags: [Users]
      summary: Update user
      operationId: updateUser
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserInput'
      responses:
        '200':
          description: User updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

    delete:
      tags: [Users]
      summary: Delete user
      operationId: deleteUser
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: User deleted
        '403':
          $ref: '#/components/responses/ForbiddenError'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    User:
      type: object
      required: [id, email, name, role]
      properties:
        id:
          type: integer
          description: Unique user identifier
        email:
          type: string
          format: email
          description: User email address
        name:
          type: string
          description: User full name
        role:
          type: string
          enum: [user, admin, moderator]
          description: User role
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    CreateUserInput:
      type: object
      required: [email, name, password]
      properties:
        email:
          type: string
          format: email
        name:
          type: string
          minLength: 2
          maxLength: 100
        password:
          type: string
          minLength: 8
        role:
          type: string
          enum: [user, admin, moderator]
          default: user

    UpdateUserInput:
      type: object
      properties:
        email:
          type: string
          format: email
        name:
          type: string
        password:
          type: string
          minLength: 8
        role:
          type: string
          enum: [user, admin, moderator]

    PaginationMeta:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer

    Error:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
        details:
          type: array
          items:
            type: string

  responses:
    UnauthorizedError:
      description: Authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    ForbiddenError:
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    NotFoundError:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    ValidationError:
      description: Validation failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
```

## API README Documentation

```markdown
# User API Documentation

## Overview

The User API provides endpoints for managing user accounts, authentication, and profiles.

Base URL: `https://api.example.com/v1`

## Authentication

All endpoints (except registration and login) require authentication using JWT tokens.

Include the token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### Getting a Token

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

## Quick Start

### 1. Register a New User

```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### 2. Login

```bash
curl -X POST https://api.example.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### 3. Get User Profile

```bash
curl https://api.example.com/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Endpoints

### List Users

```
GET /users
```

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 10, max: 100)
- `search` (string): Search users by name or email
- `role` (string): Filter by role (user, admin, moderator)

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

Error Response Format:
```json
{
  "error": "ValidationError",
  "message": "Invalid input data",
  "details": [
    "Email must be valid",
    "Password must be at least 8 characters"
  ]
}
```

## Rate Limiting

API requests are rate-limited to:
- 100 requests per minute (authenticated)
- 20 requests per minute (unauthenticated)

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

## SDKs and Libraries

- JavaScript/TypeScript: `npm install @example/api-client`
- Python: `pip install example-api`
- Go: `go get github.com/example/api-go`

## Support

- Documentation: https://docs.example.com
- Support Email: api@example.com
- Status Page: https://status.example.com
```

## Best Practices

- Include all endpoints and parameters
- Provide request/response examples
- Document authentication requirements
- Explain error responses
- Add rate limiting information
- Include SDKs and code examples
- Keep documentation up-to-date
- Version your API
- Use standard HTTP methods
- Provide changelog

## Output Checklist

- ✅ OpenAPI spec generated
- ✅ All endpoints documented
- ✅ Request/response examples
- ✅ Authentication documented
- ✅ Error codes explained
- ✅ Quick start guide
- ✅ Code examples
- 📝 README created
