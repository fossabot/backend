---
pretitle: v1
title: /users
---

These routes interact with users on the system.

# Contents

<!-- toc -->

# GET /users

This will get all the users in the system.

## GET /users Authentication

| Role/s | Scope/s |
|:------:|:-------:|
| admin | admin:read |

## GET /users Responses

This will return a [paginated](/docs/paginated) array of [user](/docs/models/user) models.

# GET /users/{id}

This will get a single user in the system.

## GET /users/{id} Authentication

| Role/s | Scope/s |
|:------:|:-------:|
| admin | admin:read |

## GET /users/{id} Responses

This will return a [user](/docs/models/user) model.

# POST /users

This will create a new user in the system.

## POST /users Authentication

| Role/s | Scope/s |
|:------:|:-------:|
| admin | admin:write |

## POST /users Responses

This will return a [user](/docs/models/user) model for the newly created user.

The response will also contain a `Location` header to the location of the newly created resource.

# PUT /users/{id}

This will update the information for a user in the system.

## PUT /users/{id} Authentication

| Role/s | Scope/s |
|:------:|:-------:|
| admin | admin:write |

## PUT /users/{id} Responses

This will return the [user](/docs/models/user) model of the updated user.

# DELETE /users/{id}

This will delete a user in the system.

## DELETE /users/{id} Authentication

| Role/s | Scope/s |
|:------:|:-------:|
| admin | admin:write |

## DELETE /users/{id} Responses

When successful, this route will return a [204](/docs/response-codes#204) response code with no content.
