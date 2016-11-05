# /v1/users
This route interacts with users on the system.

In order to access any of these routes, you need the `admin` [role](/docs/v1/roles).

## GET /v1/users
This will get all the users in the system.

### Scope
This route requires the `admin:read` [scope](/docs/v1/scope).

## GET /v1/users/{id}
This will get a single user in the system.

### Scope
This route requires the `admin:read` [scope](/docs/v1/scope).

## POST /v1/users
This will create a new user in the system.

### Scope
This route requires the `admin:write` [scope](/docs/v1/scope).

## PUT /v1/users/{id}
This will update the information for a user in the system.

### Scope
This route requires the `admin:write` [scope](/docs/v1/scope).

## DELETE /v1/users/{id}
This will delete a user in the system.

### Scope
This route requires the `admin:write` [scope](/docs/v1/scope).

### Responses
When successful, this route will return a [204](/docs/v1/response-codes#204) response code with no content.