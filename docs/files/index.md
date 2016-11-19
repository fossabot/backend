# ATLauncher API
This is a the documentation for the ATLauncher API.

## Contents
 - [Rate Limiting](/docs/rate-limiting)
 - [Roles](/docs/roles)

## Versions
This API is versioned so that you can ensure that your consuming applications will not have to worry about breaking changes causing issues.

Each version of the API will **NEVER** introduce any breaking changes. This includes removing endpoints, changing return types, removing return values and more.

Below is a simple table showing what we will and will not do in a single version of this API.

| Change made | New version? |
|-------------|-------------:|
| Add a new endpoint | No |
| Remove an endpoint | Yes |
| Add a new attribute to the return object of an endpoint | No |
| Remove an attribute from the return object of an endpoint | Yes |
| Change the type of an attribute from the return object of an endpoint | Yes |
| Change the structure of the response sent from an endpoint | Yes |
| Change the scope needed to access the endpoint | Yes |

### Version Documentation
 - [v1](/docs/v1/)